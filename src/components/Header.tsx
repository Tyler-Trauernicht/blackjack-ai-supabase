"use client";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-black/30 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">Blackjack AI</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/practice" className="hover:text-blue-400">Practice</Link>
          <Link href="/charts" className="hover:text-blue-400">Charts</Link>
          <Link href="/counting" className="hover:text-blue-400">Counting</Link>
          <Link href="/deviations" className="hover:text-blue-400">Deviations</Link>
          <Link href="/pricing" className="hover:text-blue-400 font-semibold">Pricing</Link>
        </nav>
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Sign in</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/user" className="text-sm text-blue-400 hover:underline">Billing</Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
} 