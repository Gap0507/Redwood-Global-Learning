"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Send, GraduationCap, School, User, Mail, Phone, Building2, MessageSquare, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { addInquiry } from "@/lib/inquiryService"

interface ApplyNowFormProps {
    isOpen: boolean
    onClose: () => void
}

export function ApplyNowForm({ isOpen, onClose }: ApplyNowFormProps) {
    const [role, setRole] = React.useState<"school" | "professor" | null>(null)
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [isSuccess, setIsSuccess] = React.useState(false)

    // Form refs
    const nameRef = React.useRef<HTMLInputElement>(null)
    const emailRef = React.useRef<HTMLInputElement>(null)
    const phoneRef = React.useRef<HTMLInputElement>(null)
    const institutionRef = React.useRef<HTMLInputElement>(null)
    const messageRef = React.useRef<HTMLTextAreaElement>(null)

    // Prevent scrolling when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!role) return

        setIsSubmitting(true)

        const success = await addInquiry({
            name: nameRef.current?.value || "",
            email: emailRef.current?.value || "",
            phone: phoneRef.current?.value || "",
            role: role,
            institutionName: institutionRef.current?.value || "",
            message: messageRef.current?.value || ""
        })

        setIsSubmitting(false)

        if (success) {
            setIsSuccess(true)
            // Close modal after showing success message
            setTimeout(() => {
                setIsSuccess(false)
                onClose()
                setRole(null)
            }, 2000)
        } else {
            alert("Something went wrong. Please try again.")
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#0a2540]/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative flex flex-col max-h-[90vh]"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header Image */}
                            <div className="h-28 sm:h-32 bg-gradient-to-r from-[#0f3a5c] to-[#1a5276] relative overflow-hidden flex-shrink-0">
                                <div className="absolute inset-0 opacity-20 bg-[url('/herobackground.png')] bg-cover bg-center mix-blend-overlay" />
                                <div className="relative z-10 h-full flex items-center justify-between text-white px-8">
                                    <div className="flex flex-col gap-1">
                                        <h2 className="text-2xl sm:text-3xl font-montserrat font-bold tracking-tight">
                                            Start Your Journey
                                        </h2>
                                        <p className="text-white/80 font-poppins text-sm opacity-90 hidden sm:block">
                                            Join our global exchange programs today.
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                        <GraduationCap className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Form Content - Compacted */}
                            <div className="flex-1 overflow-y-auto px-8 py-6 sm:px-10 sm:py-8 custom-scrollbar">
                                {isSuccess ? (
                                    <div className="h-full flex flex-col items-center justify-center py-8 text-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", duration: 0.5 }}
                                            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
                                        >
                                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                                        </motion.div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 font-montserrat">Application Sent!</h3>
                                        <p className="text-gray-500 font-poppins text-sm max-w-xs">
                                            Thank you for applying. We'll be in touch shortly.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">

                                        {/* Role Selection - More Compact */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setRole("school")}
                                                className={cn(
                                                    "flex items-center p-4 rounded-xl border transition-all duration-300 gap-3 group",
                                                    role === "school"
                                                        ? "border-brand-blue bg-brand-blue/5 shadow-sm"
                                                        : "border-gray-200 hover:border-brand-blue/30 hover:bg-gray-50"
                                                )}
                                            >
                                                <div className={cn(
                                                    "p-2.5 rounded-full transition-colors flex-shrink-0",
                                                    role === "school" ? "bg-brand-blue text-white" : "bg-gray-100 text-gray-500 group-hover:bg-brand-blue/10 group-hover:text-brand-blue"
                                                )}>
                                                    <School className="w-5 h-5" />
                                                </div>
                                                <span className={cn(
                                                    "font-poppins font-medium text-sm text-left",
                                                    role === "school" ? "text-brand-blue" : "text-gray-600"
                                                )}>I am a School</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setRole("professor")}
                                                className={cn(
                                                    "flex items-center p-4 rounded-xl border transition-all duration-300 gap-3 group",
                                                    role === "professor"
                                                        ? "border-brand-blue bg-brand-blue/5 shadow-sm"
                                                        : "border-gray-200 hover:border-brand-blue/30 hover:bg-gray-50"
                                                )}
                                            >
                                                <div className={cn(
                                                    "p-2.5 rounded-full transition-colors flex-shrink-0",
                                                    role === "professor" ? "bg-brand-blue text-white" : "bg-gray-100 text-gray-500 group-hover:bg-brand-blue/10 group-hover:text-brand-blue"
                                                )}>
                                                    <GraduationCap className="w-5 h-5" />
                                                </div>
                                                <span className={cn(
                                                    "font-poppins font-medium text-sm text-left",
                                                    role === "professor" ? "text-brand-blue" : "text-gray-600"
                                                )}>I am a Professor</span>
                                            </button>
                                        </div>

                                        {/* Inputs - Grid Layout */}
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {/* Full Name */}
                                                <div className="group relative">
                                                    <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-brand-blue transition-colors">
                                                        <User className="w-5 h-5" />
                                                    </div>
                                                    <input
                                                        ref={nameRef}
                                                        type="text"
                                                        required
                                                        placeholder="Full Name"
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 font-poppins text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                                                    />
                                                </div>

                                                {/* Email Address */}
                                                <div className="group relative">
                                                    <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-brand-blue transition-colors">
                                                        <Mail className="w-5 h-5" />
                                                    </div>
                                                    <input
                                                        ref={emailRef}
                                                        type="email"
                                                        required
                                                        placeholder="Email Address"
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 font-poppins text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {/* Phone Number */}
                                                <div className="group relative">
                                                    <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-brand-blue transition-colors">
                                                        <Phone className="w-5 h-5" />
                                                    </div>
                                                    <input
                                                        ref={phoneRef}
                                                        type="tel"
                                                        required
                                                        placeholder="Phone Number"
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 font-poppins text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                                                    />
                                                </div>

                                                {/* Institution Name */}
                                                <div className="group relative">
                                                    <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-brand-blue transition-colors">
                                                        <Building2 className="w-5 h-5" />
                                                    </div>
                                                    <input
                                                        ref={institutionRef}
                                                        type="text"
                                                        required
                                                        placeholder="Institution Name"
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 font-poppins text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all"
                                                    />
                                                </div>
                                            </div>

                                            {/* Message (Optional) */}
                                            <div className="group relative">
                                                <div className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-brand-blue transition-colors">
                                                    <MessageSquare className="w-5 h-5" />
                                                </div>
                                                <textarea
                                                    ref={messageRef}
                                                    placeholder="Message (Optional)"
                                                    rows={3}
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 font-poppins text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all resize-none"
                                                />
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !role}
                                            className={cn(
                                                "w-full bg-brand-red hover:bg-brand-red/90 text-white font-montserrat font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-base",
                                                (isSubmitting || !role) && "opacity-70 cursor-not-allowed"
                                            )}
                                        >
                                            {isSubmitting ? (
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Submit Application
                                                    <Send className="w-4 h-4 ml-1" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
