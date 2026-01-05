
export type LuminousMode = 'OFF' | 'NIGHT' | 'SOOTHING' | 'BRIGHT';
export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';

export interface ScenarioResponse {
  scenario: string;
  role: string;
  objective: string;
  explanation: string;
  examples: string[];
  steps: string[]; 
  quote: string;
  difficulty?: DifficultyLevel;
}

export interface Bookmark {
  id: string;
  type: 'SCENARIO' | 'OCEAN';
  title: string;
  timestamp: number;
  data: any;
}

export interface DemoBooking {
  id: string;
  timestamp: number;
  userId: string;
  name: string;
  email: string;
  phone: string;
  grade: string;
  focusArea: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  location: UserLocation;
}

export interface NavItem {
  label: string;
  href: string;
}

export enum Section {
  HERO = 'hero',
  MISSION = 'mission',
  DEMO = 'demo',
  ECONOMICS = 'economics',
  CONTACT = 'contact'
}

export interface BeYouUserDetails {
  name: string;
  age: string;
  grade: string;
  goal: string;
  timeframe: string;
}

export interface BeYouPersonaResponse {
  roadmap: string; 
  systemInstruction: string; 
  initialGreeting: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface BeYouSession {
    details: BeYouUserDetails;
    persona: BeYouPersonaResponse;
    history: ChatMessage[];
    lastUpdated: number;
}

export type UserRole = 'VISITOR' | 'DEMO' | 'JOINED' | 'ADMIN';

export interface UserUsageLimits {
  scenarioLimit: number;
  beYouLimit: number;
  oceanLimit: number;
}

export interface UserLocation {
  city: string;
  country: string;
  lat: number;
  lng: number;
  flag: string;
}

export interface LeadCapsule {
  id: string;
  timestamp: number;
  userId: string;
  name?: string;
  email?: string;
  firstQuery: string;
  location: UserLocation;
  device: string;
  ip: string;
}

export interface NeuralComm {
  id: string;
  timestamp: number;
  userId: string;
  name?: string;
  phone?: string;
  audioBlobUrl?: string; // In a mock env, we store a temporary blob URL or base64
  duration: number;
  location: UserLocation;
  status: 'UNREAD' | 'REPLIED' | 'ARCHIVED';
}

export interface AdminCredential {
  id: string;
  username: string;
  passwordHash: string;
  permissions: string[]; // ['OVERVIEW', 'VISITORS', 'ARCHIVE', 'VOICE_MESSAGES', 'LOGS', 'ACCESS', 'SETTINGS', 'BOOKINGS']
  createdAt: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  device: string; 
  type: 'STUDENT' | 'PARENT';
  role: UserRole;
  usage: {
    scenarioCount: number;
    beYouCount: number;
    oceanCount: number;
  };
  limits: UserUsageLimits;
  registeredAt: number;
  lastActiveAt: number;
  profession?: string;
  testEdEngines?: boolean;
  concernMessage?: string;
  referralCode?: string;
  ip: string;
  location: UserLocation;
  isBlocked: boolean;
  beYouSession?: BeYouSession; 
  bookmarks: Bookmark[];
}

export interface AdminConfig {
  adminUsers: AdminCredential[];
  liveVisitorBase: number;
}

export interface InteractionEvent {
  id: string;
  userId: string | null;
  type: 'PAGE_VIEW' | 'CLICK_CALL' | 'CLICK_WHATSAPP' | 'GENERATE_SCENARIO' | 'GENERATE_BEYOU' | 'GENERATE_OCEAN' | 'MODAL_OPEN' | 'REGISTRATION' | 'FORM_SUBMISSION' | 'SYSTEM' | 'DEMO_BOOKING';
  timestamp: number;
  details?: string;
  payload?: any;
}

export interface SystemMetric {
  cpu: number;
  memory: number;
  latency: number;
  activeConnections: number;
  errorRate: number;
  requestsPerSecond: number;
  region: string;
  uptime: number; 
}
