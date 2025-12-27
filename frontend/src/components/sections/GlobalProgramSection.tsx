'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

// Country Data
const programs = [
    {
        id: 'france',
        country: 'France',
        title: 'France',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
        description: 'Dive into foreign studies within bustling cities, university, and explore vibrant local culture.',
        flag: 'fr'
    },
    {
        id: 'japan',
        country: 'Japan',
        title: 'Japan',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
        description: 'Dive into foreign studies within bustling cities, university, and explore vibrant local culture.',
        flag: 'jp'
    },
    {
        id: 'australia',
        country: 'Australia',
        title: 'Australia',
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800',
        description: 'Dive into foreign studies within bustling cities, university, and explore vibrant local culture.',
        flag: 'au'
    },
    {
        id: 'canada',
        country: 'Canada',
        title: 'Canada',
        image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&q=80&w=800',
        description: 'Dive into foreign studies within bustling cities, university, and explore vibrant local culture.',
        flag: 'ca'
    },
    {
        id: 'india',
        country: 'India',
        title: 'India',
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
        description: 'Experience India\'s rich heritage through community engagement and cultural exchange.',
        flag: 'in'
    },
    {
        id: 'uk',
        country: 'UK',
        title: 'UK',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
        description: 'Experience world-class education and historic landmarks in the heart of the United Kingdom.',
        flag: 'gb'
    },
    {
        id: 'usa',
        country: 'USA',
        title: 'USA',
        image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=800',
        description: 'Explore the land of opportunity with cutting-edge research and diverse campus life.',
        flag: 'us'
    },
    {
        id: 'vietnam',
        country: 'Vietnam',
        title: 'Vietnam',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800',
        description: 'Discover a blend of ancient traditions and rapid modern development throughout the country.',
        flag: 'vn'
    }
];

export function GlobalProgramSection() {
    // We want to show a "page" of 4 items.
    // Calculations for pagination
    const itemsPerPage = 4;
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(programs.length / itemsPerPage);

    // Get current items
    const currentPrograms = programs.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    // If we don't have enough items to fill a page (e.g. last page has 1 item), we might want to stay consistent?
    // For now, let's just render what we have.

    return (
        <section className="relative min-h-[80vh] flex flex-col items-center justify-center py-20 overflow-hidden">
            {/* Background Image - Clean, no heavy overlay */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/globalprogramsbackground.png"
                    alt="World Map Background"
                    fill
                    className="object-cover"
                    quality={100}
                />
            </div>

            <div className="container mx-auto px-4 md:px-8 lg:px-24 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-brand-blue font-bold tracking-[0.15em] uppercase text-xs md:text-sm lg:text-base font-poppins mb-2 md:mb-3"
                    >
                        GLOBAL EXCHANGE PROGRAMS
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-2xl md:text-4xl lg:text-5xl font-black text-brand-blue font-montserrat tracking-tight mb-3 md:mb-4"
                    >
                        Global Exchange Programs
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-brand-gray/80 text-sm md:text-base lg:text-lg max-w-3xl mx-auto font-poppins px-4"
                    >
                        Join our global exchange programs and explore exciting cultures, diverse landscapes, and top universities.
                    </motion.p>
                </div>

                {/* Cards Grid/Carousel */}
                <div className="relative">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {currentPrograms.map((program, index) => (
                                <motion.div
                                    layout
                                    key={program.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col h-[420px] mx-auto w-full max-w-md md:max-w-none"
                                >
                                    {/* Top Image Section */}
                                    <div className="relative h-[55%] overflow-hidden">
                                        <Image
                                            src={program.image}
                                            alt={program.country}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Flag Badge Pill */}
                                        <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-md shadow-md flex items-center gap-2 z-10">
                                            <Image
                                                src={`https://flagcdn.com/${program.flag}.svg`}
                                                alt={program.country}
                                                width={24}
                                                height={16}
                                                className="rounded-[2px] object-cover"
                                            />
                                            <span className="text-brand-blue font-bold text-sm font-montserrat">
                                                {program.country}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bottom Content Section */}
                                    <div className="p-5 flex flex-col justify-between flex-grow h-[45%] bg-white/95 backdrop-blur-sm relative z-20">
                                        <div>
                                            <h3 className="text-xl font-bold text-brand-blue mb-2 font-montserrat">
                                                {program.title}
                                            </h3>
                                            <p className="text-brand-gray/70 text-xs leading-relaxed font-poppins line-clamp-3">
                                                {program.description}
                                            </p>
                                        </div>

                                        <button
                                            className="w-full mt-3 bg-[#E63946] hover:bg-[#d62839] text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg group/btn"
                                        >
                                            <span className="font-montserrat text-xs uppercase tracking-wide">See Program</span>
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Flag Pagination */}
                <div className="flex flex-wrap justify-center items-center gap-3 mt-8 md:mt-12 bg-white/30 backdrop-blur-md py-3 px-4 md:px-6 rounded-2xl md:rounded-full w-fit max-w-full mx-auto border border-white/40 shadow-sm">
                    {/* We can construct pages based on total items. 
                        Let's show all available country flags as dots, 
                        but we only have 2 pages of 4 items each really.
                        To match the reference "row of flags", let's just make them clickable filters or simple page indicators.
                        The reference shows: [Flag] [Flag] [Flag] [Flag]
                    */}
                    {/* Creating pagination dots using flags for the pages? 
                        The reference image has many flags. It likely signifies "Select country". 
                        Let's map the pages to specific lead flags or just show index dots labeled by flags?
                        Actually, simplest and most visual is just to have page 1 (India, UK, USA, Vietnam) and page 2 (France, Japan, etc).
                        Let's just use generic dots or Page Numbers styled nicely for now, 
                        OR use the flags of the countries on that page?
                    */}
                    {Array.from({ length: totalPages }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setPage(idx)}
                            className={`
                                relative w-8 h-5 md:w-10 md:h-6 transition-all duration-300 rounded overflow-hidden border
                                ${page === idx ? 'scale-125 border-brand-red ring-2 ring-brand-red/20 shadow-lg' : 'opacity-50 hover:opacity-80 border-transparent hover:scale-110'}
                            `}
                        >
                            {/* Show a representative flag for the page or just a simple dot? 
                                 Let's show a composite or just the first country's flag of that page?
                             */}
                            <div className="absolute inset-0 bg-brand-blue/10 flex items-center justify-center text-[10px] font-bold text-brand-blue bg-white">
                                {idx + 1}
                            </div>
                        </button>
                    ))}

                    {/* Alternative: Show ALL flags as "dots" and clicking one jumps to the page containing it? */}
                    <div className="hidden md:block w-px h-6 bg-brand-gray/20 mx-2" />

                    {programs.map((prog, idx) => (
                        <button
                            key={prog.id}
                            onClick={() => setPage(Math.floor(idx / itemsPerPage))}
                            className={`
                                relative w-6 h-4 md:w-8 md:h-5 rounded overflow-hidden shadow-sm transition-all duration-300
                                ${Math.floor(idx / itemsPerPage) === page ? 'opacity-100 scale-110 ring-1 ring-brand-red' : 'opacity-40 grayscale hover:grayscale-0 hover:opacity-100'}
                            `}
                            title={prog.country}
                        >
                            <Image
                                src={`https://flagcdn.com/${prog.flag}.svg`}
                                alt={prog.country}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>

            </div>
        </section>
    );
}
