import { Webhook } from 'svix'
import { headers } from 'next/headers'
import type { WebhookEvent, UserJSON } from '@clerk/nextjs/server'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', { status: 400 })
  }

  if (evt.type === 'user.created') {
    const data = evt.data as UserJSON;
    const id = data.id;
    const email = data.email_addresses?.[0]?.email_address ?? null;
    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin.from('users').insert({ clerk_user_id: id, email, tier: 'free' });
    if (error) {
      console.error('Error inserting user:', error.message);
      return new Response('Error occured', { status: 500 })
    }
  }

  return new Response('', { status: 200 })
}
