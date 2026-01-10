"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Users, Globe, GraduationCap, ArrowRight, Sparkles, Target, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ApplyNowForm } from "@/components/forms/ApplyNowForm"

interface BoardMember {
  id: string
  name: string
  title?: string
  organization: string
  image?: string
}

const boardMembers: BoardMember[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Director of International Programs",
    organization: "Harvard University",
    image: "/advisory-1.jpg"
  },
  {
    id: "2",
    name: "Prof. Michael Rodriguez",
    title: "Dean of Global Studies",
    organization: "Stanford University",
    image: "/advisory-2.jpg"
  },
  {
    id: "3",
    name: "Dr. Aisha Patel",
    title: "Head of Cultural Exchange",
    organization: "Oxford University",
    image: "/advisory-3.jpg"
  },
  {
    id: "4",
    name: "Prof. James Thompson",
    title: "Executive Director",
    organization: "UNESCO Education Division",
    image: "/advisory-4.jpg"
  },
  {
    id: "5",
    name: "Dr. Maria Santos",
    title: "VP of Global Partnerships",
    organization: "World Education Alliance",
    image: "/advisory-5.jpg"
  },
  {
    id: "6",
    name: "Prof. David Kim",
    title: "Director of International Relations",
    organization: "Yale University",
    image: "/advisory-6.jpg"
  },
  {
    id: "7",
    name: "Dr. Lisa Wong",
    title: "Chief Academic Officer",
    organization: "MIT Global Education",
    image: "/advisory-7.jpg"
  },
  {
    id: "8",
    name: "Prof. Robert Johnson",
    title: "President Emeritus",
    organization: "International Education Council",
    image: "/advisory-8.jpg"
  },
  {
    id: "9",
    name: "Dr. Fatima Al-Zahra",
    title: "Director of Student Mobility",
    organization: "European University Network",
    image: "/advisory-9.jpg"
  },
  {
    id: "10",
    name: "Prof. Hiroshi Tanaka",
    title: "Vice President",
    organization: "Asia-Pacific Education Forum",
    image: "/advisory-10.jpg"
  },
  {
    id: "11",
    name: "Dr. Emma Wilson",
    title: "Chief Innovation Officer",
    organization: "Global Learning Institute",
    image: "/advisory-11.jpg"
  },
  {
    id: "12",
    name: "Prof. Carlos Mendoza",
    title: "Director of Cultural Programs",
    organization: "Latin American Education Network",
    image: "/advisory-12.jpg"
  }
]

export default function AdvisoryBoardPage() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const { scrollYProgress } = useScroll()

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  const handleApplyClick = () => setIsApplyModalOpen(true)

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
                          src="/GuidingExcellance.png"
                          alt="Excellence in Education"
                          width={320}
                          height={240}
                          className="w-full h-auto"
                          priority
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
                      "Together, we're building bridges between cultures and creating opportunities
                      that transform lives."
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
                    Advisory Board
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
                Distinguished
                <br />
                <span className="text-brand-red">Leadership</span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-brand-gray/80 leading-relaxed max-w-2xl mb-10 font-light">
                A curated collective of visionaries, educators, and global leaders
                shaping the future of international education through transformative experiences.
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
                  Connect With Us
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
                Our Team
              </h2>
            </div>
            <h3 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-blue mb-6">
              Meet the Board
            </h3>
            <p className="text-lg text-brand-gray/80 leading-relaxed max-w-2xl font-light">
              Expertise spanning academia, international relations, and cultural exchange
            </p>
          </motion.div>

          {/* Board Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {boardMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group cursor-pointer"
              >
                {/* Avatar */}
                <div className="relative mb-5">
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-brand-blue/10 to-brand-red/10 border border-brand-blue/10 group-hover:border-brand-red/30 transition-all duration-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="w-24 h-24 text-brand-blue/30 group-hover:text-brand-blue/50 transition-all duration-500" />
                    </div>
                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-red/0 group-hover:from-brand-red/10 to-transparent transition-all duration-500" />
                  </div>
                  {/* Decorative Accent */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-red rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
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

      {/* Mission Section */}
      <section className="relative py-20 px-6 sm:px-8 lg:px-12 xl:px-16 overflow-hidden">

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-[hsl(var(--bg-soft))] backdrop-blur-md rounded-3xl p-10 sm:p-12 lg:p-16 shadow-2xl shadow-brand-blue/10 border border-white/20 overflow-hidden group"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-red/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-brand-blue/5 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />

            <div className="relative z-10">
              {/* Accent Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-1 w-20 bg-gradient-to-r from-brand-red to-brand-red/50 mb-8 origin-left"
              />

              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-blue mb-6 leading-tight">
                Guiding Excellence in
                <br />Global Education
              </h2>

              <div className="space-y-5 mb-10">
                <p className="text-base sm:text-lg text-brand-gray/80 leading-relaxed font-light">
                  Our Advisory Board plays a crucial role in shaping the strategic direction of
                  Redwood Global Learning. Comprised of distinguished leaders from academia,
                  international education, and cultural exchange, they provide invaluable insights
                  and guidance to ensure our programs meet the highest standards of excellence.
                </p>
                <p className="text-base text-brand-gray/70 leading-relaxed font-light">
                  Through their collective expertise, we continue to expand our global reach,
                  enhance program quality, and create meaningful connections between students
                  and institutions worldwide.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-brand-blue/10">
                <div className="group/stat">
                  <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-brand-red/10 to-brand-red/5 mb-4 group-hover/stat:scale-110 transition-transform duration-300">
                    <Users className="w-7 h-7 text-brand-red" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold text-brand-red font-heading mb-2">
                    12+
                  </div>
                  <div className="text-xs sm:text-sm text-brand-gray/70 font-medium uppercase tracking-wider">
                    Board Members
                  </div>
                </div>

                <div className="group/stat">
                  <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-brand-red/10 to-brand-red/5 mb-4 group-hover/stat:scale-110 transition-transform duration-300">
                    <Globe className="w-7 h-7 text-brand-red" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold text-brand-red font-heading mb-2">
                    45+
                  </div>
                  <div className="text-xs sm:text-sm text-brand-gray/70 font-medium uppercase tracking-wider">
                    Countries
                  </div>
                </div>

                <div className="group/stat">
                  <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-brand-red/10 to-brand-red/5 mb-4 group-hover/stat:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-7 h-7 text-brand-red" />
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold text-brand-red font-heading mb-2">
                    2K+
                  </div>
                  <div className="text-xs sm:text-sm text-brand-gray/70 font-medium uppercase tracking-wider">
                    Students
                  </div>
                </div>
              </div>
            </div>
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