"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Save, Loader2, Check, AlertCircle, PlusCircle, X, Trash2,
    Globe, MapPin, Flag, ChevronDown, ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
    MasterCountry, GlobeProgram,
    getMasterCountries, saveMasterCountry, deleteMasterCountry,
    defaultMasterCountries, seedMasterCountries
} from "@/lib/masterCountries";

// ─── Empty templates ─────────────────────────────────────────────────────────

const emptyProgram: GlobeProgram = { name: "", description: "", duration: "", slug: "" };

const emptyCountry: MasterCountry = {
    slug: "", name: "", flagCode: "", city: "",
    lat: 0, lng: 0,
    heroGlobePrograms: [{ ...emptyProgram }],
    lowerGlobeDescription: "",
    lowerGlobeDuration: "2 - 6 Weeks",
};

// ─── Page Component ──────────────────────────────────────────────────────────

export default function MasterCountriesPage() {
    const [countries, setCountries] = useState<MasterCountry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingSlug, setEditingSlug] = useState<string | null>(null);
    const [form, setForm] = useState<MasterCountry>({ ...emptyCountry });
    const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Fetch countries on mount (seed defaults if Firestore is empty)
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            await seedMasterCountries();
            const data = await getMasterCountries();
            setCountries(data);
            setIsLoading(false);
        })();
    }, []);

    // ── Handlers ─────────────────────────────────────────────────────────────

    const openAddForm = () => {
        setEditingSlug(null);
        setForm({ ...emptyCountry, heroGlobePrograms: [{ ...emptyProgram }] });
        setExpandedCountry("__new__");
    };

    const openEditForm = (country: MasterCountry) => {
        setEditingSlug(country.slug);
        setForm(JSON.parse(JSON.stringify(country)));
        setExpandedCountry(country.slug);
    };

    const cancelForm = () => {
        setExpandedCountry(null);
        setEditingSlug(null);
    };

    const handleSave = async () => {
        if (!form.slug || !form.name) {
            toast.error("Country name and slug are required.");
            return;
        }
        setIsSaving(true);
        const tid = toast.loading(editingSlug ? "Updating country..." : "Adding country...");
        const ok = await saveMasterCountry(form);
        toast.dismiss(tid);
        if (ok) {
            toast.success(editingSlug ? "Country updated!" : "Country added!");
            const data = await getMasterCountries();
            setCountries(data);
            cancelForm();
        } else {
            toast.error("Failed to save. Try again.");
        }
        setIsSaving(false);
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("Delete this country from the master list? This cannot be undone.")) return;
        const tid = toast.loading("Deleting...");
        const ok = await deleteMasterCountry(slug);
        toast.dismiss(tid);
        if (ok) {
            toast.success("Country deleted.");
            setCountries(prev => prev.filter(c => c.slug !== slug));
            if (expandedCountry === slug) cancelForm();
        } else {
            toast.error("Delete failed.");
        }
    };

    // ── Form field helpers ───────────────────────────────────────────────────

    const updateField = (field: keyof MasterCountry, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const updateProgram = (idx: number, field: keyof GlobeProgram, value: string) => {
        setForm(prev => {
            const progs = [...prev.heroGlobePrograms];
            progs[idx] = { ...progs[idx], [field]: value };
            return { ...prev, heroGlobePrograms: progs };
        });
    };

    const addProgram = () => {
        setForm(prev => ({
            ...prev,
            heroGlobePrograms: [...prev.heroGlobePrograms, { ...emptyProgram }],
        }));
    };

    const removeProgram = (idx: number) => {
        setForm(prev => ({
            ...prev,
            heroGlobePrograms: prev.heroGlobePrograms.filter((_, i) => i !== idx),
        }));
    };

    // ── Auto-generate slug from name ─────────────────────────────────────────

    const handleNameChange = (value: string) => {
        updateField("name", value);
        if (!editingSlug) {
            updateField("slug", value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
        }
    };

    // ── Loading state ────────────────────────────────────────────────────────

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
            </div>
        );
    }

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-blue font-heading">Master Countries</h1>
                    <p className="text-brand-gray text-sm">Centralized country list. Changes here sync across globes, dropdowns, and country pages.</p>
                </div>
                <button
                    onClick={openAddForm}
                    className="flex items-center gap-2 px-5 py-2 bg-brand-blue text-white rounded-lg font-medium shadow-md hover:bg-brand-blue/90 transition-all text-sm"
                >
                    <PlusCircle className="w-4 h-4" /> Add Country
                </button>
            </div>

            {/* ── Add-Country Form (expanded at top) ──────────────────────────── */}
            <AnimatePresence>
                {expandedCountry === "__new__" && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        {renderForm()}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Country List ────────────────────────────────────────────────── */}
            <div className="space-y-3">
                {countries.map(c => (
                    <div key={c.slug} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        {/* Summary Row */}
                        <div
                            className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => expandedCountry === c.slug ? cancelForm() : openEditForm(c)}
                        >
                            <img
                                src={`https://flagcdn.com/${c.flagCode}.svg`}
                                alt={c.name}
                                className="w-8 h-5 object-cover rounded shadow-sm border border-gray-200"
                                onError={(e) => (e.currentTarget.style.display = "none")}
                            />
                            <div className="flex-1 min-w-0">
                                <span className="font-semibold text-brand-blue">{c.name}</span>
                                <span className="text-xs text-brand-gray ml-3">{c.city} — {c.lat.toFixed(2)}, {c.lng.toFixed(2)}</span>
                            </div>
                            <span className="text-xs text-gray-400 font-mono">{c.slug}</span>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(c.slug); }}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                                title="Delete"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            {expandedCountry === c.slug ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                        </div>

                        {/* Edit Form (expanded) */}
                        <AnimatePresence>
                            {expandedCountry === c.slug && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="border-t border-gray-100 overflow-hidden"
                                >
                                    {renderForm()}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {countries.length === 0 && (
                <div className="text-center py-16 text-brand-gray">
                    <Globe className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No countries added yet. Click &quot;Add Country&quot; to begin.</p>
                </div>
            )}
        </div>
    );

    // ── Shared form renderer ─────────────────────────────────────────────────

    function renderForm() {
        return (
            <div className="px-6 py-6 bg-gray-50 space-y-6">
                {/* Section 1: Identity */}
                <div>
                    <h3 className="font-bold text-brand-blue text-sm flex items-center gap-2 mb-4">
                        <Flag className="w-4 h-4" /> Country Identity
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-brand-gray mb-1">Country Name *</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={e => handleNameChange(e.target.value)}
                                placeholder="e.g. Japan"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-brand-gray mb-1">Slug *</label>
                            <input
                                type="text"
                                value={form.slug}
                                onChange={e => updateField("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                                placeholder="japan"
                                disabled={!!editingSlug}
                                className={cn(
                                    "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue font-mono",
                                    editingSlug && "bg-gray-100 cursor-not-allowed"
                                )}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-brand-gray mb-1">Flag Code (ISO 2-letter)</label>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    maxLength={2}
                                    value={form.flagCode}
                                    onChange={e => updateField("flagCode", e.target.value.toLowerCase())}
                                    placeholder="jp"
                                    className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue uppercase"
                                />
                                {form.flagCode && (
                                    <img
                                        src={`https://flagcdn.com/${form.flagCode}.svg`}
                                        alt="Preview"
                                        className="w-6 h-4 object-cover rounded shadow-sm border border-gray-200"
                                        onError={(e) => (e.currentTarget.style.display = "none")}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Globe Coordinates */}
                <div>
                    <h3 className="font-bold text-brand-blue text-sm flex items-center gap-2 mb-4">
                        <MapPin className="w-4 h-4" /> Globe Location
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-brand-gray mb-1">City</label>
                            <input
                                type="text"
                                value={form.city}
                                onChange={e => updateField("city", e.target.value)}
                                placeholder="Tokyo"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-brand-gray mb-1">Latitude</label>
                            <input
                                type="number"
                                step="0.0001"
                                value={form.lat}
                                onChange={e => updateField("lat", parseFloat(e.target.value) || 0)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-brand-gray mb-1">Longitude</label>
                            <input
                                type="number"
                                step="0.0001"
                                value={form.lng}
                                onChange={e => updateField("lng", parseFloat(e.target.value) || 0)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                            />
                        </div>
                    </div>
                </div>

                {/* Section 3: Hero Globe Programs (modal content when you click a pin) */}
                <div>
                    <h3 className="font-bold text-brand-blue text-sm flex items-center gap-2 mb-4">
                        <Globe className="w-4 h-4" /> Hero Globe — Programs Card
                    </h3>
                    <p className="text-xs text-brand-gray mb-3">
                        These programs appear in the card modal when a user clicks this country&apos;s pin on the hero globe.
                    </p>
                    <div className="space-y-3">
                        {form.heroGlobePrograms.map((prog, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-lg border border-gray-100 relative">
                                {form.heroGlobePrograms.length > 1 && (
                                    <button onClick={() => removeProgram(idx)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                                <div className="grid md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-brand-gray mb-1">Program Name</label>
                                        <input type="text" value={prog.name} onChange={e => updateProgram(idx, "name", e.target.value)} placeholder="Cultural Immersion Program" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-brand-gray mb-1">Duration</label>
                                        <input type="text" value={prog.duration} onChange={e => updateProgram(idx, "duration", e.target.value)} placeholder="4 weeks" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20" />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <label className="block text-xs font-medium text-brand-gray mb-1">Description</label>
                                    <textarea rows={2} value={prog.description} onChange={e => updateProgram(idx, "description", e.target.value)} placeholder="Brief description..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20" />
                                </div>
                                <div className="mt-3">
                                    <label className="block text-xs font-medium text-brand-gray mb-1">Link (slug)</label>
                                    <input type="text" value={prog.slug} onChange={e => updateProgram(idx, "slug", e.target.value)} placeholder="/programs/japan-innovation" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20" />
                                </div>
                            </div>
                        ))}
                        <button onClick={addProgram} className="text-sm text-brand-blue hover:bg-brand-blue/10 px-3 py-1.5 rounded-lg flex items-center gap-1">
                            <PlusCircle className="w-4 h-4" /> Add Program
                        </button>
                    </div>
                </div>

                {/* Section 4: Lower Globe Card (Where Can You Go) */}
                <div>
                    <h3 className="font-bold text-brand-blue text-sm flex items-center gap-2 mb-4">
                        <MapPin className="w-4 h-4" /> Lower Globe — Country Card
                    </h3>
                    <p className="text-xs text-brand-gray mb-3">
                        This content appears on the left-side card in the &quot;Where Can You Go&quot; section when a user selects this country.
                    </p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-brand-gray mb-1">Card Description</label>
                            <textarea
                                rows={3}
                                value={form.lowerGlobeDescription}
                                onChange={e => updateField("lowerGlobeDescription", e.target.value)}
                                placeholder="Describe the country's study-abroad appeal..."
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-brand-gray mb-1">Duration Text</label>
                            <input
                                type="text"
                                value={form.lowerGlobeDuration}
                                onChange={e => updateField("lowerGlobeDuration", e.target.value)}
                                placeholder="2 - 6 Weeks"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2 bg-brand-blue text-white rounded-lg font-medium shadow-md transition-all text-sm",
                            isSaving ? "opacity-70 cursor-not-allowed" : "hover:bg-brand-blue/90"
                        )}
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {editingSlug ? "Update Country" : "Add Country"}
                    </button>
                    <button onClick={cancelForm} className="px-4 py-2 text-sm text-brand-gray hover:text-brand-blue transition-colors">
                        Cancel
                    </button>
                </div>
            </div>
        );
    }
}
