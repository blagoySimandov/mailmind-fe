"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export function Navbar({ activeSection, scrollToSection }: NavbarProps) {
  const navItems = [
    { id: "hero", label: "Home" },
    { id: "features", label: "Features" },
    { id: "how-it-works", label: "How It Works" },
    { id: "useCases", label: "Use Cases" },
    { id: "pricing", label: "Pricing" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <Mail className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">MailMind</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === item.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <Button onClick={() => scrollToSection("contact")}>Contact Sales</Button>
        </div>
      </div>
    </nav>
  );
}