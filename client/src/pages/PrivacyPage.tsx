import { PublicLayout } from '@/components/layouts/PublicLayout';

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <div className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-sm text-muted-foreground mb-8">
              Last updated: November 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, 
                update your profile, or communicate with us. This includes:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Name, email address, and contact information</li>
                <li>Profile information including skills, experience, and portfolio</li>
                <li>Payment and billing information</li>
                <li>Communications and correspondence with us</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Match skill givers with skill searchers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Information Sharing</h2>
              <p>
                We may share information about you as follows:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>With other users as part of your public profile</li>
                <li>With service providers who assist in our operations</li>
                <li>In response to legal requests or to protect our rights</li>
                <li>In connection with a merger or acquisition</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Security</h2>
              <p>
                We take reasonable measures to help protect information about you from loss, theft, 
                misuse, and unauthorized access. All data is encrypted in transit and at rest.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Cookies</h2>
              <p>
                We use cookies and similar technologies to collect information about your browsing 
                activities. You can control cookies through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Changes to This Policy</h2>
              <p>
                We may change this privacy policy from time to time. If we make changes, we will 
                notify you by revising the date at the top of the policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@sinopia.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
