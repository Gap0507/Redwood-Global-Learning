'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from "lucide-react";

const quickLinks = [
    { title: "Programs", href: "/programs" },
    { title: "About Us", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Advisory Board", href: "/advisory-board" },
];

const programLinks = [
    { title: "Student Exchange", href: "/programs/exchange" },
    { title: "Summer Programs", href: "/programs/summer" },
    { title: "Language Immersion", href: "/programs/language" },
    { title: "Cultural Tours", href: "/programs/cultural" },
];

const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export function Footer({ onApplyClick }: { onApplyClick?: () => void }) {
    return (
        <footer className="relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#0a2540]/95" />
            </div>

            {/* Main Footer Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl py-10 md:py-12">

                {/* Main Grid - All content in one row on desktop */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6"
                >
                    {/* Logo & Tagline - Larger */}
                    <div className="lg:col-span-3 flex flex-col items-center md:items-start">
                        <Link href="/" className="mb-0 block">
                            <div className="relative h-[100px] w-[240px] sm:h-[120px] sm:w-[280px] md:h-[140px] md:w-[340px]">
                                <Image
                                    src="/logo.svg"
                                    alt="Redwood Global Learning"
                                    fill
                                    className="object-contain object-left brightness-0 invert"
                                    quality={100}
                                />
                            </div>
                        </Link>
                        <p className="text-white/60 text-xs font-poppins text-center md:text-left max-w-[220px] leading-relaxed">
                            Empowering students through transformative global exchange experiences.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h5 className="text-white font-montserrat font-bold text-sm mb-4 tracking-wide">
                            Quick Links
                        </h5>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.title}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-white font-poppins text-xs transition-colors"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Programs */}
                    <div className="lg:col-span-2">
                        <h5 className="text-white font-montserrat font-bold text-sm mb-4 tracking-wide">
                            Our Programs
                        </h5>
                        <ul className="space-y-2">
                            {programLinks.map((link) => (
                                <li key={link.title}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-white font-poppins text-xs transition-colors"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-3">
                        <h5 className="text-white font-montserrat font-bold text-sm mb-4 tracking-wide">
                            Contact Us
                        </h5>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-white/60">
                                <MapPin className="w-3.5 h-3.5 mt-0.5 text-brand-red flex-shrink-0" />
                                <span className="font-poppins text-xs leading-relaxed">
                                    123 Education Way, Suite 100<br />
                                    San Francisco, CA 94102
                                </span>
                            </li>
                            <li className="flex items-center gap-2 text-white/60">
                                <Phone className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                                <span className="font-poppins text-xs">1 800-123-4567</span>
                            </li>
                            <li className="flex items-center gap-2 text-white/60">
                                <Mail className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                                <span className="font-poppins text-xs">info@redwoodglobal.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social & CTA */}
                    <div className="lg:col-span-2 flex flex-col items-center md:items-start lg:items-end">
                        <h5 className="text-white font-montserrat font-bold text-sm mb-4 tracking-wide">
                            Follow Us
                        </h5>
                        <div className="flex gap-2 mb-4">
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
                                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-red flex items-center justify-center text-white/60 hover:text-white transition-colors"
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                    </motion.a>
                                );
                            })}
                        </div>
                        <motion.button
                            onClick={onApplyClick}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-brand-red hover:bg-brand-red/90 text-white font-montserrat font-bold text-xs py-2.5 px-6 rounded-full transition-colors flex items-center gap-2"
                        >
                            Apply Now
                            <ArrowRight className="w-3.5 h-3.5" />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Bottom Section - Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3"
                >
                    <p className="text-white/40 font-poppins text-[11px] text-center sm:text-left">
                        © {new Date().getFullYear()} Redwood Global Learning. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 sm:gap-6">
                        <Link href="/privacy" className="text-white/40 hover:text-white/70 font-poppins text-[11px] transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-white/40 hover:text-white/70 font-poppins text-[11px] transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/cookies" className="text-white/40 hover:text-white/70 font-poppins text-[11px] transition-colors">
                            Cookies
                        </Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
