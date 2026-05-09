import { NextRequest, NextResponse } from 'next/server';
import { getAllScams, getScamBySlug } from '@/lib/data';
import { getSupabase, isSupabaseConfigured, DbScam } from '@/lib/supabase';
import { Scam } from '@/types';

// Convert DB format to app format
function convertDbScamToScam(dbScam: DbScam): Scam {
  return {
    id: dbScam.id,
    title: dbScam.title,
    slug: dbScam.slug,
    category: dbScam.category,
    categorySlug: dbScam.category_slug,
    tags: dbScam.tags,
    severity: dbScam.severity,
    amountRange: dbScam.amount_range,
    scripts: dbScam.scripts,
    redFlags: dbScam.red_flags,
    cases: dbScam.cases,
    actions: dbScam.actions,
    sourceUrl: dbScam.source_url || undefined,
    sourceName: dbScam.source_name || undefined,
    publishedAt: dbScam.published_at,
    updatedAt: dbScam.updated_at,
    viewCount: dbScam.view_count,
    hotScore: dbScam.hot_score,
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');

  // Try Supabase first if configured
  const supabase = getSupabase();
  if (isSupabaseConfigured() && supabase) {
    try {
      if (slug) {
        const { data, error } = await supabase
          .from('scams')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error || !data) {
          return NextResponse.json({ error: 'Scam not found' }, { status: 404 });
        }

        return NextResponse.json({ scam: convertDbScamToScam(data as DbScam) });
      }

      const { data, error } = await supabase
        .from('scams')
        .select('*')
        .order('hot_score', { ascending: false });

      if (error) {
        throw error;
      }

      return NextResponse.json({
        scams: (data || []).map(d => convertDbScamToScam(d as DbScam))
      });
    } catch (err) {
      console.error('Supabase error:', err);
      // Fall through to seed data
    }
  }

  // Fallback to seed data
  if (slug) {
    const scam = getScamBySlug(slug);
    if (!scam) {
      return NextResponse.json({ error: 'Scam not found' }, { status: 404 });
    }
    return NextResponse.json({ scam });
  }

  const scams = getAllScams();
  return NextResponse.json({ scams });
}
