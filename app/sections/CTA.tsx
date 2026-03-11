"use client";

import { useState, useEffect } from "react";
import { ScrollReveal } from "../components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Send, Users, Sparkles, AlertCircle } from "lucide-react";

// Input sanitization helper
const sanitizeInput = (value: string): string => {
  return value
    .replace(/[<>]/g, "") // Remove < and > to prevent HTML injection
    .trim()
    .slice(0, 1000); // Limit length
};

export function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    website: "", // Honeypot field - should remain empty
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  // Newsletter form state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);

  // Fetch CSRF token on mount
  useEffect(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        if (data.csrfToken) {
          setCsrfToken(data.csrfToken);
        }
      })
      .catch((err) => console.error("Failed to fetch CSRF token:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    // Honeypot check - if this field is filled, it's likely a bot
    if (formData.website) {
      console.log("Honeypot triggered - possible bot submission");
      return;
    }

    // Validate inputs
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
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
          website: formData.website,
          csrfToken: csrfToken,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        // Fetch new CSRF token for next submission
        fetch("/api/contact")
          .then((res) => res.json())
          .then((data) => {
            if (data.csrfToken) {
              setCsrfToken(data.csrfToken);
            }
          });
      } else {
        setFormError(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizeInput(value),
    }));
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      return;
    }

    setNewsletterSubmitting(true);

    // Simulate subscription (implement real newsletter API later)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setNewsletterSubmitting(false);
    setNewsletterSubmitted(true);
    setNewsletterEmail("");
  };

  return (
    <section id="cta" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-[#00d4ff]/10 to-transparent rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase mb-4 block">
            Get Started
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Make AI Work?
          </h2>
          <p className="text-lg text-[#a1a1aa] max-w-2xl mx-auto">
            Book a free 30-minute assessment. We will discuss your challenges,
            evaluate opportunities, and outline a path forward—no commitment
            required.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ScrollReveal>
            <Card className="bg-[#12121a] border-white/5">
              <CardContent className="p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-[#a1a1aa]">
                      Thank you for reaching out. We will get back to you within
                      24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot field - hidden from users, visible to bots */}
                    <div
                      className="absolute opacity-0 pointer-events-none"
                      aria-hidden="true"
                    >
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
                          placeholder="John Doe"
                          className="bg-[#0a0a0f] border-white/10 text-white placeholder:text-[#71717a] focus:border-[#00d4ff]/50"
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
                          placeholder="john@company.com"
                          className="bg-[#0a0a0f] border-white/10 text-white placeholder:text-[#71717a] focus:border-[#00d4ff]/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-white mb-2"
                      >
                        Company
                      </label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        maxLength={100}
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                        className="bg-[#0a0a0f] border-white/10 text-white placeholder:text-[#71717a] focus:border-[#00d4ff]/50"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-white mb-2"
                      >
                        Tell us about your project *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        maxLength={1000}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="What challenges are you facing? What are your goals?"
                        rows={4}
                        className="bg-[#0a0a0f] border-white/10 text-white placeholder:text-[#71717a] focus:border-[#00d4ff]/50 resize-none"
                      />
                      <p className="text-xs text-[#71717a] mt-1 text-right">
                        {formData.message.length}/1000
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-[#0a0a0f] font-semibold py-6 rounded-full glow-blue transition-all duration-300 disabled:opacity-50"
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
                          Book Free Assessment
                        </span>
                      )}
                    </Button>

                    <p className="text-xs text-[#71717a] text-center">
                      We respect your privacy. No spam, ever.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Right Column - Newsletter & Social Proof */}
          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              {/* Social Proof */}
              <Card className="bg-[#12121a] border-white/5">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d4ff]/30 to-[#f59e0b]/30 border-2 border-[#12121a] flex items-center justify-center"
                        >
                          <Users className="w-4 h-4 text-white/70" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        50+ Companies Helped
                      </div>
                      <div className="text-xs text-[#71717a]">
                        Across 12 industries
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <div className="text-2xl font-bold text-white">4.9/5</div>
                      <div className="text-xs text-[#71717a]">
                        Average client rating
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">95%</div>
                      <div className="text-xs text-[#71717a]">
                        Would recommend
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="bg-gradient-to-br from-[#1a1a24] to-[#12121a] border-[#00d4ff]/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center shrink-0">
                      <Sparkles className="w-6 h-6 text-[#00d4ff]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        AI Insights Newsletter
                      </h3>
                      <p className="text-sm text-[#a1a1aa] mb-4">
                        Weekly insights on AI strategy, implementation patterns,
                        and industry trends.
                      </p>

                      {newsletterSubmitted ? (
                        <div className="flex items-center gap-2 text-green-400 text-sm">
                          <CheckCircle className="w-4 h-4" />
                          <span>Thanks for subscribing!</span>
                        </div>
                      ) : (
                        <form
                          onSubmit={handleNewsletterSubmit}
                          className="flex gap-2"
                        >
                          <Input
                            type="email"
                            name="newsletter-email"
                            placeholder="Enter your email"
                            aria-label="Email address for newsletter subscription"
                            required
                            maxLength={100}
                            value={newsletterEmail}
                            onChange={(e) =>
                              setNewsletterEmail(sanitizeInput(e.target.value))
                            }
                            className="bg-[#0a0a0f] border-white/10 text-white placeholder:text-[#71717a] focus:border-[#00d4ff]/50 text-sm"
                          />
                          <Button
                            type="submit"
                            size="sm"
                            disabled={newsletterSubmitting}
                            className="bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-[#0a0a0f] font-semibold shrink-0 disabled:opacity-50"
                          >
                            {newsletterSubmitting ? "..." : "Subscribe"}
                          </Button>
                        </form>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="border-white/10 text-[#71717a]"
                >
                  <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                  No Obligation
                </Badge>
                <Badge
                  variant="outline"
                  className="border-white/10 text-[#71717a]"
                >
                  <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                  24hr Response
                </Badge>
                <Badge
                  variant="outline"
                  className="border-white/10 text-[#71717a]"
                >
                  <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                  Confidential
                </Badge>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
