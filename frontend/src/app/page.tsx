"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { HeroSection } from "@/components/sections/HeroSection"
import { ApproachSection } from "@/components/sections/ApproachSection"
import { GlobalProgramSection } from "@/components/sections/GlobalProgramSection";
import { WhereCanYouGoSection } from "@/components/sections/WhereCanYouGoSection";
import { StudentExperiencesSection } from "@/components/sections/StudentExperiencesSection";
import { AboutRedwoodSection } from "@/components/sections/AboutRedwoodSection";
import { ReadyToGetStartedSection } from "@/components/sections/ReadyToGetStartedSection";
import { Footer } from "@/components/layout/Footer";
import { ApplyNowForm } from "@/components/forms/ApplyNowForm";

export default function Home() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)

  const handleApplyClick = () => setIsApplyModalOpen(true)

  return (
    <main className="min-h-screen bg-background relative">
      <Navbar onApplyClick={handleApplyClick} />
      <HeroSection />
      <ApproachSection />
      <GlobalProgramSection />
      <WhereCanYouGoSection />
      <StudentExperiencesSection />
      <AboutRedwoodSection />
      <ReadyToGetStartedSection onApplyClick={handleApplyClick} />
      <Footer onApplyClick={handleApplyClick} />

      <ApplyNowForm
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </main>
  );
}
