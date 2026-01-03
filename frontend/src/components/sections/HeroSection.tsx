"use client"

import { motion, Variants, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Globe, ArrowRight, X, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { sampleArcs, globeConfig, ProgramLocation } from "@/data/sampleArcs"

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
    ssr: false,
})

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
}

const typewriterWords = ["global cultures", "real-world learning", "international communities"]

export function HeroSection() {
    const [index, setIndex] = useState(0)
    const [subIndex, setSubIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const [pause, setPause] = useState(false)
    const [hoveredWord, setHoveredWord] = useState<number | null>(null)
    const [selectedLocation, setSelectedLocation] = useState<ProgramLocation | null>(null)

    useEffect(() => {
        if (pause) return

        const currentWord = typewriterWords[index]
        const typingSpeed = isDeleting ? 50 : 100

        const timeout = setTimeout(() => {
            if (!isDeleting && subIndex < currentWord.length) {
                setSubIndex((prev) => prev + 1)
            } else if (isDeleting && subIndex > 0) {
                setSubIndex((prev) => prev - 1)
            } else if (!isDeleting && subIndex === currentWord.length) {
                setPause(true)
                setTimeout(() => {
                    setPause(false)
                    setIsDeleting(true)
                }, 2000)
            } else if (isDeleting && subIndex === 0) {
                setIsDeleting(false)
                setIndex((prev) => (prev + 1) % typewriterWords.length)
                setPause(true)
                setTimeout(() => setPause(false), 300)
            }
        }, typingSpeed)

        return () => clearTimeout(timeout)
    }, [subIndex, index, isDeleting, pause])

    return (
        <section className="relative min-h-screen flex items-center lg:items-start overflow-hidden pt-40 sm:pt-48 lg:pt-44 pb-20 lg:pb-12">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/herobackground.png"
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="container mx-auto px-6 sm:px-8 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content - Unique Layout */}
                    <motion.div
                        className="flex flex-col gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Tagline with Modern Design */}
                        <motion.div
                            className="relative inline-flex items-center gap-3 self-start"
                            variants={itemVariants}
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
                                <div className="w-1 h-1 bg-brand-red/60 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                            </div>
                            <p
                                className="text-xs font-semibold text-brand-gray/70 tracking-[0.25em] uppercase"
                                style={{ fontFamily: 'var(--font-poppins)' }}
                            >
                                Where Students Become Global Citizens
                            </p>
                            <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-brand-red/50 via-brand-red/20 to-transparent" />
                        </motion.div>

                        {/* Creative Header with Stacked Layout */}
                        <motion.div
                            className="relative"
                            variants={itemVariants}
                        >
                            <div className="flex flex-col gap-1">
                                {/* GROW */}
                                <div className="relative inline-block">
                                    <h1
                                        className="font-montserrat text-[2.8rem] sm:text-[3.5rem] lg:text-[5.5rem] font-black tracking-tighter text-brand-blue leading-[0.9] relative z-10"
                                        style={{
                                            fontWeight: 900,
                                            letterSpacing: '-0.04em'
                                        }}
                                        onMouseEnter={() => setHoveredWord(0)}
                                        onMouseLeave={() => setHoveredWord(null)}
                                    >
                                        GROW
                                    </h1>
                                    {hoveredWord === 0 && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-brand-red/10 via-brand-red/5 to-transparent rounded-2xl -z-10"
                                            layoutId="hover-bg"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </div>

                                {/* BEYOND with accent */}
                                <div className="relative inline-block -mt-2">
                                    <h1
                                        className="font-montserrat text-[2.8rem] sm:text-[3.5rem] lg:text-[5.5rem] font-black tracking-tighter leading-[0.9] relative z-10"
                                        style={{
                                            fontWeight: 900,
                                            letterSpacing: '-0.04em',
                                            background: 'linear-gradient(135deg, #17437B 0%, #E63946 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text'
                                        }}
                                        onMouseEnter={() => setHoveredWord(1)}
                                        onMouseLeave={() => setHoveredWord(null)}
                                    >
                                        BEYOND
                                    </h1>
                                    {hoveredWord === 1 && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 via-brand-blue/5 to-transparent rounded-2xl -z-10"
                                            layoutId="hover-bg"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </div>

                                {/* BORDERS */}
                                <div className="relative inline-block -mt-2">
                                    <h1
                                        className="font-montserrat text-[2.8rem] sm:text-[3.5rem] lg:text-[5.5rem] font-black tracking-tighter text-brand-blue leading-[0.9] relative z-10"
                                        style={{
                                            fontWeight: 900,
                                            letterSpacing: '-0.04em'
                                        }}
                                        onMouseEnter={() => setHoveredWord(2)}
                                        onMouseLeave={() => setHoveredWord(null)}
                                    >
                                        BORDERS
                                    </h1>
                                    {hoveredWord === 2 && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-brand-red/10 via-brand-red/5 to-transparent rounded-2xl -z-10"
                                            layoutId="hover-bg"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Decorative accent line */}
                            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-brand-red via-brand-blue/30 to-transparent rounded-full" />
                        </motion.div>

                        {/* Subheading */}
                        <motion.p
                            className="text-lg text-brand-gray/90 max-w-xl leading-relaxed font-body"
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
                            className="flex items-center gap-6 pt-2"
                            variants={itemVariants}
                        >
                            <Button
                                className="bg-brand-red hover:bg-brand-red/90 text-white font-bold text-sm lg:text-base px-6 lg:px-9 py-2 lg:py-3 h-10 lg:h-12 shadow-lg hover:shadow-brand-red/30 transition-all duration-300 rounded-full group relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Explore Programs
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-red to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Button>
                            <Link
                                href="/about"
                                className="group flex items-center gap-2 text-brand-blue font-bold text-sm lg:text-base transition-all hover:text-brand-red relative"
                            >
                                <span>About Us</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            </Link>
                        </motion.div>

                        {/* Trusted By Section */}
                        <motion.div
                            className="flex flex-col gap-4 pt-2"
                            variants={itemVariants}
                        >
                            <div className="flex items-center gap-3 text-brand-blue/80 font-medium font-body">
                                <div className="p-2 bg-brand-blue/5 rounded-full">
                                    <Globe className="h-4 w-4 text-brand-blue" />
                                </div>
                                <span className="text-base tracking-wide">Trusted by Students and Institutions globally</span>
                            </div>
                            <div className="flex items-center gap-3">
                                {[
                                    { code: "in", label: "India" },
                                    { code: "gb", label: "UK" },
                                    { code: "id", label: "Indonesia" },
                                    { code: "th", label: "Thailand" },
                                    { code: "vn", label: "Vietnam" },
                                    { code: "jp", label: "Japan" },
                                ].map((flag) => (
                                    <motion.div
                                        key={flag.code}
                                        className="relative w-12 h-8 bg-white rounded-lg shadow-md border border-brand-blue/5 overflow-hidden group cursor-pointer"
                                        whileHover={{ y: -3, scale: 1.05 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
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

                    {/* Right Side - Globe */}
                    {/* Right Side - Globe */}
                    <motion.div
                        className="flex items-center justify-center relative w-full mt-8 lg:mt-0"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{ overflow: 'visible' }}
                    >
                        <div className="relative w-full max-w-[400px] lg:max-w-[600px] aspect-square" style={{ overflow: 'visible' }}>
                            <World
                                globeConfig={globeConfig}
                                data={sampleArcs}
                                onLocationClick={(location) => setSelectedLocation(location)}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Program Modal */}
            <AnimatePresence>
                {selectedLocation && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setSelectedLocation(null)}
                        />

                        {/* Modal */}
                        <motion.div
                            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                        >
                            {/* Header */}
                            <div className="sticky top-0 bg-white z-10 p-6 pb-0 rounded-t-2xl">
                                <button
                                    onClick={() => setSelectedLocation(null)}
                                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="flex flex-col items-center justify-center text-center">
                                    <div className="w-32 h-24 relative mb-4 rounded-xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-100">
                                        <Image
                                            src={`https://flagcdn.com/${selectedLocation.flagCode}.svg`}
                                            alt={selectedLocation.country}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-1">{selectedLocation.city}</h2>
                                    <p className="text-lg text-gray-500 font-medium mb-4">{selectedLocation.country}</p>
                                    <div className="flex items-center gap-2 text-brand-blue/80 text-sm font-medium bg-brand-blue/5 px-3 py-1 rounded-full">
                                        <MapPin className="w-4 h-4" />
                                        <span>{selectedLocation.programs.length} program{selectedLocation.programs.length > 1 ? 's' : ''} available</span>
                                    </div>
                                </div>
                            </div>

                            {/* Programs List */}
                            <div className="p-6 space-y-4">
                                {selectedLocation.programs.map((program, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="border border-brand-blue/10 rounded-xl p-4 hover:border-brand-blue/30 hover:shadow-lg transition-all group"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <h3 className="font-bold text-brand-blue text-lg mb-2 group-hover:text-brand-red transition-colors">
                                            {program.name}
                                        </h3>
                                        <p className="text-brand-gray text-sm mb-3">
                                            {program.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-brand-gray/70 text-xs">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>{program.duration}</span>
                                            </div>
                                            <Link
                                                href={program.slug}
                                                className="flex items-center gap-1 text-brand-red font-semibold text-sm hover:gap-2 transition-all"
                                                onClick={() => setSelectedLocation(null)}
                                            >
                                                View Program
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="p-6 pt-0">
                                <Link
                                    href="/programs"
                                    className="block w-full"
                                    onClick={() => setSelectedLocation(null)}
                                >
                                    <Button className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold py-3 rounded-xl">
                                        Explore All Programs
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}