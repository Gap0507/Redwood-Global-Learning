'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { JSX, useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, GraduationCap, Globe, ShieldCheck, Rocket, LucideIcon } from 'lucide-react';
import Link from 'next/link';

const steps = [
    {
        title: 'Academic exposure',
        subtitle: 'World-Class Education',
        description: 'Students engage with education in an international setting by learning within global classrooms and institutions. They explore subjects aligned with their interests, experience different teaching styles and academic cultures, and gain insight into how education is approached in different parts of the world. This exposure helps students broaden their perspective, build meaningful academic and professional networks, and gain clarity on future global opportunities.',
        src: '/academics.png',
        link: '/programs',
        color: '#17437B',
        gradient: 'from-[#17437B] to-[#0D2B52]',
        id: 1,
        icon: GraduationCap,
        stat: '50+ Global Partners'
    },
    {
        title: 'Explore globally, live locally',
        subtitle: 'Authentic Living',
        description: 'Students experience the country in its entirety. They explore cities, landmarks, and cultural spaces as travellers, while also living like locals through host family stays, community engagement, and everyday routines. This balance allows them to enjoy discovery while developing an authentic connection with the culture and people.',
        src: '/culture.png',
        link: '/about',
        color: '#E63946',
        gradient: 'from-[#E63946] to-[#9E1019]',
        id: 2,
        icon: Globe,
        stat: '100% Immersive'
    },
    {
        title: 'Guided experience',
        subtitle: 'Safety & Mentorship',
        description: 'Every exchange is thoughtfully planned and supported by Redwood. From preparation and logistics to on-ground guidance and assistance, students and families can rely on a structured, secure, and well-managed international experience throughout the journey.',
        src: '/guidedsupport.png',
        link: '/contact',
        color: '#457B9D',
        gradient: 'from-[#457B9D] to-[#2A4D63]',
        id: 3,
        icon: ShieldCheck,
        stat: '24/7 Assistance'
    },
    {
        title: 'Lasting growth',
        subtitle: 'Future Ready',
        description: 'Students return with more than experiences. They develop confidence, independence, and a global perspective shaped by real-world exposure and cross-cultural understanding—qualities that continue to influence their academic choices, careers, and life paths.',
        src: '/outcomes.png',
        link: '/programs',
        color: '#E63946',
        gradient: 'from-[#17437B] to-[#E63946]', // Special gradient for Outcomes
        id: 4,
        icon: Rocket,
        stat: 'Lifelong Network'
    },
];

