import { NextRequest, NextResponse } from 'next/server';
import { getAllScams } from '@/lib/data';
import { searchScams, SearchOptions } from '@/lib/search';
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
  const query = searchParams.get('q') || '';
  const sort = searchParams.get('sort') as SearchOptions['sortBy'] || 'relevance';
  const tag = searchParams.get('tag');

  // Decode URI component for Chinese characters
  const decodedQuery = decodeURIComponent(query);

  let allScams: Scam[] = [];

  // Try Supabase first if configured
  const supabase = getSupabase();
  if (isSupabaseConfigured() && supabase) {
    try {
      let dbQuery = supabase
        .from('scams')
        .select('*');

      // Apply tag filter if specified
      if (tag) {
        dbQuery = dbQuery.contains('tags', [tag]);
      }

      // Apply sorting
      if (sort === 'recent') {
        dbQuery = dbQuery.order('published_at', { ascending: false });
      } else if (sort === 'hotScore') {
        dbQuery = dbQuery.order('hot_score', { ascending: false });
      }

      const { data, error } = await dbQuery;

      if (error) {
        throw error;
      }

      allScams = (data || []).map(d => convertDbScamToScam(d as DbScam));
    } catch (err) {
      console.error('Supabase search error:', err);
      // Fall through to seed data
      allScams = getAllScams();
    }
  } else {
    // Use seed data
    allScams = getAllScams();
    if (tag) {
      allScams = allScams.filter(scam => scam.tags.includes(tag));
    }
  }

  // Search and sort
  const options: SearchOptions = {
    query: decodedQuery,
    sortBy: sort as SearchOptions['sortBy'],
  };

  const results = searchScams(allScams, options);

  return NextResponse.json({
    results: results.map(r => ({
      scam: r.scam,
      matchScore: r.matchScore,
      matchedFields: r.matchedFields,
    })),
    total: results.length,
    query,
    sort,
  });
}
