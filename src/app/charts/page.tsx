import ChartsWindow from "@/components/ChartsWindow";

export default function ChartsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <section className="text-center space-y-4 mb-8">
        <span className="inline-block text-xs tracking-widest text-blue-300/80 bg-blue-900/20 border border-blue-800/50 rounded-full px-3 py-1">Reference Charts</span>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-emerald-300">Study Basic Strategy & Deviations</h1>
        <p className="text-neutral-300 max-w-2xl mx-auto">Hard/soft/pairs charts for all, plus Pro-only deviation table unlocked with your plan.</p>
      </section>
      <ChartsWindow />
    </div>
  );
}
