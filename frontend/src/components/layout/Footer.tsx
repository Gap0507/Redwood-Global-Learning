'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    MapPin,
    Phone,
    Mail,
    ArrowRight
} from "lucide-react";
import { getContactContent, defaultContactContent, ContactContent } from "@/lib/contactContent";

const quickLinks = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Advisory Board", href: "/advisory-board" },
];

const programLinks = [
    { title: "Student Exchange", href: "/programs/student-exchange" },
    { title: "Summer Programs", href: "/programs/summer" },
    { title: "Language Immersion", href: "/programs/language" },
    { title: "Cultural Tours", href: "/programs/cultural-tours" },
];

export function Footer({ onApplyClick }: { onApplyClick?: () => void }) {
    const [contactContent, setContactContent] = useState<ContactContent>(defaultContactContent);

    useEffect(() => {
        getContactContent().then(setContactContent);
    }, []);

    const socialLinks = [
        { icon: Facebook, href: contactContent.socialLinks.facebook, label: "Facebook" },
        { icon: Instagram, href: contactContent.socialLinks.instagram, label: "Instagram" },
        { icon: Twitter, href: contactContent.socialLinks.twitter, label: "Twitter" },
        { icon: Youtube, href: contactContent.socialLinks.youtube, label: "YouTube" },
    ];

    return (
        <footer className="relative bg-[#0f3a5c] overflow-hidden pt-16 pb-8 border-t border-white/10">
            {/* Main Footer Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl py-10 md:py-12">

                {/* Main Grid - All columns including logo */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10"
                >
                    {/* Logo & Tagline */}
                    <div className="col-span-1 flex flex-col items-center sm:items-start">
                        <Link href="/" className="mb-3 block">
                            <div className="relative h-[90px] w-[220px] sm:h-[100px] sm:w-[260px] lg:h-[110px] lg:w-[300px]">
                                <Image
                                    src="/logo.svg"
                                    alt="Redwood Global Learning"
                                    fill
                                    className="object-contain object-center sm:object-left brightness-0 invert"
                                    quality={100}
                                />
                            </div>
                        </Link>
                        <p className="text-white/60 text-sm font-poppins text-center sm:text-left max-w-[220px] leading-relaxed">
                            Empowering students through transformative global exchange experiences.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1 text-center sm:text-left">
                        <h5 className="text-white font-montserrat font-bold text-base mb-4 tracking-wide">
                            Quick Links
                        </h5>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.title}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-white font-poppins text-sm transition-colors"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Programs */}
                    <div className="col-span-1 text-center sm:text-left">
                        <h5 className="text-white font-montserrat font-bold text-base mb-4 tracking-wide">
                            Our Programs
                        </h5>
                        <ul className="space-y-2.5">
                            {programLinks.map((link) => (
                                <li key={link.title}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-white font-poppins text-sm transition-colors"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-1 text-center sm:text-left">
                        <h5 className="text-white font-montserrat font-bold text-base mb-4 tracking-wide">
                            Contact Us
                        </h5>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-white/60 justify-center sm:justify-start">
                                <MapPin className="w-4 h-4 mt-0.5 text-brand-red flex-shrink-0" />
                                <span className="font-poppins text-sm leading-relaxed whitespace-pre-line text-left">
                                    {contactContent.contactInfo.address}
                                </span>
                            </li>
                            <li className="flex items-center gap-2 text-white/60 justify-center sm:justify-start">
                                <Phone className="w-4 h-4 text-brand-red flex-shrink-0" />
                                <span className="font-poppins text-sm">{contactContent.contactInfo.phone}</span>
                            </li>
                            <li className="flex items-center gap-2 text-white/60 justify-center sm:justify-start">
                                <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                                <span className="font-poppins text-sm">{contactContent.contactInfo.email}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social & CTA */}
                    <div className="col-span-1 flex flex-col items-center sm:items-start">
                        <h5 className="text-white font-montserrat font-bold text-base mb-4 tracking-wide">
                            Follow Us
                        </h5>
                        <div className="flex gap-2 mb-4 flex-wrap justify-center sm:justify-start">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-red flex items-center justify-center text-white/60 hover:text-white transition-colors"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </motion.a>
                                );
                            })}
                        </div>
                        <motion.button
                            onClick={onApplyClick}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-brand-red hover:bg-brand-red/90 text-white font-montserrat font-bold text-sm py-2.5 px-6 rounded-full transition-colors flex items-center gap-2"
                        >
                            Apply Now
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Bottom Section - Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs font-poppins"
                >
                    <p>© {new Date().getFullYear()} Redwood Global Learning. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
