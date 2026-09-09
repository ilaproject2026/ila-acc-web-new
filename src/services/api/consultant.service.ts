import { apiClient } from './client';

export interface ConsultantChatPayload {
  message: string;
  topic?: string;
  history?: Array<{ role: 'user' | 'model' | 'assistant' | 'system'; content: string }>;
  user_email?: string;
  user_phone?: string;
}

export interface ConsultantChatResponse {
  reply: string;
  topic: string;
  suggested_actions?: string[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export const consultantService = {
  /**
   * Send user message to Django REST Framework Live Consultant endpoint
   * POST /api/v1/consultant/chat/
   */
  chat: async (payload: ConsultantChatPayload) => {
    return apiClient.post<ConsultantChatResponse>('/consultant/chat/', payload);
  },

  /**
   * Fetch aggregate token analytics from backend
   * GET /api/v1/consultant/tokens/summary/
   */
  getTokenAnalytics: async () => {
    return apiClient.get('/consultant/tokens/summary/');
  },
};
