"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if already authenticated
        const authStatus = localStorage.getItem("redwood_admin_auth");
        if (authStatus === "true") {
            router.push("/admin/content");
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Simple authentication check (will be replaced with Firebase)
        const validEmail = "admin@redwoodglobal.com";
        const validPassword = "redwoodglobal@2025";

        if (email === validEmail && password === validPassword) {
            localStorage.setItem("redwood_admin_auth", "true");
            // Redirect to content management instead of reloading
            router.push("/admin/content");
        } else {
            setError("Invalid email or password. Please try again.");
        }

        setIsLoading(false);
    };

    // Login Form
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/herobackground.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative"
            >
                {/* Login Card */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    {/* Logo Section */}
                    <div className="pt-8 pb-4 px-8 text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="relative w-80 h-40 mx-auto"
                        >
                            <Image
                                src="/logo.svg"
                                alt="Redwood Global"
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    </div>

                    {/* Admin Login Title */}
                    <div className="text-center pb-4">
                        <h1 className="text-2xl font-bold font-montserrat text-brand-blue">
                            Admin Login
                        </h1>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600"
                            >
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm font-poppins">{error}</p>
                            </motion.div>
                        )}

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium font-poppins text-brand-gray">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray/50" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@redwoodglobal.com"
                                    required
                                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl font-poppins text-brand-blue placeholder:text-brand-gray/40 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium font-poppins text-brand-gray">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray/50" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl font-poppins text-brand-blue placeholder:text-brand-gray/40 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-gray/50 hover:text-brand-gray transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                                "w-full py-4 rounded-xl font-poppins font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2",
                                isLoading
                                    ? "bg-brand-blue/70 cursor-not-allowed"
                                    : "bg-brand-blue hover:bg-brand-blue/90 shadow-lg shadow-brand-blue/20 hover:shadow-xl hover:shadow-brand-blue/30"
                            )}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
