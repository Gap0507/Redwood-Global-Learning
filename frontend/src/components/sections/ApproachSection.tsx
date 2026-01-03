'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { JSX, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, GraduationCap, Globe, ShieldCheck, Rocket, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { getApproachContent, defaultApproachContent, ApproachContent, ApproachCard } from '@/lib/approachContent';

// Icon mapping for CMS compatibility
const iconMap: Record<string, LucideIcon> = {
    GraduationCap,
    Globe,
    ShieldCheck,
    Rocket,
};

export function ApproachSection(): JSX.Element {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    const [content, setContent] = useState<ApproachContent>(defaultApproachContent);

    // Fetch CMS content on mount
    useEffect(() => {
        getApproachContent().then(setContent);
    }, []);

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
                            {content.sectionSubtitle}
                        </motion.p>
                    </div>
                </div>


                {/* Stacking Cards Section */}
                <div className='w-full pb-20'>
                    {content.cards.map((card: ApproachCard, i: number) => {
                        const targetScale = 1 - (content.cards.length - i) * 0.05;
                        const CardIcon = iconMap[card.icon] || GraduationCap;
                        return (
                            <Card
                                key={`card_${i}`}
                                i={i}
                                title={card.title}
                                subtitle={card.subtitle}
                                description={card.description}
                                src={card.src}
                                link={card.link}
                                color={card.color}
                                gradient={card.gradient}
                                icon={CardIcon}
                                stat={card.stat}
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
