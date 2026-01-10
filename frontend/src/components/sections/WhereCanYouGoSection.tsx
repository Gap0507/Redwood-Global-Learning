'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { programLocations, ProgramLocation } from '@/data/sampleArcs';
import { getWhereCanYouGoContent, defaultWhereCanYouGoContent, WhereCanYouGoContent } from '@/lib/whereCanYouGoContent';

// Dynamically load Globe to avoid SSR issues
const World = dynamic(() => import('@/components/ui/globe').then((m) => m.World), {
    ssr: false,
});

export function WhereCanYouGoSection() {
    const [selectedLocation, setSelectedLocation] = useState<ProgramLocation>(programLocations[0]);
    const [content, setContent] = useState<WhereCanYouGoContent>(defaultWhereCanYouGoContent);

    useMemo(() => {
        getWhereCanYouGoContent().then(setContent);
    }, []);

    // Format data for the globe (points only, no arcs)
    const globeData = useMemo(() => {
        return programLocations.map((loc, index) => ({
            order: index + 1,
            startLat: loc.lat,
            startLng: loc.lng,
            endLat: loc.lat,
            endLng: loc.lng,
            arcAlt: 0,
            color: "#E63946", // Brand Red for markers
        }));
    }, []);

    const globeConfig = {
        pointSize: 2,
        globeColor: "#0B1221",
        showAtmosphere: true,
        atmosphereColor: "#3B82F6",
        atmosphereAltitude: 0.2,
        emissive: "#0f172a",
        emissiveIntensity: 0.1,
        shininess: 0.9,
        polygonColor: "rgba(255,255,255,0.7)",
        ambientLight: "#38bdf8",
        directionalLeftLight: "#ffffff",
        directionalTopLight: "#ffffff",
        pointLight: "#ffffff",
        arcTime: 2000,
        arcLength: 0.9,
        rings: 2,
        maxRings: 3,
        autoRotate: true,
        autoRotateSpeed: 0.5,
        showArcs: false,
    };

    return (
        <section
            className="relative bg-[#0B1221] pt-0 pb-12 overflow-hidden z-10"
        >
            {/* Desktop/Tablet: Globe positioned absolutely on the right side spanning full height */}
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[60%] z-30 pointer-events-auto">
                <div className="absolute inset-0 flex items-center justify-end pr-0">
                    <div className="w-full h-full min-h-[450px] flex items-center justify-end translate-y-2">
                        <div className="w-[min(140%,1000px)] aspect-square relative translate-x-36">
                            <World
                                globeConfig={globeConfig}
                                data={globeData}
                                onLocationClick={(loc) => setSelectedLocation(loc)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 lg:px-28 xl:px-32 relative z-10">

                {/* Desktop Layout: Content on Left */}
                <div className="hidden lg:flex flex-col justify-center min-h-[450px] pt-36 pb-12 max-w-[45%] xl:max-w-[42%]">
                    {/* Section Header - Left Aligned on Desktop */}
                    <div className="text-left mb-10 relative z-30">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl xl:text-4xl font-black text-white font-montserrat tracking-tight mb-6 leading-tight"
                        >
                            {content.title}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-white/80 text-base xl:text-lg max-w-lg font-poppins leading-relaxed"
                        >
                            {content.description}
                        </motion.p>
                    </div>

                    {/* Card - Left Aligned on Desktop */}
                    <div className="relative z-30">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedLocation.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-[#10192C]/70 backdrop-blur-xl border border-white/10 p-5 rounded-3xl w-full max-w-[340px] shadow-2xl relative overflow-hidden group/card"
                            >
                                {/* Background glow effect */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none group-hover/card:bg-brand-blue/30 transition-colors duration-500" />

                                {/* Header: Flag Pill & Title */}
                                <div className="space-y-3 mb-4">
                                    {/* Flag Pill - Clean White Background */}
                                    <div className="inline-flex items-center gap-2.5 bg-white pl-1 pr-3 py-1 rounded-full shadow-lg self-start">
                                        <div className="relative w-7 h-5 shadow-sm rounded-sm overflow-hidden shrink-0">
                                            <Image
                                                src={`https://flagcdn.com/${selectedLocation.flagCode}.svg`}
                                                alt={selectedLocation.country}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="text-brand-blue font-bold text-xs tracking-wide font-montserrat">
                                            {selectedLocation.country}
                                        </span>
                                    </div>

                                    {/* Main Title */}
                                    <h2 className="text-2xl font-bold text-white font-montserrat tracking-tight">
                                        {selectedLocation.country}
                                    </h2>
                                </div>

                                {/* Description */}
                                <p className="text-white/70 text-xs leading-relaxed font-poppins mb-5 line-clamp-3">
                                    {selectedLocation.programs[0]?.description || "Dive into foreign studies within bustling cities, university, and explore vibrant local culture."}
                                </p>

                                {/* Duration Dropdown Mockup */}
                                <div className="mb-5">
                                    <button className="w-full bg-[#1E293B]/60 hover:bg-[#283549]/60 text-white flex items-center justify-between px-4 py-2.5 rounded-xl border border-white/10 transition-colors backdrop-blur-md">
                                        <span className="font-semibold text-xs">2 - 6 Weeks</span>
                                        <ChevronDown className="w-3.5 h-3.5 text-white/60" />
                                    </button>
                                </div>

                                {/* Call to Action */}
                                <button
                                    className="w-full bg-[#E63946] hover:bg-[#d62839] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-red-500/20 group hover:scale-[1.02]"
                                >
                                    <span className="font-montserrat text-xs uppercase tracking-wide">See Program</span>
                                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                </button>

                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Mobile Layout: Stacked vertically */}
                <div className="lg:hidden">
                    {/* Section Header - Centered on Mobile */}
                    <div className="text-center mb-6 relative z-30 pointer-events-none pt-8 -translate-y-8">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl font-black text-white font-montserrat tracking-tight mb-4"
                        >
                            {content.title}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-white/80 text-sm max-w-2xl mx-auto font-poppins"
                        >
                            {content.description}
                        </motion.p>
                    </div>

                    {/* Card - Mobile */}
                    <div className="relative z-30 flex justify-center pt-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedLocation.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className="bg-[#10192C]/70 backdrop-blur-xl border border-white/10 p-5 rounded-3xl w-full max-w-[340px] shadow-2xl relative overflow-hidden group/card"
                            >
                                {/* Background glow effect */}
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none group-hover/card:bg-brand-blue/30 transition-colors duration-500" />

                                {/* Header: Flag Pill & Title */}
                                <div className="space-y-3 mb-4">
                                    {/* Flag Pill - Clean White Background */}
                                    <div className="inline-flex items-center gap-2.5 bg-white pl-1 pr-3 py-1 rounded-full shadow-lg self-start">
                                        <div className="relative w-7 h-5 shadow-sm rounded-sm overflow-hidden shrink-0">
                                            <Image
                                                src={`https://flagcdn.com/${selectedLocation.flagCode}.svg`}
                                                alt={selectedLocation.country}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="text-brand-blue font-bold text-xs tracking-wide font-montserrat">
                                            {selectedLocation.country}
                                        </span>
                                    </div>

                                    {/* Main Title */}
                                    <h2 className="text-2xl font-bold text-white font-montserrat tracking-tight">
                                        {selectedLocation.country}
                                    </h2>
                                </div>

                                {/* Description */}
                                <p className="text-white/70 text-xs leading-relaxed font-poppins mb-5 line-clamp-3">
                                    {selectedLocation.programs[0]?.description || "Dive into foreign studies within bustling cities, university, and explore vibrant local culture."}
                                </p>

                                {/* Duration Dropdown Mockup */}
                                <div className="mb-5">
                                    <button className="w-full bg-[#1E293B]/60 hover:bg-[#283549]/60 text-white flex items-center justify-between px-4 py-2.5 rounded-xl border border-white/10 transition-colors backdrop-blur-md">
                                        <span className="font-semibold text-xs">2 - 6 Weeks</span>
                                        <ChevronDown className="w-3.5 h-3.5 text-white/60" />
                                    </button>
                                </div>

                                {/* Call to Action */}
                                <button
                                    className="w-full bg-[#E63946] hover:bg-[#d62839] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-red-500/20 group hover:scale-[1.02]"
                                >
                                    <span className="font-montserrat text-xs uppercase tracking-wide">See Program</span>
                                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                </button>

                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Globe - Mobile (below card) */}
                    <div className="h-[300px] relative z-20 mt-6">
                        <div className="absolute inset-0 w-full flex justify-center items-center pointer-events-none">
                            <div className="w-full aspect-square relative">
                                <World
                                    globeConfig={globeConfig}
                                    data={globeData}
                                    onLocationClick={(loc) => setSelectedLocation(loc)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}