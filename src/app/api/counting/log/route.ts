import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import type { ClerkClient } from '@clerk/backend';
import { getSupabaseAdmin } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const { userId: clerk_user_id } = await auth();
    if (!clerk_user_id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { totalHands, correctCount, submittedCount } = body;

    const supabaseAdmin = getSupabaseAdmin();

    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('clerk_user_id', clerk_user_id)
      .single();

    let userId: string | null = existingUser?.id ?? null;
    if (!userId) {
      const cc = (clerkClient as unknown as () => Promise<ClerkClient>);
      const client = await cc();
      const clerkUser = await client.users.getUser(clerk_user_id);
      const email = clerkUser.emailAddresses[0]?.emailAddress || null;
      const { data: inserted, error: insertError } = await supabaseAdmin
        .from('users')
        .insert({ clerk_user_id, email, tier: 'free' })
        .select('id')
        .single();
      if (insertError) {
        console.error('Error creating user:', insertError);
        return new NextResponse('Failed to setup user', { status: 500 });
      }
      userId = inserted.id;
    }

    const { error: logError } = await supabaseAdmin.from('drill_sessions').insert({
      user_id: userId,
      count_type: 'Hi-Lo',
      total: totalHands,
      correct: correctCount,
      submitted_count: submittedCount,
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
