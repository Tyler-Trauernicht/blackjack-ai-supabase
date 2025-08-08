import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <section className="text-center space-y-5 mb-12">
        <span className="inline-block text-xs tracking-widest text-blue-300/80 bg-blue-900/20 border border-blue-800/50 rounded-full px-3 py-1">Blackjack Training Suite</span>
        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-emerald-300">Master Basic Strategy, Counting, and Deviations</h1>
        <p className="text-neutral-300 max-w-2xl mx-auto">Interactive drills, beautiful charts, and pro-only training to sharpen your edge at the tables.</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/practice" className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow">Start Practicing</Link>
          <Link href="/pricing" className="px-6 py-3 rounded-xl bg-neutral-900/60 border border-neutral-700 text-neutral-100 font-semibold hover:bg-neutral-900">See Pricing</Link>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <Link href="/practice" className="group p-6 rounded-2xl border border-emerald-800/60 bg-gradient-to-br from-emerald-900/40 to-emerald-950/50 hover:border-emerald-600/70 transition-colors">
          <h3 className="text-2xl font-bold mb-2 text-white">Practice</h3>
          <p className="text-neutral-300 mb-3">Play random hands with instant feedback. Free users get 10 hands/day.</p>
          <div className="text-emerald-300 group-hover:text-emerald-200">Open →</div>
        </Link>

        <Link href="/charts" className="group p-6 rounded-2xl border border-blue-800/60 bg-gradient-to-br from-blue-900/30 to-blue-950/50 hover:border-blue-600/70 transition-colors">
          <h3 className="text-2xl font-bold mb-2 text-white">Charts</h3>
          <p className="text-neutral-300 mb-3">Study basic strategy and, with Pro, deviation indexes.</p>
          <div className="text-blue-300 group-hover:text-blue-200">Open →</div>
        </Link>

        <Link href="/counting" className="group p-6 rounded-2xl border border-purple-800/60 bg-gradient-to-br from-purple-900/30 to-purple-950/50 hover:border-purple-600/70 transition-colors">
          <h3 className="text-2xl font-bold mb-2 text-white">Counting Trainer</h3>
          <p className="text-neutral-300 mb-3">Hi‑Lo drills with accuracy feedback (Pro).</p>
          <div className="text-purple-300 group-hover:text-purple-200">Open →</div>
        </Link>

        <Link href="/deviations" className="group p-6 rounded-2xl border border-yellow-800/60 bg-gradient-to-br from-yellow-900/20 to-yellow-950/40 hover:border-yellow-600/70 transition-colors">
          <h3 className="text-2xl font-bold mb-2 text-white">Deviation Trainer</h3>
          <p className="text-neutral-300 mb-3">Practice true count deviations (Pro).</p>
          <div className="text-yellow-300 group-hover:text-yellow-200">Open →</div>
        </Link>
      </section>
    </div>
  );
}
