export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-invert max-w-none">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>Welcome to Blackjack AI Trainer!</p>
        <p>These terms and conditions outline the rules and regulations for the use of our application.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>By accessing this application, we assume you accept these terms and conditions. Do not continue to use Blackjack AI Trainer if you do not agree to take all of the terms and conditions stated on this page.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">2. License to Use</h2>
        <p>Unless otherwise stated, Blackjack AI Trainer and/or its licensors own the intellectual property rights for all material on Blackjack AI Trainer. All intellectual property rights are reserved. You may access this from Blackjack AI Trainer for your own personal use subjected to restrictions set in these terms and conditions.</p>
        <p>You must not:</p>
        <ul>
            <li>Republish material from Blackjack AI Trainer</li>
            <li>Sell, rent or sub-license material from Blackjack AI Trainer</li>
            <li>Reproduce, duplicate or copy material from Blackjack AI Trainer</li>
            <li>Redistribute content from Blackjack AI Trainer</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">3. User Accounts</h2>
        <p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password.</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitation of Liability</h2>
        <p>In no event shall Blackjack AI Trainer, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this application whether such liability is under contract. Blackjack AI Trainer, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this application.</p>

        <p className="mt-8">[This is a placeholder document. Please replace with your own Terms of Service.]</p>
      </div>
    </div>
  );
}
