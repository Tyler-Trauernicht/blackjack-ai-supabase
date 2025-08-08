import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const { userId: clerk_user_id } = auth();
    if (!clerk_user_id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

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

    // Get the timestamp for 24 hours ago
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    // Count hands played in the last 24 hours
    const { count, error: countError } = await supabase
      .from('hand_history')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userData.id)
      .gte('created_at', twentyFourHoursAgo);

    if (countError) {
      console.error('Error counting hands:', countError);
      return new NextResponse('Failed to retrieve usage data', { status: 500 });
    }

    return NextResponse.json({ count: count ?? 0 });
  } catch (error) {
    console.error('[PRACTICE_USAGE_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
