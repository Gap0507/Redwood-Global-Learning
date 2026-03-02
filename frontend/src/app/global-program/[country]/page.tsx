"use client"

import { useParams, notFound } from "next/navigation"
import { motion } from "framer-motion"
import { ReactLenis } from 'lenis/react'
import { getCountryData, CountryData } from "@/lib/country-data"
import { getCountryPageContent, CountryPageContent } from "@/lib/countryPageContent"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, Users, Globe, Home, BookOpen, MapPin, Star, CheckCircle2, Loader2 } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ApplyNowForm } from "@/components/forms/ApplyNowForm"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

// Generate image URL based on program title and country
function getProgramImage(programTitle: string, countryName: string): string {
  const imageMap: Record<string, Record<string, string>> = {
    india: {
      "Cultural Immersion Program": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
      "Social Innovation Lab": "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80",
      "Business & Entrepreneurship": "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&q=80",
    },
    uk: {
      "Global Leadership Academy": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
      "Creative Arts & Culture": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "STEM Innovation Program": "https://images.unsplash.com/photo-1520637836862-4d197d17c25a?w=800&q=80",
    },
    thailand: {
      "Southeast Asia Explorer": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
      "Digital Nomad Experience": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "Sustainable Tourism & Conservation": "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
    },
    vietnam: {
      "Vietnam Heritage Program": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80",
      "Innovation & Technology Hub": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      "Rural Development Initiative": "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80",
    },
    japan: {
      "Innovation & Technology Exchange": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
      "Cultural Arts & Traditions": "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80",
      "Global Business & Trade": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    },
    usa: {
      "American Dream Program": "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80",
      "Innovation & Entrepreneurship": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80",
      "Social Impact & Community Service": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    },
  }

  const countryKey = countryName.toLowerCase()
  return imageMap[countryKey]?.[programTitle] || "https://images.unsplash.com/photo-1434030216419-0e55c8712c20"
}

/**
 * Maps CMS CountryPageContent to the existing CountryData interface
 * so all page JSX stays unchanged.
 */
function mapCmsToCountryData(cms: CountryPageContent): CountryData {
  return {
    name: cms.name,
    heroImage: cms.hero.heroImage,
    carouselImages: cms.hero.carouselImages.map((img) => ({
      image: img.image,
      title: img.title,
      description: img.description,
    })),
    heroTitle: cms.hero.heroTitle || `Explore Our Programs in ${cms.name}`,
    heroDescription: cms.hero.heroDescription || cms.programs.description,
    programsTitle: cms.programs.mainTitle,
    programsDescription: cms.programs.description,
    programButtons: (cms.programs.buttons && cms.programs.buttons.length > 0)
      ? cms.programs.buttons.map(btn => btn.text)
      : ["Academic Credits", "Cultural Activities", "24/7 Support"],
    programs: cms.programs.programCards.map((card) => ({
      title: card.title,
      duration: card.timeline,
      description: card.description,
      image: card.image,
    })),
    lifeTitle: cms.lifeExperience.title,
    lifeDescription: cms.lifeExperience.description,
    life: {
      housing: {
        title: cms.lifeExperience.buttonNames[0] || "Housing",
        description: cms.information.housing.content,
        image: cms.information.housing.image,
      },
      culture: {
        title: cms.lifeExperience.buttonNames[1] || "Culture",
        description: cms.information.culture.content,
        image: cms.information.culture.image,
      },
      language: {
        title: cms.lifeExperience.buttonNames[2] || "Language",
        description: cms.information.language.content,
        image: cms.information.language.image,
      },
    },
    testimonials: cms.studentStories.map((story) => ({
      name: story.name,
      title: story.program,
      quote: story.description,
      starRating: story.starRating,
    })),
    ctaTitle: cms.cta.title,
    ctaDescription: cms.cta.description,
  };
}

