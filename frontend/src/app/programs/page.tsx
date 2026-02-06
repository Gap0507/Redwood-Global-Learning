"use client"

import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Calendar, Globe, Users, BookOpen, Star, GraduationCap, Award, Heart, Sparkles, CheckCircle2, Building2, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ApplyNowForm } from "@/components/forms/ApplyNowForm"
import { programLocations, ProgramLocation } from "@/data/sampleArcs"

// Map locations from the globe to country data with detailed info
interface CountryInfo {
  slug: string
  name: string
  flag: string
  flagUrl: string
  description: string
  highlights: string[]
  image: string
  programCount: number
  featuredProgram?: string
  tagline: string
}

const countries: CountryInfo[] = [
  {
    slug: "india",
    name: "India",
    flag: "🇮🇳",
    flagUrl: "https://flagcdn.com/w80/in.png",
    tagline: "Diversity in Unity",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    description: "Discover one of the world's oldest civilizations with a rapidly growing economy. Study in New Delhi or Mumbai while exploring India's diverse cultures, languages, and traditions across its vibrant cities.",
    highlights: [
      "Rich cultural diversity",
      "Affordable living costs",
      "Growing tech industry",
      "Historical landmarks"
    ],
    programCount: programLocations.find(loc => loc.id === "india")?.programs.length || 2,
    featuredProgram: "Cultural Immersion"
  },
  {
    slug: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    flagUrl: "https://flagcdn.com/w80/gb.png",
    tagline: "Excellence Through History",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    description: "Study in London and experience the UK's prestigious academic tradition, rich history, and cultural heritage. Home to some of the world's most renowned universities and institutions.",
    highlights: [
      "Prestigious universities",
      "Rich historical heritage",
      "English language immersion",
      "Cultural capital of Europe"
    ],
    programCount: programLocations.find(loc => loc.id === "uk")?.programs.length || 1,
    featuredProgram: "Leadership Academy"
  },
  {
    slug: "thailand",
    name: "Thailand",
    flag: "🇹🇭",
    flagUrl: "https://flagcdn.com/w80/th.png",
    tagline: "Where Tradition Meets Tomorrow",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    description: "Experience Thailand's perfect blend of ancient temples and modern innovation. Study in Bangkok while exploring Southeast Asia's rich cultural heritage and rapidly developing economy.",
    highlights: [
      "Cultural heritage sites",
      "Modern urban centers",
      "Affordable education",
      "Strategic location in Asia"
    ],
    programCount: programLocations.find(loc => loc.id === "thailand")?.programs.length || 1,
    featuredProgram: "Explorer Program"
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    flag: "🇻🇳",
    flagUrl: "https://flagcdn.com/w80/vn.png",
    tagline: "Ancient Wisdom, Modern Spirit",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80",
    description: "Discover Vietnam's remarkable transformation from ancient civilization to modern economic powerhouse. Study in Hanoi while experiencing the country's rich history and dynamic future.",
    highlights: [
      "Historical heritage",
      "Economic growth",
      "Cultural richness",
      "Educational excellence"
    ],
    programCount: programLocations.find(loc => loc.id === "vietnam")?.programs.length || 1,
    featuredProgram: "Heritage Program"
  },
  {
    slug: "japan",
    name: "Japan",
    flag: "🇯🇵",
    flagUrl: "https://flagcdn.com/w80/jp.png",
    tagline: "Tradition Meets Tomorrow",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    description: "Immerse yourself in a unique blend of ancient traditions and cutting-edge innovation. Study in Tokyo while experiencing Japan's rich cultural heritage, world-class education, and technological excellence.",
    highlights: [
      "Cultural immersion programs",
      "Language learning opportunities",
      "Advanced technology exposure",
      "Rich historical heritage"
    ],
    programCount: programLocations.find(loc => loc.id === "japan")?.programs.length || 1,
    featuredProgram: "Innovation Exchange"
  },
  {
    slug: "usa",
    name: "United States",
    flag: "🇺🇸",
    flagUrl: "https://flagcdn.com/w80/us.png",
    tagline: "Land of Opportunity",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80",
    description: "Experience world-class education in America's top universities. From New York to California, explore diverse landscapes and cultures while building your global network.",
    highlights: [
      "Ivy League experience",
      "Innovation hubs",
      "Diverse culture",
      "Career opportunities"
    ],
    programCount: 2,
    featuredProgram: "American Dream"
  },
  {
    slug: "bali",
    name: "Bali, Indonesia",
    flag: "🇮🇩",
    flagUrl: "https://flagcdn.com/w80/id.png",
    tagline: "Island of Gods",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    description: "Discover Bali's unique blend of spirituality, art, and natural beauty. Learn about sustainable living and cultural preservation in this tropical paradise.",
    highlights: [
      "Spiritual retreats",
      "Art and culture",
      "Sustainable living",
      "Natural beauty"
    ],
    programCount: 1,
    featuredProgram: "Island Explorer"
  },
]

