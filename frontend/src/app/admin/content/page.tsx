"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    FileText,
    Image as ImageIcon,
    Type,
    Save,
    Plus,
    Trash2,
    Edit3,
    Eye,
    ChevronDown,
    ChevronUp,
    GripVertical,
    Loader2,
    Check,
    AlertCircle,
    RotateCcw,
    Upload,
    PlusCircle,
    X,
    Phone,
    Mail,
    MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getHeroContent, updateHeroContent, defaultHeroContent, HeroContent } from "@/lib/heroContent";
import { getApproachContent, updateApproachContent, defaultApproachContent, ApproachContent, ApproachCard } from "@/lib/approachContent";
import { getGlobalProgramsContent, updateGlobalProgramsContent, defaultGlobalProgramsContent, GlobalProgramsContent, GlobalProgram } from "@/lib/globalProgramsContent";
import { getStudentExperiencesContent, updateStudentExperiencesContent, defaultStudentExperiencesContent, StudentExperiencesContent, Testimonial } from "@/lib/studentExperiencesContent";
import { getAboutRedwoodContent, updateAboutRedwoodContent, defaultAboutRedwoodContent, AboutRedwoodContent } from "@/lib/aboutRedwoodContent";
import { getContactContent, updateContactContent, defaultContactContent, ContactContent } from "@/lib/contactContent";
import { getWhereCanYouGoContent, updateWhereCanYouGoContent, defaultWhereCanYouGoContent, WhereCanYouGoContent } from "@/lib/whereCanYouGoContent";

interface ContentSection {
    id: string;
    title: string;
    type: "hero" | "section" | "banner";
    status: "published" | "draft";
    lastModified: string;
}

const sampleContent: ContentSection[] = [
    { id: "hero", title: "Hero Section", type: "hero", status: "published", lastModified: "Now" },
    { id: "approach", title: "Our Approach", type: "section", status: "published", lastModified: "Now" },
    { id: "global-programs", title: "Global Programs", type: "section", status: "published", lastModified: "Now" },
    { id: "where-can-you-go", title: "Where Can You Go", type: "section", status: "published", lastModified: "Now" },
    { id: "student-experiences", title: "Student Experiences", type: "section", status: "published", lastModified: "1 week ago" },
    { id: "about-redwood", title: "About Redwood", type: "section", status: "published", lastModified: "1 week ago" },
    { id: "contact-social", title: "Contact & Social", type: "section", status: "published", lastModified: "1 week ago" },
];

