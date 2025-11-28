import { PublicLayout } from '@/components/layouts/PublicLayout';

export default function TermsPage() {
  return (
    <PublicLayout>
      <div className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-sm text-muted-foreground mb-8">
              Last updated: November 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Sinopia's platform, you agree to be bound by these Terms of Service 
                and all applicable laws and regulations. If you do not agree with any of these terms, you 
                are prohibited from using or accessing this platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. User Accounts</h2>
              <p>
                When you create an account with us, you must provide accurate, complete, and current information. 
                You are responsible for safeguarding the password and for all activities that occur under your account.
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>You must be at least 18 years old to use this platform</li>
                <li>You may not use another person's account without permission</li>
                <li>You are responsible for maintaining the confidentiality of your login credentials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Service Description</h2>
              <p>
                Sinopia provides a marketplace platform connecting skill givers (freelancers and professionals) 
                with skill searchers (companies and individuals seeking talent). We facilitate the connection 
                but are not party to agreements made between users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Payments and Fees</h2>
              <p>
                Sinopia charges a service fee for successful transactions. All fees are clearly disclosed 
                before any transaction is completed. Payment processing is handled by secure third-party 
                payment processors.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. User Conduct</h2>
              <p>Users agree not to:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Post false, misleading, or fraudulent content</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Attempt to circumvent our payment system</li>
                <li>Use the platform for any illegal purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Intellectual Property</h2>
              <p>
                The platform, including its original content, features, and functionality, is owned by 
                Sinopia and protected by international copyright, trademark, and other intellectual 
                property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
              <p>
                Sinopia shall not be liable for any indirect, incidental, special, consequential, or 
                punitive damages resulting from your use of or inability to use the platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Information</h2>
              <p>
                For any questions about these Terms of Service, please contact us at legal@sinopia.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
