import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTAProps {
  scrollToSection: (sectionId: string) => void;
}

export function CTA({ scrollToSection }: CTAProps) {
  return (
    <section id="cta" className="py-16 px-4 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="bg-primary-foreground/10 p-4 rounded-full">
            <Mail className="h-8 w-8" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-6">Ready to See MailMind in Action?</h2>
        <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
          Get a personalized demo and see how MailMind can transform your email communication. 
          Our team will show you exactly how it works with your specific use case.
        </p>
        <Button 
          size="lg" 
          variant="secondary"
          onClick={() => scrollToSection("contact")}
        >
          Request Your Custom Demo
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}