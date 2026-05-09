import { NextRequest, NextResponse } from 'next/server';
import { getSupabase, isSupabaseConfigured, DbContribution } from '@/lib/supabase';
import { validateContribution } from '@/lib/contributions';
import { Contribution } from '@/types';

// Convert DB format to app format
function convertDbContributionToContribution(db: DbContribution): Contribution {
  return {
    id: db.id,
    category: db.category,
    scripts: db.scripts,
    amount: db.amount,
    description: db.description || undefined,
    status: db.status,
    createdAt: db.created_at,
    reviewedAt: db.reviewed_at || undefined,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, scripts, amount, description } = body;

    // Validate
    const validation = validateContribution({ category, scripts, amount, description });
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors.join(', ') },
        { status: 400 }
      );
    }

    // Try Supabase first if configured
    const supabase = getSupabase();
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('contributions')
          .insert({
            category,
            scripts,
            amount,
            description: description || null,
            status: 'pending',
          })
          .select()
          .single();

        if (error) {
          throw error;
        }

        return NextResponse.json({
          success: true,
          contribution: convertDbContributionToContribution(data as DbContribution),
          message: 'Contribution submitted successfully',
        });
      } catch (err) {
        console.error('Supabase error:', err);
        // Fall through to localStorage fallback
      }
    }

    // Fallback: create contribution with mock ID (localStorage in client)
    const contribution: Contribution = {
      id: crypto.randomUUID(),
      category,
      scripts,
      amount,
      description: description,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      contribution,
      message: 'Contribution submitted successfully (local storage mode)',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

export async function GET() {
  // Try Supabase first if configured
  const supabase = getSupabase();
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('contributions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return NextResponse.json({
        contributions: (data || []).map(d => convertDbContributionToContribution(d as DbContribution)),
      });
    } catch (err) {
      console.error('Supabase error:', err);
    }
  }

  // Fallback: return empty
  return NextResponse.json({
    contributions: [],
    message: 'Running in local storage mode. Configure Supabase for persistent storage.',
  });
}
