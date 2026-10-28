import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Configuração Supabase com fallback para deploy de produção (Netlify)
const metaEnv = (import.meta as unknown as { env?: Record<string, string> }).env || {};
const FALLBACK_URL = 'https://mrmqsydtevbggmtrlemr.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ybXFzeWR0ZXZiZ2dtdHJsZW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NzY2ODksImV4cCI6MjEwMzE1MjY4OX0.F0lG2Eby04ib6B9Bz-ecDEqtrMZD6xFHDLoKze-KIPA';

const supabaseUrl = metaEnv.VITE_SUPABASE_URL || FALLBACK_URL;
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY || FALLBACK_KEY;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http'));
};

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return supabaseInstance;
};
