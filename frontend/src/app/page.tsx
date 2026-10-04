"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { HeroSection } from "@/components/sections/HeroSection"
import { ApproachSection } from "@/components/sections/ApproachSection"
import { GlobalProgramSection } from "@/components/sections/GlobalProgramSection";
import { WhereCanYouGoSection } from "@/components/sections/WhereCanYouGoSection";
import { StudentExperiencesSection } from "@/components/sections/StudentExperiencesSection";
import { AboutRedwoodSection } from "@/components/sections/AboutRedwoodSection";
import { ReadyToGetStartedSection } from "@/components/sections/ReadyToGetStartedSection";
import { Footer } from "@/components/layout/Footer";
import dynamic from "next/dynamic";
import { getBannerContent } from "@/lib/bannerContent";

const ApplyNowForm = dynamic(() => import("@/components/forms/ApplyNowForm").then(mod => mod.ApplyNowForm), { ssr: false });
const BannerModal = dynamic(() => import("@/components/sections/BannerModal").then(mod => mod.BannerModal), { ssr: false });

const DynamicGlobalProgramSection = dynamic(() => import("@/components/sections/GlobalProgramSection").then(mod => mod.GlobalProgramSection));
const DynamicWhereCanYouGoSection = dynamic(() => import("@/components/sections/WhereCanYouGoSection").then(mod => mod.WhereCanYouGoSection));
const DynamicStudentExperiencesSection = dynamic(() => import("@/components/sections/StudentExperiencesSection").then(mod => mod.StudentExperiencesSection));
const DynamicAboutRedwoodSection = dynamic(() => import("@/components/sections/AboutRedwoodSection").then(mod => mod.AboutRedwoodSection));
const DynamicReadyToGetStartedSection = dynamic(() => import("@/components/sections/ReadyToGetStartedSection").then(mod => mod.ReadyToGetStartedSection));
const DynamicFooter = dynamic(() => import("@/components/layout/Footer").then(mod => mod.Footer));

export default function Home() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const [bannerImageUrl, setBannerImageUrl] = useState("")
  const [isBannerOpen, setIsBannerOpen] = useState(false)

  const handleApplyClick = () => setIsApplyModalOpen(true)

  // Fetch banner content on mount; open modal only if an image is configured
  useEffect(() => {
    getBannerContent().then((data) => {
      if (data.imageUrl) {
        setBannerImageUrl(data.imageUrl)
        setIsBannerOpen(true)
      }
    })
  }, [])

  return (
    <main className="min-h-screen bg-background relative">
      <Navbar onApplyClick={handleApplyClick} />
      <HeroSection />
      <ApproachSection />
      <DynamicGlobalProgramSection />
      <DynamicWhereCanYouGoSection />
      <DynamicStudentExperiencesSection />
      <DynamicAboutRedwoodSection />
      <DynamicReadyToGetStartedSection onApplyClick={handleApplyClick} />
      <DynamicFooter onApplyClick={handleApplyClick} />

      <ApplyNowForm
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />

      {/* CMS-controlled banner modal — only renders when a banner is configured */}
      <BannerModal
        imageUrl={bannerImageUrl}
        isOpen={isBannerOpen}
        onClose={() => setIsBannerOpen(false)}
      />
    </main>
  );
}

