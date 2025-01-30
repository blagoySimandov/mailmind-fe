"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignUpDialog } from "@/components/SignUpDialog";

export function Hero() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section id="hero" className="pt-32 pb-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/5 border-primary/10 border">
            <Sparkles className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium">
              Early Access: Try MailMind Free
            </span>
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Your AI Email Assistant for
          <span className="text-primary"> Smarter Communication</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
          Connect your Gmail account and let our AI handle your email
          communications with intelligence and precision. Save time, stay
          organized, and never miss important opportunities.
        </p>
        <p className="text-primary font-medium mb-8">
          Join our early access program and be among the first to experience
          MailMind for free!
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" onClick={() => setIsDialogOpen(true)}>
            Get Early Access
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <a href="#features">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </a>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          ✨ Limited spots available for our early access program
        </p>
      </div>
      <SignUpDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  );
}
