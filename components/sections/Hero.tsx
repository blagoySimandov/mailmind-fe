import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

export function Hero({ scrollToSection }: HeroProps) {
  return (
    <section id="hero" className="pt-32 pb-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Your AI Email Assistant for
          <span className="text-primary"> Smarter Communication</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Connect your Gmail account and let our AI handle your email communications with intelligence and precision.
          Save time, stay organized, and never miss important opportunities.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" onClick={() => scrollToSection("cta")}>
            Start Free Trial
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollToSection("features")}>
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}