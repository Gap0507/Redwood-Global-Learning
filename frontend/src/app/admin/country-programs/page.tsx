"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    Save,
    Loader2,
    Check,
    AlertCircle,
    RotateCcw,
    ChevronDown,
    ChevronUp,
    Upload,
    PlusCircle,
    X,
    Globe,
    BookOpen,
    Users,
    Star,
    Layout,
    Type,
    Image as ImageIcon,
    List,
    Flag,
    MessageSquareQuote
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    getProgramsPageContent,
    updateProgramsPageContent,
    defaultProgramsPageContent,
    ProgramsPageContent,
    CountryProgram,
    StudentStory,
    DifferenceCard,
    BenefitItem,
    ProgramStep,
    ImpactStat
} from "@/lib/programsPageContent";

// Section definitions for the sidebar/tabs
const sections = [
    { id: "hero", title: "Hero Section", icon: Layout },
    { id: "why-global", title: "Why Global Learning", icon: Globe },
    { id: "how-it-works", title: "Program Structure", icon: List },
    { id: "country-programs", title: "Country Programs", icon: Flag },
    { id: "global-impact", title: "Global Impact", icon: Users },
    { id: "student-stories", title: "Student Stories", icon: MessageSquareQuote },
    { id: "difference", title: "Our Difference", icon: Star },
    { id: "cta", title: "Call to Action", icon: Type },
];

