export default function PrivacyPage() {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>Your privacy is important to us. It is Blackjack AI Trainer&apos;s policy to respect your privacy regarding any information we may collect from you across our application.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
          <p>The only personal information we collect is your email address upon signing up, which is managed securely by our authentication provider, Clerk.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect in order to:</p>
          <ul>
            <li>Provide, operate, and maintain our application</li>
            <li>Improve, personalize, and expand our application</li>
            <li>Understand and analyze how you use our application</li>
            <li>Communicate with you for customer service, to provide you with updates and other information relating to the application</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Log Data</h2>
          <p>We log your game results and drill performance to help you track your progress and to help us improve our services. This data is linked to your user account but is not shared with third parties.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Security</h2>
          <p>The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

          <p className="mt-8">[This is a placeholder document. Please replace with your own Privacy Policy.]</p>
        </div>
      </div>
    );
  }
