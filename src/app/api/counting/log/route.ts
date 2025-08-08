import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const { userId: clerk_user_id } = auth();
    if (!clerk_user_id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { totalHands, correctCount, submittedCount } = body;

    const supabase = createClient();

    // Get the internal user ID
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_user_id', clerk_user_id)
      .single();

    if (userError || !userData) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Insert into drill_sessions
    const { error: logError } = await supabase.from('drill_sessions').insert({
      user_id: userData.id,
      count_type: 'Hi-Lo',
      total: totalHands,
      correct: correctCount,
      submitted_count: submittedCount, // The schema has a submitted_count column
    });

    if (logError) {
      console.error('Error logging drill session:', logError);
      return new NextResponse('Failed to log session', { status: 500 });
    }

    return new NextResponse('Session logged successfully', { status: 200 });
  } catch (error) {
    console.error('[COUNTING_LOG_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
