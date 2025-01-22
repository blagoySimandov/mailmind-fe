import { ArrowRight, Settings, Mail, Zap, BrainCircuit } from "lucide-react";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Get started with MailMind in four simple steps
        </p>
        
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 hidden lg:block" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              {
                step: "1",
                icon: Mail,
                title: "Connect Gmail",
                description: "Securely link your Gmail account with OAuth2 authentication",
              },
              {
                step: "2",
                icon: BrainCircuit,
                title: "Train Your AI",
                description: "Provide knowledge base and set response preferences",
              },
              {
                step: "3",
                icon: Settings,
                title: "Configure Rules",
                description: "Set up filtering rules and automation workflows",
              },
              {
                step: "4",
                icon: Zap,
                title: "Go Live",
                description: "Activate your AI assistant and monitor performance",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-background p-6 rounded-lg border relative z-10">
                  <div className="absolute -top-4 left-6 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <step.icon className="h-12 w-12 text-primary mb-4 mt-2" />
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < 3 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-muted-foreground z-20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}