export default function CountryProgramsAdminPage() {
    const [content, setContent] = useState<ProgramsPageContent>(defaultProgramsPageContent);
    const [activeSection, setActiveSection] = useState("hero");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
    const [uploadingKey, setUploadingKey] = useState<string | null>(null); // To track which image is being uploaded
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch content on mount
    useEffect(() => {
        setIsLoading(true);
        getProgramsPageContent()
            .then(setContent)
            .finally(() => setIsLoading(false));
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        setSaveStatus("idle");
        const success = await updateProgramsPageContent(content);
        setIsSaving(false);
        setSaveStatus(success ? "success" : "error");
        setTimeout(() => setSaveStatus("idle"), 3000);
    };

    // New: Reset specific section
    const resetSection = (sectionKey: keyof ProgramsPageContent) => {
        if (confirm(`Are you sure you want to reset the ${sectionKey} section to default? This cannot be undone.`)) {
            setContent(prev => ({
                ...prev,
                [sectionKey]: defaultProgramsPageContent[sectionKey]
            }));
        }
    };

    // Generic text update handler
    const updateContent = (section: keyof ProgramsPageContent, field: string, value: any) => {
        setContent(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    // Nested array update handler (e.g., stats, benefits)
    const updateNestedContent = (section: keyof ProgramsPageContent, arrayField: string, index: number, field: string, value: any) => {
        setContent(prev => {
            const sectionData = prev[section] as any;
            const newArray = [...sectionData[arrayField]];
            newArray[index] = { ...newArray[index], [field]: value };
            return {
                ...prev,
                [section]: {
                    ...sectionData,
                    [arrayField]: newArray
                }
            };
        });
    };

    // Generic Image Upload Handler
    const handleImageUpload = async (file: File) => {
        if (!uploadingKey) return;

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error);

            // Logic to update the correct field based on uploadingKey
            // key format: "section:index" or "section:field" or "section:nestedField:index"
            const parts = uploadingKey.split(":");

            if (parts[0] === "countryPrograms") {
                // countryPrograms:image:index
                const index = parseInt(parts[2]);
                const newPrograms = [...content.countryPrograms];
                newPrograms[index] = { ...newPrograms[index], image: data.url };
                setContent({ ...content, countryPrograms: newPrograms });
            } else if (parts[0] === "studentStories") {
                // studentStories:flagUrl:index
                const index = parseInt(parts[2]);
                const newStories = [...content.studentStories.stories];
                newStories[index] = { ...newStories[index], flagUrl: data.url };
                setContent({ ...content, studentStories: { ...content.studentStories, stories: newStories } });
            }
            // Add more cases as needed

        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed");
        } finally {
            setUploadingIndex(null);
            setUploadingKey(null);
        }
    };

    const triggerUpload = (key: string, index?: number) => {
        setUploadingKey(key);
        if (index !== undefined) setUploadingIndex(index);
        fileInputRef.current?.click();
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-blue font-heading">Country Programs Page</h1>
                    <p className="text-brand-gray">Manage content for the main programs listing page</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Replaced Global Reset with Per-Section Reset buttons below */}
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2 bg-brand-blue text-white rounded-lg font-medium shadow-md transition-all",
                            isSaving ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-blue/90"
                        )}
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                    {saveStatus === "success" && <Check className="w-6 h-6 text-green-500" />}
                    {saveStatus === "error" && <AlertCircle className="w-6 h-6 text-red-500" />}
                </div>
            </div>

            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
            />

            <div className="flex gap-6 items-start">
                {/* Sidebar Navigation */}
                <div className="w-64 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden shrink-0 sticky top-24">
                    {sections.map(section => {
                        const Icon = section.icon;
                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-2",
                                    activeSection === section.id
                                        ? "bg-brand-blue/5 text-brand-blue border-brand-blue"
                                        : "text-brand-gray hover:bg-gray-50 border-transparent"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                {section.title}
                            </button>
                        );
                    })}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[600px]">

                    {/* HERO SECTION */}
                    {activeSection === "hero" && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h2 className="text-xl font-bold text-brand-blue">Hero Section</h2>
                                <button onClick={() => resetSection("hero")} className="text-xs text-brand-gray hover:text-red-500 flex items-center gap-1">
                                    <RotateCcw className="w-3 h-3" /> Reset Section
                                </button>
                            </div>
                            <div className="grid gap-4">
                                <Input label="Tagline" value={content.hero.tagline} onChange={v => updateContent("hero", "tagline", v)} />
                                <Input label="Headline" value={content.hero.headline} onChange={v => updateContent("hero", "headline", v)} />
                                <TextArea label="Description" value={content.hero.description} onChange={v => updateContent("hero", "description", v)} />

                                <h3 className="font-semibold text-brand-blue mt-4">Stats</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {content.hero.stats?.map((stat, i) => (
                                        <div key={i} className="p-4 bg-gray-50 rounded-lg border">
                                            <Input label="Value" value={stat.value} onChange={v => updateNestedContent("hero", "stats", i, "value", v)} />
                                            <Input label="Label" value={stat.label} onChange={v => updateNestedContent("hero", "stats", i, "label", v)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* WHY GLOBAL LEARNING */}
                    {activeSection === "why-global" && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h2 className="text-xl font-bold text-brand-blue">Why Global Learning</h2>
                                <button onClick={() => resetSection("whyGlobal")} className="text-xs text-brand-gray hover:text-red-500 flex items-center gap-1">
                                    <RotateCcw className="w-3 h-3" /> Reset Section
                                </button>
                            </div>
                            <div className="grid gap-4">
                                <Input label="Tagline" value={content.whyGlobal.tagline} onChange={v => updateContent("whyGlobal", "tagline", v)} />
                                <Input label="Headline" value={content.whyGlobal.headline} onChange={v => updateContent("whyGlobal", "headline", v)} />
                                <TextArea label="Description" value={content.whyGlobal.description} onChange={v => updateContent("whyGlobal", "description", v)} />

                                <h3 className="font-semibold text-brand-blue mt-4">Benefits List</h3>
                                {content.whyGlobal.benefits?.map((benefit, i) => (
                                    <div key={i} className="flex gap-4 items-center">
                                        <span className="font-mono text-xs text-gray-500 w-24 shrink-0">Icon: {benefit.icon}</span>
                                        <Input
                                            label={`Benefit ${i + 1}`}
                                            value={benefit.text}
                                            onChange={v => updateNestedContent("whyGlobal", "benefits", i, "text", v)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* PROGRAM STRUCTURE */}
                    {activeSection === "how-it-works" && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h2 className="text-xl font-bold text-brand-blue">Program Structure</h2>
                                <button onClick={() => resetSection("howItWorks")} className="text-xs text-brand-gray hover:text-red-500 flex items-center gap-1">
                                    <RotateCcw className="w-3 h-3" /> Reset Section
                                </button>
                            </div>
                            <div className="grid gap-4">
                                <Input label="Tagline" value={content.howItWorks.tagline} onChange={v => updateContent("howItWorks", "tagline", v)} />
                                <Input label="Headline" value={content.howItWorks.headline} onChange={v => updateContent("howItWorks", "headline", v)} />
                                <TextArea label="Description" value={content.howItWorks.description} onChange={v => updateContent("howItWorks", "description", v)} />

                                <h3 className="font-semibold text-brand-blue mt-4">Steps</h3>
                                {content.howItWorks.steps?.map((step, i) => (
                                    <div key={i} className="p-4 bg-gray-50 rounded-lg border space-y-3">
                                        <div className="flex justify-between">
                                            <span className="font-bold text-sm text-brand-blue">Step {i + 1}</span>
                                            <span className="text-xs text-gray-500">{step.icon}</span>
                                        </div>
                                        <Input label="Title" value={step.title} onChange={v => updateNestedContent("howItWorks", "steps", i, "title", v)} />
                                        <TextArea label="Description" value={step.description} onChange={v => updateNestedContent("howItWorks", "steps", i, "description", v)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* COUNTRY PROGRAMS */}
                    {activeSection === "country-programs" && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h2 className="text-xl font-bold text-brand-blue">Country Programs</h2>
                                <div className="flex gap-3">
                                    <button onClick={() => resetSection("countryPrograms")} className="text-xs text-brand-gray hover:text-red-500 flex items-center gap-1">
                                        <RotateCcw className="w-3 h-3" /> Reset
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (content.countryPrograms.length >= 9) {
                                                alert("Maximum 9 countries allowed. Remove a country first to add a new one.");
                                                return;
                                            }
                                            const newProgram: CountryProgram = {
                                                id: `new-${Date.now()}`,
                                                slug: "new-country",
                                                name: "New Country",
                                                tagline: "Tagline",
                                                description: "Description",
                                                image: "",
                                                flagUrl: "",
                                                programCount: 1,
                                                highlights: ["Highlight 1"],
                                                featuredProgram: "Program Name"
                                            };
                                            setContent(p => ({ ...p, countryPrograms: [...p.countryPrograms, newProgram] }));
                                        }}
                                        disabled={content.countryPrograms.length >= 9}
                                        className="flex items-center gap-1 text-sm bg-brand-blue/10 text-brand-blue px-3 py-1 rounded hover:bg-brand-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <PlusCircle className="w-4 h-4" /> Add Country ({content.countryPrograms.length}/9)
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {content.countryPrograms?.map((program, i) => (
                                    <div key={program.id} className="border rounded-xl p-4 bg-gray-50 relative group">
                                        <button
                                            onClick={() => {
                                                if (confirm("Delete this country?")) {
                                                    const newPrograms = content.countryPrograms.filter((_, idx) => idx !== i);
                                                    setContent(p => ({ ...p, countryPrograms: newPrograms }));
                                                }
                                            }}
                                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <Input label="Country Name" value={program.name}
                                                    onChange={v => {
                                                        const newP = [...content.countryPrograms];
                                                        newP[i] = { ...newP[i], name: v };
                                                        setContent({ ...content, countryPrograms: newP });
                                                    }}
                                                />
                                                <Input label="Tagline" value={program.tagline}
                                                    onChange={v => {
                                                        const newP = [...content.countryPrograms];
                                                        newP[i] = { ...newP[i], tagline: v };
                                                        setContent({ ...content, countryPrograms: newP });
                                                    }}
                                                />
                                                <Input label="Slug (URL)" value={program.slug}
                                                    onChange={v => {
                                                        const newP = [...content.countryPrograms];
                                                        newP[i] = { ...newP[i], slug: v.toLowerCase().replace(/\s+/g, '-') };
                                                        setContent({ ...content, countryPrograms: newP });
                                                    }}
                                                />
                                                <TextArea label="Description" value={program.description}
                                                    onChange={v => {
                                                        const newP = [...content.countryPrograms];
                                                        newP[i] = { ...newP[i], description: v };
                                                        setContent({ ...content, countryPrograms: newP });
                                                    }}
                                                />
                                                <Input label="Featured Program" value={program.featuredProgram || ""}
                                                    onChange={v => {
                                                        const newP = [...content.countryPrograms];
                                                        newP[i] = { ...newP[i], featuredProgram: v };
                                                        setContent({ ...content, countryPrograms: newP });
                                                    }}
                                                />
                                                <label className="block text-xs font-medium text-brand-gray mb-1">Highlights (comma separated)</label>
                                                <textarea
                                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                                    value={program.highlights.join(", ")}
                                                    onChange={e => {
                                                        const val = e.target.value.split(",").map(s => s.trim());
                                                        const newP = [...content.countryPrograms];
                                                        newP[i] = { ...newP[i], highlights: val };
                                                        setContent({ ...content, countryPrograms: newP });
                                                    }}
                                                />
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-xs font-medium text-brand-gray mb-1">Country Image</label>
                                                    <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden group/img">
                                                        {program.image ? (
                                                            <Image src={program.image} alt={program.name} fill className="object-cover" />
                                                        ) : (
                                                            <div className="flex items-center justify-center h-full text-gray-400"><ImageIcon /></div>
                                                        )}
                                                        <button
                                                            onClick={() => triggerUpload(`countryPrograms:image:${i}`)}
                                                            className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white transition-opacity"
                                                        >
                                                            <Upload className="w-6 h-6" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <Input label="Program Count" type="number" value={program.programCount}
                                                    onChange={v => {
                                                        const newP = [...content.countryPrograms];
                                                        newP[i] = { ...newP[i], programCount: parseInt(v) || 0 };
                                                        setContent({ ...content, countryPrograms: newP });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* GLOBAL IMPACT */}
                    {activeSection === "global-impact" && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h2 className="text-xl font-bold text-brand-blue">Global Impact</h2>
                                <button onClick={() => resetSection("globalImpact")} className="text-xs text-brand-gray hover:text-red-500 flex items-center gap-1">
                                    <RotateCcw className="w-3 h-3" /> Reset Section
                                </button>
                            </div>
                            <div className="grid gap-4">
                                <Input label="Tagline" value={content.globalImpact.tagline} onChange={v => updateContent("globalImpact", "tagline", v)} />
                                <Input label="Headline" value={content.globalImpact.headline} onChange={v => updateContent("globalImpact", "headline", v)} />
                                <TextArea label="Description" value={content.globalImpact.description} onChange={v => updateContent("globalImpact", "description", v)} />

                                <h3 className="font-semibold text-brand-blue mt-4">Statistics</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {content.globalImpact.stats?.map((stat, i) => (
                                        <div key={i} className="p-4 bg-gray-50 rounded-lg border">
                                            <div className="text-xs text-gray-500 mb-2">Icon: {stat.icon}</div>
                                            <Input label="Value" value={stat.value} onChange={v => updateNestedContent("globalImpact", "stats", i, "value", v)} />
                                            <Input label="Label" value={stat.label} onChange={v => updateNestedContent("globalImpact", "stats", i, "label", v)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STUDENT STORIES */}
                    {activeSection === "student-stories" && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h2 className="text-xl font-bold text-brand-blue">Student Stories</h2>
                                <button onClick={() => resetSection("studentStories")} className="text-xs text-brand-gray hover:text-red-500 flex items-center gap-1">
                                    <RotateCcw className="w-3 h-3" /> Reset Section
                                </button>
                            </div>
                            <div className="grid gap-4">
                                <Input label="Tagline" value={content.studentStories.tagline} onChange={v => updateContent("studentStories", "tagline", v)} />
                                <Input label="Headline" value={content.studentStories.headline} onChange={v => updateContent("studentStories", "headline", v)} />
                                <TextArea label="Description" value={content.studentStories.description} onChange={v => updateContent("studentStories", "description", v)} />

                                <h3 className="font-semibold text-brand-blue mt-4">Stories</h3>
                                {content.studentStories.stories?.map((story, i) => (
                                    <div key={story.id} className="p-4 bg-gray-50 rounded-lg border grid md:grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <TextArea label="Quote" value={story.quote} onChange={v => {
                                                const newStories = [...content.studentStories.stories];
                                                newStories[i] = { ...newStories[i], quote: v };
                                                setContent({ ...content, studentStories: { ...content.studentStories, stories: newStories } });
                                            }} />
                                        </div>
                                        <Input label="Name" value={story.name} onChange={v => {
                                            const newStories = [...content.studentStories.stories];
                                            newStories[i] = { ...newStories[i], name: v };
                                            setContent({ ...content, studentStories: { ...content.studentStories, stories: newStories } });
                                        }} />
                                        <Input label="Origin" value={story.origin} onChange={v => {
                                            const newStories = [...content.studentStories.stories];
                                            newStories[i] = { ...newStories[i], origin: v };
                                            setContent({ ...content, studentStories: { ...content.studentStories, stories: newStories } });
                                        }} />
                                        <Input label="Destination" value={story.destination} onChange={v => {
                                            const newStories = [...content.studentStories.stories];
                                            newStories[i] = { ...newStories[i], destination: v };
                                            setContent({ ...content, studentStories: { ...content.studentStories, stories: newStories } });
                                        }} />
                                        <div>
                                            <label className="block text-xs font-medium text-brand-gray mb-1">Flag URL (or upload)</label>
                                            <div className="flex gap-2">
                                                <input
                                                    className="flex-1 px-3 py-2 border rounded-lg text-sm"
                                                    value={story.flagUrl}
                                                    onChange={e => {
                                                        const newStories = [...content.studentStories.stories];
                                                        newStories[i] = { ...newStories[i], flagUrl: e.target.value };
                                                        setContent({ ...content, studentStories: { ...content.studentStories, stories: newStories } });
                                                    }}
                                                />
                                                <button
                                                    onClick={() => triggerUpload(`studentStories:flagUrl:${i}`)}
                                                    className="bg-brand-blue/10 p-2 rounded hover:bg-brand-blue/20">
                                                    <Upload className="w-4 h-4 text-brand-blue" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* DIFFERENCE */}
                    {activeSection === "difference" && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h2 className="text-xl font-bold text-brand-blue">Our Difference</h2>
                                <button onClick={() => resetSection("difference")} className="text-xs text-brand-gray hover:text-red-500 flex items-center gap-1">
                                    <RotateCcw className="w-3 h-3" /> Reset Section
                                </button>
                            </div>
                            <div className="grid gap-4">
                                <Input label="Tagline" value={content.difference.tagline} onChange={v => updateContent("difference", "tagline", v)} />
                                <Input label="Headline" value={content.difference.headline} onChange={v => updateContent("difference", "headline", v)} />

                                <h3 className="font-semibold text-brand-blue mt-4">Cards</h3>
                                {content.difference.cards?.map((card, i) => (
                                    <div key={i} className="p-4 bg-gray-50 rounded-lg border">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-bold text-sm text-brand-blue">Card {i + 1}</span>
                                            <span className="text-xs text-gray-500">Icon: {card.icon}</span>
                                        </div>
                                        <Input label="Title" value={card.title} onChange={v => updateNestedContent("difference", "cards", i, "title", v)} />
                                        <TextArea label="Description" value={card.description} onChange={v => updateNestedContent("difference", "cards", i, "description", v)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    {activeSection === "cta" && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h2 className="text-xl font-bold text-brand-blue">Call to Action</h2>
                                <button onClick={() => resetSection("cta")} className="text-xs text-brand-gray hover:text-red-500 flex items-center gap-1">
                                    <RotateCcw className="w-3 h-3" /> Reset Section
                                </button>
                            </div>
                            <div className="grid gap-4">
                                <Input label="Tagline" value={content.cta.tagline} onChange={v => updateContent("cta", "tagline", v)} />
                                <Input label="Headline" value={content.cta.headline} onChange={v => updateContent("cta", "headline", v)} />
                                <TextArea label="Description" value={content.cta.description} onChange={v => updateContent("cta", "description", v)} />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Apply Button Text" value={content.cta.applyButtonText} onChange={v => updateContent("cta", "applyButtonText", v)} />
                                    <Input label="Learn More Button Text" value={content.cta.learnMoreButtonText} onChange={v => updateContent("cta", "learnMoreButtonText", v)} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Helper Components
function Input({ label, value, onChange, type = "text" }: { label: string, value: string | number, onChange: (v: string) => void, type?: string }) {
    return (
        <div>
            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">{label}</label>
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
            />
        </div>
    );
}

function TextArea({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
    return (
        <div>
            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">{label}</label>
            <textarea
                rows={3}
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
            />
        </div>
    );
}
