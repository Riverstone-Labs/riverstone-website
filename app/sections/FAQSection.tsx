"use client";

import { useState } from "react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../components/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, ArrowRight } from "lucide-react";

const faqItems = [
  {
    question: "How long does a typical AI implementation take?",
    answer:
      "Most implementations run 6-12 weeks depending on complexity. Strategy and roadmap engagements are 2-4 weeks. We'll give you a clear timeline after our initial discovery call.",
  },
  {
    question: "What's the typical investment for AI implementation?",
    answer:
      "Projects start from $15,000 for focused implementations. Full transformation programs range $50,000-$200,000+. We offer retainers from $10,000/month for ongoing optimization. Every engagement is scoped to your specific ROI targets.",
  },
  {
    question: "Do you work with businesses our size?",
    answer:
      "We work with businesses from $2M to $100M+ revenue. What matters more than size is readiness — leadership commitment, data availability, and willingness to invest in real change. Book a call to see if we're a fit.",
  },
  {
    question: "What happens after you hand over the system?",
    answer:
      "You own everything — code, documentation, training materials. We provide 30 days of support post-handover and offer ongoing retainer packages if you want continued optimization. Our goal is to make ourselves unnecessary.",
  },
  {
    question: "Do we need technical expertise in-house?",
    answer:
      "Not initially. We work with your existing team at their level. By the end of the engagement, your team will have the skills to maintain and extend what we've built. If you have no technical team, we can recommend trusted partners.",
  },
  {
    question: "What if the AI doesn't deliver the results we expected?",
    answer:
      "We scope every engagement with clear success metrics and checkpoints. If we're not hitting targets, we adjust the approach. We've never had a client not see ROI — because we're selective about who we work with.",
  },
  {
    question: "How do we get started?",
    answer:
      "Book a free 30-minute strategy call. We'll assess your AI opportunities, discuss your goals, and determine if we're the right fit. No hard sell — just honest advice on what's possible for your business.",
  },
  {
    question: "Why do you only take 4-6 clients per year?",
    answer:
      "Real AI transformation requires deep engagement. We embed with your teams, understand your constraints, and build systems that actually work. This isn't scalable consulting — it's hands-on implementation. Quality over quantity.",
  },
];

export function FAQSection() {
  const [leftValue, setLeftValue] = useState<string[]>([]);
  const [rightValue, setRightValue] = useState<string[]>([]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // Split FAQ items into two columns
  const leftColumn = faqItems.slice(0, 4);
  const rightColumn = faqItems.slice(4);

  return (
    <section id="faq" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Questions? We Have Answers
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Common questions about working with Riverstone Labs
          </p>
        </ScrollReveal>

        {/* FAQ Grid - Two Columns on Desktop */}
        <StaggerContainer
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          staggerDelay={0.1}
        >
          {/* Left Column */}
          <StaggerItem>
            <Accordion 
              value={leftValue} 
              onValueChange={setLeftValue}
              className="space-y-4"
            >
              {leftColumn.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`left-${index}`}
                  className="bg-[#111111] border border-gray-800 rounded-lg px-6 [&[data-open]]:border-[#00d4ff]/50 transition-all duration-300"
                >
                  <AccordionTrigger className="text-white hover:text-[#00d4ff] hover:no-underline py-5 text-left">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-[#00d4ff] shrink-0" />
                      <span className="text-base font-medium">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 text-sm leading-relaxed pl-8">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </StaggerItem>

          {/* Right Column */}
          <StaggerItem>
            <Accordion 
              value={rightValue} 
              onValueChange={setRightValue}
              className="space-y-4"
            >
              {rightColumn.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`right-${index}`}
                  className="bg-[#111111] border border-gray-800 rounded-lg px-6 [&[data-open]]:border-[#00d4ff]/50 transition-all duration-300"
                >
                  <AccordionTrigger className="text-white hover:text-[#00d4ff] hover:no-underline py-5 text-left">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-[#00d4ff] shrink-0" />
                      <span className="text-base font-medium">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 text-sm leading-relaxed pl-8">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </StaggerItem>
        </StaggerContainer>

        {/* CTA */}
        <ScrollReveal delay={0.4} className="text-center mt-16">
          <button
            onClick={() => scrollToSection("contact")}
            className="inline-flex items-center gap-2 bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-[#0a0a0a] px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:gap-3"
          >
            Still have questions? Book a Strategy Call
            <ArrowRight className="w-5 h-5" />
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
