"use client";

import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { UseCases } from "@/components/sections/UseCases";
import { Contact } from "@/components/sections/Contact";
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

// Throttle function to limit how often a function can be called
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const sections = [
    "hero",
    "features",
    "how-it-works",
    "useCases",
    "pricing",
    "contact",
    "cta",
  ];

  // Memoize the scroll handler
  const handleScroll = useCallback(() => {
    let currentSection = activeSection;
    const viewportMiddle = window.innerHeight / 2;

    // Use a for loop instead of find for better performance
    for (let i = 0; i < sections.length; i++) {
      const element = document.getElementById(sections[i]);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= viewportMiddle) {
          currentSection = sections[i];
          break;
        }
      }
    }

    if (currentSection !== activeSection) {
      setActiveSection(currentSection);
    }
  }, [activeSection]);

  useEffect(() => {
    // Throttle scroll events to fire at most once every 100ms
    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [handleScroll]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      <Features />
      <HowItWorks />
      <UseCases scrollToSection={scrollToSection} />
      <Pricing scrollToSection={scrollToSection} />
      <Contact />
      <CTA scrollToSection={scrollToSection} />
      <Footer />
    </div>
  );
}
