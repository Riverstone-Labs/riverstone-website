"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  {
    name: "Starter",
    price: "$2,500",
    period: "/month",
    description: "Perfect for businesses beginning their AI journey",
    features: [
      "AI readiness assessment",
      "Basic automation setup",
      "Monthly performance reports",
      "Email support",
      "1 AI use case implementation",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "$5,000",
    period: "/month",
    description: "Full AI transformation for growing businesses",
    features: [
      "Everything in Starter",
      "Custom ML model development",
      "Process automation suite",
      "Priority support",
      "3 AI use cases",
      "Quarterly strategy reviews",
      "Data analytics dashboard",
    ],
    cta: "Most Popular",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored solutions for large organizations",
    features: [
      "Everything in Professional",
      "Unlimited AI use cases",
      "Dedicated AI team",
      "24/7 priority support",
      "Custom integrations",
      "On-premise deployment options",
      "Executive reporting",
    ],
    cta: "Contact Us",
    popular: false,
  },
];

export function Pricing() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Our Packages
            </h2>
            <p className="text-lg text-[#a1a1aa] max-w-2xl mx-auto">
              Flexible pricing to match your business needs
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className={`relative bg-[#1a1a1a] p-8 rounded-2xl border ${
                  plan.popular ? "border-[#10b981]" : "border-[#27272a]"
                } transition-all h-full flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[#10b981] text-[#0a0a0a] px-4 py-1 rounded-full text-sm font-semibold">
                      Recommended
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-[#71717a] text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-[#71717a]">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-start gap-3 text-[#a1a1aa]"
                    >
                      <CheckCircle
                        size={18}
                        className="text-[#10b981] mt-0.5 flex-shrink-0"
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={scrollToContact}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? "bg-[#10b981] hover:bg-[#059669] text-[#0a0a0a]"
                      : "border border-[#27272a] hover:border-[#10b981] bg-transparent text-white hover:bg-transparent"
                  }`}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
