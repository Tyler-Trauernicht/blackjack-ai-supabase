import DeviationsWindow from "@/components/DeviationsWindow";
import { isProUser } from "@/lib/user";
import Link from "next/link";

const UpgradePrompt = () => (
  <div className="text-center p-8 bg-neutral-900/60 rounded-2xl border border-neutral-800 max-w-2xl mx-auto">
    <h3 className="text-2xl font-bold text-white mb-4">This is a Pro Feature</h3>
    <p className="text-neutral-300 mb-6">Upgrade to Pro to access the Deviation Trainer and other advanced features.</p>
    <Link href="/pricing" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg">Upgrade to Pro</Link>
  </div>
);

export default async function DeviationsPage() {
  const isPro = await isProUser();

  if (!isPro) {
    return (
      <div className="max-w-6xl mx-auto">
        <section className="text-center space-y-4 mb-8">
          <span className="inline-block text-xs tracking-widest text-yellow-300/80 bg-yellow-900/20 border border-yellow-700/50 rounded-full px-3 py-1">Deviation Training</span>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-white to-emerald-300">True Count Deviations</h1>
          <p className="text-neutral-300 max-w-2xl mx-auto">Learn when to deviate from basic strategy based on the true count.</p>
        </section>
        <UpgradePrompt />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <section className="text-center space-y-4 mb-8">
        <span className="inline-block text-xs tracking-widest text-yellow-300/80 bg-yellow-900/20 border border-yellow-700/50 rounded-full px-3 py-1">Deviation Training</span>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-white to-emerald-300">True Count Deviations</h1>
        <p className="text-neutral-300 max-w-2xl mx-auto">Answer scenarios correctly at given true counts and log your results.</p>
      </section>
      <DeviationsWindow />
    </div>
  );
}
