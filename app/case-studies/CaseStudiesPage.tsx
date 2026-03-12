"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight,
  TrendingUp,
  Clock,
  Users,
  Zap,
  CheckCircle
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const caseStudies = [
  {
    id: "ecommerce",
    client: "TechVenture AU",
    industry: "E-commerce",
    title: "AI-Powered Customer Service Automation",
    description: "Implemented an intelligent customer service system that handles 70% of inquiries automatically, freeing human agents to focus on complex issues.",
    challenge: "Customer service team was overwhelmed with repetitive inquiries, leading to slow response times and high staff turnover.",
    solution: "Deployed a custom AI system that understands customer intent, accesses order history, and resolves common issues without human intervention.",
    results: [
      { metric: "60%", label: "Reduction in response time" },
      { metric: "70%", label: "Inquiries handled automatically" },
      { metric: "$180k", label: "Annual cost savings" }
    ],
    tags: ["Customer Service", "NLP", "Automation"],
    color: "#00D4AA"
  },
  {
    id: "manufacturing",
    client: "GrowthForce",
    industry: "Manufacturing",
    title: "Predictive Maintenance System",
    description: "Built a predictive maintenance platform that anticipates equipment failures before they happen, minimizing downtime and maintenance costs.",
    challenge: "Unplanned equipment downtime was costing $50k per incident, and maintenance was reactive rather than proactive.",
    solution: "Developed ML models that analyze sensor data to predict failures 7-14 days in advance, enabling scheduled maintenance.",
    results: [
      { metric: "85%", label: "Reduction in unplanned downtime" },
      { metric: "40%", label: "Decrease in maintenance costs" },
      { metric: "$300k", label: "First-year savings" }
    ],
    tags: ["IoT", "Predictive Analytics", "Manufacturing"],
    color: "#7C3AED"
  },
  {
    id: "retail",
    client: "RetailMax",
    industry: "Retail",
    title: "Dynamic Pricing Optimization",
    description: "Created an AI-driven pricing engine that adjusts prices in real-time based on demand, inventory, and competitor analysis.",
    challenge: "Static pricing was leaving money on the table—either pricing too low during high demand or too high when competitors were cheaper.",
    solution: "Built a real-time pricing engine that processes market data and automatically adjusts prices within defined guardrails.",
    results: [
      { metric: "12%", label: "Increase in profit margins" },
      { metric: "23%", label: "Revenue growth" },
      { metric: "5min", label: "Price update frequency" }
    ],
    tags: ["Pricing", "Real-time Analytics", "Retail"],
    color: "#00D4AA"
  }
];

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-[#1A1A2E]/50 to-[#0A0A0F]" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Case <span className="text-gradient">Studies</span>
            </h1>
            <p className="text-[#A0A0B0] text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
              Real results from real businesses. See how we&apos;ve helped Australian companies 
              implement AI that delivers measurable ROI.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                id={study.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#12121A] border border-[#2A2A3E] rounded-3xl overflow-hidden"
              >
                {/* Header */}
                <div 
                  className="px-8 py-6 border-b border-[#2A2A3E]"
                  style={{ backgroundColor: `${study.color}08` }}
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{ backgroundColor: `${study.color}20`, color: study.color }}
                    >
                      {study.industry}
                    </span>
                    <span className="text-[#A0A0B0]">{study.client}</span>
                  </div>
                </div>
                
                <div className="p-8 lg:p-12">
                  <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left Column */}
                    <div>
                      <h2 
                        className="text-2xl lg:text-3xl font-bold mb-4"
                        style={{ fontFamily: "var(--font-sora)" }}
                      >
                        {study.title}
                      </h2>
                      <p className="text-[#A0A0B0] mb-8 leading-relaxed">
                        {study.description}
                      </p>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-400" />
                            The Challenge
                          </h4>
                          <p className="text-[#A0A0B0] pl-4">{study.challenge}</p>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#00D4AA]" />
                            Our Solution
                          </h4>
                          <p className="text-[#A0A0B0] pl-4">{study.solution}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-8">
                        {study.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-3 py-1 bg-[#0A0A0F] border border-[#2A2A3E] rounded-full text-sm text-[#A0A0B0]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Right Column - Results */}
                    <div>
                      <h3 
                        className="text-xl font-bold mb-6 flex items-center gap-2"
                        style={{ fontFamily: "var(--font-sora)" }}
                      >
                        <TrendingUp className="w-6 h-6 text-[#00D4AA]" />
                        Results
                      </h3>
                      <div className="grid gap-4">
                        {study.results.map((result, rIndex) => (
                          <div 
                            key={rIndex}
                            className="bg-[#0A0A0F] border border-[#2A2A3E] rounded-xl p-6"
                          >
                            <div 
                              className="text-4xl font-bold mb-1"
                              style={{ color: study.color, fontFamily: "var(--font-sora)" }}
                            >
                              {result.metric}
                            </div>
                            <div className="text-[#A0A0B0]">{result.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="py-20 lg:py-32 bg-[#12121A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Proven <span className="text-gradient">Results</span>
            </h2>
            <p className="text-[#A0A0B0] text-lg max-w-2xl mx-auto">
              Across all our engagements, we consistently deliver measurable business impact.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: TrendingUp, value: "90+", label: "Days to ROI" },
              { icon: Clock, value: "40-85%", label: "Efficiency Gains" },
              { icon: Users, value: "100%", label: "Client Retention" },
              { icon: Zap, value: "$780k+", label: "Client Savings" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-[#00D4AA] mx-auto mb-4" />
                <div 
                  className="text-4xl lg:text-5xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  {stat.value}
                </div>
                <div className="text-[#A0A0B0]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1A1A2E] to-[#12121A] border border-[#2A2A3E] rounded-3xl p-12 lg:p-16 text-center"
          >
            <h2 
              className="text-3xl lg:text-4xl font-bold mb-6"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Ready for Your Success Story?
            </h2>
            <p className="text-[#A0A0B0] text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help your business achieve similar results with AI.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#00D4AA] hover:bg-[#00B4D8] text-[#0A0A0F] px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-[0_0_30px_rgba(0,212,170,0.4)]"
            >
              Start Your Project
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0F] border-t border-[#2A2A3E] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--font-sora)" }}>
                <span className="text-white">RIVERSTONE</span>
                <span className="text-[#00D4AA]"> LABS</span>
              </span>
            </Link>
            <p className="text-[#A0A0B0] text-sm">
              © 2026 Riverstone Labs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
