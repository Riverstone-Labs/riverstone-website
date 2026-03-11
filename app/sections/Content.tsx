"use client";

import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "../components/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, Lock } from "lucide-react";
import Image from "next/image";

const articles = [
  {
    title: "Why Your RAG System Is Failing (And How to Fix It)",
    excerpt:
      "Common pitfalls in retrieval-augmented generation systems and battle-tested solutions for production-grade performance.",
    category: "Technical",
    date: "Mar 5, 2024",
    readTime: "8 min read",
    image: "bg-gradient-to-br from-[#00d4ff]/20 to-[#00d4ff]/5",
  },
  {
    title: "The 90-Day AI Strategy Framework",
    excerpt:
      "A practical framework for evaluating AI opportunities, building the business case, and executing with confidence.",
    category: "Strategy",
    date: "Feb 28, 2024",
    readTime: "12 min read",
    image: "bg-gradient-to-br from-[#f59e0b]/20 to-[#f59e0b]/5",
  },
  {
    title: "From Demo to Production: A Checklist",
    excerpt:
      "The critical differences between impressive prototypes and systems that can handle real-world scale and complexity.",
    category: "Engineering",
    date: "Feb 20, 2024",
    readTime: "10 min read",
    image: "bg-gradient-to-br from-purple-500/20 to-purple-500/5",
  },
];

export function Content() {
  return (
    <section
      id="content"
      className="relative py-24 bg-[#12121a] overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/content-insights.webp"
          alt="Abstract insights and data visualization"
          fill
          quality={85}
          loading="lazy"
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#12121a]/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-[#00d4ff] text-sm font-medium tracking-wider uppercase mb-4 block">
              Insights
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Latest Insights
            </h2>
          </div>
          <button
            className="inline-flex items-center gap-2 text-[#71717a] font-medium mt-4 md:mt-0 cursor-not-allowed"
            disabled
            aria-label="Blog archive coming soon"
          >
            <Lock className="w-4 h-4" />
            <span>Coming Soon</span>
          </button>
        </ScrollReveal>

        {/* Articles Grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.1}
        >
          {articles.map((article, index) => (
            <StaggerItem key={index}>
              <Card className="group bg-[#0a0a0f] border-white/5 overflow-hidden hover:border-[#00d4ff]/30 transition-all duration-300 h-full cursor-pointer">
                {/* Image placeholder */}
                <div
                  className={`h-48 ${article.image} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-xl bg-white/5 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-2xl font-bold text-white/30">
                        {article.category[0]}
                      </span>
                    </div>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-[#0a0a0f]/80 text-[#00d4ff] border-[#00d4ff]/30 backdrop-blur-sm">
                    {article.category}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-[#71717a] mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00d4ff] transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-[#a1a1aa] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Coming Soon */}
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <span className="inline-flex items-center gap-2 text-sm text-[#71717a] font-medium">
                      <Lock className="w-4 h-4" />
                      Coming Soon
                    </span>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* YouTube Preview */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-[#1a1a24] to-[#12121a] border border-white/5">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center shrink-0">
                <svg
                  className="w-8 h-8 text-red-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Watch on YouTube
                </h3>
                <p className="text-[#a1a1aa]">
                  Deep dives into AI architecture, implementation patterns, and
                  lessons learned from production systems.
                </p>
              </div>
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600/50 text-white/50 font-medium cursor-not-allowed shrink-0"
                disabled
                aria-label="YouTube channel coming soon"
              >
                <Lock className="w-4 h-4" />
                Coming Soon
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
