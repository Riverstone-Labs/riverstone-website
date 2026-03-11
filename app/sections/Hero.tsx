"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { ParticleNetwork } from "../components/ParticleNetwork";
import Image from "next/image";

export function Hero() {
  const scrollToNext = () => {
    const element = document.getElementById("problem");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-neural-architecture.webp"
          alt="Neural network architecture visualization"
          fill
          priority
          quality={85}
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#0a0a0f]/70" />
      </div>

      {/* Particle Network Background */}
      <ParticleNetwork />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a24] border border-white/10 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
            <span className="text-sm text-[#a1a1aa]">Premium AI Consultancy</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-white">AI Implementation</span>
            <br />
            <span className="gradient-text">That Actually Works</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-10 leading-relaxed">
            We transform AI from expensive experiments into production systems that 
            deliver measurable business results. Strategy, build, and handover—done right.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-[#0a0a0f] font-semibold px-8 py-6 text-base rounded-full glow-blue transition-all duration-300"
              onClick={() => {
                const element = document.getElementById("cta");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book Free Assessment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-base rounded-full transition-all duration-300"
              onClick={() => {
                const element = document.getElementById("approach");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              See Our Approach
            </Button>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "50+", label: "AI Systems Deployed" },
            { value: "$2M+", label: "Client Cost Savings" },
            { value: "95%", label: "On-Time Delivery" },
            { value: "100%", label: "Knowledge Transfer" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-[#71717a]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#71717a] hover:text-[#00d4ff] transition-colors cursor-pointer"
        aria-label="Scroll to next section"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.button>
    </section>
  );
}
