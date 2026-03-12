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

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
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
    if (!formData.name.trim() || !formData.email.trim() || !formData.company.trim()) {
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

    // Log to console (MVP requirement)
    console.log("Lead Form Submission:", {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      message: formData.message,
      submittedAt: new Date().toISOString(),
    });

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error);
      setFormError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizeInput(value),
    }));
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Value Proposition */}
          <ScrollReveal>
            <div>
              <span className="text-[#3b82f6] text-sm font-medium tracking-wider uppercase mb-4 block">
                Get Started
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Actually Use AI in Your Business?
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                Book a free 30-minute strategy call. No hard sell — just honest advice on what&apos;s possible for your business.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#3b82f6] shrink-0 mt-0.5" />
                  <span className="text-gray-300">Free 30-minute strategy session</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#3b82f6] shrink-0 mt-0.5" />
                  <span className="text-gray-300">Honest assessment of AI opportunities</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#3b82f6] shrink-0 mt-0.5" />
                  <span className="text-gray-300">Clear next steps — no obligation</span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-[#111111] rounded-lg border border-gray-800">
                <p className="text-gray-400 text-sm">
                  <span className="text-white font-medium">Prefer to email?</span>
                  <br />
                  <a 
                    href="mailto:hello@riverstonelabs.com.au" 
                    className="text-[#3b82f6] hover:underline"
                  >
                    hello@riverstonelabs.com.au
                  </a>
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column - Contact Form */}
          <ScrollReveal delay={0.2}>
            <Card className="bg-[#111111] border-gray-800">
              <CardContent className="p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[#3b82f6]/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-[#3b82f6]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Thanks! We&apos;ll be in touch within 24 hours.
                    </h3>
                    <p className="text-gray-400">
                      We&apos;ve received your message and will respond shortly to schedule your strategy call.
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
                          className="block text-sm font-medium text-white mb-2"
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
                          className="bg-[#0a0a0a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#3b82f6]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-white mb-2"
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
                          className="bg-[#0a0a0a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#3b82f6]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-white mb-2"
                        >
                          Phone
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          maxLength={50}
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Your phone (optional)"
                          className="bg-[#0a0a0a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#3b82f6]"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-medium text-white mb-2"
                        >
                          Company Name *
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
                          className="bg-[#0a0a0a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#3b82f6]"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-white mb-2"
                      >
                        Message / Requirements
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        maxLength={1000}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your challenges and goals..."
                        rows={4}
                        className="bg-[#0a0a0a] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#3b82f6] resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1 text-right">
                        {formData.message.length}/1000
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold py-6 rounded-sm transition-all duration-300 disabled:opacity-50"
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
                          Book My Strategy Call
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