export default function ContentManagementPage() {
    const [sections] = useState(sampleContent);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    // Hero Section CMS State
    const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);
    const [isLoadingHero, setIsLoadingHero] = useState(false);
    const [isSavingHero, setIsSavingHero] = useState(false);
    const [heroSaveStatus, setHeroSaveStatus] = useState<"idle" | "success" | "error">("idle");

    // Fetch Hero content on mount
    useEffect(() => {
        setIsLoadingHero(true);
        getHeroContent()
            .then(setHeroContent)
            .finally(() => setIsLoadingHero(false));
    }, []);

    // Approach Section CMS State
    const [approachContent, setApproachContent] = useState<ApproachContent>(defaultApproachContent);
    const [isLoadingApproach, setIsLoadingApproach] = useState(false);
    const [isSavingApproach, setIsSavingApproach] = useState(false);
    const [approachSaveStatus, setApproachSaveStatus] = useState<"idle" | "success" | "error">("idle");
    const [uploadingCardIndex, setUploadingCardIndex] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch Approach content on mount
    useEffect(() => {
        setIsLoadingApproach(true);
        getApproachContent()
            .then(setApproachContent)
            .finally(() => setIsLoadingApproach(false));
    }, []);

    // Global Programs CMS State
    const [globalProgramsContent, setGlobalProgramsContent] = useState<GlobalProgramsContent>(defaultGlobalProgramsContent);
    const [isLoadingGlobalPrograms, setIsLoadingGlobalPrograms] = useState(false);
    const [isSavingGlobalPrograms, setIsSavingGlobalPrograms] = useState(false);
    const [globalProgramsSaveStatus, setGlobalProgramsSaveStatus] = useState<"idle" | "success" | "error">("idle");
    const [uploadingProgramIndex, setUploadingProgramIndex] = useState<number | null>(null);
    const globalProgramFileInputRef = useRef<HTMLInputElement>(null);

    // Fetch Global Programs content on mount
    useEffect(() => {
        setIsLoadingGlobalPrograms(true);
        getGlobalProgramsContent()
            .then(setGlobalProgramsContent)
            .finally(() => setIsLoadingGlobalPrograms(false));
    }, []);

    // Student Experiences CMS State
    const [studentExperiencesContent, setStudentExperiencesContent] = useState<StudentExperiencesContent>(defaultStudentExperiencesContent);
    const [isLoadingStudentExperiences, setIsLoadingStudentExperiences] = useState(false);
    const [isSavingStudentExperiences, setIsSavingStudentExperiences] = useState(false);
    const [studentExperiencesSaveStatus, setStudentExperiencesSaveStatus] = useState<"idle" | "success" | "error">("idle");
    const [uploadingTestimonialIndex, setUploadingTestimonialIndex] = useState<number | null>(null);
    const testimonialFileInputRef = useRef<HTMLInputElement>(null);

    // Fetch Student Experiences content on mount
    useEffect(() => {
        setIsLoadingStudentExperiences(true);
        getStudentExperiencesContent()
            .then(setStudentExperiencesContent)
            .finally(() => setIsLoadingStudentExperiences(false));
    }, []);

    // About Redwood CMS State
    const [aboutRedwoodContent, setAboutRedwoodContent] = useState<AboutRedwoodContent>(defaultAboutRedwoodContent);
    const [isLoadingAboutRedwood, setIsLoadingAboutRedwood] = useState(false);
    const [isSavingAboutRedwood, setIsSavingAboutRedwood] = useState(false);
    const [aboutRedwoodSaveStatus, setAboutRedwoodSaveStatus] = useState<"idle" | "success" | "error">("idle");
    const [uploadingAboutCardType, setUploadingAboutCardType] = useState<"mission" | "vision" | null>(null);
    const aboutFileInputRef = useRef<HTMLInputElement>(null);

    // Fetch About Redwood content on mount
    useEffect(() => {
        setIsLoadingAboutRedwood(true);
        getAboutRedwoodContent()
            .then(setAboutRedwoodContent)
            .finally(() => setIsLoadingAboutRedwood(false));
    }, []);

    // Contact & Social CMS State
    const [contactContent, setContactContent] = useState<ContactContent>(defaultContactContent);
    const [isLoadingContact, setIsLoadingContact] = useState(false);
    const [isSavingContact, setIsSavingContact] = useState(false);
    const [contactSaveStatus, setContactSaveStatus] = useState<"idle" | "success" | "error">("idle");

    // Fetch Contact content on mount
    useEffect(() => {
        setIsLoadingContact(true);
        getContactContent()
            .then(setContactContent)
            .finally(() => setIsLoadingContact(false));
    }, []);

    // Where Can You Go CMS State
    const [whereCanYouGoContent, setWhereCanYouGoContent] = useState<WhereCanYouGoContent>(defaultWhereCanYouGoContent);
    const [isLoadingWhereCanYouGo, setIsLoadingWhereCanYouGo] = useState(false);
    const [isSavingWhereCanYouGo, setIsSavingWhereCanYouGo] = useState(false);
    const [whereCanYouGoSaveStatus, setWhereCanYouGoSaveStatus] = useState<"idle" | "success" | "error">("idle");

    // Fetch Where Can You Go content on mount
    useEffect(() => {
        setIsLoadingWhereCanYouGo(true);
        getWhereCanYouGoContent()
            .then(setWhereCanYouGoContent)
            .finally(() => setIsLoadingWhereCanYouGo(false));
    }, []);

    const handleHeroSave = async () => {
        setIsSavingHero(true);
        setHeroSaveStatus("idle");
        const success = await updateHeroContent(heroContent);
        setIsSavingHero(false);
        setHeroSaveStatus(success ? "success" : "error");
        setTimeout(() => setHeroSaveStatus("idle"), 3000);
    };

    const handleResetHero = () => {
        setHeroContent(defaultHeroContent);
    };

    const updateHeaderLine = (index: number, value: string) => {
        const newLines = [...heroContent.headerLines];
        newLines[index] = value;
        setHeroContent({ ...heroContent, headerLines: newLines });
    };

    const updateTypingWord = (index: number, value: string) => {
        const newWords = [...heroContent.typingWords];
        newWords[index] = value;
        setHeroContent({ ...heroContent, typingWords: newWords });
    };

    const addTypingWord = () => {
        setHeroContent({
            ...heroContent,
            typingWords: [...heroContent.typingWords, "new word"],
        });
    };

    const removeTypingWord = (index: number) => {
        if (heroContent.typingWords.length > 1) {
            const newWords = heroContent.typingWords.filter((_, i) => i !== index);
            setHeroContent({ ...heroContent, typingWords: newWords });
        }
    };

    const handleApproachSave = async () => {
        setIsSavingApproach(true);
        setApproachSaveStatus("idle");
        const success = await updateApproachContent(approachContent);
        setIsSavingApproach(false);
        setApproachSaveStatus(success ? "success" : "error");
        setTimeout(() => setApproachSaveStatus("idle"), 3000);
    };

    const handleResetApproach = () => {
        setApproachContent(defaultApproachContent);
    };

    // Image Upload Handler
    const handleImageUpload = async (file: File, cardIndex: number) => {
        try {
            setUploadingCardIndex(cardIndex);

            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Upload failed");
            }

            // Update the card's image URL
            const newCards = [...approachContent.cards];
            newCards[cardIndex] = { ...newCards[cardIndex], src: data.url };
            setApproachContent({ ...approachContent, cards: newCards });

        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image. Please try again.");
        } finally {
            setUploadingCardIndex(null);
        }
    };

    const triggerImageUpload = (index: number) => {
        setUploadingCardIndex(index);
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && uploadingCardIndex !== null) {
            handleImageUpload(e.target.files[0], uploadingCardIndex);
        }
        // Reset input value to allow selecting same file again
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const updateApproachCard = (index: number, field: keyof ApproachCard, value: string) => {
        const newCards = [...approachContent.cards];
        newCards[index] = { ...newCards[index], [field]: value };
        setApproachContent({ ...approachContent, cards: newCards });
    };

    // Approach Section Editor Component
    const renderApproachEditor = () => (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 pb-6 bg-gray-50 border-t border-gray-100"
        >
            {isLoadingApproach ? (
                <div className="py-8 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
                    <span className="ml-2 text-brand-gray font-poppins">Loading content...</span>
                </div>
            ) : (
                <div className="pt-6 space-y-8">
                    {/* Main Section Content */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">
                                Section Title
                            </label>
                            <input
                                type="text"
                                value={approachContent.sectionTitle}
                                onChange={(e) => setApproachContent({ ...approachContent, sectionTitle: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">
                                Section Subtitle
                            </label>
                            <textarea
                                rows={3}
                                value={approachContent.sectionSubtitle}
                                onChange={(e) => setApproachContent({ ...approachContent, sectionSubtitle: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                            />
                        </div>
                    </div>

                    <div className="border-t border-gray-200" />

                    {/* Hidden File Input for Image Upload */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />

                    {/* Cards Editor */}
                    <div className="space-y-6">
                        <h3 className="font-montserrat font-bold text-brand-blue text-lg">Approach Cards</h3>

                        {approachContent.cards.map((card, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-50">
                                    <div className="w-8 h-8 rounded-full bg-brand-blue/10 text-brand-blue font-bold flex items-center justify-center text-sm">
                                        {index + 1}
                                    </div>
                                    <h4 className="font-poppins font-semibold text-brand-blue">{card.title}</h4>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">
                                                Card Title
                                            </label>
                                            <input
                                                type="text"
                                                value={card.title}
                                                onChange={(e) => updateApproachCard(index, "title", e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">
                                                Subtitle
                                            </label>
                                            <input
                                                type="text"
                                                value={card.subtitle}
                                                onChange={(e) => updateApproachCard(index, "subtitle", e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                rows={4}
                                                value={card.description}
                                                onChange={(e) => updateApproachCard(index, "description", e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">
                                                Card Image
                                            </label>
                                            <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group">
                                                {card.src ? (
                                                    <Image
                                                        src={card.src}
                                                        alt={card.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full">
                                                        <ImageIcon className="w-8 h-8 text-gray-300" />
                                                    </div>
                                                )}

                                                {/* Upload Overlay */}
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button
                                                        onClick={() => triggerImageUpload(index)}
                                                        className="flex items-center gap-2 bg-white text-brand-blue px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
                                                    >
                                                        {uploadingCardIndex === index ? (
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <Upload className="w-4 h-4" />
                                                        )}
                                                        {uploadingCardIndex === index ? "Uploading..." : "Change Image"}
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Hover to change image. Supported: JPG, PNG, WEBP
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">
                                                Statistic Badge
                                            </label>
                                            <input
                                                type="text"
                                                value={card.stat}
                                                onChange={(e) => updateApproachCard(index, "stat", e.target.value)}
                                                placeholder="e.g. 50+ Global Partners"
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <button
                            onClick={handleResetApproach}
                            className="flex items-center gap-2 px-4 py-2 text-brand-gray font-poppins font-medium hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reset to Default
                        </button>
                        <div className="flex items-center gap-3">
                            {approachSaveStatus === "success" && (
                                <span className="flex items-center gap-1 text-green-600 font-poppins text-sm">
                                    <Check className="w-4 h-4" />
                                    Saved!
                                </span>
                            )}
                            {approachSaveStatus === "error" && (
                                <span className="flex items-center gap-1 text-red-500 font-poppins text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    Error saving
                                </span>
                            )}
                            <button
                                onClick={() => setExpandedSection(null)}
                                className="px-4 py-2 text-brand-gray font-poppins font-medium hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApproachSave}
                                disabled={isSavingApproach}
                                className={cn(
                                    "flex items-center gap-2 px-5 py-2 bg-brand-blue text-white font-poppins font-medium rounded-lg shadow-md transition-all",
                                    isSavingApproach ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-blue/90"
                                )}
                            >
                                {isSavingApproach ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                {isSavingApproach ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );

    // Global Programs Handlers
    const handleGlobalProgramsSave = async () => {
        setIsSavingGlobalPrograms(true);
        setGlobalProgramsSaveStatus("idle");
        const success = await updateGlobalProgramsContent(globalProgramsContent);
        setIsSavingGlobalPrograms(false);
        setGlobalProgramsSaveStatus(success ? "success" : "error");
        setTimeout(() => setGlobalProgramsSaveStatus("idle"), 3000);
    };

    const handleResetGlobalPrograms = () => {
        setGlobalProgramsContent(defaultGlobalProgramsContent);
    };

    const handleGlobalProgramImageUpload = async (file: File, programIndex: number) => {
        try {
            setUploadingProgramIndex(programIndex);

            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Upload failed");
            }

            const newPrograms = [...globalProgramsContent.programs];
            newPrograms[programIndex] = { ...newPrograms[programIndex], image: data.url };
            setGlobalProgramsContent({ ...globalProgramsContent, programs: newPrograms });

        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image. Please try again.");
        } finally {
            setUploadingProgramIndex(null);
        }
    };

    const triggerGlobalProgramImageUpload = (index: number) => {
        setUploadingProgramIndex(index);
        if (globalProgramFileInputRef.current) {
            globalProgramFileInputRef.current.click();
        }
    };

    const handleGlobalProgramFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && uploadingProgramIndex !== null) {
            handleGlobalProgramImageUpload(e.target.files[0], uploadingProgramIndex);
        }
        if (globalProgramFileInputRef.current) {
            globalProgramFileInputRef.current.value = "";
        }
    };

    const updateGlobalProgram = (index: number, field: keyof GlobalProgram, value: string) => {
        const newPrograms = [...globalProgramsContent.programs];
        newPrograms[index] = { ...newPrograms[index], [field]: value };
        setGlobalProgramsContent({ ...globalProgramsContent, programs: newPrograms });
    };

    const addGlobalProgram = () => {
        if (globalProgramsContent.programs.length >= 8) return;

        const newProgram: GlobalProgram = {
            id: `program-${Date.now()}`,
            country: "New Country",
            title: "New Program Title",
            description: "Program description...",
            image: "",
            flag: "th"
        };

        setGlobalProgramsContent({
            ...globalProgramsContent,
            programs: [...globalProgramsContent.programs, newProgram]
        });
    };

    const removeGlobalProgram = (index: number) => {
        const newPrograms = globalProgramsContent.programs.filter((_, i) => i !== index);
        setGlobalProgramsContent({ ...globalProgramsContent, programs: newPrograms });
    };

    const renderGlobalProgramsEditor = () => (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 pb-6 bg-gray-50 border-t border-gray-100"
        >
            {isLoadingGlobalPrograms ? (
                <div className="py-8 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
                    <span className="ml-2 text-brand-gray font-poppins">Loading content...</span>
                </div>
            ) : (
                <div className="pt-6 space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">
                                Header Title
                            </label>
                            <input
                                type="text"
                                value={globalProgramsContent.sectionTitle}
                                onChange={(e) => setGlobalProgramsContent({ ...globalProgramsContent, sectionTitle: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">
                                Description
                            </label>
                            <textarea
                                rows={3}
                                value={globalProgramsContent.sectionDescription}
                                onChange={(e) => setGlobalProgramsContent({ ...globalProgramsContent, sectionDescription: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                            />
                        </div>
                    </div>

                    <div className="border-t border-gray-200" />

                    <input
                        type="file"
                        ref={globalProgramFileInputRef}
                        onChange={handleGlobalProgramFileChange}
                        accept="image/*"
                        className="hidden"
                    />

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-montserrat font-bold text-brand-blue text-lg">
                                Programs ({globalProgramsContent.programs.length}/8)
                            </h3>
                            {globalProgramsContent.programs.length < 8 && (
                                <button
                                    onClick={addGlobalProgram}
                                    className="flex items-center gap-2 text-brand-blue hover:bg-brand-blue/10 px-3 py-1.5 rounded-lg transition-colors font-medium text-sm"
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    Add Country
                                </button>
                            )}
                        </div>

                        {globalProgramsContent.programs.map((program, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative group">
                                <button
                                    onClick={() => removeGlobalProgram(index)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                                    title="Remove Program"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-50">
                                    <div className="w-8 h-8 rounded-full bg-brand-blue/10 text-brand-blue font-bold flex items-center justify-center text-sm">
                                        {index + 1}
                                    </div>
                                    <h4 className="font-poppins font-semibold text-brand-blue">{program.country || "New Program"}</h4>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">
                                                Country Name
                                            </label>
                                            <input
                                                type="text"
                                                value={program.country}
                                                onChange={(e) => updateGlobalProgram(index, "country", e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                value={program.title}
                                                onChange={(e) => updateGlobalProgram(index, "title", e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">
                                                Flag Code (ISO 2-letter)
                                            </label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    maxLength={2}
                                                    value={program.flag}
                                                    onChange={(e) => updateGlobalProgram(index, "flag", e.target.value.toLowerCase())}
                                                    placeholder="e.g. us, th, jp"
                                                    className="w-20 px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue uppercase"
                                                />
                                                <div className="flex items-center gap-2 flex-1">
                                                    {program.flag && (
                                                        <img
                                                            src={`https://flagcdn.com/${program.flag}.svg`}
                                                            alt="Preview"
                                                            className="w-6 h-4 object-cover rounded shadow-sm border border-gray-200"
                                                            onError={(e) => (e.currentTarget.style.display = 'none')}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                rows={4}
                                                value={program.description}
                                                onChange={(e) => updateGlobalProgram(index, "description", e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-poppins text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">
                                                Country Image
                                            </label>
                                            <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group">
                                                {program.image ? (
                                                    <Image
                                                        src={program.image}
                                                        alt={program.country}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full">
                                                        <ImageIcon className="w-8 h-8 text-gray-300" />
                                                    </div>
                                                )}

                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button
                                                        onClick={() => triggerGlobalProgramImageUpload(index)}
                                                        className="flex items-center gap-2 bg-white text-brand-blue px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
                                                    >
                                                        {uploadingProgramIndex === index ? (
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <Upload className="w-4 h-4" />
                                                        )}
                                                        {uploadingProgramIndex === index ? "Uploading..." : "Change Image"}
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Hover to upload (JPG, PNG, WEBP)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <button
                            onClick={handleResetGlobalPrograms}
                            className="flex items-center gap-2 px-4 py-2 text-brand-gray font-poppins font-medium hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reset to Default
                        </button>
                        <div className="flex items-center gap-3">
                            {globalProgramsSaveStatus === "success" && (
                                <span className="flex items-center gap-1 text-green-600 font-poppins text-sm">
                                    <Check className="w-4 h-4" />
                                    Saved!
                                </span>
                            )}
                            {globalProgramsSaveStatus === "error" && (
                                <span className="flex items-center gap-1 text-red-500 font-poppins text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    Error saving
                                </span>
                            )}
                            <button
                                onClick={() => setExpandedSection(null)}
                                className="px-4 py-2 text-brand-gray font-poppins font-medium hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleGlobalProgramsSave}
                                disabled={isSavingGlobalPrograms}
                                className={cn(
                                    "flex items-center gap-2 px-5 py-2 bg-brand-blue text-white font-poppins font-medium rounded-lg shadow-md transition-all",
                                    isSavingGlobalPrograms ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-blue/90"
                                )}
                            >
                                {isSavingGlobalPrograms ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                {isSavingGlobalPrograms ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );

    // Student Experiences Handlers
    const handleStudentExperiencesSave = async () => {
        setIsSavingStudentExperiences(true);
        setStudentExperiencesSaveStatus("idle");
        const success = await updateStudentExperiencesContent(studentExperiencesContent);
        setIsSavingStudentExperiences(false);
        setStudentExperiencesSaveStatus(success ? "success" : "error");
        setTimeout(() => setStudentExperiencesSaveStatus("idle"), 3000);
    };

    const handleResetStudentExperiences = () => {
        setStudentExperiencesContent(defaultStudentExperiencesContent);
    };

    const handleTestimonialImageUpload = async (file: File, index: number) => {
        try {
            setUploadingTestimonialIndex(index);
            const formData = new FormData();
            formData.append("file", file);
            const response = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Upload failed");

            const newTestimonials = [...studentExperiencesContent.testimonials];
            newTestimonials[index] = { ...newTestimonials[index], image: data.url };
            setStudentExperiencesContent({ ...studentExperiencesContent, testimonials: newTestimonials });
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image.");
        } finally {
            setUploadingTestimonialIndex(null);
        }
    };

    const triggerTestimonialImageUpload = (index: number) => {
        setUploadingTestimonialIndex(index);
        if (testimonialFileInputRef.current) testimonialFileInputRef.current.click();
    };

    const handleTestimonialFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && uploadingTestimonialIndex !== null) {
            handleTestimonialImageUpload(e.target.files[0], uploadingTestimonialIndex);
        }
        if (testimonialFileInputRef.current) testimonialFileInputRef.current.value = "";
    };

    const updateTestimonial = (index: number, field: keyof Testimonial, value: string) => {
        const newTestimonials = [...studentExperiencesContent.testimonials];
        newTestimonials[index] = { ...newTestimonials[index], [field]: value };
        setStudentExperiencesContent({ ...studentExperiencesContent, testimonials: newTestimonials });
    };

    const addTestimonial = () => {
        const newTestimonial: Testimonial = {
            id: `testimonial-${Date.now()}`,
            text: "New testimonial...",
            image: "",
            name: "New Student",
            role: "Student, Program",
            country: "",
            flag: ""
        };
        setStudentExperiencesContent({
            ...studentExperiencesContent,
            testimonials: [...studentExperiencesContent.testimonials, newTestimonial]
        });
    };

    const removeTestimonial = (index: number) => {
        const newTestimonials = studentExperiencesContent.testimonials.filter((_, i) => i !== index);
        setStudentExperiencesContent({ ...studentExperiencesContent, testimonials: newTestimonials });
    };

    const renderStudentExperiencesEditor = () => (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 pb-6 bg-gray-50 border-t border-gray-100"
        >
            {isLoadingStudentExperiences ? (
                <div className="py-8 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
                    <span className="ml-2 text-brand-gray font-poppins">Loading content...</span>
                </div>
            ) : (
                <div className="pt-6 space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Tagline</label>
                            <input
                                type="text"
                                value={studentExperiencesContent.sectionTagline}
                                onChange={(e) => setStudentExperiencesContent({ ...studentExperiencesContent, sectionTagline: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Title</label>
                            <input
                                type="text"
                                value={studentExperiencesContent.sectionTitle}
                                onChange={(e) => setStudentExperiencesContent({ ...studentExperiencesContent, sectionTitle: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Description</label>
                            <textarea
                                rows={2}
                                value={studentExperiencesContent.sectionDescription}
                                onChange={(e) => setStudentExperiencesContent({ ...studentExperiencesContent, sectionDescription: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                            />
                        </div>
                    </div>

                    <div className="border-t border-gray-200" />

                    <input type="file" ref={testimonialFileInputRef} onChange={handleTestimonialFileChange} accept="image/*" className="hidden" />

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-montserrat font-bold text-brand-blue text-lg">Testimonials</h3>
                            <button onClick={addTestimonial} className="flex items-center gap-2 text-brand-blue hover:bg-brand-blue/10 px-3 py-1.5 rounded-lg transition-colors font-medium text-sm">
                                <PlusCircle className="w-4 h-4" /> Add
                            </button>
                        </div>

                        {studentExperiencesContent.testimonials.map((t, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative group">
                                <button onClick={() => removeTestimonial(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="flex items-start gap-6">
                                    <div className="w-24 flex-shrink-0 space-y-2">
                                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-50 group-upload">
                                            {t.image ? (
                                                <Image src={t.image} alt={t.name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-brand-blue/30 font-bold text-xl">
                                                    {(t.name || "??").substring(0, 2).toUpperCase()}
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-upload-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => triggerTestimonialImageUpload(index)}>
                                                <Upload className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <button onClick={() => triggerTestimonialImageUpload(index)} className="w-full text-xs text-brand-blue hover:underline">
                                            {uploadingTestimonialIndex === index ? "Uploading..." : "Change"}
                                        </button>
                                    </div>
                                    <div className="flex-1 grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Name</label>
                                            <input type="text" value={t.name} onChange={(e) => updateTestimonial(index, "name", e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Role / Program</label>
                                            <input type="text" value={t.role} onChange={(e) => updateTestimonial(index, "role", e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Testimonial</label>
                                            <textarea rows={3} value={t.text} onChange={(e) => updateTestimonial(index, "text", e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <button onClick={handleResetStudentExperiences} className="flex items-center gap-2 px-4 py-2 text-brand-gray font-poppins font-medium hover:bg-gray-200 rounded-lg transition-colors">
                            <RotateCcw className="w-4 h-4" /> Reset
                        </button>
                        <div className="flex items-center gap-3">
                            {studentExperiencesSaveStatus === "success" && <span className="text-green-600 text-sm flex items-center gap-1"><Check className="w-4 h-4" /> Saved!</span>}
                            <button onClick={() => setExpandedSection(null)} className="px-4 py-2 text-brand-gray font-poppins font-medium hover:bg-gray-200 rounded-lg">Cancel</button>
                            <button onClick={handleStudentExperiencesSave} disabled={isSavingStudentExperiences} className={cn("flex items-center gap-2 px-5 py-2 bg-brand-blue text-white font-poppins font-medium rounded-lg shadow-md transition-all", isSavingStudentExperiences ? "opacity-70" : "hover:bg-brand-blue/90")}>
                                {isSavingStudentExperiences ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {isSavingStudentExperiences ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );

    // About Redwood Handlers
    const handleAboutRedwoodSave = async () => {
        setIsSavingAboutRedwood(true);
        setAboutRedwoodSaveStatus("idle");
        const success = await updateAboutRedwoodContent(aboutRedwoodContent);
        setIsSavingAboutRedwood(false);
        setAboutRedwoodSaveStatus(success ? "success" : "error");
        setTimeout(() => setAboutRedwoodSaveStatus("idle"), 3000);
    };

    const handleResetAboutRedwood = () => {
        setAboutRedwoodContent(defaultAboutRedwoodContent);
    };

    const handleAboutImageUpload = async (file: File, type: "mission" | "vision") => {
        try {
            setUploadingAboutCardType(type);
            const formData = new FormData();
            formData.append("file", file);
            const response = await fetch("/api/upload", { method: "POST", body: formData });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Upload failed");

            setAboutRedwoodContent({
                ...aboutRedwoodContent,
                [type]: { ...aboutRedwoodContent[type], image: data.url }
            });
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image.");
        } finally {
            setUploadingAboutCardType(null);
        }
    };

    const triggerAboutImageUpload = (type: "mission" | "vision") => {
        setUploadingAboutCardType(type);
        if (aboutFileInputRef.current) aboutFileInputRef.current.click();
    };

    const handleAboutFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && uploadingAboutCardType) {
            handleAboutImageUpload(e.target.files[0], uploadingAboutCardType);
        }
        if (aboutFileInputRef.current) aboutFileInputRef.current.value = "";
    };

    const renderAboutRedwoodEditor = () => (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 pb-6 bg-gray-50 border-t border-gray-100"
        >
            {isLoadingAboutRedwood ? (
                <div className="py-8 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
                    <span className="ml-2 text-brand-gray font-poppins">Loading content...</span>
                </div>
            ) : (
                <div className="pt-6 space-y-8">
                    {/* Header Section */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Tagline</label>
                            <input
                                type="text"
                                value={aboutRedwoodContent.tagline}
                                onChange={(e) => setAboutRedwoodContent({ ...aboutRedwoodContent, tagline: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Title</label>
                            <input
                                type="text"
                                value={aboutRedwoodContent.title}
                                onChange={(e) => setAboutRedwoodContent({ ...aboutRedwoodContent, title: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Description</label>
                            <textarea
                                rows={2}
                                value={aboutRedwoodContent.description}
                                onChange={(e) => setAboutRedwoodContent({ ...aboutRedwoodContent, description: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                            />
                        </div>
                    </div>

                    <div className="border-t border-gray-200" />

                    <input type="file" ref={aboutFileInputRef} onChange={handleAboutFileChange} accept="image/*" className="hidden" />

                    {/* Mission & Vision Cards */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Mission Card Editor */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                            <h3 className="font-montserrat font-bold text-brand-blue text-lg border-b pb-2">Mission Card</h3>

                            <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group">
                                <Image src={aboutRedwoodContent.mission.image} alt="Mission" fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button onClick={() => triggerAboutImageUpload("mission")} className="flex items-center gap-2 bg-white text-brand-blue px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
                                        {uploadingAboutCardType === "mission" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                        {uploadingAboutCardType === "mission" ? "Uploading..." : "Change Image"}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Title</label>
                                <input type="text" value={aboutRedwoodContent.mission.title} onChange={(e) => setAboutRedwoodContent({ ...aboutRedwoodContent, mission: { ...aboutRedwoodContent.mission, title: e.target.value } })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Description</label>
                                <textarea rows={4} value={aboutRedwoodContent.mission.description} onChange={(e) => setAboutRedwoodContent({ ...aboutRedwoodContent, mission: { ...aboutRedwoodContent.mission, description: e.target.value } })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none" />
                            </div>
                        </div>

                        {/* Vision Card Editor */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                            <h3 className="font-montserrat font-bold text-brand-blue text-lg border-b pb-2">Vision Card</h3>

                            <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group">
                                <Image src={aboutRedwoodContent.vision.image} alt="Vision" fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button onClick={() => triggerAboutImageUpload("vision")} className="flex items-center gap-2 bg-white text-brand-blue px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
                                        {uploadingAboutCardType === "vision" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                        {uploadingAboutCardType === "vision" ? "Uploading..." : "Change Image"}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Title</label>
                                <input type="text" value={aboutRedwoodContent.vision.title} onChange={(e) => setAboutRedwoodContent({ ...aboutRedwoodContent, vision: { ...aboutRedwoodContent.vision, title: e.target.value } })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium font-poppins text-brand-gray mb-1">Description</label>
                                <textarea rows={4} value={aboutRedwoodContent.vision.description} onChange={(e) => setAboutRedwoodContent({ ...aboutRedwoodContent, vision: { ...aboutRedwoodContent.vision, description: e.target.value } })} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <button onClick={handleResetAboutRedwood} className="flex items-center gap-2 px-4 py-2 text-brand-gray font-poppins font-medium hover:bg-gray-200 rounded-lg transition-colors">
                            <RotateCcw className="w-4 h-4" /> Reset
                        </button>
                        <div className="flex items-center gap-3">
                            {aboutRedwoodSaveStatus === "success" && <span className="text-green-600 text-sm flex items-center gap-1"><Check className="w-4 h-4" /> Saved!</span>}
                            <button onClick={() => setExpandedSection(null)} className="px-4 py-2 text-brand-gray font-poppins font-medium hover:bg-gray-200 rounded-lg">Cancel</button>
                            <button onClick={handleAboutRedwoodSave} disabled={isSavingAboutRedwood} className={cn("flex items-center gap-2 px-5 py-2 bg-brand-blue text-white font-poppins font-medium rounded-lg shadow-md transition-all", isSavingAboutRedwood ? "opacity-70" : "hover:bg-brand-blue/90")}>
                                {isSavingAboutRedwood ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {isSavingAboutRedwood ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
    // Contact & Social Handlers
    const handleContactSave = async () => {
        setIsSavingContact(true);
        setContactSaveStatus("idle");
        const success = await updateContactContent(contactContent);
        setIsSavingContact(false);
        setContactSaveStatus(success ? "success" : "error");
        setTimeout(() => setContactSaveStatus("idle"), 3000);
    };

    const handleResetContact = () => {
        setContactContent(defaultContactContent);
    };

    const renderContactEditor = () => (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 pb-6 bg-gray-50 border-t border-gray-100"
        >
            {isLoadingContact ? (
                <div className="py-8 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
                    <span className="ml-2 text-brand-gray font-poppins">Loading content...</span>
                </div>
            ) : (
                <div className="pt-6 space-y-8">
                    {/* Contact Info Section */}
                    <div>
                        <h4 className="text-brand-blue font-bold font-montserrat mb-4">Contact Information</h4>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={contactContent.contactInfo.phone}
                                        onChange={(e) => setContactContent({ ...contactContent, contactInfo: { ...contactContent.contactInfo, phone: e.target.value } })}
                                        className="w-full pl-10 px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={contactContent.contactInfo.email}
                                        onChange={(e) => setContactContent({ ...contactContent, contactInfo: { ...contactContent.contactInfo, email: e.target.value } })}
                                        className="w-full pl-10 px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Office Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                    <textarea
                                        rows={3}
                                        value={contactContent.contactInfo.address}
                                        onChange={(e) => setContactContent({ ...contactContent, contactInfo: { ...contactContent.contactInfo, address: e.target.value } })}
                                        className="w-full pl-10 px-4 py-3 border border-gray-200 rounded-xl font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200" />

                    {/* Social Media Section */}
                    <div>
                        <h4 className="text-brand-blue font-bold font-montserrat mb-4">Social Media Links</h4>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Facebook</label>
                                <input
                                    type="text"
                                    value={contactContent.socialLinks.facebook}
                                    onChange={(e) => setContactContent({ ...contactContent, socialLinks: { ...contactContent.socialLinks, facebook: e.target.value } })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                    placeholder="https://facebook.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Instagram</label>
                                <input
                                    type="text"
                                    value={contactContent.socialLinks.instagram}
                                    onChange={(e) => setContactContent({ ...contactContent, socialLinks: { ...contactContent.socialLinks, instagram: e.target.value } })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                    placeholder="https://instagram.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Twitter / X</label>
                                <input
                                    type="text"
                                    value={contactContent.socialLinks.twitter}
                                    onChange={(e) => setContactContent({ ...contactContent, socialLinks: { ...contactContent.socialLinks, twitter: e.target.value } })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                    placeholder="https://twitter.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">YouTube</label>
                                <input
                                    type="text"
                                    value={contactContent.socialLinks.youtube}
                                    onChange={(e) => setContactContent({ ...contactContent, socialLinks: { ...contactContent.socialLinks, youtube: e.target.value } })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                    placeholder="https://youtube.com/..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <button onClick={handleResetContact} className="flex items-center gap-2 px-4 py-2 text-brand-gray font-poppins font-medium hover:bg-gray-200 rounded-lg transition-colors">
                            <RotateCcw className="w-4 h-4" /> Reset
                        </button>
                        <div className="flex items-center gap-3">
                            {contactSaveStatus === "success" && <span className="text-green-600 text-sm flex items-center gap-1"><Check className="w-4 h-4" /> Saved!</span>}
                            <button onClick={() => setExpandedSection(null)} className="px-4 py-2 text-brand-gray font-poppins font-medium hover:bg-gray-200 rounded-lg">Cancel</button>
                            <button onClick={handleContactSave} disabled={isSavingContact} className={cn("flex items-center gap-2 px-5 py-2 bg-brand-blue text-white font-poppins font-medium rounded-lg shadow-md transition-all", isSavingContact ? "opacity-70" : "hover:bg-brand-blue/90")}>
                                {isSavingContact ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {isSavingContact ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );

    // Where Can You Go Handlers
    const handleWhereCanYouGoSave = async () => {
        setIsSavingWhereCanYouGo(true);
        setWhereCanYouGoSaveStatus("idle");
        const success = await updateWhereCanYouGoContent(whereCanYouGoContent);
        setIsSavingWhereCanYouGo(false);
        setWhereCanYouGoSaveStatus(success ? "success" : "error");
        setTimeout(() => setWhereCanYouGoSaveStatus("idle"), 3000);
    };

    const handleResetWhereCanYouGo = () => {
        setWhereCanYouGoContent(defaultWhereCanYouGoContent);
    };

    const renderWhereCanYouGoEditor = () => (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 pb-6 bg-gray-50 border-t border-gray-100"
        >
            {isLoadingWhereCanYouGo ? (
                <div className="py-8 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
                    <span className="ml-2 text-brand-gray font-poppins">Loading content...</span>
                </div>
            ) : (
                <div className="pt-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Title</label>
                        <input
                            type="text"
                            value={whereCanYouGoContent.title}
                            onChange={(e) => setWhereCanYouGoContent({ ...whereCanYouGoContent, title: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">Description</label>
                        <textarea
                            rows={3}
                            value={whereCanYouGoContent.description}
                            onChange={(e) => setWhereCanYouGoContent({ ...whereCanYouGoContent, description: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                        />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <button onClick={handleResetWhereCanYouGo} className="flex items-center gap-2 px-4 py-2 text-brand-gray font-poppins font-medium hover:bg-gray-200 rounded-lg transition-colors">
                            <RotateCcw className="w-4 h-4" /> Reset
                        </button>
                        <div className="flex items-center gap-3">
                            {whereCanYouGoSaveStatus === "success" && <span className="text-green-600 text-sm flex items-center gap-1"><Check className="w-4 h-4" /> Saved!</span>}
                            <button onClick={() => setExpandedSection(null)} className="px-4 py-2 text-brand-gray font-poppins font-medium hover:bg-gray-200 rounded-lg">Cancel</button>
                            <button onClick={handleWhereCanYouGoSave} disabled={isSavingWhereCanYouGo} className={cn("flex items-center gap-2 px-5 py-2 bg-brand-blue text-white font-poppins font-medium rounded-lg shadow-md transition-all", isSavingWhereCanYouGo ? "opacity-70" : "hover:bg-brand-blue/90")}>
                                {isSavingWhereCanYouGo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {isSavingWhereCanYouGo ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );

    // Hero Section Editor Component
    const renderHeroEditor = () => (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 pb-6 bg-gray-50 border-t border-gray-100"
        >
            {isLoadingHero ? (
                <div className="py-8 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
                    <span className="ml-2 text-brand-gray font-poppins">Loading content...</span>
                </div>
            ) : (
                <div className="pt-6 space-y-6">
                    {/* Tagline */}
                    <div>
                        <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">
                            Tagline (Above Header)
                        </label>
                        <input
                            type="text"
                            value={heroContent.tagline}
                            onChange={(e) => setHeroContent({ ...heroContent, tagline: e.target.value })}
                            placeholder="Where Students Become Global Citizens"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                        />
                    </div>

                    {/* Header Lines */}
                    <div>
                        <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">
                            Main Header (3 Lines)
                        </label>
                        <div className="space-y-2">
                            {heroContent.headerLines.map((line, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold flex items-center justify-center">
                                        {index + 1}
                                    </span>
                                    <input
                                        type="text"
                                        value={line}
                                        onChange={(e) => updateHeaderLine(index, e.target.value)}
                                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg font-montserrat font-bold uppercase focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Paragraph Text */}
                    <div>
                        <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">
                            Paragraph Text (Before Typing Animation)
                        </label>
                        <textarea
                            rows={2}
                            value={heroContent.paragraphText}
                            onChange={(e) => setHeroContent({ ...heroContent, paragraphText: e.target.value })}
                            placeholder="Redwood Learning creates immersive global exchange programs where students grow through"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                        />
                    </div>

                    {/* Typing Animation Words */}
                    <div>
                        <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">
                            Typing Animation Words
                        </label>
                        <div className="space-y-2">
                            {heroContent.typingWords.map((word, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={word}
                                        onChange={(e) => updateTypingWord(index, e.target.value)}
                                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                    />
                                    <button
                                        onClick={() => removeTypingWord(index)}
                                        disabled={heroContent.typingWords.length <= 1}
                                        className="p-2 hover:bg-red-50 rounded-lg text-brand-gray hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={addTypingWord}
                                className="flex items-center gap-2 px-4 py-2 text-brand-blue font-poppins font-medium hover:bg-brand-blue/5 rounded-lg transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add Word
                            </button>
                        </div>
                    </div>

                    {/* Flags Tagline */}
                    <div>
                        <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">
                            Tagline Above Flags
                        </label>
                        <input
                            type="text"
                            value={heroContent.flagsTagline}
                            onChange={(e) => setHeroContent({ ...heroContent, flagsTagline: e.target.value })}
                            placeholder="Trusted by Students and Institutions globally"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <button
                            onClick={handleResetHero}
                            className="flex items-center gap-2 px-4 py-2 text-brand-gray font-poppins font-medium hover:bg-gray-200 rounded-lg transition-colors"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Reset to Default
                        </button>
                        <div className="flex items-center gap-3">
                            {heroSaveStatus === "success" && (
                                <span className="flex items-center gap-1 text-green-600 font-poppins text-sm">
                                    <Check className="w-4 h-4" />
                                    Saved!
                                </span>
                            )}
                            {heroSaveStatus === "error" && (
                                <span className="flex items-center gap-1 text-red-500 font-poppins text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    Error saving
                                </span>
                            )}
                            <button
                                onClick={() => setExpandedSection(null)}
                                className="px-4 py-2 text-brand-gray font-poppins font-medium hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleHeroSave}
                                disabled={isSavingHero}
                                className={cn(
                                    "flex items-center gap-2 px-5 py-2 bg-brand-blue text-white font-poppins font-medium rounded-lg shadow-md transition-all",
                                    isSavingHero ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-blue/90"
                                )}
                            >
                                {isSavingHero ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                {isSavingHero ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );

    // Generic Editor for other sections (placeholder)
    const renderGenericEditor = (section: ContentSection) => (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 pb-6 bg-gray-50 border-t border-gray-100"
        >
            <div className="pt-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">
                        Section Title
                    </label>
                    <input
                        type="text"
                        defaultValue={section.title}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium font-poppins text-brand-gray mb-2">
                        Content
                    </label>
                    <textarea
                        rows={4}
                        placeholder="Enter section content..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl font-poppins resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                    />
                </div>
                <div className="flex justify-end gap-3">
                    <button className="px-4 py-2 text-brand-gray font-poppins font-medium hover:bg-gray-200 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2 bg-brand-blue text-white font-poppins font-medium rounded-lg shadow-md hover:bg-brand-blue/90 transition-all">
                        <Save className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold font-montserrat text-brand-blue">
                        Content Management
                    </h1>
                    <p className="text-brand-gray font-poppins mt-1">
                        Manage and edit your website content and sections
                    </p>
                </div>
            </motion.div>

            {/* Content Sections List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            >
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold font-montserrat text-brand-blue">
                        Website Sections
                    </h2>
                    <p className="text-sm text-brand-gray font-poppins mt-1">
                        Click on a section to expand and edit its content
                    </p>
                </div>

                <div className="divide-y divide-gray-100">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="group"
                        >
                            <div
                                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                                className="flex items-center gap-4 p-5 hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <GripVertical className="w-5 h-5 text-gray-300 group-hover:text-gray-400 cursor-grab" />

                                <div className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center",
                                    section.type === "hero" ? "bg-purple-100 text-purple-600" :
                                        section.type === "banner" ? "bg-pink-100 text-pink-600" :
                                            "bg-blue-100 text-blue-600"
                                )}>
                                    {section.type === "hero" ? <ImageIcon className="w-5 h-5" /> : <Type className="w-5 h-5" />}
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-poppins font-semibold text-brand-blue">
                                        {section.title}
                                    </h3>
                                </div>

                                <div>
                                    {expandedSection === section.id ? (
                                        <ChevronUp className="w-5 h-5 text-brand-gray" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-brand-gray" />
                                    )}
                                </div>
                            </div>

                            {/* Expanded Content Editor */}
                            {expandedSection === section.id && (
                                section.id === "hero"
                                    ? renderHeroEditor()
                                    : section.id === "approach"
                                        ? renderApproachEditor()
                                        : section.id === "global-programs"
                                            ? renderGlobalProgramsEditor()
                                            : section.id === "where-can-you-go"
                                                ? renderWhereCanYouGoEditor()
                                                : section.id === "student-experiences"
                                                    ? renderStudentExperiencesEditor()
                                                    : section.id === "about-redwood"
                                                        ? renderAboutRedwoodEditor()
                                                        : section.id === "contact-social"
                                                            ? renderContactEditor()
                                                            : renderGenericEditor(section)
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
