export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
  isError?: boolean;
}

export enum AppView {
  CHAT = 'CHAT',
  IMAGE = 'IMAGE'
}

export interface ImageGenerationResult {
  url: string;
  prompt: string;
  timestamp: number;
}
