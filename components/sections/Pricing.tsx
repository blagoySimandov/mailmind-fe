import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { SignUpDialog } from "@/components/SignUpDialog";
import Image from "next/image";

export function Pricing() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const plans = [
    {
      name: "Basic",
      price: "$19/mo",
      features: [
        "Up to 500 emails/month",
        "Basic email automation",
        "Standard response templates",
        "Email support",
      ],
    },
    {
      name: "Pro",
      price: "$39/mo",
      popular: true,
      features: [
        "Up to 2,000 emails/month",
        "Advanced automation rules",
        "Custom response templates",
        "Priority inbox management",
        "Email support",
      ],
    },
    {
      name: "Business",
      price: "$89/mo",
      features: [
        "Up to 5,000 emails/month",
        "Custom automation workflows",
        "Team collaboration",
        "API access",
        "Email support",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/static/logo-no-background.png"
              alt="MailMind Logo"
              width={200}
              height={50}
              className="h-12 w-auto"
            />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free during early access. Choose the right plan for your needs
            when we launch.
          </p>
        </div>
        <div className="relative max-w-5xl mx-auto">
          {/* Early Access Banner */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div
              className="bg-primary/90 text-primary-foreground text-4xl font-black py-4 px-8 rotate-[-20deg] shadow-lg"
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}>
              FREE DURING EARLY ACCESS!
            </div>
          </div>

          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-[1] -translate-y-10" />

          <div className="grid md:grid-cols-3 gap-8 relative">
            {plans.map((plan, index) => (
              <div key={index} className="relative">
                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <span className="bg-primary text-primary-foreground px-4 py-1 text-sm rounded-full shadow-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <Card
                  className={`p-6 ${
                    plan.popular ? "border-primary ring-1 ring-primary" : ""
                  }`}>
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-4 line-through decoration-primary decoration-2 blur-[8px] opacity-50">
                    {plan.price}
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-muted-foreground">
                        <CheckCircle className="h-5 w-5 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => setIsDialogOpen(true)}>
                    Get Early Access
                  </Button>
                  <p className="mt-3 text-xs text-center text-muted-foreground">
                    Free during early access
                  </p>
                </Card>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center relative z-20">
            <p className="text-2xl font-bold mb-6">
              🚀 Join Now and Get Premium Features for Free!
            </p>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Early access members will be grandfathered into special pricing
              when we launch. Don't miss this opportunity!
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={() => setIsDialogOpen(true)}>
              Secure Your Free Access Now
            </Button>
          </div>
        </div>
      </div>
      <SignUpDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  );
}
