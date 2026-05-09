import { NextRequest, NextResponse } from 'next/server';
import { getAllScams } from '@/lib/data';
import { searchScams, SearchOptions } from '@/lib/search';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const sort = searchParams.get('sort') as SearchOptions['sortBy'] || 'relevance';
  const tag = searchParams.get('tag');

  const allScams = getAllScams();

  // Filter by tag if specified
  let scams = allScams;
  if (tag) {
    scams = allScams.filter(scam => scam.tags.includes(tag));
  }

  // Search and sort
  const options: SearchOptions = {
    query,
    sortBy: sort as SearchOptions['sortBy'],
  };

  const results = searchScams(scams, options);

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
