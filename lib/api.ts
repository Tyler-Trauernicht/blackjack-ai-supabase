// /lib/api.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getOrCreateUser(clerkId: string, email: string) {
  const { data, error } = await supabase
    .from('users')
    .upsert({ clerk_user_id: clerkId, email }, { onConflict: 'clerk_user_id' });
  return { data, error };
}

export async function logHandResult({
  clerkId,
  playerHand,
  dealerCard,
  actionTaken,
  correctAction,
  result
}: {
  clerkId: string;
  playerHand: string[];
  dealerCard: string;
  actionTaken: string;
  correctAction: string;
  result: boolean;
}) {
  return await supabase.from('hand_history').insert([
    {
      clerk_user_id: clerkId,
      player_hand: playerHand.join(','),
      dealer_card: dealerCard,
      action_taken: actionTaken,
      correct_action: correctAction,
      result: result
    }
  ]);
}

export async function saveDrillSession({
  clerkId,
  totalHands,
  correctCount,
  submittedCount
}: {
  clerkId: string;
  totalHands: number;
  correctCount: number;
  submittedCount: number;
}) {
  return await supabase.from('drill_sessions').insert([
    {
      clerk_user_id: clerkId,
      total_hands: totalHands,
      correct_count: correctCount,
      submitted_count: submittedCount
    }
  ]);
}
