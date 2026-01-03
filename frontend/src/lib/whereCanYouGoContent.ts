import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface WhereCanYouGoContent {
    title: string;
    description: string;
}

// Default content (fallback when Firestore has no data)
export const defaultWhereCanYouGoContent: WhereCanYouGoContent = {
    title: "Designed for a global generation",
    description: "Education today isn’t confined to one place or one way of learning. We focus on creating opportunities that help students build perspective, adaptability, and cultural understanding in an increasingly connected world.",
};

const DOC_ID = "where-can-you-go";
const COLLECTION_NAME = "content";

/**
 * Fetch Where Can You Go content from Firestore with timeout
 */
export async function getWhereCanYouGoContent(): Promise<WhereCanYouGoContent> {
    try {
        const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Firestore timeout")), 5000)
        );

        const fetchPromise = (async () => {
            const docRef = doc(db, COLLECTION_NAME, DOC_ID);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data() as WhereCanYouGoContent;
            }
            return defaultWhereCanYouGoContent;
        })();

        return await Promise.race([fetchPromise, timeoutPromise]);
    } catch (error) {
        console.error("Error fetching 'Where Can You Go' content (using defaults):", error);
        return defaultWhereCanYouGoContent;
    }
}

/**
 * Update Where Can You Go content in Firestore
 */
export async function updateWhereCanYouGoContent(content: WhereCanYouGoContent): Promise<boolean> {
    try {
        const docRef = doc(db, COLLECTION_NAME, DOC_ID);
        await setDoc(docRef, content);
        return true;
    } catch (error) {
        console.error("Error updating 'Where Can You Go' content:", error);
        return false;
    }
}
