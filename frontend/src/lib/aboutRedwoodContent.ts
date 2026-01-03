import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface AboutCard {
    title: string;
    description: string;
    image: string;
}

export interface AboutRedwoodContent {
    tagline: string;
    title: string;
    description: string;
    mission: AboutCard;
    vision: AboutCard;
}

export const defaultAboutRedwoodContent: AboutRedwoodContent = {
    tagline: "WHO WE ARE",
    title: "About Redwood",
    description: "Building bridges across cultures through education, experience, and global connection.",
    mission: {
        title: "Our Mission",
        description: "To empower the next generation of global leaders by providing accessible, transformative cultural exchange experiences that foster understanding, independence, and lifelong connections across borders.",
        image: "/ourmissioncard.png"
    },
    vision: {
        title: "Our Vision",
        description: "A world where borders are not barriers but gateways to learning, where every student has the opportunity to explore, adapt, and thrive in a globally connected community.",
        image: "/ourvision.png"
    }
};

export const getAboutRedwoodContent = async (): Promise<AboutRedwoodContent> => {
    try {
        const docRef = doc(db, "content", "about-redwood");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Merge with default to ensure structure
            return { ...defaultAboutRedwoodContent, ...docSnap.data() } as AboutRedwoodContent;
        }
    } catch (error) {
        console.error("Error fetching About Redwood content:", error);
    }
    return defaultAboutRedwoodContent;
};

export const updateAboutRedwoodContent = async (content: AboutRedwoodContent): Promise<boolean> => {
    try {
        const docRef = doc(db, "content", "about-redwood");
        await setDoc(docRef, content);
        return true;
    } catch (error) {
        console.error("Error updating About Redwood content:", error);
        return false;
    }
};
