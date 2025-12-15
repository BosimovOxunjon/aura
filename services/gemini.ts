import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message, MessageRole } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Models
const CHAT_MODEL = 'gemini-2.5-flash';
const IMAGE_MODEL = 'gemini-2.5-flash-image';

export const createChatSession = () => {
  return ai.chats.create({
    model: CHAT_MODEL,
    config: {
      systemInstruction: "You are Aura, a highly intelligent, creative, and helpful AI assistant. You answer concisely but with depth when needed. Your tone is professional yet warm.",
    },
  });
};

export const sendMessageStream = async (
  chat: Chat,
  message: string,
  onChunk: (text: string) => void
): Promise<string> => {
  let fullText = "";
  try {
    const resultStream = await chat.sendMessageStream({ message });
    
    for await (const chunk of resultStream) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        fullText += c.text;
        onChunk(c.text);
      }
    }
  } catch (error) {
    console.error("Stream error:", error);
    throw error;
  }
  return fullText;
};

export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        // Image generation doesn't use standard responseMimeType
      }
    });

    // Parse response for image data
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          // Usually gemini-2.5-flash-image returns PNG or JPEG. 
          // We can construct the data URI.
          // The mimeType is provided in inlineData.mimeType usually, but let's be safe.
          const mime = part.inlineData.mimeType || 'image/png';
          return `data:${mime};base64,${base64EncodeString}`;
        }
      }
    }
    
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Image generation error:", error);
    throw error;
  }
};
