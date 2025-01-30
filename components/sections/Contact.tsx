"use client";

import { useState } from "react";
import { Mail, ArrowRight, Building, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    industry: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit form");
      }

      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        industry: "",
        message: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section id="contact" className="py-16 bg-muted/50 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Contact Our Sales Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your email communication? Fill out the form below
            and our team will create a custom demo tailored to your
            organization's needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-8">
              <div className="bg-background p-6 rounded-lg border">
                <h3 className="font-semibold text-xl mb-4">What to Expect</h3>
                <ul className="space-y-4">
                  {[
                    "Custom demo of MailMind tailored to your industry",
                    "Detailed discussion of your specific use cases",
                    "Enterprise solutions and integration options",
                    "Transparent pricing based on your needs",
                    "Clear implementation timeline and process",
                    "ROI analysis for your organization",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Direct Contact</h3>
                    <p className="text-muted-foreground">sales@mailmind.com</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Prefer to email us directly? Our sales team typically responds
                  within 2 business hours.
                </p>
              </Card>
            </div>
          </div>

          <Card className="p-6">
            {success ? (
              <div className="text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Thank You!</h3>
                <p className="text-muted-foreground">
                  We've received your message and will get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-6">
                  Request Your Custom Demo
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        First Name*
                      </label>
                      <Input
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Last Name*
                      </label>
                      <Input
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Work Email*
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Company*
                    </label>
                    <Input
                      name="company"
                      placeholder="Company Name"
                      icon={Building}
                      value={formData.company}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Industry*
                    </label>
                    <select
                      name="industry"
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      value={formData.industry}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}>
                      <option value="">Select your industry</option>
                      <option value="property">Property Management</option>
                      <option value="recruiting">Recruiting & HR</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Tell us about your needs*
                    </label>
                    <Textarea
                      name="message"
                      placeholder="What are your main email communication challenges? How many emails do you handle monthly?"
                      className="min-h-[120px]"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button
                    className="w-full"
                    size="lg"
                    type="submit"
                    disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Get Your Custom Demo"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    We'll get back to you within 24 hours
                  </p>
                </form>
              </>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
