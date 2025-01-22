import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$49/mo",
      features: [
        "Up to 1,000 emails/month",
        "Basic email automation",
        "Standard response templates",
        "Email analytics",
        "8/5 support",
      ],
    },
    {
      name: "Professional",
      price: "$99/mo",
      popular: true,
      features: [
        "Up to 5,000 emails/month",
        "Advanced automation rules",
        "Custom response templates",
        "Priority inbox management",
        "Advanced analytics",
        "24/7 priority support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited emails",
        "Custom automation workflows",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
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
                    Contact Sales
                  </Button>
                </a>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
