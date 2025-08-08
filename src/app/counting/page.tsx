import CountTrainingWindow from "@/components/CountTrainingWindow";
import { isProUser } from "@/lib/user";
import Link from "next/link";

const UpgradePrompt = () => (
  <div className="text-center p-8 bg-gray-800 rounded-lg max-w-2xl mx-auto">
    <h3 className="text-2xl font-bold text-white mb-4">This is a Pro Feature</h3>
    <p className="text-gray-400 mb-6">Upgrade to Pro to access the Card Counting Trainer and other advanced features.</p>
    <Link href="/pricing" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
      Upgrade to Pro
    </Link>
  </div>
);

export default async function CountingPage() {
  const isPro = await isProUser();

  if (!isPro) {
    return <UpgradePrompt />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">Card Counting Trainer</h1>
      <CountTrainingWindow />
    </div>
  );
}
