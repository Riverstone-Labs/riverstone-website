"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../components/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

const caseStudies = [
  {
    client: "Fortune 500 Financial Services",
    industry: "Financial Services",
    challenge:
      "Processing 10,000+ compliance documents monthly with a team of 50 analysts",
    solution:
      "RAG-powered document analysis system with automated classification",
    results: [
      "90% reduction in processing time",
      "$2.4M annual cost savings",
      "99.2% accuracy rate",
    ],
  },
  {
    client: "Global Retail Chain",
    industry: "Retail",
    challenge:
      "Inventory forecasting across 2,000+ locations with seasonal volatility",
    solution: "Custom forecasting models with external data integration",
    results: [
      "25% reduction in stockouts",
      "18% decrease in excess inventory",
      "$3.2M inventory optimization",
    ],
  },
];

const testimonials = [
  {
    quote:
      "Riverstone Labs did not just build us an AI system—they built our AI capability. Six months later, our team is shipping features independently.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechScale Inc.",
  },
  {
    quote:
      "The difference with Riverstone is they actually understand business context. Our previous vendor delivered a technically impressive demo that solved the wrong problem.",
    author: "Michael Rodriguez",
    role: "VP of Operations",
    company: "LogiFlow Systems",
  },
  {
    quote:
      "Best consulting engagement we have ever had. Clear communication, on-time delivery, and a team that actually transferred knowledge instead of hoarding it.",
    author: "Jennifer Park",
    role: "Head of Data Science",
    company: "HealthFirst Analytics",
  },
];

export function Proof() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section id="proof" className="relative py-24 bg-[#12121a] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/proof-transformation.webp"
          alt="Abstract transformation and growth visualization"
          fill
          quality={85}
          loading="lazy"
          className="object-cover opacity-15"
          sizes="100vw"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#12121a]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase mb-4 block">
            Proof of Value
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Results That Speak
          </h2>
          <p className="text-lg text-[#a1a1aa] max-w-2xl mx-auto">
            Real outcomes from real engagements. We measure success by the
            business results we deliver, not just the code we ship.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Case Studies */}
          <ScrollReveal>
            <h3 className="text-2xl font-bold text-white mb-6">Case Studies</h3>
            <div className="space-y-6">
              {caseStudies.map((study, index) => (
                <Card
                  key={index}
                  className="bg-[#0a0a0f] border-white/5 hover:border-[#00d4ff]/30 transition-colors duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-white">
                          {study.client}
                        </h4>
                        <Badge
                          variant="secondary"
                          className="mt-1 bg-[#1a1a24] text-[#a1a1aa] border-none"
                        >
                          {study.industry}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-[#71717a] font-medium">
                          Challenge:
                        </span>
                        <p className="text-[#a1a1aa] mt-1">{study.challenge}</p>
                      </div>
                      <div>
                        <span className="text-[#71717a] font-medium">
                          Solution:
                        </span>
                        <p className="text-[#a1a1aa] mt-1">{study.solution}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5">
                      <div className="grid grid-cols-3 gap-4">
                        {study.results.map((result, i) => (
                          <div key={i} className="text-center">
                            <div className="text-xs text-[#71717a]">
                              {result}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollReveal>

          {/* Testimonials */}
          <ScrollReveal delay={0.2}>
            <h3 className="text-2xl font-bold text-white mb-6">
              Client Testimonials
            </h3>
            <div className="relative">
              <Card className="bg-[#0a0a0f] border-white/5 min-h-[320px]">
                <CardContent className="p-8 flex flex-col justify-center h-full">
                  <Quote className="w-10 h-10 text-[#00d4ff]/30 mb-6" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1"
                    >
                      <p className="text-lg text-[#a1a1aa] leading-relaxed mb-8 italic">
                        &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                      </p>

                      <div>
                        <div className="font-semibold text-white">
                          {testimonials[currentTestimonial].author}
                        </div>
                        <div className="text-sm text-[#71717a]">
                          {testimonials[currentTestimonial].role},{" "}
                          {testimonials[currentTestimonial].company}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                    <div className="flex gap-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            index === currentTestimonial
                              ? "bg-[#00d4ff]"
                              : "bg-white/20"
                          }`}
                          aria-label={`Go to testimonial ${index + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={prevTestimonial}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#a1a1aa] hover:text-white hover:border-[#00d4ff]/30 transition-colors duration-300"
                        aria-label="Previous testimonial"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextTestimonial}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#a1a1aa] hover:text-white hover:border-[#00d4ff]/30 transition-colors duration-300"
                        aria-label="Next testimonial"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
