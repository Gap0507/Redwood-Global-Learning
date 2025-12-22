"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <header className="fixed top-4 left-0 right-0 z-50">
        <nav
          className={cn(
            "max-w-7xl mx-auto rounded-2xl transition-all duration-300 border border-black/5",
            scrolled
              ? "bg-[#f6f7f9]/95 backdrop-blur-xl shadow-sm"
              : "bg-[#f6f7f9]/80 backdrop-blur-lg"
          )}
        >
          <div className="px-8">
            <div className="h-[76px] flex items-center justify-between relative">
              {/* LEFT NAV */}
              <div className="hidden lg:flex gap-10">
                <NavLink href="/about">About</NavLink>
                <NavLink href="/programs">Programs</NavLink>
                <NavLink href="/experience">Experience</NavLink>
              </div>

              {/* CENTER LOGO */}
              <Link
                href="/"
                className="absolute left-1/2 -translate-x-1/2 flex items-center"
              >
                <Image
                  src="/logo.svg"
                  alt="Redwood Learning Global"
                  width={200}
                  height={60}
                  priority
                  className="object-contain select-none"
                />
              </Link>

              {/* RIGHT NAV */}
              <div className="hidden lg:flex gap-6 items-center">
                <NavLink href="/contact">Contact</NavLink>

                <Button
                  asChild
                  className="apply-button rounded-full px-6 py-2.5 text-xs tracking-widest uppercase"
                >
                  <Link href="/apply">Apply Now</Link>
                </Button>
              </div>

              {/* MOBILE TOGGLE */}
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden z-50 p-2"
              >
                {open ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`
          fixed inset-0 z-40 lg:hidden
          transition-all duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        <div
          className="absolute inset-0 bg-black/95"
          onClick={() => setOpen(false)}
        />

        <div className="relative h-full flex flex-col items-center justify-center gap-10 text-white">
          {["About", "Programs", "Experience", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-3xl font-semibold tracking-widest uppercase hover:text-accent-red transition"
            >
              {item}
            </Link>
          ))}

          <Button
            asChild
            className="mt-6 bg-accent-red px-10 py-6 rounded-full text-sm tracking-widest uppercase"
          >
            <Link href="/apply">Apply Now</Link>
          </Button>
        </div>
      </div>
    </>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "nav-link text-[13px] font-medium tracking-wide uppercase text-foreground/80 hover:text-foreground transition"
      )}
    >
      {children}
    </Link>
  );
}
