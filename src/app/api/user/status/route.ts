import { NextResponse } from 'next/server';
import { isProUser } from '@/lib/user';

export async function GET() {
  try {
    const isPro = await isProUser();
    return NextResponse.json({ isPro });
  } catch (error) {
    console.error('[USER_STATUS_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
