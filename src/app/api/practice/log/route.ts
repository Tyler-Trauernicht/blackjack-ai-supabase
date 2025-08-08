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
    const { playerHand, dealerCard, userAction, correctAction, result } = body;

    const supabase = createClient();

    // First, get the internal user ID from the clerk_user_id
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_user_id', clerk_user_id)
      .single();

    if (userError || !userData) {
      console.error('Error fetching user:', userError);
      return new NextResponse('User not found', { status: 404 });
    }

    // Now, insert into hand_history with the correct user_id
    const { error: logError } = await supabase.from('hand_history').insert({
      user_id: userData.id,
      player_hand: playerHand,
      dealer_card: dealerCard,
      user_action: userAction,
      correct_action: correctAction,
      result: result,
    });

    if (logError) {
      console.error('Error logging hand:', logError);
      return new NextResponse('Failed to log hand', { status: 500 });
    }

    return new NextResponse('Hand logged successfully', { status: 200 });
  } catch (error) {
    console.error('[PRACTICE_LOG_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
