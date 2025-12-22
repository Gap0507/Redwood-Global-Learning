"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("@/components/ui/globe").then((m) => m.Globe), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
        </div>
    ),
});

export function Hero() {
    return (
        <section className="relative min-h-[90vh] w-full overflow-hidden bg-nasa-layered pt-20 lg:pt-24 flex items-center">

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">

                    {/* Left Content */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center rounded-full border border-brand-blue/20 bg-brand-blue/5 px-3 py-1 text-sm font-medium text-brand-blue backdrop-blur-sm">
                                <span className="flex h-2 w-2 rounded-full bg-accent-red mr-2 animate-pulse"></span>
                                Global Exchange Program 2025
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-brand-blue-dark sm:text-5xl xl:text-6xl/none font-heading uppercase">
                                Experience the World <br />
                                <span className="text-brand-blue">Before You Graduate</span>
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
                                Join our global exchange program and explore exciting cultures, diverse landscapes, and top universities worldwide. Your classroom is the world.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="bg-brand-blue hover:bg-brand-blue-soft text-white shadow-lg shadow-brand-blue/20 h-12 px-8 text-base">
                                Explore Programs
                            </Button>
                            <Button size="lg" variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue/5 h-12 px-8 text-base group">
                                Learn More
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>

                        {/* Trust Indicators */}
                        <div className="pt-4 flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-500">
                                        {/* Placeholder avatars */}
                                        U{i}
                                    </div>
                                ))}
                            </div>
                            <p>Trusted by students across 15+ countries</p>
                        </div>
                    </div>

                    {/* Right Visuals - Interactive Globe */}
                    <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none flex justify-center lg:justify-end">
                        <div className="relative aspect-square w-full max-w-[600px]">
                            {/* Radial Glow behind globe */}
                            <div className="absolute inset-0 bg-gradient-radial from-brand-blue/20 to-transparent opacity-50 blur-3xl transform scale-75 pointer-events-none" />

                            {/* Interactive 3D Globe */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                <Globe className="" />


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
