"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight,
  MapPin,
  Target,
  Lightbulb,
  Users
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const values = [
  {
    icon: Target,
    title: "Results First",
    description: "We measure success by the business outcomes we deliver, not the technology we deploy."
  },
  {
    icon: Lightbulb,
    title: "Pragmatic Innovation",
    description: "We embrace cutting-edge AI while staying grounded in what's practical and proven."
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We work alongside your team, transferring knowledge and building internal capability."
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0F]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-[#1A1A2E]/50 to-[#0A0A0F]" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Building the Future of <span className="text-gradient">Australian Business</span>
            </h1>
            <p className="text-[#A0A0B0] text-lg lg:text-xl leading-relaxed">
              Riverstone Labs is a Brisbane-based AI consultancy helping Australian SMBs 
              cut through the hype and implement AI solutions that actually deliver results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-3xl lg:text-4xl font-bold mb-6"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                Our <span className="text-gradient">Story</span>
              </h2>
              <div className="space-y-4 text-[#A0A0B0] leading-relaxed">
                <p>
                  Riverstone Labs was founded with a simple but powerful belief: AI should deliver 
                  measurable business value, not just impressive demos. After seeing countless 
                  businesses invest in AI projects that never made it to production, we set out 
                  to build a different kind of consultancy.
                </p>
                <p>
                  Our &ldquo;dark software factory&rdquo; approach means we use AI agents to build the 
                  products we sell. We&apos;re not just consultants giving advice—we&apos;re builders who 
                  eat our own cooking. This hands-on experience gives us unique insights into 
                  what actually works in production.
                </p>
                <p>
                  Based in Brisbane, we serve SMBs across Australia who are ready to move beyond 
                  AI experiments and start seeing real ROI. We operate with a stealth mentality: 
                  work quietly, deliver results, and let success speak for itself.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-[#12121A] border border-[#2A2A3E] rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-[#00D4AA]" />
                  <span className="text-white font-semibold">Brisbane, Australia</span>
                </div>
                <div className="space-y-6">
                  <div className="border-l-2 border-[#00D4AA] pl-6">
                    <div className="text-[#00D4AA] font-semibold mb-1">Our Mission</div>
                    <p className="text-[#A0A0B0]">
                      Help Australian SMBs implement AI that delivers measurable ROI within 90 days.
                    </p>
                  </div>
                  <div className="border-l-2 border-[#7C3AED] pl-6">
                    <div className="text-[#7C3AED] font-semibold mb-1">Our Vision</div>
                    <p className="text-[#A0A0B0]">
                      Become the most trusted AI implementation partner for Australian businesses.
                    </p>
                  </div>
                  <div className="border-l-2 border-[#00D4AA] pl-6">
                    <div className="text-[#00D4AA] font-semibold mb-1">Our Approach</div>
                    <p className="text-[#A0A0B0]">
                      Stealth execution, ROI-first mindset, and genuine partnership with our clients.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-[#A0A0B0] text-lg max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#0A0A0F] border border-[#2A2A3E] p-8 rounded-2xl text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#00D4AA]/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-[#00D4AA]" />
                </div>
                <h3 
                  className="text-xl font-bold text-white mb-4"
                  style={{ fontFamily: "var(--font-sora)" }}
                >
                  {value.title}
                </h3>
                <p className="text-[#A0A0B0]">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Different Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="bg-[#12121A] border border-[#2A2A3E] rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-sora)" }}>
                  The Riverstone Difference
                </h3>
                <ul className="space-y-4">
                  {[
                    "We build what we sell—our AI agents develop the products we deliver",
                    "ROI-first approach—we won't take projects without clear value propositions",
                    "Australian focus—we understand local business context and constraints",
                    "Stealth execution—we deliver quietly and let results speak",
                    "Knowledge transfer—we build your team's capability, not dependency"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#00D4AA] mt-2 flex-shrink-0" />
                      <span className="text-[#A0A0B0]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <h2 
                className="text-3xl lg:text-4xl font-bold mb-6"
                style={{ fontFamily: "var(--font-sora)" }}
              >
                Why We&apos;re <span className="text-gradient">Different</span>
              </h2>
              <p className="text-[#A0A0B0] leading-relaxed mb-6">
                Most AI consultancies are either too academic (focused on research, not results) 
                or too product-pushing (selling you their platform regardless of fit). We take 
                a different approach.
              </p>
              <p className="text-[#A0A0B0] leading-relaxed">
                We&apos;re practitioners first. Our team has built and deployed AI systems across 
                multiple industries. We know what works, what doesn&apos;t, and how to navigate the 
                gap between AI potential and business reality.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-[#12121A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 
              className="text-3xl lg:text-4xl font-bold mb-6"
              style={{ fontFamily: "var(--font-sora)" }}
            >
              Ready to Work Together?
            </h2>
            <p className="text-[#A0A0B0] text-lg mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help your business leverage AI for real, measurable results.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#00D4AA] hover:bg-[#00B4D8] text-[#0A0A0F] px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-[0_0_30px_rgba(0,212,170,0.4)]"
            >
              Schedule a Consultation
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
