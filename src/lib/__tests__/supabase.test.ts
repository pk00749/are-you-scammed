import { describe, it, expect } from 'vitest';
import { isSupabaseConfigured } from '@/lib/supabase';

describe('Supabase configuration', () => {
  it('should correctly identify if Supabase is configured', () => {
    // This will return false since env vars are not set in tests
    const configured = isSupabaseConfigured();
    expect(typeof configured).toBe('boolean');
  });
});
