"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    MessageSquareQuote,
    Plus,
    Trash2,
    Edit3,
    Star,
    Search,
    Filter,
    MoreVertical,
    Eye,
    EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    country: string;
    flagCode: string;
    text: string;
    image: string;
    rating: number;
    status: "active" | "hidden";
    createdAt: string;
}

const sampleTestimonials: Testimonial[] = [
    {
        id: "1",
        name: "Sarah Jenkins",
        role: "Student, France Program",
        country: "France",
        flagCode: "fr",
        text: "My exchange year was truly defined by the people I met. The bonds I formed with my host family and friends are lifelong.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
        rating: 5,
        status: "active",
        createdAt: "2025-12-15"
    },
    {
        id: "2",
        name: "Marcus Chen",
        role: "Student, Japan Program",
        country: "Japan",
        flagCode: "jp",
        text: "Living in Tokyo opened my eyes to a completely different way of life. The culture shock was real but so rewarding.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200",
        rating: 5,
        status: "active",
        createdAt: "2025-12-10"
    },
    {
        id: "3",
        name: "Elena Rodriguez",
        role: "Student, Spain Program",
        country: "Spain",
        flagCode: "es",
        text: "I learned more about myself in 6 months abroad than I did in 3 years at home. It's a transformative experience.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200",
        rating: 5,
        status: "active",
        createdAt: "2025-11-28"
    },
    {
        id: "4",
        name: "David Kim",
        role: "Student, USA Program",
        country: "USA",
        flagCode: "us",
        text: "The support from Redwood Global was incredible. They made sure I felt safe and prepared every step of the way.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
        rating: 4,
        status: "hidden",
        createdAt: "2025-11-15"
    },
];

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState(sampleTestimonials);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

    const filteredTestimonials = testimonials.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold font-montserrat text-brand-blue">
                        Testimonials
                    </h1>
                    <p className="text-brand-gray font-poppins mt-1">
                        Manage student testimonials and reviews
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-brand-blue text-white font-poppins font-medium rounded-xl shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/90 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Add Testimonial
                </motion.button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Total", value: testimonials.length, color: "blue" },
                    { label: "Active", value: testimonials.filter(t => t.status === "active").length, color: "green" },
                    { label: "Hidden", value: testimonials.filter(t => t.status === "hidden").length, color: "gray" },
                    { label: "Avg Rating", value: "4.8", color: "yellow" },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-xl p-4 shadow-md border border-gray-100"
                    >
                        <p className="text-2xl font-bold font-montserrat text-brand-blue">{stat.value}</p>
                        <p className="text-sm text-brand-gray font-poppins">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Search & Filter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
            >
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray/50" />
                    <input
                        type="text"
                        placeholder="Search by name or country..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                    />
                </div>
                <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 rounded-xl font-poppins font-medium text-brand-gray hover:bg-gray-50 transition-colors">
                    <Filter className="w-5 h-5" />
                    Filter
                </button>
            </motion.div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredTestimonials.map((testimonial, index) => (
                    <motion.div
                        key={testimonial.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-poppins font-semibold text-brand-blue">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-sm text-brand-gray">{testimonial.role}</p>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <Image
                                            src={`https://flagcdn.com/${testimonial.flagCode}.svg`}
                                            alt={testimonial.country}
                                            width={16}
                                            height={12}
                                            className="rounded-sm"
                                        />
                                        <span className="text-xs text-brand-gray">{testimonial.country}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={cn(
                                    "px-2 py-1 rounded-full text-xs font-medium",
                                    testimonial.status === "active"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-gray-100 text-gray-500"
                                )}>
                                    {testimonial.status === "active" ? <Eye className="w-3 h-3 inline mr-1" /> : <EyeOff className="w-3 h-3 inline mr-1" />}
                                    {testimonial.status}
                                </span>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={cn(
                                        "w-4 h-4",
                                        i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
                                    )}
                                />
                            ))}
                            <span className="text-sm text-brand-gray ml-2">{testimonial.rating}.0</span>
                        </div>

                        {/* Quote */}
                        <div className="relative mb-4">
                            <MessageSquareQuote className="absolute -top-1 -left-1 w-6 h-6 text-brand-blue/10" />
                            <p className="text-brand-gray font-poppins text-sm pl-5 italic">
                                "{testimonial.text}"
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-xs text-brand-gray/60">
                                Added: {new Date(testimonial.createdAt).toLocaleDateString()}
                            </span>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-brand-blue/10 rounded-lg text-brand-gray hover:text-brand-blue transition-colors">
                                    <Edit3 className="w-4 h-4" />
                                </button>
                                <button className="p-2 hover:bg-red-50 rounded-lg text-brand-gray hover:text-red-500 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredTestimonials.length === 0 && (
                <div className="text-center py-12">
                    <MessageSquareQuote className="w-12 h-12 text-brand-gray/30 mx-auto mb-4" />
                    <p className="text-brand-gray font-poppins">No testimonials found</p>
                </div>
            )}
        </div>
    );
}
