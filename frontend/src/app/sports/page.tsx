"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Trophy, Users, Globe, Building2, Medal, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ApplyNowForm } from "@/components/forms/ApplyNowForm"
import { getSportsPageContent, defaultSportsPageContent, SportsPageContent } from "@/lib/sportsPageContent"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { Building2, Users, Target, Globe, Trophy, Medal }

export default function SportsPage() {
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
    const [content, setContent] = useState<SportsPageContent>(defaultSportsPageContent)

    useEffect(() => { getSportsPageContent().then(setContent) }, [])

    const handleApplyClick = () => setIsApplyModalOpen(true)

    return (
        <main className="min-h-screen relative bg-background">
            <Navbar onApplyClick={handleApplyClick} />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[80vh] flex items-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={content.hero.heroImage}
                        alt="Sports stadium"
                        fill
                        className="object-cover"
                        priority
                        quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f3a5c] via-[#0f3a5c]/80 to-transparent" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-[2px] bg-brand-red" />
                            <span className="text-sm tracking-[0.3em] uppercase text-white font-medium">
                                {content.hero.tagline}
                            </span>
                        </div>

                        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8">
                            {content.hero.title} <br />
                            <span className="text-brand-red">{content.hero.highlightedText}</span>
                        </h1>

                        <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-light mb-10 max-w-2xl">
                            {content.hero.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                onClick={handleApplyClick}
                                className="bg-brand-red hover:bg-brand-red-dark text-white font-medium px-8 h-14 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all"
                            >
                                {content.hero.ctaText}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Impact Section */}
            <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--brand-blue)) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-brand-blue mb-8 leading-tight">
                                {content.mission.title}
                            </h2>
                            <div className="space-y-6 text-lg text-brand-gray/80 font-light leading-relaxed">
                                {content.mission.paragraphs.map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                                <div className="flex items-center gap-4 pt-4">
                                    <div className="w-16 h-16 rounded-full bg-brand-red/10 flex items-center justify-center">
                                        <Trophy className="w-8 h-8 text-brand-red" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-blue text-xl">{content.mission.calloutTitle}</h4>
                                        <p className="text-sm">{content.mission.calloutSubtitle}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <Image
                                src={content.mission.image}
                                alt="Student athletes"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/40 to-transparent mix-blend-multiply" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Structured Benefits Grid */}
            <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-brand-blue/5 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-[2px] bg-brand-red" />
                            <span className="text-sm tracking-[0.3em] uppercase text-brand-red font-medium">
                                {content.benefits.tagline}
                            </span>
                            <div className="w-12 h-[2px] bg-brand-red" />
                        </div>
                        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-brand-blue mb-6">
                            {content.benefits.title}
                        </h2>
                        <p className="text-xl text-brand-gray/80 font-light">
                            {content.benefits.subtitle}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {content.benefits.items.map((benefit, i) => {
                            const Icon = iconMap[benefit.icon] || Trophy;
                            return (
                                <motion.div
                                    key={benefit.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-brand-blue/5 hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row"
                                >
                                    <div className="relative w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden">
                                        <Image
                                            src={benefit.image}
                                            alt={benefit.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="p-8 sm:w-3/5 flex flex-col justify-center">
                                        <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-6">
                                            <Icon className="w-6 h-6 text-brand-blue" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-brand-blue mb-3 font-heading">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-brand-gray/80 leading-relaxed font-light">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Expansion/CTA Banner */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-blue text-white relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/herobackground.png"
                        alt="Background Pattern"
                        fill
                        className="object-cover opacity-90 mix-blend-multiply"
                    />
                </div>

                <div className="absolute top-0 left-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                    <svg viewBox="0 0 1200 1000" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                        <path d="M0,0 L0,1000 L120,1000 Q60,950 120,900 Q180,850 100,800 Q20,750 120,700 Q220,650 140,600 Q60,550 120,500 Q180,450 100,400 Q20,350 120,300 Q220,250 140,200 Q60,150 120,100 Q180,50 100,0 Q20,0 0,0 Z" fill="var(--brand-red)" />
                        <path d="M1200,0 L1200,1000 L1080,1000 Q1140,950 1080,900 Q1020,850 1100,800 Q1180,750 1080,700 Q980,650 1060,600 Q1140,550 1080,500 Q1020,450 1100,400 Q1180,350 1080,300 Q980,250 1060,200 Q1140,150 1080,100 Q1020,50 1100,0 Q1180,0 1200,0 Z" fill="var(--brand-red)" />
                    </svg>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <Medal className="w-16 h-16 text-brand-red mx-auto mb-8" />
                    <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-6 leading-tight text-brand-blue">
                        {content.cta.title.includes("\n") ? content.cta.title.split("\n").map((line, i) => <span key={i}>{line}<br /></span>) : content.cta.title}
                    </h2>
                    <p className="text-xl text-[#0f3a5c] font-medium opacity-90 mb-10 max-w-2xl mx-auto">
                        {content.cta.description}
                    </p>

                    <Button
                        onClick={handleApplyClick}
                        className="bg-brand-red hover:bg-[#c94a4a] text-white font-medium px-10 h-14 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all"
                    >
                        {content.cta.ctaText}
                    </Button>
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
