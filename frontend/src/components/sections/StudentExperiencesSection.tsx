'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { getStudentExperiencesContent, defaultStudentExperiencesContent, StudentExperiencesContent, Testimonial } from "@/lib/studentExperiencesContent";

const getInitials = (name: string) => {
    if (!name) return "??";
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
};

export const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonial[];
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-5 pb-5"
            >
                {[...new Array(2)].map((_, index) => (
                    <React.Fragment key={index}>
                        {props.testimonials.map((testimonial, i) => (
                            <div className="p-5 md:p-6 rounded-3xl bg-white shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all duration-300" key={i}>
                                <p className="text-brand-gray/80 font-poppins leading-relaxed mb-4 font-medium text-sm">"{testimonial.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
                                        {testimonial.image ? (
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-brand-blue text-white text-xs font-bold font-montserrat">
                                                {getInitials(testimonial.name)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-bold text-brand-blue font-montserrat tracking-tight text-sm md:text-base">{testimonial.name}</div>
                                        <div className="text-xs text-brand-gray/60 font-poppins font-medium">{testimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </motion.div>
        </div>
    );
};

export function StudentExperiencesSection() {
    const [content, setContent] = useState<StudentExperiencesContent>(defaultStudentExperiencesContent);

    useEffect(() => {
        getStudentExperiencesContent().then(setContent);
    }, []);

    // Split testimonials for columns (3-3-3 roughly)
    // To ensure balanced columns if length varies, we can use modulo or simple slice logic.
    // Default has 6 items. Slice(0,3) and Slice(3,6).
    // If user adds more, we should distribute them.
    // For now, mirroring original slice logic but dynamic safer.
    const midPoint = Math.ceil(content.testimonials.length / 2);
    const firstHalf = content.testimonials.slice(0, midPoint);
    const secondHalf = content.testimonials.slice(midPoint);
    // 3rd column in original was using 0-3 again.
    // "TestimonialsColumn testimonials={testimonials.slice(0, 3)} className="hidden lg:block""
    // I'll stick to 0-Midpoint for ease or repeat.

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background Image - Matches Global Program Section */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/globalprogramsbackground.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    quality={100}
                />
            </div>

            <div className="container mx-auto px-4 md:px-8 lg:px-24 max-w-7xl relative z-10">
                {/* Header - Light Theme Style */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-brand-blue font-bold tracking-[0.15em] uppercase text-xs md:text-sm lg:text-base font-poppins mb-3"
                    >
                        {content.sectionTagline}
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black text-brand-blue font-montserrat tracking-tight mb-4"
                    >
                        {content.sectionTitle}
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-brand-gray/80 text-sm md:text-lg max-w-2xl mx-auto font-poppins"
                    >
                        {content.sectionDescription}
                    </motion.p>
                </div>

                {/* Marquee Columns */}
                <div className="flex justify-center gap-5 md:gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[600px] overflow-hidden">
                    <TestimonialsColumn testimonials={firstHalf} duration={25} />
                    <TestimonialsColumn testimonials={secondHalf} className="hidden md:block" duration={30} />
                    {/* Reuse first half for the 3rd column or mix? Original re-used first 3. */}
                    <TestimonialsColumn testimonials={firstHalf} className="hidden lg:block" duration={28} />
                </div>
            </div>
        </section>
    );
}
