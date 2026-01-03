"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Users,
    Plus,
    Trash2,
    Edit3,
    Search,
    Linkedin,
    Twitter,
    Globe,
    Mail,
    GripVertical,
    MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdvisoryMember {
    id: string;
    name: string;
    title: string;
    organization: string;
    image: string;
    bio: string;
    expertise: string[];
    linkedin?: string;
    twitter?: string;
    website?: string;
    order: number;
    status: "active" | "inactive";
}

const sampleMembers: AdvisoryMember[] = [
    {
        id: "1",
        name: "Dr. Sarah Mitchell",
        title: "Director of International Education",
        organization: "Stanford University",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
        bio: "With over 20 years of experience in international education, Dr. Mitchell has pioneered numerous cross-cultural exchange programs.",
        expertise: ["International Education", "Cultural Exchange", "Higher Education Policy"],
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        order: 1,
        status: "active"
    },
    {
        id: "2",
        name: "Prof. James Chen",
        title: "Head of Asia-Pacific Programs",
        organization: "Oxford University",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
        bio: "Professor Chen specializes in East Asian education systems and has facilitated partnerships with universities across 15 countries.",
        expertise: ["Asia-Pacific Relations", "Educational Policy", "Student Mobility"],
        linkedin: "https://linkedin.com",
        website: "https://example.com",
        order: 2,
        status: "active"
    },
    {
        id: "3",
        name: "Maria Rodriguez",
        title: "Global Education Consultant",
        organization: "UNESCO",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200",
        bio: "Maria has advised governments and institutions on implementing sustainable global education initiatives.",
        expertise: ["UNESCO Programs", "Sustainable Education", "Global Policy"],
        linkedin: "https://linkedin.com",
        order: 3,
        status: "active"
    },
    {
        id: "4",
        name: "Dr. Robert Taylor",
        title: "Former Ambassador",
        organization: "U.S. Department of State",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
        bio: "Dr. Taylor brings diplomatic expertise and a deep understanding of cross-border educational initiatives.",
        expertise: ["Diplomacy", "International Relations", "Cultural Affairs"],
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        order: 4,
        status: "inactive"
    },
];

export default function AdvisoryManagementPage() {
    const [members, setMembers] = useState(sampleMembers);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMember, setSelectedMember] = useState<AdvisoryMember | null>(null);

    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.organization.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeMembers = members.filter(m => m.status === "active");

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
                        Advisory Management
                    </h1>
                    <p className="text-brand-gray font-poppins mt-1">
                        Manage your advisory board members
                    </p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-brand-blue text-white font-poppins font-medium rounded-xl shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/90 transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Add Member
                </motion.button>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: "Total Members", value: members.length, icon: Users, color: "blue" },
                    { title: "Active", value: activeMembers.length, icon: Users, color: "green" },
                    { title: "Inactive", value: members.length - activeMembers.length, icon: Users, color: "gray" },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                    >
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center",
                                stat.color === "blue" && "bg-blue-100 text-blue-600",
                                stat.color === "green" && "bg-green-100 text-green-600",
                                stat.color === "gray" && "bg-gray-100 text-gray-500"
                            )}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold font-montserrat text-brand-blue">{stat.value}</p>
                                <p className="text-sm text-brand-gray font-poppins">{stat.title}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Search */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
            >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray/50" />
                <input
                    type="text"
                    placeholder="Search by name or organization..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                />
            </motion.div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredMembers.map((member, index) => (
                    <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                        {/* Header */}
                        <div className="p-6 flex items-start gap-5">
                            <div className="flex items-center gap-3">
                                <GripVertical className="w-5 h-5 text-gray-300 cursor-grab" />
                                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h3 className="font-montserrat font-bold text-brand-blue text-lg">
                                            {member.name}
                                        </h3>
                                        <p className="text-sm text-brand-red font-poppins font-medium">
                                            {member.title}
                                        </p>
                                        <p className="text-sm text-brand-gray font-poppins">
                                            {member.organization}
                                        </p>
                                    </div>
                                    <span className={cn(
                                        "px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0",
                                        member.status === "active"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-gray-100 text-gray-500"
                                    )}>
                                        {member.status}
                                    </span>
                                </div>

                                {/* Social Links */}
                                <div className="flex items-center gap-2 mt-3">
                                    {member.linkedin && (
                                        <a href={member.linkedin} target="_blank" rel="noopener" className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors">
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    )}
                                    {member.twitter && (
                                        <a href={member.twitter} target="_blank" rel="noopener" className="p-1.5 hover:bg-sky-50 rounded-lg text-sky-500 transition-colors">
                                            <Twitter className="w-4 h-4" />
                                        </a>
                                    )}
                                    {member.website && (
                                        <a href={member.website} target="_blank" rel="noopener" className="p-1.5 hover:bg-gray-100 rounded-lg text-brand-gray transition-colors">
                                            <Globe className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="px-6 pb-4">
                            <p className="text-sm text-brand-gray font-poppins line-clamp-2">
                                {member.bio}
                            </p>
                        </div>

                        {/* Expertise Tags */}
                        <div className="px-6 pb-4">
                            <div className="flex flex-wrap gap-2">
                                {member.expertise.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-2.5 py-1 bg-brand-blue/5 text-brand-blue text-xs font-poppins font-medium rounded-lg"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-xs text-brand-gray/60">Order: #{member.order}</span>
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

            {filteredMembers.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
                    <Users className="w-12 h-12 text-brand-gray/30 mx-auto mb-4" />
                    <p className="text-brand-gray font-poppins">No advisory members found</p>
                </div>
            )}
        </div>
    );
}
