'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { programLocations, ProgramLocation } from '@/data/sampleArcs';

// Dynamically load Globe to avoid SSR issues
const World = dynamic(() => import('@/components/ui/globe').then((m) => m.World), {
    ssr: false,
});

export function WhereCanYouGoSection() {
    const [selectedLocation, setSelectedLocation] = useState<ProgramLocation>(programLocations[0]);

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
        pointSize: 2, // Slightly larger points
        globeColor: "#0B1221", // Dark Blue to match section bg
        showAtmosphere: true,
        atmosphereColor: "#3B82F6", // Blue atmosphere
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
        showArcs: false, // Explicitly hide arcs as requested
    };

    return (
        <section className="relative bg-[#0B1221] pt-32 pb-0 overflow-hidden -mt-20 z-10" style={{ clipPath: 'polygon(0 10%, 100% 0, 100% 100%, 0 100%)' }}>

            <div className="container mx-auto px-4 md:px-8 lg:px-12 relative z-20 h-full">

                {/* Section Header */}
                <div className="text-center mb-12 lg:mb-0 relative z-30 pointer-events-none pt-12 -translate-y-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-black text-white font-montserrat tracking-tight mb-4"
                    >
                        WHERE CAN YOU GO?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-white/80 text-sm md:text-lg max-w-2xl mx-auto font-poppins"
                    >
                        Explore destinations for our global exchange programs
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end relative pb-0">

                    {/* Left Side - Interactive Info Card - Moved closer to globe (col-span-5) */}
                    <div className="lg:col-span-5 relative z-30 order-2 lg:order-1 flex justify-center lg:justify-end pt-8 lg:pt-10 lg:pr-10 -translate-y-20">
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

                    {/* Right Side - Globe Visualization */}
                    <div className="lg:col-span-7 h-full relative z-20 order-1 lg:order-2">
                        {/* Semi-Circular Horizon Effect: Positioned to the right as a compact corner arc */}
                        <div className="absolute right-[-25%] lg:right-[15%] bottom-[-30%] lg:bottom-[-100%] w-full h-[150%] flex justify-end items-end pointer-events-none lg:pointer-events-auto">
                            <div className="w-[140%] lg:w-[110%] aspect-square relative translate-x-[20%]">
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
