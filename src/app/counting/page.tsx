import CountTrainingWindow from "@/components/CountTrainingWindow";
import { isProUser } from "@/lib/user";
import Link from "next/link";

const UpgradePrompt = () => (
  <div className="text-center p-8 bg-neutral-900/60 rounded-2xl border border-neutral-800 max-w-2xl mx-auto">
    <h3 className="text-2xl font-bold text-white mb-4">This is a Pro Feature</h3>
    <p className="text-neutral-300 mb-6">Upgrade to Pro to access the Card Counting Trainer and other advanced features.</p>
    <Link href="/pricing" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg">Upgrade to Pro</Link>
  </div>
);

export default async function CountingPage() {
  const isPro = await isProUser();

  if (!isPro) {
    return (
      <div className="max-w-6xl mx-auto">
        <section className="text-center space-y-4 mb-8">
          <span className="inline-block text-xs tracking-widest text-purple-300/80 bg-purple-900/20 border border-purple-800/50 rounded-full px-3 py-1">Hi‑Lo Trainer</span>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-white to-blue-300">Card Counting Training</h1>
          <p className="text-neutral-300 max-w-2xl mx-auto">Practice keeping a running count at adjustable speeds and sequence lengths.</p>
        </section>
        <UpgradePrompt />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <section className="text-center space-y-4 mb-8">
        <span className="inline-block text-xs tracking-widest text-purple-300/80 bg-purple-900/20 border border-purple-800/50 rounded-full px-3 py-1">Hi‑Lo Trainer</span>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-white to-blue-300">Card Counting Training</h1>
        <p className="text-neutral-300 max-w-2xl mx-auto">Choose sequence length and speed, then submit your final count.</p>
      </section>
      <CountTrainingWindow />
    </div>
  );
}
