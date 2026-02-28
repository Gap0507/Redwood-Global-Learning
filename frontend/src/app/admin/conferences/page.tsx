"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    Save,
    ChevronDown,
    ChevronUp,
    Loader2,
    Check,
    AlertCircle,
    RotateCcw,
    Upload,
    Mic2,
    Image as ImageIcon,
    Megaphone,
    Target,
    Award,
    PlusCircle,
    X,
    BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    getConferencesPageContent,
    updateConferencesPageContent,
    defaultConferencesPageContent,
    ConferencesPageContent,
} from "@/lib/conferencesPageContent";

export default function ConferencesAdminPage() {
    const [content, setContent] = useState<ConferencesPageContent>(defaultConferencesPageContent);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const [uploadingField, setUploadingField] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const uploadCallbackRef = useRef<((url: string) => void) | null>(null);

    useEffect(() => {
        getConferencesPageContent()
            .then(setContent)
            .finally(() => setIsLoading(false));
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        setSaveStatus("idle");
        const toastId = toast.loading("Saving changes...");
        const success = await updateConferencesPageContent(content);
        setIsSaving(false);
        setSaveStatus(success ? "success" : "error");
        if (success) toast.success("Changes saved successfully!", { id: toastId });
        else toast.error("Failed to save changes.", { id: toastId });
        setTimeout(() => setSaveStatus("idle"), 3000);
    };

    const handleReset = () => {
        setContent(defaultConferencesPageContent);
        toast.info("Content reset to defaults. Click Save to persist.");
    };

    const handleImageUpload = async (file: File) => {
        if (!uploadCallbackRef.current) return;
        const callback = uploadCallbackRef.current;
        const toastId = toast.loading("Uploading image...");
        try {
            setUploadingField("uploading");
            const formData = new FormData();
            formData.append("file", file);
            const response = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Upload failed");
            callback(data.url);
            toast.success("Image uploaded successfully!", { id: toastId });
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Failed to upload image.", { id: toastId });
        } finally {
            setUploadingField(null);
            uploadCallbackRef.current = null;
        }
    };

    const triggerUpload = (fieldId: string, callback: (url: string) => void) => {
        setUploadingField(fieldId);
        uploadCallbackRef.current = callback;
        if (fileInputRef.current) { fileInputRef.current.value = ""; fileInputRef.current.click(); }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) handleImageUpload(e.target.files[0]);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const ImageUploader = ({ currentImage, fieldId, onUpload, label, aspectRatio = "aspect-video" }: {
        currentImage: string; fieldId: string; onUpload: (url: string) => void; label: string; aspectRatio?: string;
    }) => (
        <div>
            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">{label}</label>
            <div className={`relative ${aspectRatio} w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group`}>
                {currentImage ? <Image src={currentImage} alt={label} fill className="object-cover" /> : <div className="flex items-center justify-center h-full"><ImageIcon className="w-8 h-8 text-gray-300" /></div>}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button onClick={() => triggerUpload(fieldId, onUpload)} className="flex items-center gap-2 bg-white text-brand-blue px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
                        {uploadingField === fieldId ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        {uploadingField === fieldId ? "Uploading..." : "Change Image"}
                    </button>
                </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">Hover to upload (JPG, PNG, WEBP)</p>
        </div>
    );

    const SectionHeader = ({ id, title, icon }: { id: string; title: string; icon: React.ReactNode }) => (
        <button onClick={() => setExpandedSection(expandedSection === id ? null : id)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">{icon}<span className="font-poppins font-semibold text-brand-blue">{title}</span></div>
            {expandedSection === id ? <ChevronUp className="w-5 h-5 text-brand-gray" /> : <ChevronDown className="w-5 h-5 text-brand-gray" />}
        </button>
    );

    const ActionButtons = () => (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-brand-gray font-poppins font-medium hover:bg-gray-200 rounded-lg transition-colors"><RotateCcw className="w-4 h-4" /> Reset to Default</button>
            <div className="flex items-center gap-3">
                {saveStatus === "success" && <span className="flex items-center gap-1 text-green-600 font-poppins text-sm"><Check className="w-4 h-4" /> Saved!</span>}
                {saveStatus === "error" && <span className="flex items-center gap-1 text-red-500 font-poppins text-sm"><AlertCircle className="w-4 h-4" /> Error saving</span>}
                <button onClick={handleSave} disabled={isSaving} className={cn("flex items-center gap-2 px-5 py-2 bg-brand-blue text-white font-poppins font-medium rounded-lg shadow-md transition-all", isSaving ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-blue/90")}>
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );

    if (isLoading) {
        return (<div className="py-12 flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-brand-blue" /><span className="ml-2 text-brand-gray font-poppins">Loading content...</span></div>);
    }

    return (
        <div className="space-y-6">
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-montserrat font-bold text-2xl text-brand-blue">Conferences Page</h1>
                    <p className="text-brand-gray font-poppins text-sm mt-1">Manage content for the Conferences page</p>
                </div>
                <button onClick={handleSave} disabled={isSaving} className={cn("flex items-center gap-2 px-5 py-2 bg-brand-blue text-white font-poppins font-medium rounded-lg shadow-md transition-all", isSaving ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-blue/90")}>
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isSaving ? "Saving..." : "Save All"}
                </button>
            </div>

            {saveStatus === "success" && (
                <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 font-poppins text-sm"><Check className="w-4 h-4" /> Changes saved successfully!</div>
            )}

            <div className="space-y-4">
                {/* ── Hero Section ── */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <SectionHeader id="hero" title="Hero Section" icon={<Mic2 className="w-5 h-5 text-brand-blue" />} />
                    <AnimatePresence>
                        {expandedSection === "hero" && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="px-6 pb-6 bg-gray-50 border-t border-gray-100">
                                <div className="pt-6 space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Tagline</label>
                                            <input type="text" value={content.hero.tagline} onChange={(e) => setContent({ ...content, hero: { ...content.hero, tagline: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">CTA Button Text</label>
                                            <input type="text" value={content.hero.ctaText} onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaText: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Title</label>
                                            <input type="text" value={content.hero.title} onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Highlighted Text</label>
                                            <input type="text" value={content.hero.highlightedText} onChange={(e) => setContent({ ...content, hero: { ...content.hero, highlightedText: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Description</label>
                                        <textarea rows={3} value={content.hero.description} onChange={(e) => setContent({ ...content, hero: { ...content.hero, description: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                    </div>
                                    <ImageUploader currentImage={content.hero.heroImage} fieldId="hero-image" onUpload={(url) => setContent({ ...content, hero: { ...content.hero, heroImage: url } })} label="Hero Background Image" />

                                    {/* Impact Numbers */}
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-montserrat font-bold text-brand-blue text-lg flex items-center gap-2"><BarChart3 className="w-5 h-5" /> Impact Stats ({content.hero.impactNumbers.length})</h3>
                                            {content.hero.impactNumbers.length < 6 && (
                                                <button onClick={() => setContent({ ...content, hero: { ...content.hero, impactNumbers: [...content.hero.impactNumbers, { value: "0+", label: "New Stat" }] } })} className="flex items-center gap-2 text-brand-blue hover:bg-brand-blue/10 px-3 py-1.5 rounded-lg transition-colors font-medium text-sm"><PlusCircle className="w-4 h-4" /> Add Stat</button>
                                            )}
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {content.hero.impactNumbers.map((stat, i) => (
                                                <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm relative group">
                                                    {content.hero.impactNumbers.length > 1 && (
                                                        <button onClick={() => { const nums = content.hero.impactNumbers.filter((_, idx) => idx !== i); setContent({ ...content, hero: { ...content.hero, impactNumbers: nums } }); }} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><X className="w-4 h-4" /></button>
                                                    )}
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Value</label>
                                                            <input type="text" value={stat.value} onChange={(e) => { const nums = [...content.hero.impactNumbers]; nums[i] = { ...nums[i], value: e.target.value }; setContent({ ...content, hero: { ...content.hero, impactNumbers: nums } }); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Label</label>
                                                            <input type="text" value={stat.label} onChange={(e) => { const nums = [...content.hero.impactNumbers]; nums[i] = { ...nums[i], label: e.target.value }; setContent({ ...content, hero: { ...content.hero, impactNumbers: nums } }); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <ActionButtons />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ── Mission Section ── */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <SectionHeader id="mission" title="Mission & Philosophy" icon={<Megaphone className="w-5 h-5 text-brand-blue" />} />
                    <AnimatePresence>
                        {expandedSection === "mission" && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="px-6 pb-6 bg-gray-50 border-t border-gray-100">
                                <div className="pt-6 space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Section Title</label>
                                        <input type="text" value={content.mission.title} onChange={(e) => setContent({ ...content, mission: { ...content.mission, title: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                    </div>
                                    {content.mission.paragraphs.map((p, i) => (
                                        <div key={i}>
                                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Paragraph {i + 1}</label>
                                            <textarea rows={3} value={p} onChange={(e) => { const newP = [...content.mission.paragraphs]; newP[i] = e.target.value; setContent({ ...content, mission: { ...content.mission, paragraphs: newP } }); }} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                        </div>
                                    ))}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Callout Title</label>
                                            <input type="text" value={content.mission.calloutTitle} onChange={(e) => setContent({ ...content, mission: { ...content.mission, calloutTitle: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Callout Subtitle</label>
                                            <input type="text" value={content.mission.calloutSubtitle} onChange={(e) => setContent({ ...content, mission: { ...content.mission, calloutSubtitle: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                        </div>
                                    </div>
                                    <ImageUploader currentImage={content.mission.image} fieldId="mission-image" onUpload={(url) => setContent({ ...content, mission: { ...content.mission, image: url } })} label="Mission Section Image" />
                                    <ActionButtons />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ── Benefits Section ── */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <SectionHeader id="benefits" title="Benefits Cards" icon={<Target className="w-5 h-5 text-brand-blue" />} />
                    <AnimatePresence>
                        {expandedSection === "benefits" && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="px-6 pb-6 bg-gray-50 border-t border-gray-100">
                                <div className="pt-6 space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Section Title</label>
                                            <input type="text" value={content.benefits.title} onChange={(e) => setContent({ ...content, benefits: { ...content.benefits, title: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Section Subtitle</label>
                                            <textarea rows={2} value={content.benefits.subtitle} onChange={(e) => setContent({ ...content, benefits: { ...content.benefits, subtitle: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200" />
                                    <div className="space-y-6">
                                        <h3 className="font-montserrat font-bold text-brand-blue text-lg">Benefit Cards ({content.benefits.items.length})</h3>
                                        {content.benefits.items.map((item, index) => (
                                            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-50">
                                                    <div className="w-8 h-8 rounded-full bg-brand-blue/10 text-brand-blue font-bold flex items-center justify-center text-sm">{index + 1}</div>
                                                    <h4 className="font-poppins font-semibold text-brand-blue">{item.title}</h4>
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Title</label>
                                                            <input type="text" value={item.title} onChange={(e) => { const items = [...content.benefits.items]; items[index] = { ...items[index], title: e.target.value }; setContent({ ...content, benefits: { ...content.benefits, items } }); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Description</label>
                                                            <textarea rows={3} value={item.description} onChange={(e) => { const items = [...content.benefits.items]; items[index] = { ...items[index], description: e.target.value }; setContent({ ...content, benefits: { ...content.benefits, items } }); }} className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                                        </div>
                                                    </div>
                                                    <ImageUploader currentImage={item.image} fieldId={`benefit-${index}`} onUpload={(url) => { const items = [...content.benefits.items]; items[index] = { ...items[index], image: url }; setContent({ ...content, benefits: { ...content.benefits, items } }); }} label="Benefit Image" />
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

                {/* ── CTA Banner ── */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <SectionHeader id="cta" title="CTA Banner" icon={<Award className="w-5 h-5 text-brand-blue" />} />
                    <AnimatePresence>
                        {expandedSection === "cta" && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="px-6 pb-6 bg-gray-50 border-t border-gray-100">
                                <div className="pt-6 space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Title</label>
                                        <input type="text" value={content.cta.title} onChange={(e) => setContent({ ...content, cta: { ...content.cta, title: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Description</label>
                                        <textarea rows={3} value={content.cta.description} onChange={(e) => setContent({ ...content, cta: { ...content.cta, description: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Button Text</label>
                                        <input type="text" value={content.cta.ctaText} onChange={(e) => setContent({ ...content, cta: { ...content.cta, ctaText: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                    </div>
                                    <ActionButtons />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
