"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const timelineData = [
  {
    title: "2018",
    content: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white/80 backdrop-blur-sm border-brand-blue/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-brand-red" />
              <span className="text-sm font-medium text-brand-red uppercase tracking-wider">
                The Beginning
              </span>
            </div>
            <h4 className="font-heading text-2xl font-bold text-brand-blue mb-3">
              Roots in California
            </h4>
            <p className="text-brand-gray/80 leading-relaxed font-light">
              Redwood Global Learning was born in the majestic redwood forests of California,
              where our first international exchange program took root. Inspired by the resilience
              and interconnectedness of these ancient trees, we envisioned an educational platform
              that would connect students across continents, just as redwood roots support and
              strengthen one another.
            </p>
            <p className="text-brand-gray/60 text-sm leading-relaxed font-light mt-3">
              Our inaugural program brought together students from three countries, creating
              lasting friendships and cultural understanding that would define our mission.
            </p>
          </div>
        </div>
      </motion.div>
    ),
  },
  {
    title: "2019",
    content: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="bg-white/80 backdrop-blur-sm border-brand-blue/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-brand-red" />
              <span className="text-sm font-medium text-brand-red uppercase tracking-wider">
                Expansion
              </span>
            </div>
            <h4 className="font-heading text-2xl font-bold text-brand-blue mb-3">
              Branching Out
            </h4>
            <p className="text-brand-gray/80 leading-relaxed font-light">
              We expanded our programs to Japan and France, establishing partnerships with
              prestigious educational institutions. Our network grew from 3 to 15 partner
              schools, and we welcomed over 200 students into our global learning community.
            </p>
            <p className="text-brand-gray/60 text-sm leading-relaxed font-light mt-3">
              The success of our early programs validated our vision: education transcends
              borders when built on trust, cultural respect, and academic excellence.
            </p>
          </div>
        </div>
      </motion.div>
    ),
  },
  {
    title: "2020-2021",
    content: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="bg-white/80 backdrop-blur-sm border-brand-blue/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-brand-red" />
              <span className="text-sm font-medium text-brand-red uppercase tracking-wider">
                Resilience
              </span>
            </div>
            <h4 className="font-heading text-2xl font-bold text-brand-blue mb-3">
              Adapting to Change
            </h4>
            <p className="text-brand-gray/80 leading-relaxed font-light">
              Like the redwoods that withstand storms, we adapted to global challenges by
              developing innovative virtual exchange programs. We launched our first online
              cultural immersion experiences, maintaining connections when physical travel
              wasn't possible.
            </p>
            <p className="text-brand-gray/60 text-sm leading-relaxed font-light mt-3">
              This period taught us that the essence of global education isn't just
              about location—it's about creating meaningful cross-cultural connections,
              whether in person or through digital platforms.
            </p>
          </div>
        </div>
      </motion.div>
    ),
  },
  {
    title: "2022",
    content: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="bg-white/80 backdrop-blur-sm border-brand-blue/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-brand-red" />
              <span className="text-sm font-medium text-brand-red uppercase tracking-wider">
                Growth
              </span>
            </div>
            <h4 className="font-heading text-2xl font-bold text-brand-blue mb-3">
              Reaching New Heights
            </h4>
            <p className="text-brand-gray/80 leading-relaxed font-light">
              We reached a milestone of 1,000+ students across 30 countries. Our programs
              expanded to include semester-long exchanges, summer intensives, and specialized
              academic tracks. We established our Advisory Board, bringing together educators
              and thought leaders from around the world.
            </p>
            <p className="text-brand-gray/60 text-sm leading-relaxed font-light mt-3">
              Our community of alumni began to flourish, with graduates pursuing careers in
              international relations, education, and global business—living proof of our
              mission's impact.
            </p>
          </div>
        </div>
      </motion.div>
    ),
  },
  {
    title: "2023-2024",
    content: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="bg-white/80 backdrop-blur-sm border-brand-blue/20 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-brand-red" />
              <span className="text-sm font-medium text-brand-red uppercase tracking-wider">
                Innovation
              </span>
            </div>
            <h4 className="font-heading text-2xl font-bold text-brand-blue mb-3">
              Building the Future
            </h4>
            <p className="text-brand-gray/80 leading-relaxed font-light">
              We launched our digital platform, making it easier for students and institutions
              to discover and apply for programs. We introduced scholarship programs and
              partnerships with universities worldwide. Our network now spans 45+ countries,
              with over 2,000 students having experienced our programs.
            </p>
            <p className="text-brand-gray/60 text-sm leading-relaxed font-light mt-3">
              Today, Redwood Global Learning stands as a testament to the power of global
              education—rooted in the values that inspired our name, growing stronger with
              each new connection we make.
            </p>
          </div>
        </div>
      </motion.div>
    ),
  },
  {
    title: "2025",
    content: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="bg-gradient-to-br from-white via-white to-brand-blue/5 backdrop-blur-sm border-2 border-brand-blue/30 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
              <span className="text-sm font-medium text-brand-blue uppercase tracking-wider">
                Today & Beyond
              </span>
            </div>
            <h4 className="font-heading text-2xl font-bold text-brand-blue mb-3">
              Continuing the Journey
            </h4>
            <p className="text-brand-gray/80 leading-relaxed font-light">
              As we look ahead, our commitment remains unwavering: to create transformative
              educational experiences that bridge cultures, expand perspectives, and empower
              the next generation of global citizens. Every program we offer carries forward
              the spirit of those first redwood forests—where individual growth strengthens
              the entire community.
            </p>
            <p className="text-brand-gray/60 text-sm leading-relaxed font-light mt-3">
              Join us as we continue to grow, learn, and connect students to global classrooms
              around the world.
            </p>
          </div>
        </div>
      </motion.div>
    ),
  },
]

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={containerRef} className="relative bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="py-20">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center gap-4 justify-center mb-6">
              <div className="h-1 w-16 bg-brand-red rounded-full" />
              <h2 className="text-xs tracking-[0.2em] uppercase text-brand-red font-semibold">
                Our Journey
              </h2>
              <div className="h-1 w-16 bg-brand-red rounded-full" />
            </div>
            <h3 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-blue mb-6">
              From Roots to Global Reach
            </h3>
            <p className="text-lg text-brand-gray/80 leading-relaxed max-w-2xl mx-auto font-light">
              Discover the milestones that have shaped our mission and the transformative journey
              of global education
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Main Vertical Line - Left on mobile, center on desktop */}
            <div className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 w-[3px] h-full bg-brand-red/20 rounded-full" />

            {/* Animated Progress Line on scroll */}
            <motion.div
              style={{ scaleY: scrollProgress, transformOrigin: 'top' }}
              className="absolute left-4 lg:left-1/2 lg:-translate-x-1/2 w-[3px] h-full bg-brand-red rounded-full"
            />

            {/* Timeline Items */}
            {timelineData.map((item, index) => (
              <div
                key={item.title}
                className={`relative flex items-center py-6 md:py-8 ${index % 2 === 0
                    ? 'justify-end lg:justify-start'
                    : 'justify-end'
                  }`}
              >
                {/* Content Card - right side on mobile, alternating on desktop */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                  className={`w-full max-w-md pl-16 md:pl-20 ${index % 2 === 0
                      ? 'lg:pl-0 lg:pr-24 lg:mr-auto'
                      : 'lg:pl-24 lg:ml-auto'
                    }`}
                >
                  {item.content}
                </motion.div>

                {/* Year Badge - left edge on mobile, center on desktop */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                  className="absolute left-4 lg:left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 lg:w-20 lg:h-20 rounded-full bg-white border-[3px] border-brand-red shadow-lg flex items-center justify-center z-20"
                >
                  <span className="text-brand-blue font-heading font-bold text-[8px] md:text-[10px] lg:text-sm">
                    {item.title}
                  </span>
                </motion.div>

                {/* Horizontal Connecting Line - from badge to card */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className={`absolute h-[3px] bg-brand-red origin-left ${index % 2 === 0
                      ? 'left-9 lg:left-auto lg:right-1/2 w-6 md:w-8 lg:w-48 lg:mr-10 lg:origin-right'
                      : 'left-9 lg:left-1/2 w-6 md:w-8 lg:w-48 lg:ml-10 lg:origin-left'
                    }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="h-[1px] bg-gradient-to-r from-transparent via-brand-red/30 to-transparent origin-center"
      />
    </section>
  )
}
