
// @ts-nocheck
import React, { useRef, useEffect, useState } from 'react';
import { Renderer, Camera, Transform, Plane, Program, Mesh, Texture } from 'ogl';

const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};

const vertexShader = `
precision highp float;
attribute vec3 position;
attribute vec2 uv;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uPosition;
uniform vec3 distortionAxis;
uniform vec3 rotationAxis;
varying vec2 vUv;
float PI = 3.141592653589793;

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle), c = cos(angle);
    float oc = 1.0 - c;
    return mat4(oc*axis.x*axis.x+c, oc*axis.x*axis.y-axis.z*s, oc*axis.z*axis.x+axis.y*s, 0.0,
                oc*axis.x*axis.y+axis.z*s, oc*axis.y*axis.y+c, oc*axis.y*axis.z-axis.x*s, 0.0,
                oc*axis.z*axis.x-axis.y*s, oc*axis.y*axis.z+axis.x*s, oc*axis.z*axis.z+c, 0.0,
                0.0, 0.0, 0.0, 1.0);
}

float qinticInOut(float t) {
  return t < 0.5 ? 16.0 * pow(t, 5.0) : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;
}

void main() {
  vUv = uv;
  vec3 newpos = position;
  float offset = (dot(distortionAxis, position) + 0.5 / 2.) / 0.5;
  float localprogress = clamp((fract(uPosition * 0.05) - 0.03 * offset) / 0.97, 0., 2.);
  localprogress = qinticInOut(localprogress) * PI;
  newpos = (rotationMatrix(rotationAxis, localprogress) * vec4(newpos, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform vec2 uImageSize, uPlaneSize;
uniform sampler2D tMap;
varying vec2 vUv;
void main() {
  float imageAspect = uImageSize.x / uImageSize.y, planeAspect = uPlaneSize.x / uPlaneSize.y;
  vec2 scale = vec2(1.0);
  if (planeAspect > imageAspect) scale.x = imageAspect / planeAspect;
  else scale.y = planeAspect / imageAspect;
  gl_FragColor = texture2D(tMap, vUv * scale + (1.0 - scale) * 0.5);
}
`;

class Media {
  constructor({ gl, geometry, scene, screen, viewport, image, length, index, planeWidth, planeHeight }) {
    this.gl = gl;
    this.geometry = geometry;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.image = image;
    this.length = length;
    this.index = index;
    this.planeWidth = planeWidth;
    this.planeHeight = planeHeight;
    this.extra = 0;
    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    this.texture = new Texture(this.gl, { generateMipmaps: false });
    this.program = new Program(this.gl, {
      fragment: fragmentShader,
      vertex: vertexShader,
      uniforms: {
        tMap: { value: this.texture },
        uPosition: { value: 0 },
        uPlaneSize: { value: [0, 0] },
        uImageSize: { value: [0, 0] },
        rotationAxis: { value: [0, 1, 0] },
        distortionAxis: { value: [1, 1, 0] }
      }
    });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      this.texture.image = img;
      if (this.program?.uniforms?.uImageSize) {
        this.program.uniforms.uImageSize.value[0] = img.naturalWidth;
        this.program.uniforms.uImageSize.value[1] = img.naturalHeight;
      }
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.plane.setParent(this.scene);
  }

  setScale() {
    if (!this.plane || !this.viewport || !this.screen) return;
    // Strictly mutate internal components to bypass read-only property restrictions on vector objects
    this.plane.scale.x = (this.viewport.width * this.planeWidth) / this.screen.width;
    this.plane.scale.y = (this.viewport.height * this.planeHeight) / this.screen.height;
    this.plane.scale.z = 1;

    if (this.program?.uniforms?.uPlaneSize) {
      this.program.uniforms.uPlaneSize.value[0] = this.plane.scale.x;
      this.program.uniforms.uPlaneSize.value[1] = this.plane.scale.y;
    }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;
    this.setScale();
    if (!this.plane) return;
    this.height = this.plane.scale.y + 5;
    this.heightTotal = this.height * this.length;
    this.y = -this.heightTotal / 2 + (this.index + 0.5) * this.height;
  }

