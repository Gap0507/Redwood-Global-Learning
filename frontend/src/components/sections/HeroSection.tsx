"use client"

import { motion, Variants } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Globe, ArrowRight } from "lucide-react"
import Image from "next/image"
import { Globe as InteractiveGlobe } from "@/components/ui/globe"

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1], // Custom ease for smooth feel
        },
    },
}

const headlineVariants: Variants = {
    hidden: { opacity: 0, y: 6 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
}

const headlineText = "GROW BEYOND BORDERS"
const typewriterWords = ["global cultures", "real-world learning", "international communities"]

export function HeroSection() {
    const [index, setIndex] = useState(0)
    const [subIndex, setSubIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const [pause, setPause] = useState(false)

    useEffect(() => {
        if (pause) return

        const currentWord = typewriterWords[index]
        const typingSpeed = isDeleting ? 50 : 100 // 40-60ms for deleting, 90-110ms for typing

        const timeout = setTimeout(() => {
            if (!isDeleting && subIndex < currentWord.length) {
                // Typing
                setSubIndex((prev) => prev + 1)
            } else if (isDeleting && subIndex > 0) {
                // Deleting
                setSubIndex((prev) => prev - 1)
            } else if (!isDeleting && subIndex === currentWord.length) {
                // Pause after typing
                setPause(true)
                setTimeout(() => {
                    setPause(false)
                    setIsDeleting(true)
                }, 2000) // 1.5-2s pause
            } else if (isDeleting && subIndex === 0) {
                // Switch to next word
                setIsDeleting(false)
                setIndex((prev) => (prev + 1) % typewriterWords.length)
                setPause(true)
                setTimeout(() => setPause(false), 300) // 300ms pause before next word
            }
        }, typingSpeed)

        return () => clearTimeout(timeout)
    }, [subIndex, index, isDeleting, pause])

    return (
        <section className="relative min-h-screen flex items-start lg:items-center overflow-hidden pt-32 lg:pt-32">
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-hero -z-10" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        className="flex flex-col gap-4 lg:gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Animated Headline */}
                        <div className="overflow-hidden">
                            <motion.h1
                                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-blue leading-[1.1]"
                                variants={headlineVariants}
                            >
                                {headlineText}
                            </motion.h1>
                        </div>

                        {/* Subheading */}
                        <motion.p
                            className="text-xl sm:text-2xl md:text-3xl text-brand-gray max-w-xl leading-relaxed min-h-[4em] sm:min-h-[3em]"
                            variants={itemVariants}
                            style={{ fontFamily: 'var(--font-cursive)' }}
                        >
                            Redwood Learning creates immersive global exchange programs
                            <br />
                            where students grow through{" "}
                            <span className="font-semibold text-brand-red">
                                {typewriterWords[index].substring(0, subIndex)}
                            </span>
                            <span className="inline-block w-[2px] h-[1em] bg-brand-red ml-0.5 align-middle animate-[pulse_1.2s_ease-in-out_infinite]" />
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row items-center gap-6 pt-4"
                            variants={itemVariants}
                        >
                            <Button
                                className="bg-brand-red hover:bg-brand-red/90 text-white font-bold text-base px-8 py-3 h-12 shadow-lg hover:shadow-brand-red/20 transition-all duration-300 rounded-full group"
                            >
                                Explore Programs
                            </Button>
                            <Link
                                href="/about"
                                className="group flex items-center gap-2 text-brand-blue font-bold text-base transition-colors hover:text-brand-red hover:underline hover:decoration-brand-red hover:underline-offset-4 cursor-pointer"
                            >
                                Learn More
                            </Link>
                        </motion.div>

                        {/* Decorative Keyline */}
                        <motion.div
                            className="w-full max-w-md h-px bg-gradient-to-r from-brand-blue/20 via-brand-blue/5 to-transparent"
                            variants={itemVariants}
                        />

                        {/* Trusted By Section */}
                        <motion.div
                            className="flex flex-col gap-6"
                            variants={itemVariants}
                        >
                            <div className="flex items-center gap-3 text-brand-blue/80 font-medium" style={{ fontFamily: 'var(--font-cursive)' }}>
                                <div className="p-2 bg-brand-blue/5 rounded-full">
                                    <Globe className="h-5 w-5 text-brand-blue" />
                                </div>
                                <span className="text-xl tracking-wide">Trusted by students across 15+ countries</span>
                            </div>
                            <div className="flex items-center gap-4">
                                {[
                                    { code: "ca", label: "Canada" },
                                    { code: "fr", label: "France" },
                                    { code: "jp", label: "Japan" },
                                    { code: "gr", label: "Greece" },
                                    { code: "gb", label: "UK" },
                                    { code: "us", label: "USA" },
                                ].map((flag, i) => (
                                    <motion.div
                                        key={flag.code}
                                        className="relative w-14 h-9 bg-white rounded-xl shadow-premium border border-brand-blue/5 overflow-hidden group cursor-pointer"
                                        whileHover={{ y: -2, scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <Image
                                            src={`https://flagcdn.com/${flag.code}.svg`}
                                            alt={flag.label}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/5 transition-colors duration-300" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Visual Flair */}
                    <div className="hidden lg:flex items-center justify-center relative h-full min-h-[600px]">
                        <div className="absolute inset-0 flex items-center justify-center translate-y-12">
                            <InteractiveGlobe className="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
