"use client"

import { motion, Variants } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Globe, ArrowRight, MapPin } from "lucide-react"
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
        <section className="relative h-[calc(100vh-80px)] flex items-start lg:items-center overflow-hidden pt-20 lg:pt-16">
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-hero -z-10" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        className="flex flex-col gap-3 lg:gap-4"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Tagline with decorative elements */}
                        <motion.div
                            className="flex items-center gap-3"
                            variants={itemVariants}
                        >
                            <span className="w-8 h-[2px] bg-gradient-to-r from-brand-red to-brand-red/50 rounded-full" />
                            <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
                            <p
                                className="text-xs sm:text-sm font-medium text-brand-gray/80 tracking-[0.2em] uppercase"
                                style={{ fontFamily: 'var(--font-poppins)' }}
                            >
                                Where Students Become Global Citizens
                            </p>
                        </motion.div>

                        {/* Animated Headline */}
                        <div className="overflow-hidden">
                            <motion.h1
                                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight text-brand-blue leading-[1.05] flex flex-wrap gap-x-3 gap-y-0"
                                variants={headlineVariants}
                                style={{ fontWeight: 800 }}
                            >
                                {headlineText.split(" ").map((word, index) => (
                                    <span
                                        key={index}
                                        className="inline-block transition-colors duration-300 rounded-lg px-1 py-0.5 hover:bg-rose-200/80"
                                    >
                                        {word}
                                    </span>
                                ))}
                            </motion.h1>
                        </div>

                        {/* Subheading */}
                        <motion.p
                            className="text-base sm:text-lg md:text-xl text-brand-gray/90 max-w-xl leading-relaxed min-h-[3em] sm:min-h-[2.5em] font-body mt-1"
                            variants={itemVariants}
                        >
                            Redwood Learning creates immersive global exchange
                            <br />
                            programs where students grow through{" "}
                            <span className="font-semibold text-brand-red">
                                {typewriterWords[index].substring(0, subIndex)}
                            </span>
                            <span className="inline-block w-[2px] h-[1em] bg-brand-red ml-0.5 align-middle animate-[pulse_1.2s_ease-in-out_infinite]" />
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row items-center gap-5 pt-2"
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
                                About Us
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
                            <div className="flex items-center gap-3 text-brand-blue/80 font-medium font-body">
                                <div className="p-2 bg-brand-blue/5 rounded-full">
                                    <Globe className="h-5 w-5 text-brand-blue" />
                                </div>
                                <span className="text-lg tracking-wide">Trusted by Students and Institutions globally</span>
                            </div>
                            <div className="flex items-center gap-4">
                                {[
                                    { code: "in", label: "India" },
                                    { code: "gb", label: "UK" },
                                    { code: "id", label: "Indonesia" },
                                    { code: "th", label: "Thailand" },
                                    { code: "vn", label: "Vietnam" },
                                    { code: "jp", label: "Japan" },
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

                    {/* Right Side - Enhanced Globe Section */}
                    <motion.div
                        className="hidden lg:flex flex-col items-center justify-center relative h-full min-h-[500px]"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >


                        {/* Sparkle Effects */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="sparkle sparkle-1" />
                            <div className="sparkle sparkle-2" />
                            <div className="sparkle sparkle-3" />
                            <div className="sparkle sparkle-4" />
                            <div className="sparkle sparkle-5" />
                            <div className="sparkle sparkle-6" />
                            <div className="sparkle sparkle-7" />
                            <div className="sparkle sparkle-8" />
                        </div>


                        {/* Globe with Glow Effects */}
                        <div className="relative flex items-center justify-center translate-y-6" style={{ width: '600px', height: '600px' }}>
                            {/* SVG Connection Arcs - Diagonal from top-left to bottom-right */}
                            <svg
                                className="absolute pointer-events-none"
                                style={{ width: '750px', height: '750px', zIndex: 5 }}
                                viewBox="0 0 750 750"
                            >
                                <defs>
                                    {/* Bright shiny gradient for arcs */}
                                    <linearGradient id="arcGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
                                        <stop offset="25%" stopColor="rgba(220, 240, 255, 0.95)" />
                                        <stop offset="50%" stopColor="rgba(255, 255, 255, 1)" />
                                        <stop offset="75%" stopColor="rgba(200, 230, 255, 0.9)" />
                                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.95)" />
                                    </linearGradient>

                                    <linearGradient id="arcGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
                                        <stop offset="35%" stopColor="rgba(180, 210, 255, 0.85)" />
                                        <stop offset="65%" stopColor="rgba(255, 255, 255, 0.9)" />
                                        <stop offset="100%" stopColor="rgba(220, 240, 255, 0.85)" />
                                    </linearGradient>

                                    <linearGradient id="arcGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
                                        <stop offset="50%" stopColor="rgba(200, 220, 255, 0.8)" />
                                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.85)" />
                                    </linearGradient>

                                    {/* Strong glow filter for bright shiny effect */}
                                    <filter id="arcGlow" x="-100%" y="-100%" width="300%" height="300%">
                                        <feGaussianBlur stdDeviation="6" result="blur1" />
                                        <feGaussianBlur stdDeviation="2" result="blur2" />
                                        <feMerge>
                                            <feMergeNode in="blur1" />
                                            <feMergeNode in="blur2" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* Outer arc - bright shiny ring */}
                                <ellipse
                                    cx="375"
                                    cy="375"
                                    rx="340"
                                    ry="130"
                                    fill="none"
                                    stroke="url(#arcGradient1)"
                                    strokeWidth="2.5"
                                    filter="url(#arcGlow)"
                                    style={{ transform: 'rotate(-25deg)', transformOrigin: '375px 375px' }}
                                />

                                {/* Middle arc - bright shiny ring */}
                                <ellipse
                                    cx="375"
                                    cy="375"
                                    rx="360"
                                    ry="150"
                                    fill="none"
                                    stroke="url(#arcGradient2)"
                                    strokeWidth="2"
                                    filter="url(#arcGlow)"
                                    style={{ transform: 'rotate(-15deg)', transformOrigin: '375px 375px' }}
                                />

                                {/* Inner arc - bright shiny ring */}
                                <ellipse
                                    cx="375"
                                    cy="375"
                                    rx="320"
                                    ry="110"
                                    fill="none"
                                    stroke="url(#arcGradient3)"
                                    strokeWidth="2"
                                    filter="url(#arcGlow)"
                                    style={{ transform: 'rotate(-35deg)', transformOrigin: '375px 375px' }}
                                />

                                {/* Animated connection path 1 */}
                                <path
                                    d="M 100 300 Q 375 100 650 350"
                                    fill="none"
                                    stroke="url(#arcGradient1)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    filter="url(#arcGlow)"
                                    className="connection-arc"
                                />

                                {/* Animated connection path 2 */}
                                <path
                                    d="M 120 450 Q 375 280 630 480"
                                    fill="none"
                                    stroke="url(#arcGradient2)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    filter="url(#arcGlow)"
                                    className="connection-arc"
                                    style={{ animationDelay: '0.6s' }}
                                />
                            </svg>

                            {/* Outer glow - positioned behind */}
                            <div
                                className="absolute rounded-full pointer-events-none"
                                style={{
                                    width: '700px',
                                    height: '700px',
                                    background: 'radial-gradient(circle, rgba(23, 67, 123, 0.08) 0%, rgba(23, 67, 123, 0.04) 40%, transparent 70%)',
                                    filter: 'blur(40px)',
                                    zIndex: 0
                                }}
                            />

                            {/* Inner glow - positioned behind */}
                            <div
                                className="absolute rounded-full pointer-events-none"
                                style={{
                                    width: '650px',
                                    height: '650px',
                                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(220, 235, 255, 0.4) 30%, rgba(180, 210, 250, 0.2) 50%, transparent 70%)',
                                    filter: 'blur(30px)',
                                    zIndex: 1
                                }}
                            />

                            {/* The Interactive Globe */}
                            <div className="relative" style={{ zIndex: 10, width: '100%', height: '100%' }}>
                                <InteractiveGlobe className="" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}