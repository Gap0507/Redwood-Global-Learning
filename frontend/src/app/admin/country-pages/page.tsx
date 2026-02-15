"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    Save,
    Plus,
    Trash2,
    ChevronDown,
    ChevronUp,
    Loader2,
    Check,
    AlertCircle,
    RotateCcw,
    Upload,
    PlusCircle,
    X,
    MapPin,
    Star,
    Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    getCountryPageContent,
    updateCountryPageContent,
    getAllCountryPageSlugs,
    deleteCountryPage,
    defaultCountryPages,
    CountryPageContent,
    CarouselImage,
    ProgramCard,
    ProgramButton,
    StudentStory,
} from "@/lib/countryPageContent";

export default function CountryPagesAdmin() {
    // Country list state
    const [countrySlugs, setCountrySlugs] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [isLoadingList, setIsLoadingList] = useState(true);

    // Content state
    const [content, setContent] = useState<CountryPageContent | null>(null);
    const [isLoadingContent, setIsLoadingContent] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

    // Expanded editor sections
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    // Image upload state
    const [uploadingField, setUploadingField] = useState<string | null>(null);

    // New country form
    const [showNewCountryForm, setShowNewCountryForm] = useState(false);
    const [newCountryName, setNewCountryName] = useState("");
    const [newCountrySlug, setNewCountrySlug] = useState("");

    // Load country list
    useEffect(() => {
        setIsLoadingList(true);
        getAllCountryPageSlugs()
            .then(setCountrySlugs)
            .finally(() => setIsLoadingList(false));
    }, []);

    // Load content when country is selected
    useEffect(() => {
        if (!selectedCountry) {
            setContent(null);
            return;
        }
        setIsLoadingContent(true);
        getCountryPageContent(selectedCountry)
            .then((data) => {
                setContent(data);
                setExpandedSection(null);
            })
            .finally(() => setIsLoadingContent(false));
    }, [selectedCountry]);

    // Save handler
    const handleSave = async () => {
        if (!selectedCountry || !content) return;
        setIsSaving(true);
        setSaveStatus("idle");
        const toastId = toast.loading("Saving changes...");
        const success = await updateCountryPageContent(selectedCountry, content);
        setIsSaving(false);
        if (success) {
            setSaveStatus("success");
            toast.success("Changes saved successfully!", { id: toastId });
        } else {
            setSaveStatus("error");
            toast.error("Failed to save changes.", { id: toastId });
        }
        setTimeout(() => setSaveStatus("idle"), 3000);
    };

    // Reset handler
    const handleReset = () => {
        if (!selectedCountry) return;
        const defaults = defaultCountryPages[selectedCountry];
        if (defaults) {
            setContent({ ...defaults });
        }
    };

    // Add new country
    const handleAddCountry = () => {
        if (!newCountryName.trim() || !newCountrySlug.trim()) return;
        const slug = newCountrySlug.toLowerCase().replace(/[^a-z0-9-]/g, "");
        if (countrySlugs.includes(slug)) {
            alert("A country with this slug already exists.");
            return;
        }

        const newContent: CountryPageContent = {
            slug,
            name: newCountryName.trim(),
            hero: {
                heroImage: "",
                heroTitle: `${newCountryName.trim()} Programs`,
                heroDescription: `Experience world-class education and cultural immersion in ${newCountryName.trim()}.`,
                carouselImages: [],
            },
            programs: {
                mainTitle: "Programs Rooted in Global Learning",
                description: `Tailored academic experiences inspired by cultural discovery and real-world immersion in ${newCountryName.trim()}.`,
                programCards: [
                    { image: "", timeline: "4 WEEKS", title: "Program 1", description: "Description..." },
                    { image: "", timeline: "6 WEEKS", title: "Program 2", description: "Description..." },
                    { image: "", timeline: "8 WEEKS", title: "Program 3", description: "Description..." },
                ],
                buttons: [
                    { text: "Academic Credits", link: "#" },
                    { text: "Cultural Activities", link: "#" },
                    { text: "24/7 Support", link: "#" },
                ],
            },
            lifeExperience: {
                title: `Life in ${newCountryName.trim()}`,
                description: "Everything you need to know about living and learning",
                buttonNames: ["Housing", "Culture", "Language"],
            },
            information: {
                housing: { content: "Housing information...", image: "" },
                culture: { content: "Culture information...", image: "" },
                language: { content: "Language information...", image: "" },
            },
            studentStories: [],
            cta: { ctaImage: "" },
        };

        setCountrySlugs((prev) => [...prev, slug]);
        setSelectedCountry(slug);
        setContent(newContent);
        setShowNewCountryForm(false);
        setNewCountryName("");
        setNewCountrySlug("");
        // Auto-save new country
        updateCountryPageContent(slug, newContent);
    };

    // Delete country
    const handleDeleteCountry = async (slug: string) => {
        if (!confirm(`Are you sure you want to delete the "${slug}" country page?`)) return;
        await deleteCountryPage(slug);
        setCountrySlugs((prev) => prev.filter((s) => s !== slug));
        if (selectedCountry === slug) {
            setSelectedCountry(null);
            setContent(null);
        }
    };

    // Generic image upload
    const fileInputRef = useRef<HTMLInputElement>(null);
    const uploadCallbackRef = useRef<((url: string) => void) | null>(null);

    const handleImageUpload = async (file: File) => {
        if (!uploadCallbackRef.current) return;
        const callback = uploadCallbackRef.current;
        const toastId = toast.loading("Uploading image...");
        try {
            setUploadingField("uploading");
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Upload failed");

            callback(data.url);
            toast.success("Image uploaded successfully!", { id: toastId });
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Failed to upload image. Please try again.", { id: toastId });
        } finally {
            setUploadingField(null);
            uploadCallbackRef.current = null;
        }
    };

    const triggerUpload = (fieldId: string, callback: (url: string) => void) => {
        setUploadingField(fieldId);
        uploadCallbackRef.current = callback;
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleImageUpload(e.target.files[0]);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Image upload component (stateless - uses parent's shared ref)
    const ImageUploader = ({
        currentImage,
        fieldId,
        onUpload,
        label,
        aspectRatio = "aspect-video",
    }: {
        currentImage: string;
        fieldId: string;
        onUpload: (url: string) => void;
        label: string;
        aspectRatio?: string;
    }) => {
        return (
            <div>
                <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">
                    {label}
                </label>
                <div className={`relative ${aspectRatio} w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group`}>
                    {currentImage ? (
                        <Image src={currentImage} alt={label} fill className="object-cover" />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <ImageIcon className="w-8 h-8 text-gray-300" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            onClick={() => triggerUpload(fieldId, onUpload)}
                            className="flex items-center gap-2 bg-white text-brand-blue px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
                        >
                            {uploadingField === fieldId ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Upload className="w-4 h-4" />
                            )}
                            {uploadingField === fieldId ? "Uploading..." : "Change Image"}
                        </button>
                    </div>
                </div>
                <p className="text-xs text-gray-400 mt-1">Hover to upload (JPG, PNG, WEBP)</p>
            </div>
        );
    };

    // Section toggle
    const SectionHeader = ({ id, title, icon }: { id: string; title: string; icon: React.ReactNode }) => (
        <button
            onClick={() => setExpandedSection(expandedSection === id ? null : id)}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
        >
            <div className="flex items-center gap-3">
                {icon}
                <span className="font-poppins font-semibold text-brand-blue">{title}</span>
            </div>
            {expandedSection === id ? (
                <ChevronUp className="w-5 h-5 text-brand-gray" />
            ) : (
                <ChevronDown className="w-5 h-5 text-brand-gray" />
            )}
        </button>
    );

    // Action buttons
    const ActionButtons = () => (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-brand-gray font-poppins font-medium hover:bg-gray-200 rounded-lg transition-colors"
            >
                <RotateCcw className="w-4 h-4" />
                Reset to Default
            </button>
            <div className="flex items-center gap-3">
                {saveStatus === "success" && (
                    <span className="flex items-center gap-1 text-green-600 font-poppins text-sm">
                        <Check className="w-4 h-4" /> Saved!
                    </span>
                )}
                {saveStatus === "error" && (
                    <span className="flex items-center gap-1 text-red-500 font-poppins text-sm">
                        <AlertCircle className="w-4 h-4" /> Error saving
                    </span>
                )}
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={cn(
                        "flex items-center gap-2 px-5 py-2 bg-brand-blue text-white font-poppins font-medium rounded-lg shadow-md transition-all",
                        isSaving ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-blue/90"
                    )}
                >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );

    if (!content) {
        // Country list view
        return (
            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-montserrat font-bold text-2xl text-brand-blue">Country Pages</h1>
                        <p className="text-brand-gray font-poppins text-sm mt-1">
                            Manage content for individual country pages
                        </p>
                    </div>
                    <button
                        onClick={() => setShowNewCountryForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white font-poppins font-medium rounded-lg shadow-md hover:bg-brand-blue/90 transition-all"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Add Country
                    </button>
                </div>

                {/* New Country Form */}
                <AnimatePresence>
                    {showNewCountryForm && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
                        >
                            <h3 className="font-montserrat font-bold text-brand-blue text-lg mb-4">
                                Add New Country
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium font-poppins text-brand-gray mb-1">
                                        Country Name
                                    </label>
                                    <input
                                        type="text"
                                        value={newCountryName}
                                        onChange={(e) => {
                                            setNewCountryName(e.target.value);
                                            setNewCountrySlug(
                                                e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-")
                                            );
                                        }}
                                        placeholder="e.g. South Korea"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium font-poppins text-brand-gray mb-1">
                                        URL Slug
                                    </label>
                                    <input
                                        type="text"
                                        value={newCountrySlug}
                                        onChange={(e) => setNewCountrySlug(e.target.value)}
                                        placeholder="e.g. south-korea"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleAddCountry}
                                    className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white font-poppins font-medium rounded-lg hover:bg-brand-blue/90 transition-all"
                                >
                                    <Plus className="w-4 h-4" /> Create
                                </button>
                                <button
                                    onClick={() => {
                                        setShowNewCountryForm(false);
                                        setNewCountryName("");
                                        setNewCountrySlug("");
                                    }}
                                    className="px-4 py-2 text-brand-gray font-poppins font-medium hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Country List */}
                {isLoadingList ? (
                    <div className="py-12 flex items-center justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
                        <span className="ml-2 text-brand-gray font-poppins">Loading countries...</span>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {countrySlugs.map((slug) => {
                            const defaults = defaultCountryPages[slug];
                            const name = defaults?.name || slug;
                            return (
                                <motion.div
                                    key={slug}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden group"
                                >
                                    {/* Country Image */}
                                    <div className="relative h-36 bg-gray-100">
                                        {defaults?.hero.heroImage ? (
                                            <Image
                                                src={defaults.hero.heroImage}
                                                alt={name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <MapPin className="w-10 h-10 text-gray-300" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                        <div className="absolute bottom-3 left-3">
                                            <h3 className="text-white font-montserrat font-bold text-lg">{name}</h3>
                                            <p className="text-white/70 text-xs font-poppins">/{slug}</p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="p-4 flex items-center justify-between">
                                        <button
                                            onClick={() => setSelectedCountry(slug)}
                                            className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white font-poppins font-medium text-sm rounded-lg hover:bg-brand-blue/90 transition-all"
                                        >
                                            Edit Content
                                        </button>
                                        {!defaultCountryPages[slug] && (
                                            <button
                                                onClick={() => handleDeleteCountry(slug)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                title="Delete Country"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }

    // Content editor view
    return (
        <div className="space-y-6">
            {/* Shared hidden file input for all image uploads */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
            {/* Header with back button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => {
                            setSelectedCountry(null);
                            setContent(null);
                        }}
                        className="px-3 py-2 text-brand-gray hover:bg-gray-100 rounded-lg transition-colors font-poppins text-sm"
                    >
                        ← Back
                    </button>
                    <div>
                        <h1 className="font-montserrat font-bold text-2xl text-brand-blue">
                            {content.name}
                        </h1>
                        <p className="text-brand-gray font-poppins text-sm">
                            Edit page content for /global-program/{content.slug}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={cn(
                        "flex items-center gap-2 px-5 py-2 bg-brand-blue text-white font-poppins font-medium rounded-lg shadow-md transition-all",
                        isSaving ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-blue/90"
                    )}
                >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isSaving ? "Saving..." : "Save All"}
                </button>
            </div>

            {saveStatus === "success" && (
                <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 font-poppins text-sm">
                    <Check className="w-4 h-4" /> Changes saved successfully!
                </div>
            )}
            {saveStatus === "error" && (
                <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 font-poppins text-sm">
                    <AlertCircle className="w-4 h-4" /> Failed to save changes. Please try again.
                </div>
            )}

            {isLoadingContent ? (
                <div className="py-12 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
                    <span className="ml-2 text-brand-gray font-poppins">Loading content...</span>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Country Name */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Country Name</label>
                                <input
                                    type="text"
                                    value={content.name}
                                    onChange={(e) => setContent({ ...content, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">URL Slug</label>
                                <input
                                    type="text"
                                    value={content.slug}
                                    disabled
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins bg-gray-50 text-gray-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 1. Hero Section */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <SectionHeader id="hero" title="1️⃣ Hero Section" icon={<ImageIcon className="w-5 h-5 text-brand-blue" />} />
                        <AnimatePresence>
                            {expandedSection === "hero" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="px-6 pb-6 border-t border-gray-100"
                                >
                                    <div className="pt-6 space-y-6">
                                        {/* Main Hero Image */}
                                        <ImageUploader
                                            currentImage={content.hero.heroImage}
                                            fieldId="hero-main"
                                            onUpload={(url) => setContent({ ...content, hero: { ...content.hero, heroImage: url } })}
                                            label="Main Hero Image"
                                        />

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Hero Title</label>
                                                <input
                                                    type="text"
                                                    value={content.hero.heroTitle}
                                                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, heroTitle: e.target.value } })}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                                    placeholder="e.g. India Programs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Hero Description</label>
                                                <textarea
                                                    rows={2}
                                                    value={content.hero.heroDescription}
                                                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, heroDescription: e.target.value } })}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                                    placeholder="Introductory text for the hero section..."
                                                />
                                            </div>
                                        </div>

                                        {/* Carousel Images */}
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-poppins font-semibold text-brand-blue">Carousel Images</h4>
                                                <button
                                                    onClick={() => {
                                                        const newImages = [...content.hero.carouselImages, { image: "", title: "", description: "" }];
                                                        setContent({ ...content, hero: { ...content.hero, carouselImages: newImages } });
                                                    }}
                                                    className="flex items-center gap-1 text-brand-blue hover:bg-brand-blue/10 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    <PlusCircle className="w-4 h-4" /> Add
                                                </button>
                                            </div>
                                            {content.hero.carouselImages.map((img, idx) => (
                                                <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100 relative">
                                                    <button
                                                        onClick={() => {
                                                            const newImages = content.hero.carouselImages.filter((_, i) => i !== idx);
                                                            setContent({ ...content, hero: { ...content.hero, carouselImages: newImages } });
                                                        }}
                                                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                    <div className="grid md:grid-cols-3 gap-4">
                                                        <ImageUploader
                                                            currentImage={img.image}
                                                            fieldId={`carousel-${idx}`}
                                                            onUpload={(url) => {
                                                                const newImages = [...content.hero.carouselImages];
                                                                newImages[idx] = { ...newImages[idx], image: url };
                                                                setContent({ ...content, hero: { ...content.hero, carouselImages: newImages } });
                                                            }}
                                                            label="Image"
                                                            aspectRatio="aspect-square"
                                                        />
                                                        <div className="space-y-3 md:col-span-2">
                                                            <div>
                                                                <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Title</label>
                                                                <input
                                                                    type="text"
                                                                    value={img.title}
                                                                    onChange={(e) => {
                                                                        const newImages = [...content.hero.carouselImages];
                                                                        newImages[idx] = { ...newImages[idx], title: e.target.value };
                                                                        setContent({ ...content, hero: { ...content.hero, carouselImages: newImages } });
                                                                    }}
                                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Description</label>
                                                                <input
                                                                    type="text"
                                                                    value={img.description}
                                                                    onChange={(e) => {
                                                                        const newImages = [...content.hero.carouselImages];
                                                                        newImages[idx] = { ...newImages[idx], description: e.target.value };
                                                                        setContent({ ...content, hero: { ...content.hero, carouselImages: newImages } });
                                                                    }}
                                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <ActionButtons />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* 2. Our Programs */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <SectionHeader id="programs" title="2️⃣ Our Programs" icon={<MapPin className="w-5 h-5 text-brand-blue" />} />
                        <AnimatePresence>
                            {expandedSection === "programs" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="px-6 pb-6 border-t border-gray-100"
                                >
                                    <div className="pt-6 space-y-6">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Main Title</label>
                                                <input
                                                    type="text"
                                                    value={content.programs.mainTitle}
                                                    onChange={(e) => setContent({ ...content, programs: { ...content.programs, mainTitle: e.target.value } })}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Description</label>
                                                <textarea
                                                    rows={3}
                                                    value={content.programs.description}
                                                    onChange={(e) => setContent({ ...content, programs: { ...content.programs, description: e.target.value } })}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                                />
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200" />

                                        {/* Program Cards */}
                                        <h4 className="font-poppins font-semibold text-brand-blue">Program Cards (3)</h4>
                                        {content.programs.programCards.map((card, idx) => (
                                            <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-7 h-7 rounded-full bg-brand-blue/10 text-brand-blue font-bold flex items-center justify-center text-xs">{idx + 1}</div>
                                                    <span className="font-poppins font-medium text-brand-blue text-sm">{card.title}</span>
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-3">
                                                        <div>
                                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Title</label>
                                                            <input
                                                                type="text"
                                                                value={card.title}
                                                                onChange={(e) => {
                                                                    const newCards = [...content.programs.programCards];
                                                                    newCards[idx] = { ...newCards[idx], title: e.target.value };
                                                                    setContent({ ...content, programs: { ...content.programs, programCards: newCards } });
                                                                }}
                                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">
                                                                Timeline <span className="text-orange-500">(displayed in orange)</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={card.timeline}
                                                                onChange={(e) => {
                                                                    const newCards = [...content.programs.programCards];
                                                                    newCards[idx] = { ...newCards[idx], timeline: e.target.value };
                                                                    setContent({ ...content, programs: { ...content.programs, programCards: newCards } });
                                                                }}
                                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Description</label>
                                                            <textarea
                                                                rows={3}
                                                                value={card.description}
                                                                onChange={(e) => {
                                                                    const newCards = [...content.programs.programCards];
                                                                    newCards[idx] = { ...newCards[idx], description: e.target.value };
                                                                    setContent({ ...content, programs: { ...content.programs, programCards: newCards } });
                                                                }}
                                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                                            />
                                                        </div>
                                                    </div>
                                                    <ImageUploader
                                                        currentImage={card.image}
                                                        fieldId={`program-card-${idx}`}
                                                        onUpload={(url) => {
                                                            const newCards = [...content.programs.programCards];
                                                            newCards[idx] = { ...newCards[idx], image: url };
                                                            setContent({ ...content, programs: { ...content.programs, programCards: newCards } });
                                                        }}
                                                        label="Program Image"
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        <div className="border-t border-gray-200" />

                                        {/* Buttons */}
                                        <h4 className="font-poppins font-semibold text-brand-blue">Buttons (3)</h4>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            {content.programs.buttons.map((btn, idx) => (
                                                <div key={idx} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                                    <div>
                                                        <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Button Text</label>
                                                        <input
                                                            type="text"
                                                            value={btn.text}
                                                            onChange={(e) => {
                                                                const newBtns = [...content.programs.buttons];
                                                                newBtns[idx] = { ...newBtns[idx], text: e.target.value };
                                                                setContent({ ...content, programs: { ...content.programs, buttons: newBtns } });
                                                            }}
                                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                                        />
                                                    </div>
                                                    <div className="mt-2">
                                                        <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Link</label>
                                                        <input
                                                            type="text"
                                                            value={btn.link}
                                                            onChange={(e) => {
                                                                const newBtns = [...content.programs.buttons];
                                                                newBtns[idx] = { ...newBtns[idx], link: e.target.value };
                                                                setContent({ ...content, programs: { ...content.programs, buttons: newBtns } });
                                                            }}
                                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <ActionButtons />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* 3. Life Experience */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <SectionHeader id="life" title="3️⃣ Life Experience" icon={<Star className="w-5 h-5 text-brand-blue" />} />
                        <AnimatePresence>
                            {expandedSection === "life" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="px-6 pb-6 border-t border-gray-100"
                                >
                                    <div className="pt-6 space-y-6">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Title</label>
                                                <input
                                                    type="text"
                                                    value={content.lifeExperience.title}
                                                    onChange={(e) => setContent({ ...content, lifeExperience: { ...content.lifeExperience, title: e.target.value } })}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Description</label>
                                                <textarea
                                                    rows={3}
                                                    value={content.lifeExperience.description}
                                                    onChange={(e) => setContent({ ...content, lifeExperience: { ...content.lifeExperience, description: e.target.value } })}
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Button Names (3)</label>
                                            <div className="grid grid-cols-3 gap-4">
                                                {content.lifeExperience.buttonNames.map((name, idx) => (
                                                    <input
                                                        key={idx}
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => {
                                                            const newNames = [...content.lifeExperience.buttonNames];
                                                            newNames[idx] = e.target.value;
                                                            setContent({ ...content, lifeExperience: { ...content.lifeExperience, buttonNames: newNames } });
                                                        }}
                                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <ActionButtons />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* 4. Information Sections */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <SectionHeader id="info" title="4️⃣ Information Sections" icon={<MapPin className="w-5 h-5 text-brand-blue" />} />
                        <AnimatePresence>
                            {expandedSection === "info" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="px-6 pb-6 border-t border-gray-100"
                                >
                                    <div className="pt-6 space-y-6">
                                        {(["housing", "culture", "language"] as const).map((key) => (
                                            <div key={key} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                <h4 className="font-poppins font-semibold text-brand-blue capitalize mb-3">{key}</h4>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Content</label>
                                                        <textarea
                                                            rows={5}
                                                            value={content.information[key].content}
                                                            onChange={(e) => {
                                                                setContent({
                                                                    ...content,
                                                                    information: {
                                                                        ...content.information,
                                                                        [key]: { ...content.information[key], content: e.target.value },
                                                                    },
                                                                });
                                                            }}
                                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                                        />
                                                    </div>
                                                    <ImageUploader
                                                        currentImage={content.information[key].image}
                                                        fieldId={`info-${key}`}
                                                        onUpload={(url) => {
                                                            setContent({
                                                                ...content,
                                                                information: {
                                                                    ...content.information,
                                                                    [key]: { ...content.information[key], image: url },
                                                                },
                                                            });
                                                        }}
                                                        label={`${key.charAt(0).toUpperCase() + key.slice(1)} Image`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <ActionButtons />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* 5. Student Stories */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <SectionHeader id="stories" title="5️⃣ Student Stories" icon={<Star className="w-5 h-5 text-brand-blue" />} />
                        <AnimatePresence>
                            {expandedSection === "stories" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="px-6 pb-6 border-t border-gray-100"
                                >
                                    <div className="pt-6 space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-poppins font-semibold text-brand-blue">Stories</h4>
                                            <button
                                                onClick={() => {
                                                    setContent({
                                                        ...content,
                                                        studentStories: [
                                                            ...content.studentStories,
                                                            { description: "", name: "", program: "", starRating: 5 },
                                                        ],
                                                    });
                                                }}
                                                className="flex items-center gap-1 text-brand-blue hover:bg-brand-blue/10 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                <PlusCircle className="w-4 h-4" /> Add Story
                                            </button>
                                        </div>

                                        {content.studentStories.map((story, idx) => (
                                            <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100 relative">
                                                <button
                                                    onClick={() => {
                                                        const newStories = content.studentStories.filter((_, i) => i !== idx);
                                                        setContent({ ...content, studentStories: newStories });
                                                    }}
                                                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-3">
                                                        <div>
                                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Name</label>
                                                            <input
                                                                type="text"
                                                                value={story.name}
                                                                onChange={(e) => {
                                                                    const newStories = [...content.studentStories];
                                                                    newStories[idx] = { ...newStories[idx], name: e.target.value };
                                                                    setContent({ ...content, studentStories: newStories });
                                                                }}
                                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Program</label>
                                                            <input
                                                                type="text"
                                                                value={story.program}
                                                                onChange={(e) => {
                                                                    const newStories = [...content.studentStories];
                                                                    newStories[idx] = { ...newStories[idx], program: e.target.value };
                                                                    setContent({ ...content, studentStories: newStories });
                                                                }}
                                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Star Rating</label>
                                                            <div className="flex gap-1">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <button
                                                                        key={star}
                                                                        onClick={() => {
                                                                            const newStories = [...content.studentStories];
                                                                            newStories[idx] = { ...newStories[idx], starRating: star };
                                                                            setContent({ ...content, studentStories: newStories });
                                                                        }}
                                                                        className="p-1"
                                                                    >
                                                                        <Star
                                                                            className={cn(
                                                                                "w-5 h-5",
                                                                                star <= story.starRating
                                                                                    ? "fill-yellow-400 text-yellow-400"
                                                                                    : "text-gray-300"
                                                                            )}
                                                                        />
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Description / Quote</label>
                                                        <textarea
                                                            rows={6}
                                                            value={story.description}
                                                            onChange={(e) => {
                                                                const newStories = [...content.studentStories];
                                                                newStories[idx] = { ...newStories[idx], description: e.target.value };
                                                                setContent({ ...content, studentStories: newStories });
                                                            }}
                                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <ActionButtons />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* 6. Call To Action */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <SectionHeader id="cta" title="6️⃣ Call To Action" icon={<MapPin className="w-5 h-5 text-brand-blue" />} />
                        <AnimatePresence>
                            {expandedSection === "cta" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="px-6 pb-6 border-t border-gray-100"
                                >
                                    <div className="pt-6 space-y-6">
                                        <ImageUploader
                                            currentImage={content.cta.ctaImage}
                                            fieldId="cta-image"
                                            onUpload={(url) => setContent({ ...content, cta: { ...content.cta, ctaImage: url } })}
                                            label="CTA Background Image"
                                        />
                                        <ActionButtons />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}
        </div>
    );
}
