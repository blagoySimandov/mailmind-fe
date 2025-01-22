import { Bot, BrainCircuit, CheckCircle, Zap, Shield, Clock } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Bot,
      title: "Smart Responses",
      description: "AI-powered email responses that maintain your tone and style while handling routine inquiries efficiently.",
    },
    {
      icon: BrainCircuit,
      title: "Contextual Memory",
      description: "Train your AI assistant with specific knowledge and context to provide accurate, personalized responses.",
    },
    {
      icon: CheckCircle,
      title: "Smart Filtering",
      description: "Automatically vet and prioritize important emails, creating organized summaries and action items.",
    },
    {
      icon: Zap,
      title: "Quick Setup",
      description: "Get started in minutes with our intuitive setup process and pre-built templates.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security ensures your emails and data remain private and protected.",
    },
    {
      icon: Clock,
      title: "24/7 Operation",
      description: "Your AI assistant works around the clock, ensuring no email goes unanswered.",
    },
  ];

  return (
    <section id="features" className="py-16 bg-muted/50 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Powerful Features</h2>
        <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Everything you need to automate and enhance your email communication
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4 p-6 rounded-lg hover:bg-background/50 transition-colors">
              <feature.icon className="h-8 w-8 text-primary shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}