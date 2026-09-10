import { apiClient } from './client';

export interface ConsultantChatPayload {
  session_id?: string;
  message: string;
  topic?: string;
  history?: Array<{ role: 'user' | 'model' | 'assistant' | 'system'; content: string }>;
  user_id?: string;
  user_name?: string;
  user_email?: string;
  user_phone?: string;
}

export interface ConsultantChatResponse {
  session_id?: string;
  reply: string;
  topic: string;
  suggested_actions?: string[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  inquiry_id?: string;
}

export interface ConsultantSyncPayload {
  session_id: string;
  topic?: string;
  user_email?: string;
  user_phone?: string;
  user_name?: string;
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp?: string | Date;
  }>;
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
   * Sync offline / fallback transcript to backend
   * POST /api/v1/consultant/sync/
   */
  syncTranscript: async (payload: ConsultantSyncPayload) => {
    return apiClient.post<{ success: boolean; session_id: string }>('/consultant/sync/', payload);
  },

  /**
   * Fetch conversation history for a given session
   * GET /api/v1/consultant/sessions/{session_id}/history/
   */
  getSessionHistory: async (sessionId: string) => {
    return apiClient.get<{
      session_id: string;
      topic: string;
      status: string;
      messages: Array<{
        id: string;
        role: 'user' | 'assistant' | 'system';
        content: string;
        suggested_actions?: string[];
        timestamp: string;
      }>;
    }>(`/consultant/sessions/${sessionId}/history/`);
  },

  /**
   * Convert session conversation into an active CRM front-office Inquiry
   * POST /api/v1/consultant/sessions/{session_id}/convert-to-inquiry/
   */
  convertToInquiry: async (sessionId: string, details: {
    name?: string;
    email?: string;
    phone?: string;
    notes?: string;
    category?: string;
  }) => {
    return apiClient.post<{
      success: boolean;
      inquiry_id: string;
      message: string;
    }>(`/consultant/sessions/${sessionId}/convert-to-inquiry/`, details);
  },

  /**
   * Fetch aggregate token analytics from backend
   * GET /api/v1/consultant/tokens/summary/
   */
  getTokenAnalytics: async () => {
    return apiClient.get('/consultant/tokens/summary/');
  },
};