export default function AllProgramsPage() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const handleApplyClick = () => setIsApplyModalOpen(true)

  return (
    <main className="min-h-screen relative" style={{ backgroundImage: `url('/herobackground.png')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      {/* Global background overlay for readability */}
      <div className="fixed inset-0 bg-white/80 pointer-events-none" style={{ zIndex: 0 }} />
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar onApplyClick={handleApplyClick} />

        {/* Hero Section - Brand colors */}
        <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
          <div className="hidden lg:block absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none">
            <svg
              viewBox="0 0 1200 1000"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Left side - curves outward */}
              <path
                d="M0,0 L0,1000 L120,1000 Q60,950 120,900 Q180,850 100,800 Q20,750 120,700 Q220,650 140,600 Q60,550 120,500 Q180,450 100,400 Q20,350 120,300 Q220,250 140,200 Q60,150 120,100 Q180,50 100,0 Q20,0 0,0 Z"
                fill="hsl(var(--brand-blue))"
                opacity="0.05"
              />
              {/* Right side - curves outward */}
              <path
                d="M1200,0 L1200,1000 L1080,1000 Q1140,950 1080,900 Q1020,850 1100,800 Q1180,750 1080,700 Q980,650 1060,600 Q1140,550 1080,500 Q1020,450 1100,400 Q1180,350 1080,300 Q980,250 1060,200 Q1140,150 1080,100 Q1020,50 1100,0 Q1180,0 1200,0 Z"
                fill="hsl(var(--brand-red))"
                opacity="0.05"
              />
            </svg>
          </div>

          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="inline-block mb-6">
                <div className="inline-flex items-center gap-3 relative">
                  <div className="w-12 h-[1px] bg-brand-red"></div>
                  <span className="text-sm tracking-[0.3em] uppercase text-brand-red font-medium">
                    Global Programs
                  </span>
                  <div className="w-12 h-[1px] bg-brand-red"></div>
                </div>
              </div>

              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-blue tracking-tight leading-[0.95] mb-6">
                Explore Our
                <br />
                <span className="text-brand-gray/60">Global Destinations</span>
              </h1>
              <p className="text-lg sm:text-xl text-brand-gray/70 leading-relaxed font-light max-w-3xl mx-auto">
                Discover transformative educational experiences across 5 countries. Each destination offers unique
                opportunities for academic growth, cultural immersion, and personal development.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-brand-blue font-heading mb-2">
                  {countries.length}
                </div>
                <div className="text-xs sm:text-sm text-brand-gray/60 uppercase tracking-wider">
                  Countries
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-brand-blue font-heading mb-2">
                  {countries.reduce((sum, c) => sum + c.programCount, 0)}+
                </div>
                <div className="text-xs sm:text-sm text-brand-gray/60 uppercase tracking-wider">
                  Programs
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-brand-blue font-heading mb-2">
                  2K+
                </div>
                <div className="text-xs sm:text-sm text-brand-gray/60 uppercase tracking-wider">
                  Students
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-brand-blue font-heading mb-2">
                  98%
                </div>
                <div className="text-xs sm:text-sm text-brand-gray/60 uppercase tracking-wider">
                  Success
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Global Learning Matters */}
        <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('/herobackground.png')` }}
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-white/70" />

          <div className="relative max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Side - Image with Country Gallery */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex flex-col items-center justify-center lg:order-1 gap-6"
              >
                {/* Country Images Gallery */}
                <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
                  {[
                    { src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&q=80", alt: "India - Taj Mahal" },
                    { src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&q=80", alt: "UK - London" },
                    { src: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=300&q=80", alt: "Thailand" },
                    { src: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=300&q=80", alt: "Vietnam" },
                    { src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&q=80", alt: "Japan" },
                    { src: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=300&q=80", alt: "USA" },
                  ].map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105 duration-300"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Main Image */}
                <div className="relative w-full max-w-lg h-[350px]">
                  <Image
                    src="/global-education.png"
                    alt="Global Education"
                    fill
                    className="object-contain"
                    quality={95}
                    priority
                  />
                </div>
              </motion.div>

              {/* Right Side - Content */}
              <div className="lg:order-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <div className="inline-block mb-6">
                    <div className="inline-flex items-center gap-3 relative">
                      <div className="w-12 h-[1px] bg-brand-red"></div>
                      <span className="text-sm tracking-[0.3em] uppercase text-brand-red font-medium">
                        Why Global Learning
                      </span>
                      <div className="w-12 h-[1px] bg-brand-red"></div>
                    </div>
                  </div>

                  <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-blue tracking-tight leading-[0.95] mb-6">
                    Why Study Across Borders?
                  </h2>

                  <p className="text-lg sm:text-xl text-brand-gray/70 leading-relaxed font-light mb-8">
                    Global education unlocks far more than academic knowledge. It builds independence, intercultural awareness, and the confidence to navigate an interconnected world. Each Redwood destination blends learning with real-world cultural immersion — helping students discover new perspectives and grow personally and professionally.
                  </p>

                  <div className="space-y-4">
                    {[
                      { icon: Globe, text: "Broaden your worldview through direct exposure to different cultures" },
                      { icon: GraduationCap, text: "Gain academic and professional advantages recognized internationally" },
                      { icon: Users, text: "Build global networks that shape future careers and opportunities" },
                    ].map((item, i) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                          className="flex items-start gap-4"
                        >
                          <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border-2 border-brand-blue/20 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-brand-blue" />
                          </div>
                          <p className="text-base text-brand-gray/70 leading-relaxed font-light pt-2">
                            {item.text}
                          </p>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* How Our Programs Work - Stacking Cards Animation */}
        <section className="relative bg-white">
          <div className="flex justify-between px-4 sm:px-8 lg:px-16">
            {/* Left Side - Stacking Cards */}
            <div className="w-full lg:w-3/5 grid gap-0">
              {[
                { icon: BookOpen, title: "Specialized Academic Modules", desc: "Our programs feature carefully curated academic content taught by local educators and international experts. Each module is designed to provide deep insights into the destination's culture, history, and contemporary developments.", bgColor: "bg-brand-blue", textColor: "text-white", iconBg: "bg-white/20", iconColor: "text-white", descColor: "text-white/90" },
                { icon: Heart, title: "Cultural Immersion Activities", desc: "Experience authentic cultural exchanges through museum visits, heritage walks, community interactions, and hands-on workshops. These activities help students develop a genuine understanding of local customs and traditions.", bgColor: "bg-white border-2 border-brand-blue/20", textColor: "text-brand-blue", iconBg: "bg-brand-red/10", iconColor: "text-brand-red", descColor: "text-brand-gray/70" },
                { icon: Users, title: "Guided Mentorship", desc: "Each student is supported by mentors from the Redwood international advisory network. Our mentors provide academic guidance, career counseling, and personal development support throughout the program.", bgColor: "bg-brand-red", textColor: "text-white", iconBg: "bg-white/20", iconColor: "text-white", descColor: "text-white/90" },
                { icon: CheckCircle2, title: "Safe, Well-Planned Itineraries", desc: "Every aspect of your journey is carefully planned with safety as our top priority. From pre-departure orientation to on-ground support, we ensure a seamless and secure experience.", bgColor: "bg-white border-2 border-brand-red/20", textColor: "text-brand-blue", iconBg: "bg-brand-blue/10", iconColor: "text-brand-blue", descColor: "text-brand-gray/70" },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <figure key={i} className="sticky top-20 h-screen grid place-content-center">
                    <article className={`${item.bgColor} h-80 w-full max-w-lg rounded-2xl p-8 grid place-content-start gap-4 shadow-2xl transform transition-transform duration-300`} style={{ rotate: i % 2 === 0 ? '2deg' : '-2deg' }}>
                      <div className={`w-14 h-14 rounded-xl ${item.iconBg} flex items-center justify-center mb-2`}>
                        <Icon className={`w-7 h-7 ${item.iconColor}`} />
                      </div>
                      <h3 className={`text-2xl font-heading font-bold ${item.textColor}`}>
                        {item.title}
                      </h3>
                      <p className={`${item.descColor} leading-relaxed font-light`}>
                        {item.desc}
                      </p>
                    </article>
                  </figure>
                )
              })}
            </div>

            {/* Right Side - Sticky Title */}
            <div className="hidden lg:block sticky top-20 h-screen w-2/5 grid place-content-center">
              <div className="text-center px-8">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-[1px] bg-brand-red"></div>
                  <span className="text-sm tracking-[0.3em] uppercase text-brand-red font-medium">
                    Program Structure
                  </span>
                  <div className="w-12 h-[1px] bg-brand-red"></div>
                </div>
                <h2 className="font-heading text-4xl xl:text-5xl font-bold text-brand-blue tracking-tight leading-tight mb-6">
                  How Our Global<br />Programs Work
                </h2>
                <p className="text-lg text-brand-gray/70 leading-relaxed font-light max-w-md mx-auto">
                  Each destination is built around a structured learning experience that combines academics, cultural exploration, and personal development.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Header - Only visible on small screens */}
          <div className="lg:hidden text-center px-4 py-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-[1px] bg-brand-red"></div>
              <span className="text-sm tracking-[0.3em] uppercase text-brand-red font-medium">
                Program Structure
              </span>
              <div className="w-12 h-[1px] bg-brand-red"></div>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-blue tracking-tight leading-tight mb-6">
              How Our Global Programs Work
            </h2>
            <p className="text-base text-brand-gray/70 leading-relaxed font-light max-w-lg mx-auto">
              Each destination is built around a structured learning experience that combines academics, cultural exploration, and personal development.
            </p>
          </div>
        </section>

        {/* Country Programs Grid Layout - FIXED STICKY BEHAVIOR */}
        <section
          ref={sectionRef}
          className="relative py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `
              radial-gradient(circle at 2px 2px, hsl(var(--brand-blue)) 1px, transparent 0)
            `,
              backgroundSize: '40px 40px'
            }}
          />

          <div className="relative max-w-7xl mx-auto">
            {/* Featured Large Card - First Country */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="mb-8 lg:mb-16"
            >
              <Link href={`/global-program/${countries[0].slug}`}>
                <div className="group relative overflow-hidden rounded-3xl lg:rounded-[3rem] flex flex-col lg:flex-row min-h-[300px] lg:min-h-[450px] shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-500">
                  {/* Image Side */}
                  <div className="relative w-full lg:w-2/5 h-[300px] lg:h-auto overflow-hidden">
                    <div className="absolute inset-0">
                      <Image
                        src={countries[0].image}
                        alt={countries[0].name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        quality={95}
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/30 via-transparent to-brand-blue/40" />
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="relative w-full lg:w-3/5 p-6 sm:p-8 lg:p-12 flex flex-col justify-center" style={{ backgroundColor: '#1e3a5f' }}>
                    <div className="relative z-10 space-y-6">
                      <div>
                        <div className="w-16 h-[2px] bg-red-500 mb-4" />
                        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight leading-[0.95] mb-2">
                          {countries[0].name}
                        </h2>
                        <p className="text-white/80 text-base sm:text-lg font-light italic mb-4">
                          {countries[0].tagline}
                        </p>
                      </div>
                      <p className="text-white/90 text-sm sm:text-base leading-relaxed font-light line-clamp-3">
                        {countries[0].description}
                      </p>
                      <div className="flex items-center gap-2 text-white group-hover:gap-4 transition-all pt-4">
                        <span className="text-sm font-semibold">Learn More</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Sticky Scroll Gallery for Country Cards */}
            <div className="grid grid-cols-12 gap-6 lg:gap-8">
              {/* Left Column - Scrolling cards (UK, Thailand, Vietnam) */}
              <div className="col-span-12 lg:col-span-4 grid gap-6">
                {countries.slice(1, 4).map((country, index) => (
                  <CountryGridCard
                    key={country.slug}
                    country={country}
                    index={index}
                    isInView={isInView}
                  />
                ))}
              </div>

              {/* Middle Column - Sticky Global Impact - FIXED with proper offset and bottom margin */}
              <div className="col-span-12 lg:col-span-4 hidden lg:block">
                <div className="sticky top-32 bottom-32 h-fit mb-32">
                  <div className="relative w-full h-[550px] rounded-3xl overflow-hidden shadow-2xl" style={{ backgroundColor: '#1e3a5f' }}>
                    {/* Gradient Background */}
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1e3a5f 60%, #c94a4a 100%)' }} />

                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                        backgroundSize: '30px 30px'
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8">
                      <div className="mb-6">
                        <div className="inline-flex items-center gap-3">
                          <div className="w-8 h-[1px] bg-white/50"></div>
                          <span className="text-xs tracking-[0.2em] uppercase text-white/90 font-medium">
                            Our Reach
                          </span>
                          <div className="w-8 h-[1px] bg-white/50"></div>
                        </div>
                      </div>

                      <h3 className="font-heading text-4xl xl:text-5xl font-bold text-white tracking-tight leading-tight mb-8">
                        Global<br />Impact
                      </h3>

                      <div className="grid grid-cols-2 gap-6 w-full mb-8">
                        {[
                          { value: "7+", label: "Countries", icon: Globe },
                          { value: "12+", label: "Programs", icon: BookOpen },
                          { value: "2K+", label: "Students", icon: Users },
                          { value: "98%", label: "Success", icon: Star },
                        ].map((stat, i) => {
                          const Icon = stat.icon
                          return (
                            <div key={i} className="text-center p-3">
                              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mx-auto mb-3">
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="text-2xl font-bold text-white font-heading">
                                {stat.value}
                              </div>
                              <div className="text-xs text-white/80 uppercase tracking-wider mt-1">
                                {stat.label}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Scrolling cards (USA, Bali, Singapore, South Korea) */}
              <div className="col-span-12 lg:col-span-4 grid gap-6">
                {countries.slice(4, 7).map((country, index) => (
                  <CountryGridCard
                    key={country.slug}
                    country={country}
                    index={index + 4}
                    isInView={isInView}
                  />
                ))}
              </div>
            </div>

            {/* Mobile Global Impact Section */}
            <div className="lg:hidden mt-12 mb-12">
              <GlobalImpactSection />
            </div>
          </div>
        </section>

        {/* Student Stories From Around the World */}
        <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-50/50">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--brand-red)) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />

          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="inline-block mb-6">
                <div className="inline-flex items-center gap-3 relative">
                  <div className="w-12 h-[1px] bg-brand-red"></div>
                  <span className="text-sm tracking-[0.3em] uppercase text-brand-red font-medium">
                    Student Stories
                  </span>
                  <div className="w-12 h-[1px] bg-brand-red"></div>
                </div>
              </div>

              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-blue tracking-tight leading-[0.95] mb-6">
                Student Stories From Around the World
              </h2>

              <p className="text-lg sm:text-xl text-brand-gray/70 leading-relaxed font-light max-w-3xl mx-auto">
                Real experiences from students who transformed their lives through Redwood's international programs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {[
                { quote: "My time in Japan with Redwood changed how I understand culture and communication.", name: "Aanya", origin: "India", destination: "Japan", flagUrl: "https://flagcdn.com/w80/jp.png" },
                { quote: "The UK program helped me build global confidence and clarity about my career.", name: "Matteo", origin: "Italy", destination: "UK", flagUrl: "https://flagcdn.com/w80/gb.png" },
                { quote: "Exploring heritage sites in Vietnam made history come alive.", name: "Sara", origin: "UAE", destination: "Vietnam", flagUrl: "https://flagcdn.com/w80/vn.png" },
              ].map((story, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative bg-gradient-to-br from-brand-blue/5 to-brand-red/5 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-brand-blue/10"
                >

                  <p className="text-brand-gray/80 text-base sm:text-lg leading-relaxed font-light italic mb-6 relative z-10">
                    "{story.quote}"
                  </p>

                  <div className="flex items-center gap-3 pt-4 border-t border-brand-blue/20">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-brand-blue/20 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                      <img
                        src={story.flagUrl}
                        alt={`${story.destination} flag`}
                        className="w-8 h-6 object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-brand-blue font-semibold text-sm">{story.name}</p>
                      <p className="text-brand-gray/60 text-xs font-light">
                        {story.origin} → {story.destination}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What Makes Redwood Different */}
        <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-brand-blue/5 to-brand-red/5">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--brand-red)) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />

          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="inline-block mb-6">
                <div className="inline-flex items-center gap-3 relative">
                  <div className="w-12 h-[1px] bg-brand-red"></div>
                  <span className="text-sm tracking-[0.3em] uppercase text-brand-red font-medium">
                    Our Difference
                  </span>
                  <div className="w-12 h-[1px] bg-brand-red"></div>
                </div>
              </div>

              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-blue tracking-tight leading-[0.95] mb-6">
                What Makes Redwood Different?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {[
                { icon: Leaf, title: "Rooted in Growth", desc: "Inspired by the redwood tree, our programs nurture lifelong curiosity and resilience." },
                { icon: Heart, title: "Authentic Exchange", desc: "Every destination prioritizes real cultural immersion, not tourism." },
                { icon: Award, title: "Global Academic Excellence", desc: "Programs shaped by advisors, educators, and global partners." },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className="relative bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-brand-red/20 hover:border-brand-red/40 transition-all shadow-lg"
                  >
                    <div className="w-16 h-16 rounded-xl bg-brand-red/20 border-2 border-brand-red/30 flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-brand-red" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-brand-blue mb-4">
                      {item.title}
                    </h3>
                    <p className="text-brand-gray/80 text-base leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced */}
        <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--brand-blue)) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Organic Background Shape - Continuous Wave Full Width */}
          <div className="hidden lg:block absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none">
            <svg viewBox="0 0 1200 1000" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              {/* Left side - curves outward */}
              <path
                d="M0,0 L0,1000 L120,1000 Q60,950 120,900 Q180,850 100,800 Q20,750 120,700 Q220,650 140,600 Q60,550 120,500 Q180,450 100,400 Q20,350 120,300 Q220,250 140,200 Q60,150 120,100 Q180,50 100,0 Q20,0 0,0 Z"
                fill="hsl(var(--brand-blue))"
                opacity="0.05"
              />
              {/* Right side - curves outward */}
              <path
                d="M1200,0 L1200,1000 L1080,1000 Q1140,950 1080,900 Q1020,850 1100,800 Q1180,750 1080,700 Q980,650 1060,600 Q1140,550 1080,500 Q1020,450 1100,400 Q1180,350 1080,300 Q980,250 1060,200 Q1140,150 1080,100 Q1020,50 1100,0 Q1180,0 1200,0 Z"
                fill="hsl(var(--brand-red))"
                opacity="0.05"
              />
            </svg>
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-block mb-6">
                <div className="inline-flex items-center gap-3 relative">
                  <div className="w-12 h-[1px] bg-brand-red"></div>
                  <span className="text-sm tracking-[0.3em] uppercase text-brand-red font-medium">
                    Begin Your Journey
                  </span>
                  <div className="w-12 h-[1px] bg-brand-red"></div>
                </div>
              </div>

              <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-blue tracking-tight leading-[0.95] mb-6">
                Begin Your Global Journey
              </h2>
              <p className="text-lg sm:text-xl text-brand-gray/70 leading-relaxed font-light max-w-2xl mx-auto mb-4">
                Join students who have expanded their horizons through Redwood's international programs. Whether you're interested in cultural immersion, academic advancement, or global discovery, your journey starts here.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button
                  asChild
                  className="bg-brand-red hover:bg-brand-red/90 text-white font-medium px-10 h-14 rounded-full group shadow-xl hover:shadow-2xl transition-all text-lg"
                >
                  <Link href="/contact" className="flex items-center gap-3">
                    Apply Now
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/5 font-medium px-10 h-14 rounded-full text-lg"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer onApplyClick={handleApplyClick} />

        <ApplyNowForm
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
        />
      </div>
    </main>
  )
}

// Country Grid Card Component - Premium Design
function CountryGridCard({
  country,
  index,
  isInView,
}: {
  country: any
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <Link href={`/global-program/${country.slug}`}>
        <div className="relative overflow-hidden rounded-2xl flex flex-col h-[380px] shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-gray-300">
          {/* Image Section - Full card background */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={country.image}
              alt={country.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              quality={90}
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Flag Badge - Top Right */}
          <div className="absolute top-4 right-4 z-10">
            <div className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center overflow-hidden">
              <img
                src={country.flagUrl}
                alt={`${country.name} flag`}
                className="w-8 h-6 object-cover"
              />
            </div>
          </div>

          {/* Left Accent Bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-red-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Content Section - Bottom */}
          <div className="relative mt-auto p-6 z-10">
            {/* Country Name & Tagline */}
            <div className="mb-4">
              <h3 className="font-heading text-2xl font-bold text-white tracking-tight mb-1 group-hover:text-white transition-colors">
                {country.name}
              </h3>
              <p className="text-white/80 text-sm font-light italic">
                {country.tagline}
              </p>
            </div>

            {/* Program count & CTA */}
            <div className="flex items-center justify-between pt-3 border-t border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <BookOpen className="w-3 h-3 text-white" />
                </div>
                <span className="text-white/90 text-xs font-medium">{country.programCount} Programs</span>
              </div>
              <div className="flex items-center gap-1.5 text-white group-hover:gap-3 transition-all duration-300">
                <span className="text-sm font-semibold">Explore</span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-red-500 transition-colors duration-300">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// Global Impact Section Component
function GlobalImpactSection() {
  return (
    <div className="relative py-16 sm:py-20 lg:py-24 overflow-hidden my-12 sm:my-16 lg:my-20 rounded-3xl" style={{ backgroundColor: '#1e3a5f' }}>
      {/* Deep Brand Colors Background - using inline style for guaranteed visibility */}
      <div className="absolute inset-0 rounded-3xl" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1e3a5f 60%, #c94a4a 100%)' }} />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 rounded-3xl"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-block mb-6">
            <div className="inline-flex items-center gap-3 relative">
              <div className="w-12 h-[1px] bg-white/50"></div>
              <span className="text-sm tracking-[0.3em] uppercase text-white font-medium">
                Our Impact
              </span>
              <div className="w-12 h-[1px] bg-white/50"></div>
            </div>
          </div>

          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[0.95] mb-6">
            Our Global Impact
          </h2>
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed font-light max-w-3xl mx-auto">
            Students from around the world have transformed their academic and personal growth through Redwood's international learning experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8">
          {[
            { value: "5+", label: "Countries", icon: Globe },
            { value: "8+", label: "Programs", icon: BookOpen },
            { value: "2000+", label: "Students", icon: Users },
            { value: "98%", label: "Satisfaction", icon: Star },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-white/90 uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}