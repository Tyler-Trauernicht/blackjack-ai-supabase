// This endpoint is deprecated in favor of Clerk Billing PricingTable.
// Keeping it returning 410 Gone for any accidental calls.
import { NextResponse } from 'next/server';

export async function POST() {
  return new NextResponse('Deprecated', { status: 410 });
} 