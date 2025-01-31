"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

interface NavbarProps {
  activeSection: string;
}

export function Navbar({ activeSection }: NavbarProps) {
  const navItems = [
    { id: "hero", label: "Home" },
    { id: "features", label: "Features" },
    { id: "how-it-works", label: "How It Works" },
    { id: "useCases", label: "Use Cases" },
    { id: "pricing", label: "Pricing" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/90 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#hero" className="flex items-center space-x-2">
            <Image
              src="/static/logo-no-background.png"
              alt="MailMind Logo"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
          </a>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-sm font-medium hover:text-primary ${
                  activeSection === item.id
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}>
                {item.label}
              </a>
            ))}
          </div>
          <a href="#contact">
            <Button>Contact Sales</Button>
          </a>
        </div>
      </div>
    </nav>
  );
}
