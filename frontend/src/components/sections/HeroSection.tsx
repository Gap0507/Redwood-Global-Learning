"use client"

import { motion, Variants } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

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
        <section className="relative min-h-screen flex items-center overflow-hidden pt-28 lg:pt-32">
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-hero -z-10" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        className="flex flex-col gap-6 lg:gap-8"
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
                            className="text-lg sm:text-xl md:text-2xl text-brand-gray max-w-xl leading-relaxed min-h-[4em] sm:min-h-[3em]"
                            variants={itemVariants}
                            style={{ fontFamily: 'var(--font-cursive)' }}
                        >
                            Redwood Learning creates immersive global exchange programs where
                            students grow through{" "}
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
                                className="bg-brand-red hover:bg-brand-red/90 text-white font-semibold text-sm px-5 py-2.5 h-10 shadow-md hover:shadow-lg transition-all duration-300 rounded-md"
                            >
                                Explore Programs
                            </Button>
                            <Link
                                href="/about"
                                className="group relative text-brand-blue font-semibold text-sm transition-colors hover:text-brand-red"
                            >
                                Learn More
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-red transition-all duration-300 group-hover:w-full" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Placeholder for future content (globe, image, etc.) */}
                    <div className="hidden lg:flex items-center justify-center">
                        {/* This space is reserved for future visual elements like a globe or hero image */}
                    </div>
                </div>
            </div>
        </section>
    )
}
