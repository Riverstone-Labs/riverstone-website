"use client";

import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Footer } from "../sections/Footer";
import { ScrollReveal } from "../components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle, 
  Send, 
  AlertCircle,
  Mail,
  MapPin,
  Clock
} from "lucide-react";

// Input sanitization helper
const sanitizeInput = (value: string): string => {
  return value
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 1000);
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "hello@riverstonelabs.com.au",
    href: "mailto:hello@riverstonelabs.com.au",
  },
  {
    icon: MapPin,
    title: "Location",
    content: "Brisbane, Australia",
    href: null,
  },
  {
    icon: Clock,
    title: "Response Time",
    content: "Within 24 hours",
    href: null,
  },
];

export default function ContactPage() {
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

    try {
      // Submit to lead API
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
          website: "",
        });
      } else {
        setFormError(data.error || "Something went wrong. Please try again.");
      }
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
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0a0a0a] pt-20">
        {/* Hero Section */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center max-w-3xl mx-auto">
              <span className="text-[#3b82f6] text-sm font-medium tracking-wider uppercase mb-4 block">
                Contact Us
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                Let&apos;s Talk About Your AI Needs
              </h1>
              <p className="text-xl text-gray-400">
                Book a free 30-minute strategy call or send us a message. We&apos;ll get back to you within 24 hours.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-[#111111]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1">
                <ScrollReveal>
                  <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
                  <p className="text-gray-400 mb-8">
                    Prefer to reach out directly? Here&apos;s how you can contact us.
                  </p>

                  <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center shrink-0">
                          <item.icon className="w-5 h-5 text-[#3b82f6]" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">{item.title}</p>
                          {item.href ? (
                            <a 
                              href={item.href}
                              className="text-white hover:text-[#3b82f6] transition-colors duration-200"
                            >
                              {item.content}
                            </a>
                          ) : (
                            <p className="text-white">{item.content}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-[#0a0a0a] rounded-lg border border-gray-800">
                    <h3 className="text-lg font-semibold text-white mb-2">What happens next?</h3>
                    <ol className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-start gap-2">
                        <span className="text-[#3b82f6] font-medium">1.</span>
                        We&apos;ll review your message within 24 hours
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#3b82f6] font-medium">2.</span>
                        Schedule a free 30-minute strategy call
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#3b82f6] font-medium">3.</span>
                        Get honest advice on your AI opportunities
                      </li>
                    </ol>
                  </div>
                </ScrollReveal>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <ScrollReveal delay={0.2}>
                  <Card className="bg-[#0a0a0a] border-gray-800">
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
                                className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#3b82f6]"
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
                                className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#3b82f6]"
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
                                className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#3b82f6]"
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
                                className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#3b82f6]"
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
                              rows={5}
                              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500 focus:border-[#3b82f6] resize-none"
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
          </div>
        </section>

        {/* Alternative Contact */}
        <section className="py-24 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <h2 className="text-2xl font-bold text-white mb-4">
                Prefer to Email Directly?
              </h2>
              <p className="text-gray-400 mb-6">
                That works too. Send us a message and we&apos;ll get back to you within 24 hours.
              </p>
              <a 
                href="mailto:hello@riverstonelabs.com.au"
                className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-[#60a5fa] transition-colors duration-200 font-medium"
              >
                <Mail className="w-5 h-5" />
                hello@riverstonelabs.com.au
              </a>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