export default function CountryProgramPage() {
  const params = useParams()
  const country = params?.country as string
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [data, setData] = useState<CountryData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!country) return;
    setIsLoading(true);
    getCountryPageContent(country)
      .then((cmsData) => {
        if (cmsData) {
          setData(mapCmsToCountryData(cmsData));
        } else {
          // Fallback to static data
          const staticData = getCountryData(country);
          setData(staticData || null);
        }
      })
      .catch(() => {
        // Fallback to static data on error
        const staticData = getCountryData(country);
        setData(staticData || null);
      })
      .finally(() => setIsLoading(false));
  }, [country]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
          <p className="text-foreground/60 font-light">Loading...</p>
        </div>
      </main>
    )
  }

  if (!data) {
    notFound()
  }

  const handleApplyClick = () => setIsApplyModalOpen(true)

  return (
    <ReactLenis root>
      <main className="min-h-screen relative">
        {/* Global background overlay for readability */}
        <div className="fixed inset-0 bg-white/80 pointer-events-none" style={{ zIndex: 0 }} />
        <div className="relative" style={{ zIndex: 1 }}>
          <Navbar onApplyClick={handleApplyClick} />
          {/* Hero Section - Viewport Contained Layout */}
          <section className="relative lg:h-screen lg:min-h-[700px] pt-28 sm:pt-32 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden lg:flex lg:items-center">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background-light/50 to-background" />

            {/* Floating Orbs */}
            <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative w-full max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Side - Main Image + Gallery */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="hidden lg:flex flex-col gap-4 lg:order-1"
                >
                  {/* Main Hero Image - Full Width, Less Height */}
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={data.heroImage || data.programs[0]?.image || "https://images.unsplash.com/photo-1434030216419-0e55c8712c20?w=800&q=80"}
                      alt={`${data.name} main attraction`}
                      fill
                      className="object-cover"
                      quality={95}
                      priority
                    />
                    {/* Overlay with country name */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                        <MapPin className="w-3.5 h-3.5 text-white" />
                        <span className="text-white font-semibold text-sm">
                          {data.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Gallery Marquee - Continuous Scrolling */}
                  <div className="relative w-full overflow-hidden rounded-xl">
                    <div className="flex animate-marquee gap-3">
                      {/* First Set */}
                      {(data.carouselImages && data.carouselImages.length > 0 ? data.carouselImages.map(ci => ci.image) : [
                        data.programs[1]?.image || "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80",
                        data.programs[2]?.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80",
                        data.programs[0]?.image || "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80",
                        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
                        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80",
                        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&q=80",
                      ]).map((imgSrc, i) => (
                        <div
                          key={`first-${i}`}
                          className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden shadow-lg"
                        >
                          <Image
                            src={imgSrc}
                            alt={`${data.name} attraction ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="96px"
                            quality={85}
                          />
                        </div>
                      ))}
                      {/* Second Set for Seamless Loop */}
                      {(data.carouselImages && data.carouselImages.length > 0 ? data.carouselImages.map(ci => ci.image) : [
                        data.programs[1]?.image || "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80",
                        data.programs[2]?.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80",
                        data.programs[0]?.image || "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80",
                        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
                        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80",
                        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&q=80",
                      ]).map((imgSrc, i) => (
                        <div
                          key={`second-${i}`}
                          className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden shadow-lg"
                        >
                          <Image
                            src={imgSrc}
                            alt={`${data.name} attraction ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="96px"
                            quality={85}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Right Side - Content Only (desktop) */}
                <div className="hidden lg:block lg:order-2 space-y-5">
                  {/* Content Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="space-y-5"
                  >
                    {/* Location Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue/10 rounded-full border border-brand-blue/20">
                      <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                      <span className="text-xs font-medium text-brand-blue uppercase tracking-wider">
                        {data.name}
                      </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-blue tracking-tight leading-[0.95]">
                      {data.heroTitle.split(' ').map((word, i) => (
                        <span key={i}>
                          {word === 'Programs' ? <span className="text-foreground/50 font-light">{word}</span> : word}
                          {i < data.heroTitle.split(' ').length - 1 ? ' ' : ''}
                          {i === 0 && <br />}
                        </span>
                      ))}
                    </h1>

                    <p className="text-base sm:text-lg text-foreground/70 leading-relaxed font-light max-w-lg">
                      {data.heroDescription}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        asChild
                        className="bg-brand-red hover:bg-brand-red-dark text-white font-medium px-8 h-12 rounded-full group shadow-lg hover:shadow-xl transition-all text-base"
                      >
                        <Link href="/contact" className="flex items-center gap-2">
                          Apply Now
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-2 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/5 font-medium px-8 h-12 rounded-full text-base"
                      >
                        <Link href="#programs">Explore Programs</Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Mobile Layout - Centered Content */}
              <div className="lg:hidden text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-4"
                >
                  {/* Main Mobile Image */}
                  <div className="relative w-full max-w-xs mx-auto aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={data.programs[0]?.image || "https://images.unsplash.com/photo-1434030216419-0e55c8712c20?w=800&q=80"}
                      alt={`${data.name} main attraction`}
                      fill
                      className="object-cover"
                      quality={90}
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                        <MapPin className="w-3 h-3 text-white" />
                        <span className="text-white font-semibold text-xs">
                          {data.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Content */}
                  <div className="space-y-3 px-2">
                    <h1 className="font-heading text-2xl font-bold text-brand-blue">
                      {data.name} <span className="text-foreground/50 font-light">Programs</span>
                    </h1>
                    <p className="text-sm text-foreground/70 leading-relaxed line-clamp-2">
                      {data.heroDescription}
                    </p>
                    <div className="flex justify-center gap-3 pt-2">
                      <Button
                        asChild
                        className="bg-brand-red hover:bg-brand-red-dark text-white font-medium px-5 h-10 rounded-full text-sm"
                      >
                        <Link href="/contact">Apply Now</Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-2 border-brand-blue/30 text-brand-blue font-medium px-5 h-10 rounded-full text-sm"
                      >
                        <Link href="#programs">Explore</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* STICKY SCROLL SECTIONS WRAPPER */}
          <div className="wrapper">
            {/* Programs Section - Sticky Title Left, Scrollable Cards Right */}
            <section id="programs" className="relative w-full bg-background">
              <div className="grid lg:grid-cols-2">
                {/* Left - Sticky Title */}
                <div className="lg:sticky lg:top-0 lg:h-screen flex items-center justify-center px-4 sm:px-8 lg:px-16 py-12 lg:py-0">
                  <div className="max-w-md">
                    <div className="inline-flex items-center gap-3 mb-6">
                      <div className="w-12 h-[2px] bg-brand-red" />
                      <span className="text-sm tracking-[0.3em] uppercase text-brand-red font-medium">
                        Our Programs
                      </span>
                    </div>
                    <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-blue tracking-tight leading-[0.95] mb-6">
                      {data.programsTitle.split(' ').slice(0, -2).join(' ')}<br />
                      <span className="text-foreground/50">{data.programsTitle.split(' ').slice(-2).join(' ')}</span>
                    </h2>
                    <p className="text-lg text-foreground/70 leading-relaxed font-light mb-8">
                      {data.programsDescription}
                    </p>
                    <Button
                      asChild
                      className="bg-brand-red hover:bg-brand-red-dark text-white font-medium px-8 h-12 rounded-full group shadow-lg"
                    >
                      <Link href="/contact" className="flex items-center gap-2">
                        Apply Now
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Right - Scrollable Program Cards */}
                <div className="py-20 px-4 sm:px-8 space-y-8">
                  {data.programs.map((program, index) => (
                    <motion.div
                      key={program.title}
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="group"
                    >
                      <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500">
                        {/* Program Image */}
                        <div className="relative h-64 sm:h-80 overflow-hidden">
                          <Image
                            src={program.image || getProgramImage(program.title, data.name)}
                            alt={program.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            quality={90}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4">
                            <span className="inline-flex items-center px-4 py-2 bg-brand-red text-white text-sm font-medium rounded-full">
                              <Calendar className="w-4 h-4 mr-2" />
                              {program.duration}
                            </span>
                          </div>
                        </div>

                        {/* Program Content */}
                        <div className="p-6 sm:p-8">
                          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-brand-blue mb-4">
                            {program.title}
                          </h3>
                          <p className="text-foreground/70 leading-relaxed font-light mb-6">
                            {program.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {data.programButtons.map((feature) => (
                              <span key={feature} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-blue/5 border border-brand-blue/20 rounded-full text-xs text-brand-blue font-medium">
                                <CheckCircle2 className="w-3 h-3" />
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Life in Country - Full Screen Sticky Cards */}
            <section className="relative bg-background">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--brand-blue)) 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }}
              />

              {/* Section Header - Sticky */}
              <div className="lg:sticky lg:top-0 lg:h-screen flex items-center justify-center text-center px-4 sm:px-8 py-12 lg:py-0 z-10 bg-background">
                {/* Decorative floating orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-brand-red/5 rounded-full blur-3xl" />

                <div className="max-w-4xl">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-12 h-[2px] bg-brand-red" />
                    <span className="text-sm tracking-[0.3em] uppercase text-brand-red font-medium">
                      Life Experience
                    </span>
                    <div className="w-12 h-[2px] bg-brand-red" />
                  </div>
                  <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-blue tracking-tight leading-[0.95] mb-6">
                    {data.lifeTitle || `Life in ${data.name}`}
                  </h2>
                  <p className="text-xl text-foreground/60 leading-relaxed font-light mb-12">
                    {data.lifeDescription || "Everything you need to know about living and learning"}<br className="hidden sm:block" /> Scroll to explore 👇
                  </p>

                  {/* Feature Preview Icons */}
                  <div className="flex justify-center items-center gap-8 sm:gap-12">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 border-2 border-brand-blue/20 flex items-center justify-center">
                        <Home className="w-8 h-8 text-brand-blue" />
                      </div>
                      <span className="text-sm font-medium text-foreground/60">Housing</span>
                    </div>
                    <div className="w-16 h-[2px] bg-gradient-to-r from-brand-blue/20 via-brand-red/30 to-brand-blue/20 hidden sm:block" />
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-2xl bg-brand-red/10 border-2 border-brand-red/20 flex items-center justify-center">
                        <Users className="w-8 h-8 text-brand-red" />
                      </div>
                      <span className="text-sm font-medium text-foreground/60">Culture</span>
                    </div>
                    <div className="w-16 h-[2px] bg-gradient-to-r from-brand-blue/20 via-brand-red/30 to-brand-blue/20 hidden sm:block" />
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 border-2 border-brand-blue/20 flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-brand-blue" />
                      </div>
                      <span className="text-sm font-medium text-foreground/60">Language</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Housing Card - Sticky */}
              <div className="lg:sticky lg:top-0 lg:h-screen flex items-center justify-center px-4 sm:px-8 py-12 lg:py-0 bg-white rounded-t-[3rem] z-20 shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
                <div className="max-w-4xl w-full grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="w-20 h-20 rounded-2xl bg-brand-blue/10 border-2 border-brand-blue/30 flex items-center justify-center">
                      <Home className="w-10 h-10 text-brand-blue" />
                    </div>
                    <h3 className="font-heading text-4xl sm:text-5xl font-bold text-brand-blue">
                      {data.life.housing.title}
                    </h3>
                    <p className="text-lg text-foreground/70 leading-relaxed font-light">
                      {data.life.housing.description}
                    </p>
                  </div>
                  <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src={data.life.housing.image || data.programs[0]?.image || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"}
                      alt="Housing"
                      fill
                      className="object-cover"
                      quality={90}
                    />
                  </div>
                </div>
              </div>

              {/* Culture Card - Sticky */}
              <div className="lg:sticky lg:top-0 lg:h-screen flex items-center justify-center px-4 sm:px-8 py-12 lg:py-0 bg-gradient-to-br from-gray-50 to-white rounded-t-[3rem] z-30 shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
                <div className="max-w-4xl w-full grid lg:grid-cols-2 gap-12 items-center">
                  <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl lg:order-1">
                    <Image
                      src={data.life.culture.image || data.programs[1]?.image || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"}
                      alt="Culture"
                      fill
                      className="object-cover"
                      quality={90}
                    />
                  </div>
                  <div className="space-y-6 lg:order-2">
                    <div className="w-20 h-20 rounded-2xl bg-brand-red/10 border-2 border-brand-red/30 flex items-center justify-center">
                      <Users className="w-10 h-10 text-brand-red" />
                    </div>
                    <h3 className="font-heading text-4xl sm:text-5xl font-bold text-brand-blue">
                      {data.life.culture.title}
                    </h3>
                    <p className="text-lg text-foreground/70 leading-relaxed font-light">
                      {data.life.culture.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Language Card - Sticky */}
              <div className="lg:sticky lg:top-0 lg:h-screen flex items-center justify-center px-4 sm:px-8 py-12 lg:py-0 bg-gradient-to-br from-white to-gray-100 rounded-t-[3rem] z-40 shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
                <div className="max-w-4xl w-full grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="w-20 h-20 rounded-2xl bg-brand-blue/10 border-2 border-brand-blue/30 flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-brand-blue" />
                    </div>
                    <h3 className="font-heading text-4xl sm:text-5xl font-bold text-brand-blue">
                      {data.life.language.title}
                    </h3>
                    <p className="text-lg text-foreground/70 leading-relaxed font-light">
                      {data.life.language.description}
                    </p>
                  </div>
                  <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src={data.life.language.image || data.programs[2]?.image || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80"}
                      alt="Language"
                      fill
                      className="object-cover"
                      quality={90}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Section - Sticky Title with Scrollable Images */}
            <section className="relative w-full bg-background">
              <div className="grid lg:grid-cols-2 px-4 sm:px-8">
                {/* Left - Scrollable Testimonial Images */}
                <div className="py-20 space-y-8">
                  {data.testimonials.map((testimonial, index) => (
                    <motion.figure
                      key={testimonial.name}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="lg:sticky lg:top-20 lg:h-[calc(100vh-10rem)] grid place-content-center"
                    >
                      <div className="relative bg-white border border-gray-200 p-8 sm:p-10 rounded-3xl max-w-md shadow-2xl">
                        {/* Quote Icon */}
                        <div className="absolute top-6 right-6 w-16 h-16 text-brand-blue/10">
                          <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.996zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>

                        {/* Avatar */}
                        <div className="w-16 h-16 rounded-full bg-brand-red/10 border-4 border-brand-red/30 flex items-center justify-center mb-6">
                          <span className="text-brand-red font-heading text-2xl font-bold">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>

                        {/* Quote */}
                        <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed font-light italic mb-6">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>

                        {/* Name & Title */}
                        <div className="border-t border-gray-200 pt-6">
                          <h4 className="font-heading text-xl font-bold text-brand-blue mb-1">
                            {testimonial.name}
                          </h4>
                          <p className="text-foreground/60 text-sm">
                            {testimonial.title}
                          </p>
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 mt-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-5 h-5",
                                i < (testimonial.starRating || 5) ? "fill-brand-red text-brand-red" : "text-gray-300"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.figure>
                  ))}
                </div>

                {/* Right - Sticky Title */}
                <div className="lg:sticky lg:top-0 lg:h-screen flex items-center justify-center px-4 sm:px-8 py-12 lg:py-0">
                  <div className="max-w-md text-right">
                    <div className="inline-flex items-center gap-3 mb-6 justify-end">
                      <span className="text-sm tracking-[0.3em] uppercase text-brand-blue font-medium">
                        Student Stories
                      </span>
                      <div className="w-12 h-[2px] bg-brand-blue" />
                    </div>
                    <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-blue tracking-tight leading-[0.95] mb-6">
                      Real<br />Experiences
                    </h2>
                    <p className="text-lg text-foreground/70 leading-relaxed font-light">
                      Hear from students who transformed their lives through our programs in {data.name}.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section - Full Screen Sticky */}
            <section className="lg:sticky lg:top-0 lg:h-screen flex items-center justify-center bg-background text-center px-4 sm:px-8 py-16 lg:py-0 rounded-t-[3rem] overflow-hidden shadow-[0_-20px_60px_rgba(0,0,0,0.1)]">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--brand-blue)) 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }}
              />

              {/* Decorative Orbs */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl" />

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl"
              >
                <div className="inline-flex items-center gap-3 mb-8">
                  <div className="w-12 h-[2px] bg-brand-red" />
                  <span className="text-sm tracking-[0.3em] uppercase text-brand-red font-medium">
                    Get Started
                  </span>
                  <div className="w-12 h-[2px] bg-brand-red" />
                </div>

                <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-blue tracking-tight leading-[0.95] mb-8">
                  {data.ctaTitle || (<>Ready to Begin Your<br /><span className="text-brand-red">Journey in {data.name}?</span></>)}
                </h2>

                <p className="text-xl text-foreground/60 leading-relaxed font-light max-w-2xl mx-auto mb-10">
                  {data.ctaDescription || "Join thousands of students who have transformed their lives through our programs"}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    className="bg-brand-red hover:bg-brand-red/90 text-white font-bold px-10 h-14 rounded-full group shadow-xl hover:shadow-2xl transition-all text-lg"
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
            </section>
          </div>

          {/* Footer Section */}
          <Footer onApplyClick={handleApplyClick} />

          <ApplyNowForm
            isOpen={isApplyModalOpen}
            onClose={() => setIsApplyModalOpen(false)}
          />
        </div>
      </main>
    </ReactLenis>
  )
}
