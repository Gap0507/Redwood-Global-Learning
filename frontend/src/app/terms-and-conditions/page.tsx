"use client"

import { useState } from "react"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ApplyNowForm } from "@/components/forms/ApplyNowForm"
import {
  FileText,
  CreditCard,
  RotateCcw,
  CalendarClock,
  Users,
  BookOpenCheck,
  Briefcase,
  HeartPulse,
  ShieldCheck,
  CloudLightning,
  Scale,
  Plane,
  CheckCircle2,
  Lock,
  Mail,
  ArrowRight,
} from "lucide-react"

const terms = [
  {
    icon: FileText,
    title: "Program Information",
    content:
      "Program details, itineraries, activities, accommodation, and schedules are subject to availability and may change when necessary.",
  },
  {
    icon: CreditCard,
    title: "Payments & Bookings",
    content:
      "Bookings are confirmed only after the required payment has been received. Program fees and payment schedules will be communicated before confirmation.",
  },
  {
    icon: RotateCcw,
    title: "Cancellation & Refunds",
    content:
      "Cancellation and refund conditions vary by program. Any applicable non-refundable fees and cancellation charges will be communicated at the time of booking.",
  },
  {
    icon: CalendarClock,
    title: "Changes & Delays",
    content:
      "Redwood Global Learning may modify schedules, activities, accommodation, transportation, or itineraries when required due to weather, safety, availability, government regulations, or other circumstances beyond our reasonable control.",
  },
  {
    icon: Users,
    title: "Third-Party Services",
    content:
      "Some services, including flights, hotels, transportation, activities, and other arrangements, may be provided by independent third-party providers. Redwood Global Learning is not responsible for delays, cancellations, service interruptions, loss, damage, or other issues caused by third-party providers, except where required by applicable law.",
  },
  {
    icon: BookOpenCheck,
    title: "Travel Documents",
    content:
      "Participants are responsible for obtaining valid passports, visas, permits, travel insurance, and other documents required for their journey. Redwood Global Learning is not responsible for visa refusals, denied entry, expired documents, or related expenses.",
  },
  {
    icon: Briefcase,
    title: "Personal Belongings",
    content:
      "Participants are responsible for their luggage, valuables, money, passports, and personal belongings. Redwood Global Learning is not responsible for loss, theft, or damage to personal belongings, except where required by law.",
  },
  {
    icon: HeartPulse,
    title: "Health & Safety",
    content:
      "Participants are responsible for informing Redwood Global Learning of relevant medical, dietary, or accessibility requirements before the program. Participants must follow all safety instructions and applicable local laws.",
  },
  {
    icon: ShieldCheck,
    title: "Participant Conduct",
    content:
      "Participants must behave responsibly and respectfully and follow the instructions of Redwood Global Learning, program partners, accommodation providers, and local authorities. Redwood reserves the right to remove a participant from a program in cases of serious misconduct or where safety is a concern.",
  },
  {
    icon: CloudLightning,
    title: "Unforeseen Circumstances",
    content:
      "Redwood Global Learning shall not be responsible for delays, cancellations, losses, or additional expenses resulting from circumstances beyond its reasonable control, including natural disasters, extreme weather, strikes, government restrictions, civil unrest, pandemics, transportation disruptions, or similar events.",
  },
  {
    icon: Scale,
    title: "Liability",
    content:
      "To the maximum extent permitted by applicable law, Redwood Global Learning is not responsible for indirect or consequential loss, additional expenses, inconvenience, or damages arising from participation in a program, except where such liability cannot legally be excluded.",
  },
  {
    icon: Plane,
    title: "Travel Insurance",
    content:
      "Participants are responsible for obtaining appropriate travel insurance covering medical emergencies, trip cancellation, travel delays, baggage, and other relevant travel risks.",
  },
  {
    icon: CheckCircle2,
    title: "Acceptance",
    content:
      "By registering for a Redwood Global Learning program, participants and, where applicable, their parent or legal guardian confirm that they have read and accepted these Terms & Conditions and any program-specific terms provided during registration.",
  },
  {
    icon: Lock,
    title: "Privacy",
    content:
      "Personal information provided through the website or registration process will be handled in accordance with our Privacy Policy.",
  },
  {
    icon: Mail,
    title: "Contact",
    content:
      "For questions regarding these Terms & Conditions, please contact Redwood Global Learning through the contact details provided on our website.",
  },
]

export default function TermsPage() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const handleApplyClick = () => setIsApplyModalOpen(true)

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <Navbar onApplyClick={handleApplyClick} />

      {/* ──────── Hero Section ──────── */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Dot‑pattern background */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--brand-blue)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Organic background shape — desktop only */}
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
            {/* Accent label */}
            <div className="inline-block mb-6">
              <div className="inline-flex items-center gap-3 relative">
                <div className="w-12 h-[1px] bg-brand-red" />
                <span className="text-sm tracking-[0.3em] uppercase text-brand-red font-medium">
                  Legal
                </span>
                <div className="w-12 h-[1px] bg-brand-red" />
              </div>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-blue tracking-tight leading-[0.95] mb-6">
              Terms & Conditions
            </h1>
            <p className="text-lg sm:text-xl text-brand-gray/70 leading-relaxed font-light max-w-3xl mx-auto">
              By using this website or registering for a Redwood Global Learning
              program, you agree to the following terms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ──────── Terms Cards Section ──────── */}
      <section className="relative bg-gray-50/50 py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Dot‑pattern background */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--brand-blue)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Organic left shape */}
        <div className="hidden lg:block absolute top-0 left-0 w-[50%] h-full">
          <svg
            viewBox="0 0 600 800"
            className="w-full h-full"
            preserveAspectRatio="xMinYMid slice"
          >
            <path
              d="M0,0 L0,800 L300,800 Q250,700 300,600 Q350,500 280,400 Q210,300 300,200 Q390,100 320,0 Z"
              fill="hsl(var(--brand-red))"
              opacity="0.04"
            />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {terms.map((term, index) => {
              const Icon = term.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-md shadow-brand-blue/5 border border-brand-blue/10 hover:shadow-xl hover:shadow-brand-blue/10 hover:border-brand-blue/20 transition-all duration-500"
                >
                  <div className="flex items-start gap-5">
                    {/* Number badge + icon */}
                    <div className="flex-shrink-0 relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 flex items-center justify-center group-hover:from-brand-blue group-hover:to-brand-blue/90 transition-all duration-500">
                        <Icon className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors duration-500" />
                      </div>
                      {/* Floating number */}
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-red text-white text-[11px] font-bold flex items-center justify-center shadow-md shadow-brand-red/30">
                        {index + 1}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h2 className="font-heading text-lg sm:text-xl font-bold text-brand-blue mb-2 tracking-tight">
                        {term.title}
                      </h2>
                      <p className="text-sm sm:text-base text-brand-gray/80 leading-relaxed font-light">
                        {term.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-red/30 to-transparent origin-center"
        />
      </section>

      {/* ──────── CTA Section ──────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-to-br from-brand-blue/5 to-brand-red/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-blue mb-6">
              Have Questions?
            </h2>
            <p className="text-lg text-brand-gray/80 leading-relaxed mb-10 font-light max-w-2xl mx-auto">
              If you have any questions regarding these Terms & Conditions,
              please don&apos;t hesitate to reach out to our team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-brand-red hover:bg-brand-red/90 text-white font-bold text-base px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:shadow-brand-red/25 transition-all duration-500 group"
            >
              Contact Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer onApplyClick={handleApplyClick} />

      <ApplyNowForm
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </main>
  )
}
