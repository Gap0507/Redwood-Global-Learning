import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface HeroContent {
    tagline: string;
    headerLines: string[];
    paragraphText: string;
    typingWords: string[];
    flagsTagline: string;
}

// Default content (fallback when Firestore has no data)
export const defaultHeroContent: HeroContent = {
    tagline: "Where Students Become Global Citizens",
    headerLines: ["GROW", "BEYOND", "BORDERS"],
    paragraphText: "Redwood Learning creates immersive global exchange programs where students grow through",
    typingWords: ["global cultures", "real-world learning", "international communities"],
    flagsTagline: "Trusted by Students and Institutions globally",
};

const HERO_DOC_ID = "hero-section";
const COLLECTION_NAME = "content";

/**
 * Fetch Hero content from Firestore with timeout
 * Returns default content if document doesn't exist or on error
 */
export async function getHeroContent(): Promise<HeroContent> {
    try {
        // Add a 5-second timeout to avoid long waits
        const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Firestore timeout")), 5000)
        );

        const fetchPromise = (async () => {
            const docRef = doc(db, COLLECTION_NAME, HERO_DOC_ID);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data() as HeroContent;
            }
            return defaultHeroContent;
        })();

        return await Promise.race([fetchPromise, timeoutPromise]);
    } catch (error) {
        console.error("Error fetching hero content (using defaults):", error);
        return defaultHeroContent;
    }
}

/**
 * Update Hero content in Firestore
 */
export async function updateHeroContent(content: HeroContent): Promise<boolean> {
    try {
        const docRef = doc(db, COLLECTION_NAME, HERO_DOC_ID);
        await setDoc(docRef, content);
        return true;
    } catch (error) {
        console.error("Error updating hero content:", error);
        return false;
    }
}
