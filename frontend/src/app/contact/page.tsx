"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Send, GraduationCap, School, User, Mail, Phone, Building2, MessageSquare, CheckCircle2, Users, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { addInquiry } from "@/lib/inquiryService"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ApplyNowForm } from "@/components/forms/ApplyNowForm"

export default function ContactPage() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [role, setRole] = React.useState<"school" | "professor" | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  // Form refs
  const nameRef = React.useRef<HTMLInputElement>(null)
  const emailRef = React.useRef<HTMLInputElement>(null)
  const phoneRef = React.useRef<HTMLInputElement>(null)
  const institutionRef = React.useRef<HTMLInputElement>(null)
  const messageRef = React.useRef<HTMLTextAreaElement>(null)

  const handleApplyClick = () => setIsApplyModalOpen(true)

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
        // Reset form after success
        setTimeout(() => {
            setIsSuccess(false)
            setRole(null)
            // Clear form fields
            if (nameRef.current) nameRef.current.value = ""
            if (emailRef.current) emailRef.current.value = ""
            if (phoneRef.current) phoneRef.current.value = ""
            if (institutionRef.current) institutionRef.current.value = ""
            if (messageRef.current) messageRef.current.value = ""
        }, 3000)
    } else {
        alert("Something went wrong. Please try again.")
    }
  }

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <Navbar onApplyClick={handleApplyClick} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, hsl(var(--brand-blue)) 1px, transparent 0)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Organic Background Shape - Desktop Only */}
        <div className="hidden lg:block absolute top-0 right-0 w-[50%] bottom-0">
          <svg
            viewBox="0 0 600 1200"
            className="w-full h-full"
            preserveAspectRatio="xMaxYMid slice"
          >
            <path
              d="M600,0 L600,1200 L300,1200 Q250,1000 300,800 Q350,600 280,400 Q210,300 300,200 Q390,100 320,0 Z"
              fill="hsl(var(--brand-blue))"
              opacity="0.05"
            />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block mb-6">
              <div className="inline-flex items-center gap-3 relative">
                <div className="w-12 h-[1px] bg-brand-red"></div>
                <span className="text-sm tracking-[0.3em] uppercase text-brand-red font-medium">
                  Contact Us
                </span>
                <div className="w-12 h-[1px] bg-brand-red"></div>
              </div>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-blue tracking-tight leading-[0.95] mb-6">
              Get In Touch
            </h1>
            <p className="text-lg sm:text-xl text-brand-gray/70 leading-relaxed font-light max-w-3xl mx-auto">
              Have questions about our programs? Want to partner with us? We're here to help.
              Reach out and let's start a conversation about global education.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative bg-gray-50/50 py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, hsl(var(--brand-blue)) 1px, transparent 0)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Organic Background Shape - Desktop Only */}
        <div className="hidden lg:block absolute top-0 left-0 w-[50%] h-full">
          <svg
            viewBox="0 0 600 800"
            className="w-full h-full"
            preserveAspectRatio="xMinYMid slice"
          >
            <path
              d="M0,0 L0,800 L300,800 Q250,700 300,600 Q350,500 280,400 Q210,300 300,200 Q390,100 320,0 Z"
              fill="hsl(var(--brand-red))"
              opacity="0.05"
            />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left side - Empty space for decorative curve */}
            <div className="hidden lg:block"></div>

            {/* Right side - Header */}
            <div className="lg:col-start-2">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left mb-12 sm:mb-16"
              >
                <div className="inline-block mb-6">
                  <div className="inline-flex items-center gap-3 relative">
                    <div className="w-12 h-[1px] bg-brand-red"></div>
                    <span className="text-sm tracking-[0.3em] uppercase text-brand-red font-medium">
                      Contact & Apply
                    </span>
                    <div className="w-12 h-[1px] bg-brand-red"></div>
                  </div>
                </div>

                <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-blue tracking-tight leading-[0.95] mb-4">
                  Start Your Journey
                </h2>
                <p className="text-lg sm:text-xl text-brand-gray/70 leading-relaxed font-light max-w-3xl lg:max-w-2xl mx-auto lg:mx-0">
                  Ready to join our global learning community? Get in touch with us to learn more
                  about our programs and how we can help you achieve your educational goals.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch h-fit">
            {/* Contact Form - Inline Apply Now Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:order-1 flex"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-brand-blue/10 w-full">
                {/* Header Image */}
                <div className="h-20 sm:h-24 bg-gradient-to-r from-[#0f3a5c] to-[#1a5276] relative overflow-hidden flex-shrink-0 rounded-xl mb-6">
                  <div className="absolute inset-0 opacity-20 bg-[url('/herobackground.png')] bg-cover bg-center mix-blend-overlay" />
                  <div className="relative z-10 h-full flex items-center justify-between text-white px-6">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg sm:text-xl font-montserrat font-bold tracking-tight">
                        Start Your Journey
                      </h3>
                      <p className="text-white/80 font-poppins text-xs opacity-90 hidden sm:block">
                        Join our global exchange programs today.
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

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
                    <h4 className="text-xl font-bold text-gray-900 mb-2 font-montserrat">Application Sent!</h4>
                    <p className="text-gray-500 font-poppins text-sm max-w-xs">
                      Thank you for applying. We'll be in touch shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Role Selection */}
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

                    {/* Inputs */}
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

            {/* Map and Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:order-2 flex flex-col"
            >
              {/* Interactive Map - Full height to match form */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1 sm:p-2 shadow-xl border border-brand-blue/10 overflow-hidden flex-1">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509041!2d-122.4194155846814!3d37.774929279759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '0.75rem' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[400px]"
                />
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-brand-blue/10 text-center">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div className="text-2xl font-bold text-brand-blue font-heading mb-1">45+</div>
                  <div className="text-xs text-brand-gray/70 font-medium uppercase tracking-wider">Countries</div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-brand-blue/10 text-center">
                  <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-brand-red" />
                  </div>
                  <div className="text-2xl font-bold text-brand-red font-heading mb-1">2K+</div>
                  <div className="text-xs text-brand-gray/70 font-medium uppercase tracking-wider">Students</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-red/30 to-transparent origin-center"
        />
      </section>

      <Footer onApplyClick={handleApplyClick} />

      <ApplyNowForm
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </main>
  )
}
