'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { getAboutRedwoodContent, defaultAboutRedwoodContent, AboutRedwoodContent } from "@/lib/aboutRedwoodContent";

export function AboutRedwoodSection() {
    const [content, setContent] = useState<AboutRedwoodContent>(defaultAboutRedwoodContent);

    useEffect(() => {
        getAboutRedwoodContent().then(setContent);
    }, []);

    return (
        <section className="relative h-auto min-h-[500px] flex items-center overflow-hidden py-16">
            {/* Background Image - Light Theme */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/herobackground.png"
                    alt="About Redwood Background"
                    fill
                    className="object-cover opacity-100"
                    quality={100}
                />
            </div>

            <div className="container mx-auto px-4 md:px-8 lg:px-24 max-w-7xl relative z-10 h-full flex flex-col justify-center">

                {/* Header - Centered & Compact */}
                <div className="text-center mb-10 md:mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-brand-blue font-bold tracking-[0.15em] uppercase text-xs md:text-sm font-poppins mb-2"
                    >
                        {content.tagline}
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-blue font-montserrat tracking-tight mb-3"
                    >
                        {content.title}
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-brand-gray/80 text-sm md:text-base font-poppins leading-relaxed max-w-2xl mx-auto"
                    >
                        {content.description}
                    </motion.p>
                </div>

                {/* Cards - Unique Stacked Design with Floating Images */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Mission Card - Floating Image Style */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="group relative"
                    >
                        {/* Card Container */}
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                            {/* Image Container - Fixed Aspect Ratio */}
                            <div className="relative w-full aspect-[16/10] overflow-hidden">
                                <Image
                                    src={content.mission.image}
                                    alt={content.mission.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Subtle gradient overlay at bottom for text readability */}
                                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-6 lg:p-8 relative -mt-4">
                                {/* Decorative line */}
                                <div className="w-12 h-1 bg-brand-red rounded-full mb-4" />

                                <h4 className="text-brand-blue text-xl md:text-2xl font-bold font-montserrat tracking-tight mb-3">
                                    {content.mission.title}
                                </h4>
                                <p className="text-brand-gray/80 text-sm font-poppins leading-relaxed">
                                    {content.mission.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Vision Card - Floating Image Style */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="group relative"
                    >
                        {/* Card Container */}
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                            {/* Image Container - Fixed Aspect Ratio */}
                            <div className="relative w-full aspect-[16/10] overflow-hidden">
                                <Image
                                    src={content.vision.image}
                                    alt={content.vision.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Subtle gradient overlay at bottom for text readability */}
                                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-6 lg:p-8 relative -mt-4">
                                {/* Decorative line */}
                                <div className="w-12 h-1 bg-brand-red rounded-full mb-4" />

                                <h4 className="text-brand-blue text-xl md:text-2xl font-bold font-montserrat tracking-tight mb-3">
                                    {content.vision.title}
                                </h4>
                                <p className="text-brand-gray/80 text-sm font-poppins leading-relaxed">
                                    {content.vision.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
