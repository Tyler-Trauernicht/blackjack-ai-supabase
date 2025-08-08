"use client";

import { PricingTable } from '@clerk/nextjs';

export default function PricingPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Pricing</h1>
      <PricingTable />
    </div>
  );
} 