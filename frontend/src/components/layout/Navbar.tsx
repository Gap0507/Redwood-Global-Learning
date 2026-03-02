"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Menu, Globe, GraduationCap, Users, Mail, BookOpen, MapPin, Trophy, Mic2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ApplyNowForm } from "@/components/forms/ApplyNowForm"
import { cn } from "@/lib/utils"

// Left side links (first 4)
// Right side links (remaining) + Apply Now button
const navigationItems = [
  {
    title: "Program",
    href: "/programs",
    description: "Explore our global exchange programs",
    icon: BookOpen,
  },
  {
    title: "About",
    href: "/about",
    description: "Learn about our mission and vision",
    icon: GraduationCap,
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Get in touch with us",
    icon: Mail,
  },
  {
    title: "Sports",
    href: "/sports",
    description: "Discover global athletic opportunities",
    icon: Trophy,
  },
  {
    title: "Advisory Board",
    href: "/advisory-board",
    description: "Meet our distinguished advisory board",
    icon: Users,
  },
  {
    title: "Conferences",
    href: "/conferences",
    description: "Join global academic events and conferences",
    icon: Mic2,
  },
]

export function Navbar({ onApplyClick }: { onApplyClick?: () => void }) {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div
          className={cn(
            "relative flex h-20 sm:h-24 lg:h-28 items-center justify-between transition-all duration-300",
            "bg-white/95 backdrop-blur-xl rounded-b-3xl sm:rounded-b-[2rem]",
            "border-l-2 border-r-2 border-b-2 border-brand-blue/20 shadow-lg",
            "px-4 sm:px-6 lg:px-8",
            isScrolled && "shadow-2xl shadow-brand-blue/10 bg-white/98"
          )}
        >
          {/* Left Navigation Links - 4 items */}
          <div className="hidden lg:flex items-center flex-1">
            <NavigationMenu>
              <NavigationMenuList className="gap-0">
                {navigationItems.slice(0, 4).map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <Link
                      href={item.href}
                      className="group inline-flex h-auto w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-brand-gray transition-all hover:text-brand-blue focus:text-brand-blue focus:outline-none hover:border-b-[1.5px] hover:border-brand-blue"
                      style={{ fontFamily: 'var(--font-montserrat)' }}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Centered Logo */}
          <Link
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center transition-all duration-200 hover:opacity-90 hover:scale-105 z-10"
          >
            <div className="relative h-[150px] w-[220px] sm:h-[170px] sm:w-[260px] md:h-[180px] md:w-[280px] lg:h-[190px] lg:w-[300px]">
              <Image
                src="/logo.svg"
                alt="Redwood Global Learning"
                fill
                className="object-contain"
                priority
                quality={100}
                unoptimized
              />
            </div>
          </Link>

          {/* Right Navigation Links - 2 items + CTA Button */}
          <div className="hidden lg:flex items-center flex-1 justify-end">
            <NavigationMenu>
              <NavigationMenuList className="gap-0">
                {navigationItems.slice(4).map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <Link
                      href={item.href}
                      className="group inline-flex h-auto w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-brand-gray transition-all hover:text-brand-blue focus:text-brand-blue focus:outline-none hover:border-b-[1.5px] hover:border-brand-blue"
                      style={{ fontFamily: 'var(--font-montserrat)' }}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <Button
              onClick={onApplyClick}
              className="bg-brand-red hover:bg-brand-red/90 text-white font-medium text-sm px-5 py-2 h-auto shadow-sm hover:shadow-md transition-all duration-200 rounded-full ml-2"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              Apply Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-brand-blue hover:bg-brand-blue/10 h-10 w-10"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="top"
                className="w-full h-[100dvh] max-w-none rounded-none px-5 py-5 flex flex-col bg-gradient-space"
              >
                <SheetHeader className="flex items-center justify-between mb-1 flex-shrink-0">
                  <SheetTitle
                    className="font-heading text-brand-blue text-left text-lg"
                    style={{ fontFamily: 'var(--font-montserrat)' }}
                  >
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex-1 flex flex-col items-center justify-evenly overflow-y-auto py-2 text-brand-blue min-h-0">
                  {navigationItems.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 w-full max-w-[260px] px-5 py-3 text-sm font-semibold tracking-wider uppercase transition-all hover:text-brand-red hover:bg-brand-blue/5 rounded-xl",
                          index !== navigationItems.length - 1 && "border-b border-brand-blue/10"
                        )}
                        style={{ fontFamily: 'var(--font-montserrat)' }}
                      >
                        <Icon className="h-5 w-5 text-brand-gray flex-shrink-0" />
                        <span>{item.title}</span>
                      </Link>
                    )
                  })}
                </nav>
                <div className="flex-shrink-0 pb-4 pt-2 w-full flex justify-center">
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      if (onApplyClick) onApplyClick()
                    }}
                    className="w-full max-w-[260px] bg-brand-red hover:bg-brand-red/90 text-white font-semibold py-3.5 rounded-full text-sm tracking-wider uppercase shadow-lg shadow-brand-red/20"
                    style={{ fontFamily: 'var(--font-montserrat)' }}
                  >
                    Apply Now
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
