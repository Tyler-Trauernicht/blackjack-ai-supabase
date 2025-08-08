import { auth } from '@clerk/nextjs/server';

/**
 * Checks if the current user has the "pro" tier.
 * Reads the custom 'tier' claim from the Clerk JWT.
 *
 * @returns {Promise<boolean>} - True if the user is a pro user, false otherwise.
 */
export async function isProUser(): Promise<boolean> {
  const { sessionClaims } = auth();
  return sessionClaims?.tier === 'pro';
}
