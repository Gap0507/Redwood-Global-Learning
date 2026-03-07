"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

interface BannerModalProps {
    imageUrl: string;
    isOpen: boolean;
    onClose: () => void;
}

export function BannerModal({ imageUrl, isOpen, onClose }: BannerModalProps) {
    const router = useRouter();

    const handleContactUs = () => {
        onClose();
        router.push("/contact");
    };

    return (
        <AnimatePresence>
            {isOpen && imageUrl && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="banner-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    {/* Modal Card */}
                    <motion.div
                        key="banner-modal"
                        initial={{ opacity: 0, scale: 0.88, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 16 }}
                        transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.8 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
                        aria-modal="true"
                        role="dialog"
                        aria-label="Homepage banner"
                    >
                        <div
                            className="relative pointer-events-auto w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl bg-white"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <motion.button
                                onClick={onClose}
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors"
                                aria-label="Close banner"
                            >
                                <X className="w-4 h-4" />
                            </motion.button>

                            {/* Banner Image */}
                            <div className="relative w-full aspect-[16/9]">
                                <Image
                                    src={imageUrl}
                                    alt="Promotional banner"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, 512px"
                                    priority
                                />
                                {/* Subtle gradient at the bottom for the button area */}
                                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            </div>

                            {/* Action area */}
                            <div className="relative px-6 py-5 flex items-center justify-between bg-white">
                                <p className="font-poppins text-sm text-brand-gray">
                                    Ready to take the next step?
                                </p>
                                <motion.button
                                    onClick={handleContactUs}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-brand-blue text-white font-poppins font-semibold text-sm rounded-xl shadow-lg shadow-brand-blue/25 hover:bg-brand-blue/90 transition-colors"
                                >
                                    Contact Us
                                    <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
