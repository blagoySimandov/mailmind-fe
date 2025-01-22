"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { UseCases } from "@/components/sections/UseCases";
import { Contact } from "@/components/sections/Contact";
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    // Create an intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
        rootMargin: "0px",
      }
    );

    // Observe all sections
    [
      "hero",
      "features",
      "how-it-works",
      "useCases",
      "pricing",
      "contact",
      "cta",
    ].forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeSection={activeSection} />
      <Hero />
      <Features />
      <HowItWorks />
      <UseCases />
      <Pricing />
      <Contact />
      <CTA />
      <Footer />
    </div>
  );
}
