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
    Users,
    Image as ImageIcon,
    Target,
    Award,
    Plus,
    Trash2,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    getAdvisoryBoardContent,
    updateAdvisoryBoardContent,
    defaultAdvisoryBoardContent,
    AdvisoryBoardContent,
    BoardMember,
} from "@/lib/advisoryBoardContent";

export default function AdvisoryAdminPage() {
    const [content, setContent] = useState<AdvisoryBoardContent>(defaultAdvisoryBoardContent);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
    const [expandedSection, setExpandedSection] = useState<string | null>("hero");

    // Image upload state
    const [uploadingField, setUploadingField] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const uploadCallbackRef = useRef<((url: string) => void) | null>(null);

    useEffect(() => {
        getAdvisoryBoardContent()
            .then(setContent)
            .finally(() => setIsLoading(false));
    }, []);

    // --- Save / Reset ---
    const handleSave = async () => {
        setIsSaving(true);
        setSaveStatus("idle");
        const toastId = toast.loading("Saving changes...");
        const success = await updateAdvisoryBoardContent(content);
        setIsSaving(false);
        setSaveStatus(success ? "success" : "error");
        if (success) {
            toast.success("Changes saved successfully!", { id: toastId });
        } else {
            toast.error("Failed to save changes.", { id: toastId });
        }
        setTimeout(() => setSaveStatus("idle"), 3000);
    };

    const handleReset = () => {
        if (confirm("Are you sure you want to reset all content to defaults? This will not be saved until you click Save Changes.")) {
            setContent(defaultAdvisoryBoardContent);
            toast.info("Content reset to defaults. Click Save to persist.");
        }
    };

    // --- Image Upload (Cloudinary via /api/upload) ---
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
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) handleImageUpload(e.target.files[0]);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // --- Member Management ---
    const addMember = () => {
        const newMember: BoardMember = {
            id: Date.now().toString(),
            name: "New Member",
            title: "Position",
            organization: "Organization",
            image: ""
        };
        setContent({
            ...content,
            membersSection: {
                ...content.membersSection,
                members: [...content.membersSection.members, newMember]
            }
        });
        toast.success("Added new member");
    };

    const removeMember = (id: string) => {
        setContent({
            ...content,
            membersSection: {
                ...content.membersSection,
                members: content.membersSection.members.filter(m => m.id !== id)
            }
        });
        toast.info("Member removed");
    };

    const updateMember = (id: string, updates: Partial<BoardMember>) => {
        setContent({
            ...content,
            membersSection: {
                ...content.membersSection,
                members: content.membersSection.members.map(m => m.id === id ? { ...m, ...updates } : m)
            }
        });
    };

    // --- Reusable Components ---
    const ImageUploader = ({ currentImage, fieldId, onUpload, label, aspectRatio = "aspect-square" }: {
        currentImage: string; fieldId: string; onUpload: (url: string) => void; label: string; aspectRatio?: string;
    }) => {
        const isMember = fieldId.startsWith('member-');

        return (
            <div>
                <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">{label}</label>
                <div className={`relative ${aspectRatio} w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group`}>
                    {currentImage ? (
                        <Image src={currentImage} alt={label} fill className="object-cover" unoptimized={currentImage.startsWith('/')} />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            {isMember ? <Users className="w-8 h-8 text-gray-300" /> : <ImageIcon className="w-8 h-8 text-gray-300" />}
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        <button onClick={() => triggerUpload(fieldId, onUpload)} className="flex items-center gap-2 bg-white text-brand-blue px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
                            {uploadingField === fieldId ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                            {uploadingField === fieldId ? "Uploading..." : "Change Image"}
                        </button>
                        {currentImage && (
                            <button onClick={() => onUpload("")} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-red-600 transition-colors">
                                <Trash2 className="w-4 h-4" /> Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const SectionHeader = ({ id, title, icon }: { id: string; title: string; icon: React.ReactNode }) => (
        <button onClick={() => setExpandedSection(expandedSection === id ? null : id)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
                {icon}
                <span className="font-poppins font-semibold text-brand-blue">{title}</span>
            </div>
            {expandedSection === id ? <ChevronUp className="w-5 h-5 text-brand-gray" /> : <ChevronDown className="w-5 h-5 text-brand-gray" />}
        </button>
    );

    const ActionButtons = () => (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-brand-gray font-poppins font-medium hover:bg-gray-200 rounded-lg transition-colors">
                <RotateCcw className="w-4 h-4" /> Reset to Default
            </button>
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
        return (
            <div className="py-12 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
                <span className="ml-2 text-brand-gray font-poppins">Loading content...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-montserrat font-bold text-2xl text-brand-blue">Advisory Board Page</h1>
                    <p className="text-brand-gray font-poppins text-sm mt-1">Manage hero, board members, and mission sections</p>
                </div>
                <button onClick={handleSave} disabled={isSaving} className={cn("flex items-center gap-2 px-5 py-2 bg-brand-blue text-white font-poppins font-medium rounded-lg shadow-md transition-all", isSaving ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-blue/90")}>
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {isSaving ? "Saving..." : "Save All"}
                </button>
            </div>

            <div className="space-y-4">
                {/* ── Hero Section ── */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <SectionHeader id="hero" title="Hero Section" icon={<Sparkles className="w-5 h-5 text-brand-blue" />} />
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
                                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Leadership Text (Highlighted)</label>
                                            <input type="text" value={content.hero.highlightText} onChange={(e) => setContent({ ...content, hero: { ...content.hero, highlightText: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Description</label>
                                        <textarea rows={3} value={content.hero.description} onChange={(e) => setContent({ ...content, hero: { ...content.hero, description: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Hero Quote</label>
                                        <textarea rows={2} value={content.hero.quote} onChange={(e) => setContent({ ...content, hero: { ...content.hero, quote: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                    </div>
                                    <ImageUploader currentImage={content.hero.image} fieldId="hero-image" onUpload={(url) => setContent({ ...content, hero: { ...content.hero, image: url } })} label="Hero Card Image" aspectRatio="aspect-video" />
                                    <ActionButtons />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ── Members Section ── */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <SectionHeader id="members" title="Board Members" icon={<Users className="w-5 h-5 text-brand-blue" />} />
                    <AnimatePresence>
                        {expandedSection === "members" && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="px-6 pb-6 bg-gray-50 border-t border-gray-100">
                                <div className="pt-6 space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Section Tagline</label>
                                            <input type="text" value={content.membersSection.tagline} onChange={(e) => setContent({ ...content, membersSection: { ...content.membersSection, tagline: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Section Title</label>
                                            <input type="text" value={content.membersSection.title} onChange={(e) => setContent({ ...content, membersSection: { ...content.membersSection, title: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Section Description</label>
                                        <input type="text" value={content.membersSection.description} onChange={(e) => setContent({ ...content, membersSection: { ...content.membersSection, description: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                    </div>

                                    <div className="border-t border-gray-200 pt-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-montserrat font-bold text-brand-blue text-lg">Members ({content.membersSection.members.length})</h3>
                                            <button onClick={addMember} className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white font-poppins font-medium rounded-lg hover:bg-brand-red/90 transition-colors shadow-sm">
                                                <Plus className="w-4 h-4" /> Add Member
                                            </button>
                                        </div>

                                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {content.membersSection.members.map((member, index) => (
                                                <div key={member.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative group/member">
                                                    <button onClick={() => removeMember(member.id)} className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover/member:opacity-100">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                    <div className="space-y-4">
                                                        <ImageUploader
                                                            currentImage={member.image}
                                                            fieldId={`member-${member.id}`}
                                                            onUpload={(url) => updateMember(member.id, { image: url })}
                                                            label="Member Photo"
                                                        />
                                                        <div className="space-y-3">
                                                            <div>
                                                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Name</label>
                                                                <input type="text" value={member.name} onChange={(e) => updateMember(member.id, { name: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Role / Position</label>
                                                                <input type="text" value={member.title} onChange={(e) => updateMember(member.id, { title: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Organization / University</label>
                                                                <input type="text" value={member.organization} onChange={(e) => updateMember(member.id, { organization: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                                            </div>
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

                {/* ── Excellence Section ── */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <SectionHeader id="excellence" title="Guiding Excellence Section" icon={<Award className="w-5 h-5 text-brand-blue" />} />
                    <AnimatePresence>
                        {expandedSection === "excellence" && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="px-6 pb-6 bg-gray-50 border-t border-gray-100">
                                <div className="pt-6 space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Title Prefix</label>
                                            <input type="text" value={content.excellenceSection.title} onChange={(e) => setContent({ ...content, excellenceSection: { ...content.excellenceSection, title: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Title Highlighted</label>
                                            <input type="text" value={content.excellenceSection.highlightText} onChange={(e) => setContent({ ...content, excellenceSection: { ...content.excellenceSection, highlightText: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Paragraph 1</label>
                                            <textarea rows={3} value={content.excellenceSection.description1} onChange={(e) => setContent({ ...content, excellenceSection: { ...content.excellenceSection, description1: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Paragraph 2</label>
                                            <textarea rows={3} value={content.excellenceSection.description2} onChange={(e) => setContent({ ...content, excellenceSection: { ...content.excellenceSection, description2: e.target.value } })} className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-6 pt-4">
                                        <div>
                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Board Members Stat</label>
                                            <input type="text" value={content.excellenceSection.stats.members} onChange={(e) => setContent({ ...content, excellenceSection: { ...content.excellenceSection, stats: { ...content.excellenceSection.stats, members: e.target.value } } })} className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Countries Stat</label>
                                            <input type="text" value={content.excellenceSection.stats.countries} onChange={(e) => setContent({ ...content, excellenceSection: { ...content.excellenceSection, stats: { ...content.excellenceSection.stats, countries: e.target.value } } })} className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Students Stat</label>
                                            <input type="text" value={content.excellenceSection.stats.students} onChange={(e) => setContent({ ...content, excellenceSection: { ...content.excellenceSection, stats: { ...content.excellenceSection.stats, students: e.target.value } } })} className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue" />
                                        </div>
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
