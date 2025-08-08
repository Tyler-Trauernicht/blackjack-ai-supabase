import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import type { ClerkClient } from '@clerk/backend';
import { getSupabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const { userId: clerk_user_id } = await auth();
    if (!clerk_user_id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

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

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { count, error: countError } = await supabaseAdmin
      .from('hand_history')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
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
