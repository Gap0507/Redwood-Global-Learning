"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Mic2, Users, Globe, BookOpen, Award, Presentation, MessageSquare, Handshake } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ApplyNowForm } from "@/components/forms/ApplyNowForm"
import { getConferencesPageContent, defaultConferencesPageContent, ConferencesPageContent } from "@/lib/conferencesPageContent"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { BookOpen, Globe, Award, Presentation, MessageSquare, Users, Mic2 }

export default function ConferencesPage() {
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
    const [content, setContent] = useState<ConferencesPageContent>(defaultConferencesPageContent)
    const benefitsRef = useRef<HTMLElement>(null)
    const isBenefitsInView = useInView(benefitsRef, { once: true, margin: "-100px" })
    const heroRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
    const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

    useEffect(() => { getConferencesPageContent().then(setContent) }, [])

    const handleApplyClick = () => setIsApplyModalOpen(true)

    return (
        <main className="min-h-screen relative bg-background">
            <Navbar onApplyClick={handleApplyClick} />

            {/* ─── Hero Section ─── */}
            <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[85vh] flex items-center">
                <motion.div className="absolute inset-0 z-0" style={{ y: heroImageY }}>
                    <Image
                        src={content.hero.heroImage}
                        alt="Conference venue"
                        fill
                        className="object-cover scale-110"
                        priority
                        quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f3a5c] via-[#0f3a5c]/85 to-[#0f3a5c]/40" />
                </motion.div>

                <div className="hidden lg:block absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none z-[1]">
                    <svg viewBox="0 0 1200 1000" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                        <path d="M1200,0 L1200,1000 L1080,1000 Q1140,950 1080,900 Q1020,850 1100,800 Q1180,750 1080,700 Q980,650 1060,600 Q1140,550 1080,500 Q1020,450 1100,400 Q1180,350 1080,300 Q980,250 1060,200 Q1140,150 1080,100 Q1020,50 1100,0 Q1180,0 1200,0 Z" fill="hsl(var(--brand-red))" opacity="0.1" />
                    </svg>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="inline-flex items-center gap-3 mb-6">
                                <div className="w-12 h-[2px] bg-brand-red" />
                                <span className="text-sm tracking-[0.3em] uppercase text-white/80 font-medium">{content.hero.tagline}</span>
                            </div>

                            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8">
                                {content.hero.title} <br />
                                <span className="text-brand-red">{content.hero.highlightedText}</span>
                            </h1>

                            <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-light mb-10 max-w-xl">
                                {content.hero.description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button onClick={handleApplyClick} className="bg-brand-red hover:bg-brand-red-dark text-white font-medium px-8 h-14 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all">
                                    {content.hero.ctaText}
                                </Button>
                            </div>
                        </motion.div>

                        {/* Floating Stats Card */}
                        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:grid grid-cols-2 gap-4">
                            {content.hero.impactNumbers.map((stat, i) => (
                                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center hover:bg-white/20 transition-all duration-300">
                                    <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                                    <p className="text-sm text-white/70 font-light">{stat.label}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── Mission & Philosophy Section ─── */}
            <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--brand-blue)) 1px, transparent 0)`, backgroundSize: "40px 40px" }} />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-brand-blue mb-8 leading-tight">
                                {content.mission.title}
                            </h2>
                            <div className="space-y-6 text-lg text-brand-gray/80 font-light leading-relaxed">
                                {content.mission.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                                <div className="flex items-center gap-4 pt-4">
                                    <div className="w-16 h-16 rounded-full bg-brand-red/10 flex items-center justify-center">
                                        <Mic2 className="w-8 h-8 text-brand-red" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-blue text-xl">{content.mission.calloutTitle}</h4>
                                        <p className="text-sm">{content.mission.calloutSubtitle}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                            <Image src={content.mission.image} alt="Students at conference" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/40 to-transparent mix-blend-multiply" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── Benefits Section with Alternating Cards ─── */}
            <section ref={benefitsRef} className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-brand-blue/5 relative">
                <div className="hidden lg:block absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none">
                    <svg viewBox="0 0 1200 1000" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                        <path d="M0,0 L0,1000 L120,1000 Q60,950 120,900 Q180,850 100,800 Q20,750 120,700 Q220,650 140,600 Q60,550 120,500 Q180,450 100,400 Q20,350 120,300 Q220,250 140,200 Q60,150 120,100 Q180,50 100,0 Q20,0 0,0 Z" fill="hsl(var(--brand-blue))" opacity="0.05" />
                        <path d="M1200,0 L1200,1000 L1080,1000 Q1140,950 1080,900 Q1020,850 1100,800 Q1180,750 1080,700 Q980,650 1060,600 Q1140,550 1080,500 Q1020,450 1100,400 Q1180,350 1080,300 Q980,250 1060,200 Q1140,150 1080,100 Q1020,50 1100,0 Q1180,0 1200,0 Z" fill="hsl(var(--brand-red))" opacity="0.05" />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                            <div className="inline-flex items-center gap-3 mb-6">
                                <div className="w-12 h-[2px] bg-brand-red" />
                                <span className="text-sm tracking-[0.3em] uppercase text-brand-red font-medium">{content.benefits.tagline}</span>
                                <div className="w-12 h-[2px] bg-brand-red" />
                            </div>
                            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-brand-blue mb-6">{content.benefits.title}</h2>
                            <p className="text-xl text-brand-gray/80 font-light">{content.benefits.subtitle}</p>
                        </motion.div>
                    </div>

                    <div className="space-y-12 lg:space-y-20">
                        {content.benefits.items.map((benefit, i) => {
                            const Icon = iconMap[benefit.icon] || BookOpen
                            const isReversed = i % 2 !== 0
                            return (
                                <motion.div key={benefit.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.1 }} className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-16 items-center`}>
                                    <div className="relative w-full lg:w-1/2 aspect-[16/10] rounded-3xl overflow-hidden shadow-xl group">
                                        <Image src={benefit.image} alt={benefit.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/30 to-transparent" />
                                    </div>
                                    <div className="w-full lg:w-1/2 space-y-5">
                                        <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center">
                                            <Icon className="w-7 h-7 text-brand-blue" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-brand-blue font-heading">{benefit.title}</h3>
                                        <p className="text-lg text-brand-gray/80 leading-relaxed font-light">{benefit.description}</p>
                                        <button onClick={handleApplyClick} className="inline-flex items-center gap-2 text-brand-red font-medium hover:gap-3 transition-all duration-300">
                                            Learn More <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ─── Expanding Partnerships CTA ─── */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image src="/herobackground.png" alt="Background Pattern" fill className="object-cover" />
                </div>
                <div className="absolute top-0 left-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20 z-[1]">
                    <svg viewBox="0 0 1200 1000" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                        <path d="M0,0 L0,1000 L120,1000 Q60,950 120,900 Q180,850 100,800 Q20,750 120,700 Q220,650 140,600 Q60,550 120,500 Q180,450 100,400 Q20,350 120,300 Q220,250 140,200 Q60,150 120,100 Q180,50 100,0 Q20,0 0,0 Z" fill="var(--brand-red)" />
                        <path d="M1200,0 L1200,1000 L1080,1000 Q1140,950 1080,900 Q1020,850 1100,800 Q1180,750 1080,700 Q980,650 1060,600 Q1140,550 1080,500 Q1020,450 1100,400 Q1180,350 1080,300 Q980,250 1060,200 Q1140,150 1080,100 Q1020,50 1100,0 Q1180,0 1200,0 Z" fill="var(--brand-red)" />
                    </svg>
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <Handshake className="w-16 h-16 text-brand-red mx-auto mb-8" />
                        <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-6 leading-tight text-brand-blue">
                            {content.cta.title.includes("\n") ? content.cta.title.split("\n").map((line, i) => <span key={i}>{line}<br /></span>) : content.cta.title}
                        </h2>
                        <p className="text-xl text-[#0f3a5c] font-medium opacity-90 mb-10 max-w-2xl mx-auto">{content.cta.description}</p>
                        <Button onClick={handleApplyClick} className="bg-brand-red hover:bg-[#c94a4a] text-white font-medium px-10 h-14 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all">
                            {content.cta.ctaText}
                        </Button>
                    </motion.div>
                </div>
            </section>

            <Footer onApplyClick={handleApplyClick} />
            <ApplyNowForm isOpen={isApplyModalOpen} onClose={() => setIsApplyModalOpen(false)} />
        </main>
    )
}