export function ApproachSection(): JSX.Element {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    return (
        <ReactLenis root>
            <section ref={container} className='relative'>
                {/* Background Image - Continuous with Hero */}
                <div className="absolute inset-0 -z-10">
                    <Image
                        src="/herobackground.png"
                        alt="Background"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Intro Section */}
                <div className='relative h-[50vh] w-full flex flex-col items-center justify-center overflow-hidden'>

                    <div className='relative z-10 text-center px-4 max-w-4xl mx-auto'>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className='text-5xl md:text-6xl font-black text-brand-blue mb-6 tracking-tight'
                            style={{ fontFamily: 'var(--font-montserrat)' }}
                        >
                            Our Approach
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className='text-xl md:text-2xl text-brand-gray/80 font-medium leading-relaxed'
                            style={{ fontFamily: 'var(--font-poppins)' }}
                        >
                            A holistic journey designed to transform students into global citizens through education, cultural immersion, and guided support.
                        </motion.p>
                    </div>
                </div>

                {/* Enhanced Decorative Elements - Left */}
                <div className="hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-0 pointer-events-none w-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="relative h-[600px] flex flex-col items-center justify-center"
                    >
                        {/* Connecting Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent -translate-x-1/2" />

                        {/* Interactive Nodes */}
                        <div className="flex flex-col gap-24 relative z-10">
                            {['Start', 'Learn', 'Grow', 'Lead'].map((label, idx) => (
                                <div key={idx} className="relative group">
                                    <motion.div
                                        className="w-3 h-3 rounded-full bg-brand-blue/20 border border-brand-blue/40 backdrop-blur-sm"
                                        animate={{
                                            boxShadow: ['0 0 0 0px rgba(23, 67, 123, 0)', '0 0 0 4px rgba(23, 67, 123, 0.1)', '0 0 0 0px rgba(23, 67, 123, 0)']
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
                                    />
                                    <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-brand-blue tracking-widest uppercase bg-white/80 px-2 py-1 rounded-md backdrop-blur-sm">
                                        {label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Floating Background Blobs */}
                        <motion.div
                            animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/4 -left-12 w-32 h-32 bg-brand-red/5 rounded-full blur-3xl"
                        />
                    </motion.div>
                </div>




                {/* Stacking Cards Section */}
                <div className='w-full pb-20'>
                    {steps.map((step, i) => {
                        const targetScale = 1 - (steps.length - i) * 0.05;
                        return (
                            <Card
                                key={`step_${i}`}
                                i={i}
                                {...step}
                                progress={scrollYProgress}
                                range={[i * 0.25, 1]}
                                targetScale={targetScale}
                            />
                        );
                    })}
                </div>
            </section>
        </ReactLenis>
    );
}

interface CardProps {
    i: number;
    title: string;
    subtitle: string;
    description: string;
    src: string;
    link: string;
    color: string;
    gradient: string;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
    icon: LucideIcon;
    stat: string;
}

const Card: React.FC<CardProps> = ({
    i,
    title,
    subtitle,
    description,
    src,
    link,
    color,
    gradient,
    progress,
    range,
    targetScale,
    icon: Icon,
    stat
}) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start 0.9', 'start 0.35'],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div
            ref={container}
            className='h-screen flex items-center justify-center sticky top-28 px-4'
        >
            <motion.div
                style={{
                    scale,
                    top: `calc(-5vh + ${i * 25}px)`,
                }}
                className={`flex flex-col md:flex-row relative -top-[25%] h-auto md:h-[550px] w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl origin-top ring-1 ring-white/10`}
            >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} z-0`} />

                {/* Left Side - Content */}
                <div className={`flex flex-col justify-center p-8 md:p-14 w-full md:w-[45%] text-white h-full relative z-10`}>

                    {/* Large Background Number */}
                    <div className="absolute -top-6 -left-6 text-[12rem] font-black text-white/5 select-none pointer-events-none font-montserrat leading-none">
                        0{i + 1}
                    </div>

                    {/* Content Header */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-bold tracking-wider uppercase mb-4"
                        >
                            <Icon className="w-3 h-3" />
                            <span>{subtitle}</span>
                        </motion.div>

                        <h2 className='text-3xl md:text-4xl font-black mb-4 leading-tight' style={{ fontFamily: 'var(--font-montserrat)' }}>
                            {title}
                        </h2>
                    </div>

                    <p className='text-sm md:text-base opacity-90 mb-6 leading-relaxed font-light' style={{ fontFamily: 'var(--font-poppins)' }}>
                        {description}
                    </p>

                    <span className='flex items-center gap-2 pt-2'>
                        <Link
                            href={link}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-brand-blue rounded-full font-bold text-sm tracking-wide overflow-hidden transition-all hover:bg-brand-blue hover:text-white hover:shadow-lg hover:shadow-white/20"
                            style={{ fontFamily: 'var(--font-montserrat)' }}
                        >
                            <span className="relative z-10">EXPLORE MORE</span>
                            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-brand-blue transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                        </Link>
                    </span>
                </div>

                {/* Right Side - Image */}
                <div className={`relative w-full md:w-[55%] h-64 md:h-full overflow-hidden`}>
                    <motion.div
                        className={`w-full h-full relative`}
                        style={{ scale: imageScale }}
                    >
                        <Image
                            src={src}
                            alt={title}
                            fill
                            className='object-cover'
                        />
                        {/* Gradient Overlay for better blend */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent md:from-black/40 md:via-transparent" />
                    </motion.div>

                    {/* Floating Glass Badge over Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="absolute bottom-8 right-8 z-20 hidden md:flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
                    >
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-white/60 text-xs font-bold uppercase tracking-wider">Key Highlight</p>
                            <p className="text-white font-bold text-sm">{stat}</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};
