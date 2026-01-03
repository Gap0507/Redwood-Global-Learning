"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    Search,
    Filter,
    Eye,
    Trash2,
    CheckCircle,
    Clock,
    XCircle,
    MoreVertical,
    MessageSquare,
    Phone,
    User,
    Calendar,
    ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getInquiries, updateInquiryStatus, Inquiry } from "@/lib/inquiryService";

const statusConfig = {
    new: { label: "New", color: "bg-blue-100 text-blue-600", icon: Mail },
    read: { label: "Read", color: "bg-yellow-100 text-yellow-600", icon: Eye },
    replied: { label: "Replied", color: "bg-green-100 text-green-600", icon: CheckCircle },
    closed: { label: "Closed", color: "bg-gray-100 text-gray-500", icon: XCircle },
};

const roleConfig = {
    student: { label: "Student", color: "bg-purple-100 text-purple-600" },
    parent: { label: "Parent", color: "bg-blue-100 text-blue-600" },
    institution: { label: "Institution", color: "bg-teal-100 text-teal-600" },
    school: { label: "School", color: "bg-orange-100 text-orange-600" },
    professor: { label: "Professor", color: "bg-indigo-100 text-indigo-600" },
};

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

    const fetchInquiries = async () => {
        setIsLoading(true);
        const data = await getInquiries();
        setInquiries(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const handleStatusUpdate = async (id: string, status: Inquiry["status"]) => {
        if (!id) return;
        const success = await updateInquiryStatus(id, status);
        if (success) {
            setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
            if (selectedInquiry?.id === id) {
                setSelectedInquiry(prev => (prev ? { ...prev, status } : null));
            }
        }
    };

    const filteredInquiries = inquiries.filter(i => {
        const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === "all" || i.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const newCount = inquiries.filter(i => i.status === "new").length;

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold font-montserrat text-brand-blue flex items-center gap-3">
                        Inquiries
                        {newCount > 0 && (
                            <span className="px-3 py-1 bg-brand-red text-white text-sm font-poppins rounded-full">
                                {newCount} new
                            </span>
                        )}
                    </h1>
                    <p className="text-brand-gray font-poppins mt-1">
                        View and manage form submissions from the website
                    </p>
                </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(statusConfig).map(([key, config], index) => {
                    const Icon = config.icon;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const count = inquiries.filter(i => i.status === key as any).length;
                    return (
                        <motion.button
                            key={key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setFilterStatus(filterStatus === key ? "all" : key)}
                            className={cn(
                                "bg-white rounded-xl p-4 shadow-md border-2 transition-all text-left",
                                filterStatus === key ? "border-brand-blue" : "border-transparent hover:border-gray-200"
                            )}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", config.color)}>
                                    <Icon className="w-4 h-4" />
                                </div>
                            </div>
                            <p className="text-2xl font-bold font-montserrat text-brand-blue">{count}</p>
                            <p className="text-sm text-brand-gray font-poppins">{config.label}</p>
                        </motion.button>
                    );
                })}
            </div>

            {/* Search */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative"
            >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray/50" />
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl font-poppins focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                />
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Inquiries List */}
                <div className="lg:col-span-1 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="font-poppins font-semibold text-brand-blue">
                            All Inquiries ({filteredInquiries.length})
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                        {filteredInquiries.map((inquiry, index) => {
                            const StatusIcon = statusConfig[inquiry.status].icon;
                            return (
                                <motion.button
                                    key={inquiry.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => setSelectedInquiry(inquiry)}
                                    className={cn(
                                        "w-full p-4 text-left hover:bg-gray-50 transition-colors",
                                        selectedInquiry?.id === inquiry.id && "bg-brand-blue/5 border-l-4 border-brand-blue"
                                    )}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className={cn("w-2 h-2 rounded-full", inquiry.status === "new" ? "bg-brand-red" : "bg-transparent")} />
                                            <h3 className="font-poppins font-medium text-brand-blue text-sm truncate">
                                                {inquiry.name}
                                            </h3>
                                        </div>
                                        <span className={cn("px-2 py-0.5 rounded text-xs font-medium", roleConfig[inquiry.role].color)}>
                                            {roleConfig[inquiry.role].label}
                                        </span>
                                    </div>
                                    <p className="text-xs text-brand-gray truncate mb-2">{inquiry.email}</p>
                                    <p className="text-xs text-brand-gray/70 line-clamp-2">{inquiry.message}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs text-brand-gray/50">
                                            {new Date(inquiry.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className={cn("px-1.5 py-0.5 rounded text-xs", statusConfig[inquiry.status].color)}>
                                            {statusConfig[inquiry.status].label}
                                        </span>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Inquiry Detail */}
                <div className="lg:col-span-2">
                    {selectedInquiry ? (
                        <motion.div
                            key={selectedInquiry.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-brand-blue/5 to-transparent">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold font-montserrat text-brand-blue">
                                            {selectedInquiry.name}
                                        </h2>
                                        <span className={cn("inline-block px-3 py-1 rounded-full text-xs font-medium mt-2", roleConfig[selectedInquiry.role].color)}>
                                            {roleConfig[selectedInquiry.role].label}
                                        </span>
                                    </div>
                                    <span className={cn("px-3 py-1 rounded-full text-sm font-medium", statusConfig[selectedInquiry.status].color)}>
                                        {statusConfig[selectedInquiry.status].label}
                                    </span>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-brand-gray">Email</p>
                                        <p className="text-sm font-medium text-brand-blue">{selectedInquiry.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-brand-gray">Phone</p>
                                        <p className="text-sm font-medium text-brand-blue">{selectedInquiry.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-brand-gray">Received</p>
                                        <p className="text-sm font-medium text-brand-blue">
                                            {new Date(selectedInquiry.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="p-6">
                                <h3 className="text-sm font-semibold text-brand-gray mb-3 flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    Message
                                </h3>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-brand-gray font-poppins leading-relaxed">
                                        {selectedInquiry.message}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            {/* Actions */}
                            <div className="p-6 border-t border-gray-100 flex flex-wrap gap-3">
                                <a href={`mailto:${selectedInquiry.email}`} className="flex items-center gap-2 px-5 py-2.5 bg-brand-blue text-white font-poppins font-medium rounded-xl shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/90 transition-all">
                                    <Mail className="w-4 h-4" />
                                    Reply via Email
                                </a>
                                {selectedInquiry.status !== "replied" && (
                                    <button
                                        onClick={() => handleStatusUpdate(selectedInquiry.id!, "replied")}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white font-poppins font-medium rounded-xl hover:bg-green-600 transition-all"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Mark as Replied
                                    </button>
                                )}
                                {selectedInquiry.status === "new" && (
                                    <button
                                        onClick={() => handleStatusUpdate(selectedInquiry.id!, "read")}
                                        className="flex items-center gap-2 px-5 py-2.5 border border-yellow-500 text-yellow-600 bg-yellow-50 font-poppins font-medium rounded-xl hover:bg-yellow-100 transition-all"
                                    >
                                        <Eye className="w-4 h-4" />
                                        Mark as Read
                                    </button>
                                )}
                                {selectedInquiry.status !== "closed" && (
                                    <button
                                        onClick={() => handleStatusUpdate(selectedInquiry.id!, "closed")}
                                        className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-brand-gray font-poppins font-medium rounded-xl hover:bg-gray-50 transition-all ml-auto"
                                    >
                                        <XCircle className="w-4 h-4" />
                                        Close Inquiry
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 h-full flex items-center justify-center p-12">
                            <div className="text-center">
                                <Mail className="w-16 h-16 text-brand-gray/20 mx-auto mb-4" />
                                <p className="text-brand-gray font-poppins">Select an inquiry to view details</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
