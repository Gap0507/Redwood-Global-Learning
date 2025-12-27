'use client';

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

export function AboutRedwoodSection() {
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
                        WHO WE ARE
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-blue font-montserrat tracking-tight mb-3"
                    >
                        About Redwood
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-brand-gray/80 text-sm md:text-base font-poppins leading-relaxed max-w-2xl mx-auto"
                    >
                        Building bridges across cultures through education, experience, and global connection.
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
                                    src="/ourmissioncard.png"
                                    alt="Our Mission"
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

                                <h4 className="text-brand-blue text-xl md:text-2xl font-bold font-montserrat tracking-tight mb-3">Our Mission</h4>
                                <p className="text-brand-gray/80 text-sm font-poppins leading-relaxed">
                                    To empower the next generation of global leaders by providing accessible, transformative cultural exchange experiences that foster understanding, independence, and lifelong connections across borders.
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
                                    src="/ourvision.png"
                                    alt="Our Vision"
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

                                <h4 className="text-brand-blue text-xl md:text-2xl font-bold font-montserrat tracking-tight mb-3">Our Vision</h4>
                                <p className="text-brand-gray/80 text-sm font-poppins leading-relaxed">
                                    A world where borders are not barriers but gateways to learning, where every student has the opportunity to explore, adapt, and thrive in a globally connected community.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
