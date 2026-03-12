"use client";

import { useState } from "react";
import { Menu, X, CheckCircle, ArrowRight, ChevronRight, Phone, Mail, MapPin } from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    challenge: "",
    budget: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.company.trim()) errors.company = "Company name is required";
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", company: "", phone: "", challenge: "", budget: "" });
    } else {
      setFormErrors(errors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container-max section-padding">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-xl lg:text-2xl font-bold text-[#0a1628]">
                Riverstone Labs
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <button onClick={() => scrollToSection("services")} className="text-[#1e293b] hover:text-[#2563eb] transition-colors font-medium">
                Services
              </button>
              <button onClick={() => scrollToSection("why-us")} className="text-[#1e293b] hover:text-[#2563eb] transition-colors font-medium">
                Why Us
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-[#1e293b] hover:text-[#2563eb] transition-colors font-medium">
                Contact
              </button>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg"
              >
                Book Strategy Call
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-[#0a1628]"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="section-padding py-4 space-y-4">
              <button onClick={() => scrollToSection("services")} className="block w-full text-left py-2 text-[#1e293b] font-medium">
                Services
              </button>
              <button onClick={() => scrollToSection("why-us")} className="block w-full text-left py-2 text-[#1e293b] font-medium">
                Why Us
              </button>
              <button onClick={() => scrollToSection("contact")} className="block w-full text-left py-2 text-[#1e293b] font-medium">
                Contact
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                Book Strategy Call
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 lg:pt-20 gradient-hero min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/10 via-transparent to-[#06b6d4]/10" />
        <div className="container-max section-padding relative z-10 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Turn AI Hype Into{" "}
              <span className="text-gradient">Real Business ROI</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              We implement AI that actually works. Get a dedicated AI team for a fraction of the cost of hiring in-house — with measurable returns in 90 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                Book Your Free Strategy Call
                <ArrowRight size={20} />
              </button>
            </div>
            <p className="text-gray-400 mt-6 text-sm">No obligation. 30-minute consultation.</p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Problem Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] mb-6">
              AI Projects Keep Failing. Here&apos;s Why.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "You've been told AI will transform your business",
                description: "But every vendor promises the world and delivers nothing but delays and disappointment.",
              },
              {
                title: "Your team lacks the expertise",
                description: "It's nearly impossible to separate real opportunities from expensive experiments when you're drowning in technical jargon.",
              },
              {
                title: "Pilots that go nowhere",
                description: "You've seen AI pilots drag on for months with no clear path to production or ROI.",
              },
              {
                title: "Budgets that balloon",
                description: "Initial quotes seem reasonable, but costs spiral as 'scope creep' and 'unexpected complexities' emerge.",
              },
            ].map((item, index) => (
              <div key={index} className="bg-[#f8fafc] p-8 rounded-2xl border border-gray-100">
                <h3 className="text-xl font-semibold text-[#0a1628] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-32 bg-[#f8fafc]">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] mb-6">
              AI Implementation That Delivers Measurable Results
            </h2>
            <p className="text-lg text-gray-600">
              End-to-end AI services designed for SMBs who want ROI, not experiments.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: "🎯",
                title: "AI Strategy & Roadmap",
                description: "We identify where AI creates real value in your business. No fluff, just opportunities with measurable impact.",
              },
              {
                icon: "⚡",
                title: "AI Implementation Projects",
                description: "We build and deploy AI systems that solve real problems. From concept to production in weeks, not months.",
              },
              {
                icon: "🔄",
                title: "Ongoing AI Retainer",
                description: "Dedicated team managing and optimizing your AI investments. Continuous improvement and support.",
              },
              {
                icon: "🎓",
                title: "AI Training & Enablement",
                description: "We train your team to own and extend AI capabilities. Knowledge transfer that sticks.",
              },
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-[#0a1628] mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-20 lg:py-32 bg-white">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] mb-6">
              Why Brisbane Businesses Trust Riverstone Labs
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Proven Expertise",
                description: "Deep technical background in software and AI implementation.",
              },
              {
                title: "ROI-First Approach",
                description: "Every project scoped for measurable business outcomes.",
              },
              {
                title: "Stealth-Ready Speed",
                description: "We move fast without bureaucracy or red tape.",
              },
              {
                title: "Transparent Pricing",
                description: "No surprise invoices, clear deliverables from day one.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-[#2563eb]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#2563eb]" />
                </div>
                <h3 className="text-lg font-semibold text-[#0a1628] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 lg:py-32 bg-[#0a1628]">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Trusted by Australian Businesses
            </h2>
            <p className="text-lg text-gray-400">
              Brisbane-based consultancy serving Australian SMBs
            </p>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#06b6d4] mb-2">90+</div>
              <div className="text-gray-400">Days to ROI</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#06b6d4] mb-2">100%</div>
              <div className="text-gray-400">Australian Owned</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#06b6d4] mb-2">24hr</div>
              <div className="text-gray-400">Response Time</div>
            </div>
          </div>
          
          {/* Trusted By Logos Placeholder */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {["Trusted Partner 1", "Trusted Partner 2", "Trusted Partner 3", "Trusted Partner 4"].map((partner, index) => (
              <div key={index} className="bg-white/10 px-8 py-4 rounded-lg">
                <span className="text-white/60 font-medium">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/Lead Capture Section */}
      <section id="contact" className="py-20 lg:py-32 bg-[#f8fafc]">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0a1628] mb-6">
                Ready to Get Real ROI From AI?
              </h2>
              <p className="text-lg text-gray-600">
                Book a free 30-minute strategy call. No obligation.
              </p>
            </div>
            
            {isSubmitted ? (
              <div className="bg-white p-12 rounded-2xl shadow-sm text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#0a1628] mb-4">Thanks!</h3>
                <p className="text-gray-600">We&apos;ll be in touch within 24 hours to schedule your strategy call.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 lg:p-12 rounded-2xl shadow-sm max-w-2xl mx-auto">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#1e293b] mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.name ? "border-red-500" : "border-gray-200"} focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all`}
                      placeholder="Your name"
                    />
                    {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#1e293b] mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.email ? "border-red-500" : "border-gray-200"} focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all`}
                      placeholder="you@company.com"
                    />
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-[#1e293b] mb-2">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${formErrors.company ? "border-red-500" : "border-gray-200"} focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all`}
                      placeholder="Your company"
                    />
                    {formErrors.company && <p className="text-red-500 text-sm mt-1">{formErrors.company}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#1e293b] mb-2">
                      Phone <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all"
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="budget" className="block text-sm font-medium text-[#1e293b] mb-2">
                      Estimated Monthly AI Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all bg-white"
                    >
                      <option value="">Select budget range</option>
                      <option value="<5k">&lt; $5k</option>
                      <option value="5-10k">$5k - $10k</option>
                      <option value="10-20k">$10k - $20k</option>
                      <option value="20k+">$20k+</option>
                    </select>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="challenge" className="block text-sm font-medium text-[#1e293b] mb-2">
                      What challenge are you trying to solve?
                    </label>
                    <textarea
                      id="challenge"
                      name="challenge"
                      value={formData.challenge}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 outline-none transition-all resize-none"
                      placeholder="Tell us about your AI goals and challenges..."
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full mt-8 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Book Your Free Strategy Call
                  <ChevronRight size={20} />
                </button>
                
                <p className="text-center text-gray-500 text-sm mt-4">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1628] text-white py-16">
        <div className="container-max section-padding">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Riverstone Labs</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                AI implementation consultancy helping Australian businesses turn AI hype into real ROI. Based in Brisbane, serving SMBs nationwide.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail size={18} />
                  <span>hello@riverstonelabs.com.au</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone size={18} />
                  <span>+61 400 000 000</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin size={18} />
                  <span>Brisbane, Australia</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors">AI Strategy</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors">Implementation</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors">AI Retainer</button></li>
                <li><button onClick={() => scrollToSection("services")} className="hover:text-white transition-colors">Training</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection("why-us")} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection("contact")} className="hover:text-white transition-colors">Contact</button></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Riverstone Labs. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Australian-owned and operated.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
