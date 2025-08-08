import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto py-6 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} Blackjack AI Trainer. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link>
          <Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
          <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 