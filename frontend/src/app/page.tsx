import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans antialiased selection:bg-brand-blue/20 selection:text-brand-blue-dark">
      <Navbar />
      <Hero />
    </main>
  );
}
