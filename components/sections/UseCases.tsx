import { Building2, Briefcase, Hospital, School } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UseCasesProps {
  scrollToSection: (sectionId: string) => void;
}

export function UseCases({ scrollToSection }: UseCasesProps) {
  const useCases = [
    {
      icon: Building2,
      title: "Property Managers",
      description: "Transform your rental property management with automated responses to common inquiries",
      benefits: [
        "Automated responses to rental inquiries and applications",
        "Smart filtering of maintenance requests by priority",
        "Automated rent payment reminders and confirmations",
        "Instant responses to common tenant questions 24/7",
      ],
      impact: "Process 500+ tenant emails daily",
    },
    {
      icon: Briefcase,
      title: "Recruiters & HR Teams",
      description: "Streamline your recruitment process with intelligent candidate screening and communication",
      benefits: [
        "Automated application acknowledgments and updates",
        "Smart candidate screening and qualification",
        "Automated interview scheduling and reminders",
        "Bulk candidate communication management",
      ],
      impact: "Handle 1000+ applications monthly",
    },
    {
      icon: Hospital,
      title: "Healthcare Providers",
      description: "Enhance patient communication while maintaining HIPAA compliance and personal touch",
      benefits: [
        "Automated appointment confirmations and reminders",
        "Prescription refill request processing",
        "Pre-visit instruction delivery",
        "Post-visit follow-up management",
      ],
      impact: "Manage 2000+ patient emails weekly",
    },
    {
      icon: School,
      title: "Educational Institutions",
      description: "Streamline admissions and student support with intelligent email automation",
      benefits: [
        "Automated admissions inquiry responses",
        "Smart routing of student support requests",
        "Deadline and important date reminders",
        "Bulk communication to students and parents",
      ],
      impact: "Process 3000+ student inquiries monthly",
    },
  ];

  return (
    <section id="useCases" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Who Uses MailMind?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            MailMind helps organizations handle large volumes of emails efficiently with 
            intelligent automation and personalized responses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <useCase.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-muted-foreground">{useCase.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Key Features:</h4>
                  <ul className="space-y-2">
                    {useCase.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm text-muted-foreground">Email Volume Handled</div>
                  <div className="font-semibold text-lg">{useCase.impact}</div>
                </div>
              </div>

              <div className="bg-muted/50 p-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Perfect for high-volume email management
                </span>
                <Button variant="secondary" size="sm" onClick={() => scrollToSection("contact")}>
                  Get Started
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Handle any volume of emails efficiently with MailMind's customizable automation platform.
          </p>
          <Button variant="outline" size="lg" onClick={() => scrollToSection("contact")}>
            Discuss Your Use Case
          </Button>
        </div>
      </div>
    </section>
  );
}