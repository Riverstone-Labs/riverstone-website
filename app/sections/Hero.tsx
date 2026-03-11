"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/hero-water-stones.jpg"
        >
          <source src="/videos/water-stones.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-white">
            We don't do pilots.
            <br />
            <span className="text-[#8B9DAE]">We do transformation.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
            Boutique AI implementation for enterprises ready to move beyond experiments.
            Only 10 clients per year. We build it, then we transfer the knowledge.
          </p>

          {/* CTA */}
          <Button
            size="lg"
            className="bg-white text-stone-900 hover:bg-white/90 font-semibold px-10 py-6 text-base rounded-none transition-all duration-300"
            onClick={() => {
              const element = document.getElementById("cta");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Book a Consultation
          </Button>
        </motion.div>
      </div>

      {/* Bottom gradient for section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F3EF] to-transparent" />
    </section>
  );
}
