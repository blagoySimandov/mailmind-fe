import { Building2, Briefcase, Hospital, School } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function UseCases() {
  const useCases = [
    {
      icon: Building2,
      title: "Property Management",
      description: "Automate tenant communications and maintenance requests",
      benefits: [
        "Automated response to maintenance requests",
        "Tenant screening and application processing",
        "Rent payment reminders and follow-ups",
        "Property viewing scheduling automation",
      ],
      impact: "Handle 5000+ tenant inquiries monthly",
    },
    {
      icon: Briefcase,
      title: "Recruiting & HR",
      description: "Streamline candidate communication and HR processes",
      benefits: [
        "Automated application acknowledgments",
        "Interview scheduling assistance",
        "Candidate status updates",
        "Employee onboarding communication",
      ],
      impact: "Process 2000+ applications monthly",
    },
    {
      icon: Hospital,
      title: "Healthcare",
      description: "Enhance patient communication and appointment management",
      benefits: [
        "Appointment reminders and rescheduling",
        "Patient follow-up automation",
        "Medical record request handling",
        "Insurance verification assistance",
      ],
      impact: "Manage 10000+ patient emails monthly",
    },
    {
      icon: School,
      title: "Educational Institutions",
      description:
        "Streamline admissions and student support with intelligent email automation",
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
            MailMind helps organizations handle large volumes of emails
            efficiently with intelligent automation and personalized responses.
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
                    <h3 className="text-2xl font-semibold mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {useCase.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Key Features:</h4>
                  <ul className="space-y-2">
                    {useCase.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    Email Volume Handled
                  </div>
                  <div className="font-semibold text-lg">{useCase.impact}</div>
                </div>
              </div>
              <div className="bg-muted/50 p-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Perfect for high-volume email management
                </span>
                <a href="#contact">
                  <Button variant="secondary" size="sm">
                    Get Started
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Handle any volume of emails efficiently with MailMind's customizable
            automation platform.
          </p>
          <a href="#contact">
            <Button variant="outline" size="lg">
              Discuss Your Use Case
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
