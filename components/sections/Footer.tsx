import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/50 py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Mail className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MailMind</span>
          </div>
          <p className="text-muted-foreground">
            Intelligent email automation for modern businesses.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>Features</li>
            <li>Pricing</li>
            <li>Use Cases</li>
            <li>Security</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>About</li>
            <li>Blog</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}