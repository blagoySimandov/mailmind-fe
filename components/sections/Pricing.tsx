import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Pricing() {
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
          <h2 className="text-3xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free during early access. Choose the right plan for your needs
            when we launch.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                <div className="text-3xl font-bold mb-4">{plan.price}</div>
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
                <a href="#contact">
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}>
                    Get Early Access
                  </Button>
                </a>
                <p className="mt-3 text-xs text-center text-muted-foreground">
                  Free during early access
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
