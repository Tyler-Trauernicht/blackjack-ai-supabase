import { auth } from '@clerk/nextjs/server';

export async function isProUser(): Promise<boolean> {
  const { has } = await auth();
  return Boolean(has?.({ plan: 'pro' }));
} 