"use client";

import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "../components/ScrollReveal";
import {
  Map,
  MessageSquare,
  Database,
  Bot,
  Server,
  GraduationCap,
  ArrowRight,
  Clock,
} from "lucide-react";
import Image from "next/image";

const services = [
  {
    icon: Map,
    title: "AI Strategy & Roadmapping",
    description:
      "Navigate the AI landscape with confidence. We assess your current state, identify high-impact opportunities, and build a practical roadmap to value.",
    link: "#",
  },
  {
    icon: MessageSquare,
    title: "LLM Application Development",
    description:
      "Build production-grade applications on top of large language models. From chatbots to document processing, we create systems that scale.",
    link: "#",
  },
  {
    icon: Database,
    title: "RAG System Implementation",
    description:
      "Unlock the value in your unstructured data with retrieval-augmented generation. Connect your documents to AI in a secure, scalable way.",
    link: "#",
  },
  {
    icon: Bot,
    title: "Agentic AI Systems",
    description:
      "Deploy autonomous agents that can reason, plan, and execute complex workflows. From research assistants to process automation.",
    link: "#",
  },
  {
    icon: Server,
    title: "MLOps & Production Infrastructure",
    description:
      "Production-ready infrastructure for model serving, monitoring, and scaling. CI/CD, observability, and cost optimization included.",
    link: "#",
  },
  {
    icon: GraduationCap,
    title: "Team Training & Handover",
    description:
      "Comprehensive knowledge transfer that sticks. Your team will own the solution, understand the system, and can evolve it independently.",
    link: "#",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative py-24 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/services-abstract.webp"
          alt="Abstract interconnected modules visualization"
          fill
          quality={85}
          loading="lazy"
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#0a0a0f]/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase mb-4 block">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            What We Deliver
          </h2>
          <p className="text-lg text-[#a1a1aa] max-w-2xl mx-auto">
            End-to-end AI capabilities from strategy through production. Every
            engagement includes knowledge transfer—we do not do black boxes.
          </p>
        </ScrollReveal>

        {/* Services Grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.1}
        >
          {services.map((service, index) => (
            <StaggerItem key={index}>
              <div className="group h-full">
                <div className="h-full bg-[#12121a] rounded-2xl p-8 border border-white/5 transition-all duration-300 hover:border-[#00d4ff]/30 hover:bg-[#1a1a24] relative overflow-hidden">
                  {/* Glow effect */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00d4ff]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-[#1a1a24] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#00d4ff]/30 group-hover:bg-[#00d4ff]/10 transition-all duration-300">
                      <service.icon className="w-6 h-6 text-[#00d4ff]" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00d4ff] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-[#a1a1aa] leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Coming Soon Button */}
                    <button
                      className="inline-flex items-center gap-2 text-sm text-[#71717a] font-medium cursor-not-allowed"
                      disabled
                      aria-label="Service details coming soon"
                    >
                      <Clock className="w-4 h-4" />
                      <span>Coming Soon</span>
                    </button>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
