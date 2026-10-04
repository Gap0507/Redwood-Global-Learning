"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { TimelineSection } from "@/components/sections/TimelineSection"
import { ArrowRight, Users, Globe, GraduationCap, Target } from "lucide-react"
import dynamic from "next/dynamic"

const ApplyNowForm = dynamic(() => import("@/components/forms/ApplyNowForm").then(mod => mod.ApplyNowForm), { ssr: false });

export default function AboutPage() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)

  const handleApplyClick = () => setIsApplyModalOpen(true)

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <Navbar onApplyClick={handleApplyClick} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, hsl(var(--brand-blue)) 1px, transparent 0)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Organic Background Shape - Desktop Only */}
        <div className="hidden lg:block absolute top-0 right-0 w-[50%] bottom-0">
          <svg
            viewBox="0 0 600 1200"
            className="w-full h-full"
            preserveAspectRatio="xMaxYMid slice"
          >
            <path
              d="M600,0 L600,1200 L300,1200 Q250,1000 300,800 Q350,600 280,400 Q210,300 300,200 Q390,100 320,0 Z"
              fill="hsl(var(--brand-blue))"
              opacity="0.05"
            />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center min-h-[70vh]">
            {/* Left Side - Globe with Text and Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-center lg:order-1"
            >
              {/* Large Globe Image */}
              <div className="relative w-full max-w-full aspect-square flex items-center justify-center">
                <Image
                  src="/globeabout.png"
                  alt="Global Education"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                  quality={95}
                />

                {/* Mobile Stats - Top Left (45+ Countries) */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="lg:hidden absolute top-8 left-4 sm:top-12 sm:left-6 z-20 text-center"
                >
                  <div className="text-2xl font-bold text-brand-red font-heading mb-1">
                    45+
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-brand-gray/70 font-medium">
                    Countries
                  </div>
                </motion.div>

                {/* Mobile Stats - Bottom Right (2K+ Students) */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="lg:hidden absolute bottom-8 right-4 sm:bottom-12 sm:right-6 z-20 text-center"
                >
                  <div className="text-2xl font-bold text-brand-red font-heading mb-1">
                    2K+
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-brand-gray/70 font-medium">
                    Students
                  </div>
                </motion.div>

                {/* Content Overlay - Centered on Globe */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6">
                  {/* Headline with Stats on Both Sides - Desktop Only */}
                  <div className="hidden lg:flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 mb-4 lg:mb-6 relative">
                    {/* Left Stat - Desktop */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-center flex-shrink-0 -ml-2 lg:-ml-4 xl:-ml-16"
                    >
                      <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-brand-red font-heading mb-1">
                        45+
                      </div>
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-brand-gray/70 font-medium">
                        Countries
                      </div>
                    </motion.div>

                    {/* Main Headline - Center */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="text-center flex-1"
                    >
                      <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-brand-blue tracking-tight leading-[0.95] mb-1">
                        Expand Your
                      </h1>
                      <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-blue tracking-tight leading-[0.95]">
                        Global Perspective
                      </h1>
                    </motion.div>

                    {/* Right Stat - Desktop */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-center flex-shrink-0 -mr-2 lg:-mr-4 xl:-mr-16"
                    >
                      <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-brand-red font-heading mb-1">
                        2K+
                      </div>
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-brand-gray/70 font-medium">
                        Students
                      </div>
                    </motion.div>
                  </div>

                  {/* Headline Only - Mobile */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="lg:hidden text-center mb-4"
                  >
                    <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-blue tracking-tight leading-[0.95] mb-1">
                      Expand Your
                    </h1>
                    <h1 className="font-heading text-3xl sm:text-4xl font-bold text-brand-blue tracking-tight leading-[0.95]">
                      Global Perspective
                    </h1>
                  </motion.div>

                  {/* Tagline */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-[10px] sm:text-xs lg:text-sm text-brand-gray/70 leading-relaxed font-light max-w-md mx-auto text-center px-4"
                  >
                    Transformative educational experiences<br />
                    connecting the world.
                  </motion.p>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Our Story Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:order-2 lg:ml-4 xl:ml-8"
            >
              <div className="relative bg-gradient-to-br from-white to-brand-blue/5 backdrop-blur-md p-5 sm:p-6 lg:p-7 shadow-2xl hover:shadow-brand-blue/30 transition-all duration-500 overflow-hidden group border border-brand-blue/20">
                {/* Organic flowing lines on all 4 sides */}
                {/* Top line */}
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="absolute top-0 left-0 right-0 h-4"
                >
                  <svg viewBox="0 0 400 20" className="w-full h-full" preserveAspectRatio="none">
                    <motion.path
                      d="M 0 15 Q 50 5, 100 15 Q 150 5, 200 15 Q 250 5, 300 15 Q 350 5, 400 15"
                      stroke="hsl(var(--brand-red))"
                      strokeWidth="1.5"
                      fill="none"
                      strokeOpacity="0.6"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                    />
                  </svg>
                </motion.div>

                {/* Right line */}
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.9 }}
                  className="absolute top-0 right-0 bottom-0 w-4"
                >
                  <svg viewBox="0 0 20 400" className="w-full h-full" preserveAspectRatio="none">
                    <motion.path
                      d="M 5 0 Q 15 50, 5 100 Q 15 150, 5 200 Q 15 250, 5 300 Q 15 350, 5 400"
                      stroke="hsl(var(--brand-red))"
                      strokeWidth="1.5"
                      fill="none"
                      strokeOpacity="0.6"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.9 }}
                    />
                  </svg>
                </motion.div>

                {/* Bottom line */}
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 1.0 }}
                  className="absolute bottom-0 left-0 right-0 h-4"
                >
                  <svg viewBox="0 0 400 20" className="w-full h-full" preserveAspectRatio="none">
                    <motion.path
                      d="M 0 5 Q 50 15, 100 5 Q 150 15, 200 5 Q 250 15, 300 5 Q 350 15, 400 5"
                      stroke="hsl(var(--brand-red))"
                      strokeWidth="1.5"
                      fill="none"
                      strokeOpacity="0.6"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 1.0 }}
                    />
                  </svg>
                </motion.div>

                {/* Left line */}
                <motion.div
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                  className="absolute top-0 left-0 bottom-0 w-4"
                >
                  <svg viewBox="0 0 20 400" className="w-full h-full" preserveAspectRatio="none">
                    <motion.path
                      d="M 15 0 Q 5 50, 15 100 Q 5 150, 15 200 Q 5 250, 15 300 Q 5 350, 15 400"
                      stroke="hsl(var(--brand-red))"
                      strokeWidth="1.5"
                      fill="none"
                      strokeOpacity="0.6"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                    />
                  </svg>
                </motion.div>

                <div className="relative space-y-3 text-center">
                  <div>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      className="w-12 h-[2px] bg-brand-red mb-3 mx-auto origin-center"
                    />
                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-brand-red font-bold tracking-tight leading-tight">
                      Journey of Growth
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm lg:text-base text-brand-gray leading-relaxed font-light">
                    Redwood Global Learning takes its name from the majestic redwood forests of California,
                    where our first international exchange program took root. Just as redwood trees grow
                    tall and strong through their interconnected root systems, we believe that students
                    thrive when connected to a global community of learners.
                  </p>

                  <p className="text-xs sm:text-sm text-brand-gray/80 leading-relaxed font-light">
                    Our journey began with a simple vision: to create meaningful educational pathways that
                    transcend borders and foster cultural understanding. Today, we continue to grow,
                    reaching new heights while staying rooted in our core values.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider between Our Story and Timeline */}
      <div className="relative bg-gray-50/50 py-4">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-brand-red/60 to-transparent origin-center"
        />
      </div>

      {/* Timeline Section */}
      <TimelineSection />

      {/* Mission & Excellence Section - Modern 2-Column Layout */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white">
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Heading, Copy & Pillars */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              {/* Badge Pill */}
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-red font-montserrat">
                  Strategic Leadership & Excellence
                </span>
              </div>

              {/* Title */}
              <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-black text-brand-blue tracking-tight leading-[1.15]">
                Guiding Excellence in{" "}
                <span className="text-brand-red block sm:inline mt-1 sm:mt-0">
                  Global Education
                </span>
              </h2>

              {/* Accent Bar */}
              <div className="h-1.5 w-20 bg-gradient-to-r from-brand-red to-brand-blue rounded-full" />

              {/* Description Paragraphs */}
              <div className="space-y-4 pt-2">
                <p className="text-base sm:text-lg text-brand-gray/90 leading-relaxed font-poppins font-normal">
                  Our Advisory Board plays a crucial role in shaping the strategic direction of Redwood Global Learning. Comprised of distinguished leaders from academia, international education, and cultural exchange, they provide invaluable insights and guidance to ensure our programs meet the highest standards of excellence.
                </p>
                <p className="text-base sm:text-lg text-brand-gray/90 leading-relaxed font-poppins font-normal">
                  Through their collective expertise, we continue to expand our global reach, enhance program quality, and create meaningful connections between students and institutions worldwide.
                </p>
              </div>

              {/* Key Pillars Highlights */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Academic Innovation & Rigor",
                  "Global Strategic Vision",
                  "Cross-Cultural Learning",
                  "Highest Quality Standards"
                ].map((pillar, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <div className="w-5 h-5 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0">
                      <Target className="w-3 h-3 text-brand-red" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-brand-blue font-poppins">
                      {pillar}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Dynamic Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 space-y-4"
            >
              {/* Card 1: Members */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 flex items-center"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue text-white flex items-center justify-center flex-shrink-0">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-brand-blue font-montserrat tracking-tight leading-none mb-1">
                      12+
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-brand-red font-montserrat">
                      Board Members
                    </div>
                    <p className="text-[11px] text-brand-gray/60 font-poppins mt-0.5">Global Academic Visionaries</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Countries */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 flex items-center"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-brand-red text-white flex items-center justify-center flex-shrink-0">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-brand-blue font-montserrat tracking-tight leading-none mb-1">
                      45+
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-brand-red font-montserrat">
                      Countries
                    </div>
                    <p className="text-[11px] text-brand-gray/60 font-poppins mt-0.5">International Reach & Impact</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Students */}
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 flex items-center"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue text-white flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-brand-blue font-montserrat tracking-tight leading-none mb-1">
                      2K+
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-brand-red font-montserrat">
                      Students Impacted
                    </div>
                    <p className="text-[11px] text-brand-gray/60 font-poppins mt-0.5">Transformed Scholars Worldwide</p>
                  </div>
                </div>
              </motion.div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-to-br from-brand-blue/5 to-brand-red/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-blue mb-6">
              Ready to Expand Your Global Perspective?
            </h2>
            <p className="text-lg text-brand-gray/80 leading-relaxed mb-10 font-light max-w-2xl mx-auto">
              Join thousands of students who have transformed their understanding of the world
              through our immersive global education programs.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red/90 text-white font-bold text-base px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:shadow-brand-red/25 transition-all duration-500 group"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer onApplyClick={handleApplyClick} />

      <ApplyNowForm
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </main>
  )
}
