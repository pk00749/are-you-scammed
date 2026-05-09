import { NextRequest, NextResponse } from 'next/server';
import { getAllScams, getScamBySlug } from '@/lib/data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');

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
