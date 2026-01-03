"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    FileText,
    MessageSquareQuote,
    Mail,
    Users,
    LogOut,
    Menu,
    X,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
    children: React.ReactNode;
}

const sidebarLinks = [
    {
        title: "Content Management",
        href: "/admin/content",
        icon: FileText,
        description: "Manage website content",
    },
    {
        title: "Inquiries",
        href: "/admin/inquiries",
        icon: Mail,
        description: "View form submissions",
    },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Check if user is authenticated from localStorage
        const authStatus = localStorage.getItem("redwood_admin_auth");
        const isAuth = authStatus === "true";
        setIsAuthenticated(isAuth);
        setIsLoading(false);

        // If not authenticated and trying to access a protected route, redirect to login
        if (!isAuth && pathname !== "/admin") {
            router.push("/admin");
        }
    }, [pathname, router]);

    const handleLogout = () => {
        localStorage.removeItem("redwood_admin_auth");
        setIsAuthenticated(false);
        router.push("/admin");
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin" />
                    <p className="text-brand-gray font-poppins">Loading...</p>
                </div>
            </div>
        );
    }

    // If not authenticated
    if (!isAuthenticated) {
        // Only allow access to the login page
        if (pathname === "/admin") {
            return <>{children}</>;
        }
        // For any other route, return null (the useEffect will handle the redirect)
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                        onClick={() => setIsMobileSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 h-full bg-white border-r border-gray-200/80 shadow-xl z-50 transition-all duration-300 ease-in-out",
                    isSidebarOpen ? "w-72" : "w-20",
                    isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Sidebar Header */}
                <div className="h-20 flex items-center justify-between px-4 border-b border-gray-100">
                    <Link href="/admin/content" className="flex items-center gap-3 overflow-hidden">
                        <AnimatePresence>
                            {isSidebarOpen && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="overflow-hidden"
                                >
                                    <h1 className="font-montserrat font-bold text-brand-blue text-lg whitespace-nowrap">
                                        Admin Panel
                                    </h1>
                                    <p className="text-xs text-brand-gray font-poppins">
                                        Redwood Global
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ChevronRight
                            className={cn(
                                "w-5 h-5 text-brand-gray transition-transform",
                                !isSidebarOpen && "rotate-180"
                            )}
                        />
                    </button>
                    <button
                        onClick={() => setIsMobileSidebarOpen(false)}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-brand-gray" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="p-4 space-y-2">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                    isActive
                                        ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/20"
                                        : "text-brand-gray hover:bg-brand-blue/5 hover:text-brand-blue"
                                )}
                            >
                                <Icon
                                    className={cn(
                                        "w-5 h-5 flex-shrink-0",
                                        isActive ? "text-white" : "text-brand-gray group-hover:text-brand-blue"
                                    )}
                                />
                                <AnimatePresence>
                                    {isSidebarOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <span className="font-poppins font-medium whitespace-nowrap">
                                                {link.title}
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
                    <button
                        onClick={handleLogout}
                        className={cn(
                            "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-brand-red hover:bg-red-50 transition-all duration-200 group"
                        )}
                    >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        <AnimatePresence>
                            {isSidebarOpen && (
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="font-poppins font-medium whitespace-nowrap overflow-hidden"
                                >
                                    Logout
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={cn(
                    "transition-all duration-300 min-h-screen",
                    isSidebarOpen ? "lg:ml-72" : "lg:ml-20"
                )}
            >
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 h-16 flex items-center justify-between px-6">
                    <button
                        onClick={() => setIsMobileSidebarOpen(true)}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Menu className="w-6 h-6 text-brand-gray" />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center">
                                <Users className="w-5 h-5 text-brand-blue" />
                            </div>
                            <div className="hidden sm:block">
                                <p className="font-poppins font-medium text-brand-blue text-sm">
                                    Admin
                                </p>
                                <p className="text-xs text-brand-gray">
                                    Redwood Global
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-6">{children}</div>
            </main>
        </div>
    );
}
