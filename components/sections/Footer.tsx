import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/50 py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <a href="#hero" className="inline-block">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">MailMind</span>
            </div>
          </a>
          <p className="text-muted-foreground">
            Intelligent email automation for modern businesses.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a href="#features" className="hover:text-primary">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-primary">
                Pricing
              </a>
            </li>
            <li>
              <a href="#useCases" className="hover:text-primary">
                Use Cases
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a href="#contact" className="hover:text-primary">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <a href="/terms" className="hover:text-primary">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
