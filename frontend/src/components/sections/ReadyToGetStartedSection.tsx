'use client';

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Phone, Mail, ArrowRight } from "lucide-react";

export function ReadyToGetStartedSection({ onApplyClick }: { onApplyClick?: () => void }) {
    return (
        <section className="relative min-h-[350px] sm:min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden py-12 sm:py-16 md:py-20">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/readytogetstarted.png"
                    alt="Ready to Get Started Background"
                    fill
                    className="object-cover object-center"
                    quality={100}
                />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-24 max-w-7xl relative z-10 flex flex-col items-center justify-center pt-16 sm:pt-20 md:pt-28">

                {/* Main Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-brand-blue font-montserrat tracking-tight text-center mb-2 sm:mb-3 px-2"
                >
                    READY TO START YOUR ADVENTURE?
                </motion.h2>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-brand-gray/80 text-xs sm:text-xs md:text-sm lg:text-base font-poppins text-center mb-5 sm:mb-6 md:mb-8 max-w-sm sm:max-w-md md:max-w-lg px-4"
                >
                    Apply now to our global exchange program and expand your horizons.
                </motion.p>

                {/* Contact Bar - Desktop */}
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="hidden sm:flex flex-row items-center bg-gradient-to-r from-[#0f3a5c] via-[#1a5276] to-[#0f3a5c] rounded-full px-3 md:px-5 py-2.5 md:py-3 shadow-2xl border border-[#2980b9]/30"
                >
                    {/* Phone */}
                    <div className="flex items-center gap-2 text-white px-2 md:px-4">
                        <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                        <span className="font-poppins text-xs md:text-sm font-medium tracking-wide whitespace-nowrap">
                            1 800-123-4567
                        </span>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-6 bg-white/30" />

                    {/* Email */}
                    <div className="flex items-center gap-2 text-white px-2 md:px-4">
                        <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                        <span className="font-poppins text-xs md:text-sm font-medium tracking-wide whitespace-nowrap">
                            info@redwoodglobal
                        </span>
                    </div>

                    {/* Apply Now Button */}
                    <motion.button
                        onClick={onApplyClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1.5 bg-gradient-to-r from-[#e74c3c] to-[#c0392b] hover:from-[#c0392b] hover:to-[#a93226] text-white font-poppins font-semibold text-xs md:text-sm px-4 md:px-5 py-1.5 md:py-2 rounded-full shadow-lg transition-all duration-300 ml-2 md:ml-3"
                    >
                        Apply Now
                        <ArrowRight className="w-4 h-4" />
                    </motion.button>
                </motion.div>

                {/* Contact Bar - Mobile */}
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex sm:hidden flex-col items-center gap-3 w-full max-w-[280px]"
                >
                    {/* Contact Info Card */}
                    <div className="bg-gradient-to-r from-[#0f3a5c] via-[#1a5276] to-[#0f3a5c] rounded-2xl px-5 py-4 shadow-xl border border-[#2980b9]/30 w-full">
                        {/* Phone */}
                        <div className="flex items-center gap-3 text-white mb-3">
                            <Phone className="w-4 h-4 text-white flex-shrink-0" />
                            <span className="font-poppins text-sm font-medium tracking-wide">
                                1 800-123-4567
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-white/20 mb-3" />

                        {/* Email */}
                        <div className="flex items-center gap-3 text-white">
                            <Mail className="w-4 h-4 text-white flex-shrink-0" />
                            <span className="font-poppins text-sm font-medium tracking-wide">
                                info@redwoodglobal
                            </span>
                        </div>
                    </div>

                    {/* Apply Now Button - Separate for Mobile */}
                    <motion.button
                        onClick={onApplyClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#e74c3c] to-[#c0392b] hover:from-[#c0392b] hover:to-[#a93226] text-white font-poppins font-semibold text-sm px-8 py-3 rounded-full shadow-lg transition-all duration-300 w-full"
                    >
                        Apply Now
                        <ArrowRight className="w-4 h-4" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}

