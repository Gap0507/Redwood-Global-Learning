import { Navbar } from "@/components/layout/Navbar"
import { HeroSection } from "@/components/sections/HeroSection"
import { ApproachSection } from "@/components/sections/ApproachSection"
import { GlobalProgramSection } from "@/components/sections/GlobalProgramSection";
import { WhereCanYouGoSection } from "@/components/sections/WhereCanYouGoSection";
import { StudentExperiencesSection } from "@/components/sections/StudentExperiencesSection";
import { AboutRedwoodSection } from "@/components/sections/AboutRedwoodSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <Navbar />
      <HeroSection />
      <ApproachSection />
      <GlobalProgramSection />
      <WhereCanYouGoSection />
      <StudentExperiencesSection />
      <AboutRedwoodSection />
    </main>
  );
}
