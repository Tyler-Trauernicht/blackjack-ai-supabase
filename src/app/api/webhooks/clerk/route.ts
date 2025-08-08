import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent, clerkClient } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

async function updateUserTier(clerkUserId: string, tier: 'pro' | 'free') {
    // Update Clerk public metadata
    await clerkClient.users.updateUserMetadata(clerkUserId, {
        publicMetadata: { tier }
    });

    // Update Supabase users table
    const { error: supabaseError } = await supabaseAdmin
        .from('users')
        .update({ tier })
        .eq('clerk_user_id', clerkUserId);

    if (supabaseError) {
        throw new Error(`Failed to update user tier in Supabase for ${clerkUserId}: ${supabaseError.message}`);
    }
}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', { status: 400 })
  }

  const payload: WebhookEvent = await req.json()
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

  const eventType = evt.type;
  console.log(`Received webhook event: ${eventType}`);

  try {
    switch (eventType) {
        case 'user.created': {
            const { id, email_addresses } = evt.data;
            const email = email_addresses[0]?.email_address;
            await supabaseAdmin.from('users').insert({ clerk_user_id: id, email: email, tier: 'free' });
            break;
        }

        case 'checkout.session.completed': {
            const session = evt.data;
            const clerkUserId = session.client_reference_id;
            if (!clerkUserId) {
                throw new Error('No client_reference_id in checkout session');
            }
            // Check if payment was successful
            if (session.payment_status === 'paid') {
                await updateUserTier(clerkUserId, 'pro');
            }
            break;
        }

        case 'customer.subscription.deleted': {
            const subscription = evt.data;
            const clerkUserId = subscription.client_reference_id;
             if (!clerkUserId) {
                throw new Error('No client_reference_id in subscription');
            }
            await updateUserTier(clerkUserId, 'free');
            break;
        }
    }
  } catch (error: any) {
      console.error(`Error handling webhook ${eventType}:`, error.message);
      return new Response('Error occured', { status: 500 });
  }

  return new Response('', { status: 200 })
}
