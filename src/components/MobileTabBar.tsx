'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type TabItem = {
  href: string;
  label: string;
  icon: (active: boolean) => ReactNode;
};

function HomeIcon(active: boolean) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-6 ${active ? 'text-white' : 'text-neutral-300'}`}
    >
      <path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

function PracticeIcon(active: boolean) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`h-6 w-6 ${active ? 'text-white' : 'text-neutral-300'}`}>
      <rect x="3" y="4" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="7" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6.5 8.5h0.01M17.5 11.5h0.01" stroke="currentColor" strokeLinecap="round"/>
    </svg>
  );
}

function CountingIcon(active: boolean) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`h-6 w-6 ${active ? 'text-white' : 'text-neutral-300'}`}>
      <path d="M13 3l-2 6h4l-4 12 2-8H9l4-10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

function DeviationsIcon(active: boolean) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`h-6 w-6 ${active ? 'text-white' : 'text-neutral-300'}`}>
      <path d="M4 17l5-10 4 8 3-6 4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 20h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function ChartsIcon(active: boolean) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`h-6 w-6 ${active ? 'text-white' : 'text-neutral-300'}`}>
      <path d="M5 12v7M12 7v12M19 3v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

const tabs: TabItem[] = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/practice', label: 'Practice', icon: PracticeIcon },
  { href: '/counting', label: 'Counting', icon: CountingIcon },
  { href: '/deviations', label: 'Deviations', icon: DeviationsIcon },
  { href: '/charts', label: 'Charts', icon: ChartsIcon },
];

export default function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-t border-neutral-800">
      <div className="mx-auto max-w-6xl">
        <ul className="grid grid-cols-5 gap-1 px-2 py-2">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <li key={tab.href} className="flex">
                <Link
                  href={tab.href}
                  className={`flex-1 flex items-center justify-center rounded-xl py-2 ${active ? 'bg-white/10 border border-white/15 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]' : 'hover:bg-white/5'}`}
                  aria-label={tab.label}
                >
                  {tab.icon(active)}
                  <span className="sr-only">{tab.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="h-[calc(env(safe-area-inset-bottom))]" aria-hidden="true" />
    </nav>
  );
} 