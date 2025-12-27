'use client';

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

const testimonials = [
    {
        text: "My exchange year was truly defined by the people I met. The bonds I formed with my host family and friends are lifelong.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
        name: "Sarah Jenkins",
        role: "Student, France Program",
        country: "France",
        flag: "fr"
    },
    {
        text: "Living in Tokyo opened my eyes to a completely different way of life. The culture shock was real but so rewarding.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
        name: "Marcus Chen",
        role: "Student, Japan Program",
        country: "Japan",
        flag: "jp"
    },
    {
        text: "I learned more about myself in 6 months abroad than I did in 3 years at home. It's a transformative experience.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop",
        name: "Elena Rodriguez",
        role: "Student, Spain Program",
        country: "Spain",
        flag: "es"
    },
    {
        text: "The support from Redwood Global was incredible. They made sure I felt safe and prepared every step of the way.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        name: "David Kim",
        role: "Student, USA Program",
        country: "USA",
        flag: "us"
    },
    {
        text: "From the food to the festivals, every day was a new adventure. I can't wait to go back!",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop",
        name: "Priya Patel",
        role: "Student, India Program",
        country: "India",
        flag: "in"
    },
    {
        text: "Improving my language skills was my main goal, but I gained so much more confidence and independence.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
        name: "Tom Baker",
        role: "Student, Germany Program",
        country: "Germany",
        flag: "de"
    }
];

export const TestimonialsColumn = (props: {
    className?: string;
    testimonials: typeof testimonials;
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
                        {props.testimonials.map(({ text, image, name, role, country, flag }, i) => (
                            <div className="p-5 md:p-6 rounded-3xl bg-white shadow-xl border border-gray-100/50 hover:shadow-2xl transition-all duration-300" key={i}>
                                <p className="text-brand-gray/80 font-poppins leading-relaxed mb-4 font-medium text-sm">"{text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                                        <Image
                                            src={image}
                                            alt={name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-bold text-brand-blue font-montserrat tracking-tight text-sm md:text-base">{name}</div>
                                        <div className="text-xs text-brand-gray/60 font-poppins font-medium">{role}</div>
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
                        TESTIMONIALS
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-black text-brand-blue font-montserrat tracking-tight mb-4"
                    >
                        Student Experiences
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-brand-gray/80 text-sm md:text-lg max-w-2xl mx-auto font-poppins"
                    >
                        Hear directly from our students about their life-changing journeys.
                    </motion.p>
                </div>

                {/* Marquee Columns */}
                <div className="flex justify-center gap-5 md:gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[600px] overflow-hidden">
                    <TestimonialsColumn testimonials={testimonials.slice(0, 3)} duration={25} />
                    <TestimonialsColumn testimonials={testimonials.slice(3, 6)} className="hidden md:block" duration={30} />
                    <TestimonialsColumn testimonials={testimonials.slice(0, 3)} className="hidden lg:block" duration={28} />
                </div>
            </div>
        </section>
    );
}
