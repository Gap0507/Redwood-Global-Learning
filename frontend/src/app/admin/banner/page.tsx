"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    Save,
    Loader2,
    Check,
    AlertCircle,
    Upload,
    Image as ImageIcon,
    Trash2,
    Megaphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    getBannerContent,
    updateBannerContent,
    defaultBannerContent,
    BannerContent,
} from "@/lib/bannerContent";

export default function BannerAdminPage() {
    const [content, setContent] = useState<BannerContent>(defaultBannerContent);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
    const [isUploading, setIsUploading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load existing banner on mount
    useEffect(() => {
        getBannerContent()
            .then(setContent)
            .finally(() => setIsLoading(false));
    }, []);

    // Save handler
    const handleSave = async () => {
        setIsSaving(true);
        setSaveStatus("idle");
        const toastId = toast.loading("Saving banner...");
        const success = await updateBannerContent(content);
        setIsSaving(false);
        if (success) {
            setSaveStatus("success");
            toast.success("Banner saved! It will now appear on the homepage.", { id: toastId });
        } else {
            setSaveStatus("error");
            toast.error("Failed to save banner.", { id: toastId });
        }
        setTimeout(() => setSaveStatus("idle"), 3000);
    };

    // Clear banner image
    const handleClear = async () => {
        const toastId = toast.loading("Removing banner...");
        const cleared = { imageUrl: "" };
        const success = await updateBannerContent(cleared);
        if (success) {
            setContent(cleared);
            toast.success("Banner removed. The homepage modal will no longer appear.", { id: toastId });
        } else {
            toast.error("Failed to clear banner.", { id: toastId });
        }
    };

    // Image upload via /api/upload → Cloudinary
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (fileInputRef.current) fileInputRef.current.value = "";

        const toastId = toast.loading("Uploading image...");
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Upload failed");
            setContent({ imageUrl: data.url });
            toast.success("Image uploaded! Click Save Changes to publish.", { id: toastId });
        } catch (err) {
            console.error(err);
            toast.error("Failed to upload image.", { id: toastId });
        } finally {
            setIsUploading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="py-16 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
                <span className="ml-2 text-brand-gray font-poppins">Loading banner...</span>
            </div>
        );
    }

    const hasBanner = !!content.imageUrl;

    return (
        <div className="space-y-6 max-w-2xl">
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-montserrat font-bold text-2xl text-brand-blue flex items-center gap-2">
                        <Megaphone className="w-6 h-6" />
                        Banner Section
                    </h1>
                    <p className="text-brand-gray font-poppins text-sm mt-1">
                        Upload a banner image to display a modal popup when visitors land on the homepage.
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving || !hasBanner}
                    className={cn(
                        "flex items-center gap-2 px-5 py-2 bg-brand-blue text-white font-poppins font-medium rounded-lg shadow-md transition-all",
                        (isSaving || !hasBanner)
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-brand-blue/90"
                    )}
                >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {/* Status Banner */}
            {saveStatus === "success" && (
                <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 font-poppins text-sm">
                    <Check className="w-4 h-4" /> Banner saved successfully!
                </div>
            )}
            {saveStatus === "error" && (
                <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 font-poppins text-sm">
                    <AlertCircle className="w-4 h-4" /> Failed to save. Please try again.
                </div>
            )}

            {/* Status chip */}
            <div className="flex items-center gap-3">
                <span className="font-poppins text-sm text-brand-gray font-medium">Homepage Modal Status:</span>
                {hasBanner ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 font-poppins font-semibold text-xs">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Active — Modal will appear
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-500 font-poppins font-semibold text-xs">
                        <span className="w-2 h-2 rounded-full bg-gray-400" />
                        Inactive — No modal on homepage
                    </span>
                )}
            </div>

            {/* Image Upload Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
                <div className="p-6">
                    <h2 className="font-montserrat font-bold text-brand-blue text-lg mb-1">
                        Banner Image
                    </h2>
                    <p className="text-brand-gray font-poppins text-sm mb-5">
                        This image will be shown inside the modal popup. Recommended ratio: 16:9. Supported: JPG, PNG, WEBP.
                    </p>

                    {/* Image preview / uploader */}
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group">
                        {hasBanner ? (
                            <Image
                                src={content.imageUrl}
                                alt="Banner preview"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 672px"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
                                <ImageIcon className="w-12 h-12 text-gray-300" />
                                <p className="font-poppins text-sm">No banner image uploaded</p>
                            </div>
                        )}

                        {/* Hover upload overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2 bg-white text-brand-blue px-5 py-2.5 rounded-lg font-poppins font-medium text-sm hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                {isUploading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Upload className="w-4 h-4" />
                                )}
                                {isUploading ? "Uploading..." : hasBanner ? "Change Image" : "Upload Image"}
                            </button>
                        </div>
                    </div>

                    {/* Upload & Clear buttons below the preview */}
                    <div className="flex items-center gap-3 mt-4">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2.5 border border-brand-blue/40 text-brand-blue font-poppins font-medium text-sm rounded-lg hover:bg-brand-blue/5 transition-all",
                                isUploading && "opacity-60 cursor-not-allowed"
                            )}
                        >
                            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                            {isUploading ? "Uploading..." : hasBanner ? "Replace Image" : "Upload Image"}
                        </button>

                        {hasBanner && (
                            <button
                                onClick={handleClear}
                                className="flex items-center gap-2 px-4 py-2.5 border border-red-200 text-red-500 font-poppins font-medium text-sm rounded-lg hover:bg-red-50 transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                                Remove Banner
                            </button>
                        )}
                    </div>
                </div>

                {/* Footer info */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <p className="font-poppins text-xs text-brand-gray">
                        💡 <span className="font-semibold">Workflow:</span> Upload image → Click &quot;Save Changes&quot; → The modal will automatically appear on the next homepage visit. To disable, click &quot;Remove Banner&quot;.
                    </p>
                </div>
            </motion.div>

            {/* Live Preview hint */}
            {hasBanner && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start gap-3 p-4 bg-brand-blue/5 border border-brand-blue/15 rounded-xl"
                >
                    <Megaphone className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="font-poppins font-semibold text-sm text-brand-blue">Banner is active</p>
                        <p className="font-poppins text-xs text-brand-gray mt-0.5">
                            Visitors who land on the homepage will see this banner in a modal popup with a &quot;Contact Us&quot; button.
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
