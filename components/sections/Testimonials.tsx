import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Property Manager",
      company: "Urban Living Properties",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      content: "MailMind has transformed how we handle tenant inquiries. Our response time has decreased by 80%, and tenant satisfaction has never been higher.",
    },
    {
      name: "Michael Chen",
      role: "Technical Recruiter",
      company: "TechTalent Solutions",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      content: "The AI's ability to screen candidates and provide detailed summaries has saved our team countless hours. It's like having an extra team member.",
    },
    {
      name: "Emily Rodriguez",
      role: "Admissions Director",
      company: "Evergreen University",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      content: "Managing student inquiries has never been easier. MailMind helps us provide quick, accurate responses to common questions while maintaining a personal touch.",
    },
  ];

  return (
    <section id="testimonials" className="py-16 bg-muted/50 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12">
                  <img src={testimonial.image} alt={testimonial.name} />
                </Avatar>
                <div className="ml-4">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">&ldquo;{testimonial.content}&rdquo;</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}