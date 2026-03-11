"use client";

import { useState } from "react";
import { ScrollReveal } from "../components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Send, AlertCircle } from "lucide-react";

// Input sanitization helper
const sanitizeInput = (value: string): string => {
  return value
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 1000);
};

export function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    maturity: "",
    website: "", // Honeypot field
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Honeypot check
    if (formData.website) {
      console.log("Honeypot triggered - possible bot submission");
      return;
    }

    // Validate inputs
    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim() || !formData.message.trim()) {
      setFormError("Please fill in all required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          maturity: formData.maturity,
          website: formData.website,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
      } else {
        setFormError(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizeInput(value),
    }));
  };

  return (
    <section id="contact" className="py-24 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Value Proposition */}
          <ScrollReveal>
            <div>
              <span className="text-[#6b9b7a] text-sm font-medium tracking-wider uppercase mb-4 block">
                Get Started
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f0] mb-6">
                Start with a conversation
              </h2>
              <p className="text-lg text-[#a0a0a0] leading-relaxed mb-8">
                We don&apos;t do sales calls. We do discovery sessions — 30 minutes to understand your context and determine if there&apos;s a fit. No pitch deck required.
              </p>
              
              <div className="space-y-4">
                <p className="text-[#a0a0a0]">
                  <span className="text-[#f5f5f0] font-medium">Or email directly:</span>
                  <br />
                  <a 
                    href="mailto:warwick@riverstone.ai" 
                    className="text-[#6b9b7a] hover:underline"
                  >
                    warwick@riverstone.ai
                  </a>
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column - Contact Form */}
          <ScrollReveal delay={0.2}>
            <Card className="bg-[#242424] border-[#333333]">
              <CardContent className="p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[#4a7c59]/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-[#6b9b7a]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#f5f5f0] mb-2">
                      Thanks — we&apos;ll be in touch within 24 hours
                    </h3>
                    <p className="text-[#a0a0a0]">
                      We&apos;ve received your message and will respond shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot field */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <Input
                        id="website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.website}
                        onChange={handleChange}
                      />
                    </div>

                    {formError && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-[#f5f5f0] mb-2"
                        >
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          maxLength={100}
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="bg-[#1a1a1a] border-[#333333] text-[#f5f5f0] placeholder:text-[#6b6b6b] focus:border-[#4a7c59]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-[#f5f5f0] mb-2"
                        >
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          maxLength={100}
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          className="bg-[#1a1a1a] border-[#333333] text-[#f5f5f0] placeholder:text-[#6b6b6b] focus:border-[#4a7c59]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-[#f5f5f0] mb-2"
                      >
                        Company *
                      </label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        required
                        maxLength={100}
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company"
                        className="bg-[#1a1a1a] border-[#333333] text-[#f5f5f0] placeholder:text-[#6b6b6b] focus:border-[#4a7c59]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="maturity"
                        className="block text-sm font-medium text-[#f5f5f0] mb-2"
                      >
                        Current AI maturity
                      </label>
                      <select
                        id="maturity"
                        name="maturity"
                        value={formData.maturity}
                        onChange={handleChange}
                        className="w-full h-10 px-3 rounded-md bg-[#1a1a1a] border border-[#333333] text-[#f5f5f0] focus:border-[#4a7c59] focus:outline-none focus:ring-1 focus:ring-[#4a7c59]"
                      >
                        <option value="">Select an option</option>
                        <option value="exploring">Exploring</option>
                        <option value="piloting">Piloting</option>
                        <option value="scaling">Scaling</option>
                        <option value="stuck">Stuck</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-[#f5f5f0] mb-2"
                      >
                        What are you trying to solve? *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        maxLength={1000}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your challenges and goals..."
                        rows={4}
                        className="bg-[#1a1a1a] border-[#333333] text-[#f5f5f0] placeholder:text-[#6b6b6b] focus:border-[#4a7c59] resize-none"
                      />
                      <p className="text-xs text-[#6b6b6b] mt-1 text-right">
                        {formData.message.length}/1000
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#4a7c59] hover:bg-[#5a8c69] text-[#f5f5f0] font-semibold py-6 rounded-sm transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Request a discovery session
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