  update(scroll) {
    if (!this.plane || !this.viewport) return;
    const targetY = this.y - (scroll?.current || 0) - this.extra;
    
    // Mutate internal components explicitly
    this.plane.position.x = 0;
    this.plane.position.y = targetY;
    this.plane.position.z = 0;

    if (this.program?.uniforms?.uPosition) {
      this.program.uniforms.uPosition.value = (this.plane.position.y / this.viewport.height) * 10 + 10;
    }
    
    if (this.plane.position.y + (this.plane.scale.y / 2) < -this.viewport.height / 2) {
      this.extra -= this.heightTotal;
    } else if (this.plane.position.y - (this.plane.scale.y / 2) > this.viewport.height / 2) {
      this.extra += this.heightTotal;
    }
  }
}

class Canvas {
  constructor({ container, canvas, items, planeWidth, planeHeight, scrollEase, cameraFov, cameraZ }) {
    this.container = container;
    this.canvas = canvas;
    this.items = items;
    this.planeWidth = planeWidth;
    this.planeHeight = planeHeight;
    this.scroll = { ease: scrollEase, current: 0, target: 0 };
    this.cameraFov = cameraFov;
    this.cameraZ = cameraZ;
    this.init();
  }

  init() {
    this.renderer = new Renderer({ canvas: this.canvas, alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio, 2) });
    this.gl = this.renderer.gl;
    this.camera = new Camera(this.gl);
    
    // Explicit mutation of components
    if (this.camera && this.camera.position) {
      this.camera.position.x = 0;
      this.camera.position.y = 0;
      this.camera.position.z = this.cameraZ;
    }
    this.scene = new Transform();
    this.geometry = new Plane(this.gl, { heightSegments: 1, widthSegments: 100 });
    this.onResize();
    
    const items = Array.isArray(this.items) ? this.items : [];
    this.medias = items.map((image, index) => new Media({
      gl: this.gl, geometry: this.geometry, scene: this.scene, screen: this.screen, viewport: this.viewport, image, length: items.length, index, planeWidth: this.planeWidth, planeHeight: this.planeHeight
    }));
    this.addEventListeners();
    this.update();
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const rect = this.container.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height) return;
    
    this.screen = { width: rect.width, height: rect.height };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ fov: this.cameraFov, aspect: this.gl.canvas.width / this.gl.canvas.height });
    
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    this.viewport = { width: height * this.camera.aspect, height };
    this.medias?.forEach(m => m.onResize({ screen: this.screen, viewport: this.viewport }));
  }

  onWheel(e) {
    if (this.scroll) {
      this.scroll.target += e.deltaY * 0.005;
    }
  }

  update() {
    if (!this.scroll) return;
    this.scroll.current += (this.scroll.target - this.scroll.current) * (this.scroll.ease || 0.05);
    this.medias?.forEach(m => m.update(this.scroll));
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render({ scene: this.scene, camera: this.camera });
    }
    this.reqId = requestAnimationFrame(() => this.update());
  }

  addEventListeners() {
    window.addEventListener('resize', () => this.onResize());
  }

  destroy() {
    cancelAnimationFrame(this.reqId);
    window.removeEventListener('resize', this.onResize);
  }
}

export default function FlyingPosters({ items = [], planeWidth = 320, planeHeight = 320, scrollEase = 0.05, cameraFov = 45, cameraZ = 20, className }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const instanceRef = useRef(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(isWebGLAvailable());
  }, []);

  useEffect(() => {
    if (!supported || !containerRef.current || !canvasRef.current) return;
    instanceRef.current = new Canvas({ container: containerRef.current, canvas: canvasRef.current, items, planeWidth, planeHeight, scrollEase, cameraFov, cameraZ });
    const handleWheel = (e) => {
      e.preventDefault();
      instanceRef.current?.onWheel(e);
    };
    const canvasEl = canvasRef.current;
    canvasEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      instanceRef.current?.destroy();
      canvasEl.removeEventListener('wheel', handleWheel);
    };
  }, [supported, items, planeWidth, planeHeight, scrollEase, cameraFov, cameraZ]);

  if (!supported) return <div className={`${className} bg-black flex items-center justify-center text-gray-700 font-mono text-[10px]`}>[OFFLINE: WEBGL_UNAVAILABLE]</div>;
  return (
    <div ref={containerRef} className={`w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
