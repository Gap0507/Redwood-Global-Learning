import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface ContactInfo {
    address: string;
    phone: string;
    email: string;
}

export interface SocialLinks {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
}

export interface ContactContent {
    contactInfo: ContactInfo;
    socialLinks: SocialLinks;
}

export const defaultContactContent: ContactContent = {
    contactInfo: {
        address: "123 Education Way, Suite 100\nSan Francisco, CA 94102",
        phone: "1 800-123-4567",
        email: "info@redwoodglobal.com"
    },
    socialLinks: {
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        twitter: "https://twitter.com",
        youtube: "https://youtube.com"
    }
};

export const getContactContent = async (): Promise<ContactContent> => {
    try {
        const docRef = doc(db, "content", "contact-info");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { ...defaultContactContent, ...docSnap.data() } as ContactContent;
        }
    } catch (error) {
        console.error("Error fetching Contact content:", error);
    }
    return defaultContactContent;
};

export const updateContactContent = async (content: ContactContent): Promise<boolean> => {
    try {
        const docRef = doc(db, "content", "contact-info");
        await setDoc(docRef, content);
        return true;
    } catch (error) {
        console.error("Error updating Contact content:", error);
        return false;
    }
};
