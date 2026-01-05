
import { ScenarioResponse, BeYouUserDetails, BeYouPersonaResponse, ChatMessage, DifficultyLevel } from "../types";

const API_ENDPOINT = "/api/gemini";

const callAPI = async (action: string, payload: any) => {
  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, payload }),
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  return data.result;
};

let sharedAudioCtx: AudioContext | null = null;
const getAudioCtx = () => {
  if (!sharedAudioCtx) {
    sharedAudioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  }
  return sharedAudioCtx;
};

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(
    data.buffer,
    data.byteOffset,
    Math.floor(data.byteLength / 2)
  );
  
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const generateQuickRecap = async (pastTopic: string, currentTopic: string): Promise<string> => {
  try {
    return await callAPI("generateQuickRecap", { pastTopic, currentTopic });
  } catch (e) {
    return "";
  }
};

export const translateEngineResult = async (humanized: string, summary: string, targetLanguage: string, deepDive?: string): Promise<{ humanized: string, summary: string, deepDive?: string }> => {
  try {
    return await callAPI("translateEngineResult", { humanized, summary, targetLanguage, deepDive });
  } catch (error) {
    console.error("Translation Error:", error);
    return { humanized, summary, deepDive };
  }
};

export const generateScenario = async (topic: string, grade: string, difficulty: DifficultyLevel = 'MEDIUM'): Promise<ScenarioResponse> => {
  try {
    return await callAPI("generateScenario", { topic, grade, difficulty });
  } catch (error) {
    console.error("Scenario Gen Error:", error);
    throw error;
  }
};

export const engineOceanQuery = async (query: string, grade: string, marks: string, difficulty: string = 'Standard', isSyllabusMode: boolean = false): Promise<any> => {
  try {
    return await callAPI("engineOceanQuery", { query, grade, marks, difficulty, isSyllabusMode });
  } catch (error) {
    console.error("Ocean Query Error:", error);
    throw error;
  }
};

export const deepDiveQuery = async (originalQuery: string, context: string): Promise<string> => {
  try {
    return await callAPI("deepDiveQuery", { originalQuery, context });
  } catch (e) {
    return "Nexus depth limit reached.";
  }
};

export const generateSpeech = async (text: string, targetLanguage: string = 'English'): Promise<AudioBuffer | null> => {
  if (!text || text.trim().length === 0) return null;
  
  try {
    const base64Audio = await callAPI("generateSpeech", { text, targetLanguage });
    if (!base64Audio) return null;
    
    const audioContext = getAudioCtx();
    return await decodeAudioData(decode(base64Audio), audioContext, 24000, 1);
  } catch (error) {
    console.error("Speech Gen Error:", error);
    return null;
  }
};

export const generateFounderRemark = async (content: string, type: 'OCEAN' | 'SCENARIO'): Promise<{ remark: string, quote: string }> => {
  try {
    return await callAPI("generateFounderRemark", { content, type });
  } catch (e) {
    return { remark: "Focus on application.", quote: "Synthesis is the only path." };
  }
};

export const globalChatResponse = async (message: string, history: ChatMessage[]) => {
  return await callAPI("globalChatResponse", { message, history });
};

export const generateAssessmentQuestions = async (details: BeYouUserDetails): Promise<string[]> => {
  try {
    return await callAPI("generateAssessmentQuestions", { details });
  } catch (error) {
    console.error("Assessment Questions Error:", error);
    return ["What is your primary motivation?", "How do you handle pressure?", "What is your legacy?", "What is success?", "Which tech excites you?"];
  }
};

export const generateBeYouPersona = async (details: BeYouUserDetails, qaPairs: {question: string, answer: string}[]): Promise<BeYouPersonaResponse> => {
  try {
    return await callAPI("generateBeYouPersona", { details, qaPairs });
  } catch (error) {
    console.error("BeYou Persona Gen Error:", error);
    throw error;
  }
};

export const chatWithPersona = async (systemInstruction: string, history: ChatMessage[], message: string): Promise<string> => {
  try {
    return await callAPI("chatWithPersona", { systemInstruction, history, message });
  } catch (error) {
    console.error("Persona Chat Error:", error);
    return "The future self node is temporarily offline.";
  }
};

export const generateMissionImage = async (prompt: string): Promise<string> => {
  try {
    return await callAPI("generateMissionImage", { prompt });
  } catch (error) {
    console.error("Mission Image Gen Error:", error);
    return "";
  }
};
