import PracticeWindow from "@/components/PracticeWindow";

export default function PracticePage() {
  return (
    <div className="max-w-6xl mx-auto">
      <section className="text-center space-y-4 mb-8">
        <span className="inline-block text-xs tracking-widest text-emerald-300/80 bg-emerald-900/20 border border-emerald-800/50 rounded-full px-3 py-1">Basic Strategy</span>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-white to-blue-300">Practice Hands with Instant Feedback</h1>
        <p className="text-neutral-300 max-w-2xl mx-auto">Sharpen decisions against random dealers. Free users get 10 hands/day; Pro is unlimited.</p>
      </section>
      <PracticeWindow />
    </div>
  );
}
