"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Users, Globe, GraduationCap, ArrowRight, Sparkles, Target, Award, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ApplyNowForm } from "@/components/forms/ApplyNowForm"
import { getAdvisoryBoardContent, defaultAdvisoryBoardContent, AdvisoryBoardContent } from "@/lib/advisoryBoardContent"

export default function AdvisoryBoardPage() {
  const [content, setContent] = useState<AdvisoryBoardContent>(defaultAdvisoryBoardContent);
  const [loading, setLoading] = useState(true);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const { scrollYProgress } = useScroll()

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  useEffect(() => {
    getAdvisoryBoardContent()
      .then(setContent)
      .finally(() => setLoading(false));
  }, []);

  const handleApplyClick = () => setIsApplyModalOpen(true)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <Navbar onApplyClick={handleApplyClick} />

      {/* Hero Section - Card Left, Content Right */}
      <section className="min-h-[calc(100vh-6rem)] flex items-center py-8 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 mt-30">
            {/* Left Side - Card with Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full lg:w-[42%]"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* Solid Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e40af] via-[#1e3a8a] to-[#991b1b]">
                  {/* Subtle Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                      backgroundSize: '48px 48px'
                    }} />
                  </div>

                  {/* Animated Gradient Orbs */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                    className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-red-500/20 rounded-full blur-3xl"
                  />
                </div>

                {/* Card Content */}
                <div className="relative flex flex-col p-5 lg:p-6">
                  {/* Feature Image */}
                  <div className="flex-shrink-0 mb-4">
                    <div className="relative w-full max-w-xs mx-auto">
                      {/* Floating Frame Effect */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-2xl blur-lg" />

                      {/* Main Image */}
                      <div className="relative rounded-xl overflow-hidden shadow-xl border border-white/20 bg-white/5 backdrop-blur-sm">
                        <Image
                          src={content.hero.image}
                          alt="Excellence in Education"
                          width={320}
                          height={240}
                          className="w-full h-auto"
                          priority
                          unoptimized={content.hero.image.startsWith('/')}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
                      </div>

                      {/* Floating Accents */}
                      <motion.div
                        animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-red-500/40 to-red-500/20 rounded-full blur-lg"
                      />
                      <motion.div
                        animate={{ y: [0, 8, 0], rotate: [0, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-2 -left-2 w-14 h-14 bg-gradient-to-tr from-blue-500/30 to-blue-500/10 rounded-full blur-lg"
                      />
                    </div>
                  </div>

                  {/* Value Cards */}
                  <div className="space-y-3">
                    <div className="space-y-2">
                      {[
                        {
                          icon: Target,
                          title: "Strategic Vision",
                          desc: "Shaping the future of global education"
                        },
                        {
                          icon: Award,
                          title: "Excellence Standards",
                          desc: "Maintaining highest program quality"
                        },
                        {
                          icon: Globe,
                          title: "Global Reach",
                          desc: "Connecting institutions worldwide"
                        }
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.9 + (idx * 0.1) }}
                          className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-2.5 rounded-lg border border-white/20 hover:bg-white/15 transition-all duration-300 group"
                        >
                          <div className="flex-shrink-0 p-1.5 bg-white/20 rounded-md group-hover:bg-white/30 transition-all duration-300">
                            <item.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-heading text-sm font-bold text-white leading-tight">
                              {item.title}
                            </h4>
                            <p className="text-[10px] text-white/80 font-light leading-tight">
                              {item.desc}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Decorative Line */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 1.2 }}
                      className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />

                    {/* Quote */}
                    <motion.blockquote
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 1.4 }}
                      className="text-white/90 text-xs font-light italic leading-relaxed border-l-2 border-white/30 pl-3 mt-3"
                    >
                      "{content.hero.quote}"
                    </motion.blockquote>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full lg:w-[58%] flex flex-col justify-center"
            >
              {/* Elegant Tagline */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-3">
                  <motion.div
                    className="h-px w-12 bg-gradient-to-r from-transparent to-brand-red"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                  <span className="text-xs tracking-[0.25em] uppercase text-brand-red font-semibold">
                    {content.hero.tagline}
                  </span>
                  <motion.div
                    className="h-px w-12 bg-gradient-to-l from-transparent to-brand-red"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>

              {/* Hero Title */}
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-brand-blue leading-[0.9] mb-8 tracking-tight">
                {content.hero.title}
                <br />
                <span className="text-brand-red">{content.hero.highlightText}</span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-brand-gray/80 leading-relaxed max-w-2xl mb-10 font-light">
                {content.hero.description}
              </p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red/90 text-white font-bold text-base px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:shadow-brand-red/25 transition-all duration-500 group"
                >
                  {content.hero.ctaText}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Board Members Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-1 w-16 bg-brand-red rounded-full" />
              <h2 className="text-xs tracking-[0.2em] uppercase text-brand-red font-semibold">
                {content.membersSection.tagline}
              </h2>
            </div>
            <h3 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-blue mb-6">
              {content.membersSection.title}
            </h3>
            <p className="text-lg text-brand-gray/80 leading-relaxed max-w-2xl font-light">
              {content.membersSection.description}
            </p>
          </motion.div>

          {/* Board Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {content.membersSection.members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group"
              >
                {/* Avatar */}
                <div className="relative mb-5">
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-brand-blue/10 to-brand-red/10 border border-brand-blue/10 group-hover:border-brand-red/30 transition-all duration-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          unoptimized={member.image.startsWith('/')}
                        />
                      ) : (
                        <Users className="w-24 h-24 text-brand-blue/30 group-hover:text-brand-blue/50 transition-all duration-500" />
                      )}
                    </div>
                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-red/0 group-hover:from-brand-red/10 to-transparent transition-all duration-500" />
                  </div>

                </div>

                {/* Info */}
                <div className="space-y-2">
                  <h4 className="font-heading text-xl sm:text-2xl font-bold text-brand-blue group-hover:text-brand-red transition-colors duration-300">
                    {member.name}
                  </h4>
                  {member.title && (
                    <p className="text-sm text-brand-gray/80 font-medium leading-snug">
                      {member.title}
                    </p>
                  )}
                  <p className="text-xs text-brand-gray/60 font-light">
                    {member.organization}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
                {content.excellenceSection.title}{" "}
                <span className="text-brand-red block sm:inline mt-1 sm:mt-0">
                  {content.excellenceSection.highlightText}
                </span>
              </h2>

              {/* Accent Bar */}
              <div className="h-1.5 w-20 bg-gradient-to-r from-brand-red to-brand-blue rounded-full" />

              {/* Description Paragraphs */}
              <div className="space-y-4 pt-2">
                <p className="text-base sm:text-lg text-brand-gray/90 leading-relaxed font-poppins font-normal">
                  {content.excellenceSection.description1}
                </p>
                <p className="text-base sm:text-lg text-brand-gray/90 leading-relaxed font-poppins font-normal">
                  {content.excellenceSection.description2}
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
                      {content.excellenceSection.stats.members}
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
                      {content.excellenceSection.stats.countries}
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
                      {content.excellenceSection.stats.students}
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

      <Footer onApplyClick={handleApplyClick} />

      <ApplyNowForm
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </main>
  )
}