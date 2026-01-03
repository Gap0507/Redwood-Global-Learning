import { db } from "./firebase";
import { collection, addDoc, getDocs, doc, updateDoc, orderBy, query, Timestamp } from "firebase/firestore";

export interface Inquiry {
    id?: string;
    name: string;
    email: string;
    phone: string;
    role: "school" | "professor" | "student" | "parent" | "institution";
    institutionName?: string;
    message?: string;
    status: "new" | "read" | "replied" | "closed";
    createdAt: string; // ISO string for easier handling on frontend
}

const COLLECTION_NAME = "inquiries";

/**
 * Add a new inquiry to Firestore
 */
export async function addInquiry(inquiry: Omit<Inquiry, "id" | "status" | "createdAt">): Promise<boolean> {
    try {
        await addDoc(collection(db, COLLECTION_NAME), {
            ...inquiry,
            status: "new",
            createdAt: new Date().toISOString()
        });
        return true;
    } catch (error) {
        console.error("Error adding inquiry:", error);
        return false;
    }
}

/**
 * Fetch all inquiries from Firestore, ordered by newest first
 */
export async function getInquiries(): Promise<Inquiry[]> {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Inquiry));
    } catch (error) {
        console.error("Error fetching inquiries:", error);
        return [];
    }
}

/**
 * Update an inquiry's status
 */
export async function updateInquiryStatus(id: string, status: Inquiry["status"]): Promise<boolean> {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, { status });
        return true;
    } catch (error) {
        console.error("Error updating inquiry status:", error);
        return false;
    }
}

/**
 * Delete an inquiry
 */
export async function deleteInquiry(id: string): Promise<boolean> {
    try {
        // Optional: Add logic for soft delete if preferred
        // For now, we'll keep the function signature but maybe not implement hard delete yet unless requested
        // Or just status to 'closed' is enough. 
        // But user might want to actually delete.
        // Let's implement real delete for completeness if Admin UI has a delete button (it does).
        const { deleteDoc } = await import("firebase/firestore");
        const docRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error("Error deleting inquiry:", error);
        return false;
    }
}
