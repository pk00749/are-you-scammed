import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create client if configured
let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }

  return _supabase;
}

// For backwards compatibility - may return null client
export const supabase = getSupabase();

// Check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

// Database types matching our interfaces
export interface DbScam {
  id: string;
  title: string;
  slug: string;
  category: string;
  category_slug: string;
  tags: string[];
  severity: 'high' | 'medium' | 'low';
  amount_range: string;
  scripts: string[];
  red_flags: { script: string; explanation: string }[];
  cases: { summary: string; amount: string; contributor: string }[];
  actions: string[];
  source_url: string | null;
  source_name: string | null;
  published_at: string;
  updated_at: string;
  view_count: number;
  hot_score: number;
}

export interface DbContribution {
  id: string;
  category: string;
  scripts: string;
  amount: string;
  description: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  reviewed_at: string | null;
}
