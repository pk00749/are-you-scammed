import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, scripts, amount, description } = body;

    // Validate required fields
    if (!category || !scripts || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: category, scripts, amount' },
        { status: 400 }
      );
    }

    // Create contribution (in production, this would save to database)
    const contribution = {
      id: crypto.randomUUID(),
      category,
      scripts,
      amount,
      description: description || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // In a real app, we would save to Supabase here
    // For now, just return success
    return NextResponse.json({
      success: true,
      contribution,
      message: 'Contribution submitted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}

export async function GET() {
  // Return empty list for now - in production this would query the database
  return NextResponse.json({
    contributions: [],
    message: 'Contributions listing coming soon',
  });
}
