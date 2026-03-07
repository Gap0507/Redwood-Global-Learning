import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface BannerContent {
    imageUrl: string;
}

export const defaultBannerContent: BannerContent = {
    imageUrl: "",
};

const BANNER_DOC_ID = "banner-section";
const COLLECTION_NAME = "content";

/**
 * Fetch Banner content from Firestore with timeout.
 * Returns empty default (no banner) if doc doesn't exist or on error.
 */
export async function getBannerContent(): Promise<BannerContent> {
    try {
        const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Firestore timeout")), 5000)
        );

        const fetchPromise = (async () => {
            const docRef = doc(db, COLLECTION_NAME, BANNER_DOC_ID);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data() as BannerContent;
            }
            return defaultBannerContent;
        })();

        return await Promise.race([fetchPromise, timeoutPromise]);
    } catch (error) {
        console.error("Error fetching banner content (using defaults):", error);
        return defaultBannerContent;
    }
}

/**
 * Update Banner content in Firestore.
 */
export async function updateBannerContent(content: BannerContent): Promise<boolean> {
    try {
        const docRef = doc(db, COLLECTION_NAME, BANNER_DOC_ID);
        await setDoc(docRef, content);
        return true;
    } catch (error) {
        console.error("Error updating banner content:", error);
        return false;
    }
}
