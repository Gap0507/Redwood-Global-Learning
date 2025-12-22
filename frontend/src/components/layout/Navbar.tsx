"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Menu, Globe, GraduationCap, Users, Mail, BookOpen, MapPin } from "lucide-react"
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
import { cn } from "@/lib/utils"

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
    title: "Advisory Board",
    href: "/advisory-board",
    description: "Meet our distinguished advisory board",
    icon: Users,
  },
]

export function Navbar() {
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
          {/* Left Navigation Links - 2 items */}
          <div className="hidden lg:flex items-center gap-6 flex-1">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {navigationItems.slice(0, 2).map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <Link
                      href={item.href}
                      className="group inline-flex h-auto w-max items-center justify-center rounded-md px-4 py-2 text-base font-medium text-brand-gray transition-all hover:text-brand-blue focus:text-brand-blue focus:outline-none hover:border-b-[1.5px] hover:border-brand-blue"
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
            <div className="relative h-[150px] w-[260px] sm:h-[170px] sm:w-[300px] md:h-[190px] md:w-[340px] lg:h-[210px] lg:w-[380px]">
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
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {navigationItems.slice(2).map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <Link
                      href={item.href}
                      className="group inline-flex h-auto w-max items-center justify-center rounded-md px-4 py-2 text-base font-medium text-brand-gray transition-all hover:text-brand-blue focus:text-brand-blue focus:outline-none hover:border-b-[1.5px] hover:border-brand-blue"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <Button
              className="bg-brand-red hover:bg-brand-red/90 text-white font-medium text-sm px-6 py-2 h-auto shadow-sm hover:shadow-md transition-all duration-200 rounded-full ml-2"
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
                className="w-full h-screen max-w-none rounded-none px-6 py-6 flex flex-col bg-gradient-space"
              >
                <SheetHeader className="flex items-center justify-between mb-4">
                  <SheetTitle className="font-heading text-brand-blue text-left text-xl">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex-1 flex flex-col items-center justify-center gap-10 text-brand-blue">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex flex-col items-center gap-2 rounded-full px-6 py-2 text-2xl font-semibold tracking-widest uppercase transition-colors hover:text-brand-red"
                      >
                        <Icon className="h-6 w-6 text-brand-gray" />
                        <span>{item.title}</span>
                      </Link>
                    )
                  })}
                  <div className="pt-8 mt-4 w-full max-w-xs">
                    <Button
                      className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-semibold py-4 rounded-full text-sm tracking-widest uppercase"
                    >
                      Apply Now
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
