import { Mail } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Mail className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">MailMind</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to MailMind. By using our service, you agree to these
              terms. Please read them carefully.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              2. Using our Services
            </h2>
            <p className="text-muted-foreground mb-4">
              You must follow any policies made available to you within the
              Services. You may use our Services only as permitted by law. We
              may suspend or stop providing our Services to you if you do not
              comply with our terms or policies or if we are investigating
              suspected misconduct.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              3. Your MailMind Account
            </h2>
            <p className="text-muted-foreground mb-4">
              To use MailMind, you may need to create an account. You are
              responsible for maintaining the security of your account and the
              activities that occur under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Data Processing</h2>
            <p className="text-muted-foreground mb-4">
              Our service processes emails and other data you provide to deliver
              automated responses and email management. By using our service,
              you grant us the necessary rights to process this data according
              to our service functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              5. Service Modifications
            </h2>
            <p className="text-muted-foreground mb-4">
              We are constantly changing and improving our Services. We may add
              or remove functionalities or features, and we may suspend or stop
              a Service altogether.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
            <p className="text-muted-foreground mb-4">
              You can stop using our Services at any time. We may also terminate
              or suspend access to our Services if we reasonably believe you
              have violated these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Liability</h2>
            <p className="text-muted-foreground mb-4">
              When permitted by law, MailMind and its suppliers and distributors
              will not be responsible for lost profits, revenues, or data,
              financial losses, or indirect, special, consequential, exemplary,
              or punitive damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about these Terms, please contact us at{" "}
              <a
                href="mailto:blagoy@simandoff.com"
                className="text-primary hover:underline">
                blagoy@simandoff.com
              </a>
            </p>
          </section>

          <div className="mt-12 text-sm text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
