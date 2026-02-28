import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// --- Interfaces ---

export interface SportsBenefit {
    title: string;
    description: string;
    icon: string;
    image: string;
}

export interface SportsPageContent {
    hero: {
        tagline: string;
        title: string;
        highlightedText: string;
        description: string;
        heroImage: string;
        ctaText: string;
    };
    mission: {
        title: string;
        paragraphs: string[];
        calloutTitle: string;
        calloutSubtitle: string;
        image: string;
    };
    benefits: {
        tagline: string;
        title: string;
        subtitle: string;
        items: SportsBenefit[];
    };
    cta: {
        title: string;
        description: string;
        ctaText: string;
    };
}

// --- Default Content (mirrors current hardcoded page) ---

export const defaultSportsPageContent: SportsPageContent = {
    hero: {
        tagline: "Global Athletics",
        title: "Elevate Your",
        highlightedText: "Athletic Journey",
        description: "At Redwood Global Learning Group, we believe sports are an essential part of a student\u2019s overall development. Explore athletic opportunities alongside your academic journey.",
        heroImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=2000&q=80",
        ctaText: "Start Your Journey",
    },
    mission: {
        title: "Building Discipline, Teamwork, and Confidence.",
        paragraphs: [
            "We work closely with elite international schools and universities to ensure our students have unparalleled access to world-class athletic programs.",
            "Through our established network, students gain exposure to diverse sporting environments, modern training facilities, and global athletic cultures. These experiences go beyond the field, shaping future leaders by developing crucial soft skills like teamwork, resilience, and cross-cultural communication.",
        ],
        calloutTitle: "Elite Development",
        calloutSubtitle: "Balancing academics with high-performance sports.",
        image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1000&q=80",
    },
    benefits: {
        tagline: "Student Benefits",
        title: "Empowering Student Athletes",
        subtitle: "Our partners provide comprehensive programs designed to nurture talent and develop well-rounded individuals.",
        items: [
            {
                title: "World-Class Facilities",
                description: "Access to state-of-the-art sports facilities at our partner schools and universities.",
                icon: "Building2",
                image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
            },
            {
                title: "Team Participation",
                description: "Opportunities to join and compete in official school and university sports teams.",
                icon: "Users",
                image: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80",
            },
            {
                title: "Elite Coaching",
                description: "Exposure to international coaching and high-performance training environments.",
                icon: "Target",
                image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80",
            },
            {
                title: "Global Tournaments",
                description: "Participation in major inter-school and inter-university sporting events worldwide.",
                icon: "Globe",
                image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
            },
        ],
    },
    cta: {
        title: "Continuously Expanding Our Global Partnerships",
        description: "Redwood Global Learning Group is dedicated to providing structured sports opportunities for students worldwide. Whether you are aiming for college recruitment or just want to stay active, we have a place for you.",
        ctaText: "Apply to a Program Today",
    },
};

const DOC_ID = "sports-page";
const COLLECTION_NAME = "content";

export async function getSportsPageContent(): Promise<SportsPageContent> {
    try {
        const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Firestore timeout")), 5000)
        );

        const fetchPromise = (async () => {
            const docRef = doc(db, COLLECTION_NAME, DOC_ID);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                return {
                    hero: { ...defaultSportsPageContent.hero, ...data.hero },
                    mission: { ...defaultSportsPageContent.mission, ...data.mission },
                    benefits: { ...defaultSportsPageContent.benefits, ...data.benefits, items: data.benefits?.items || defaultSportsPageContent.benefits.items },
                    cta: { ...defaultSportsPageContent.cta, ...data.cta },
                } as SportsPageContent;
            }
            return defaultSportsPageContent;
        })();

        return await Promise.race([fetchPromise, timeoutPromise]);
    } catch (error) {
        console.error("Error fetching sports page content (using defaults):", error);
        return defaultSportsPageContent;
    }
}

export async function updateSportsPageContent(content: SportsPageContent): Promise<boolean> {
    try {
        const docRef = doc(db, COLLECTION_NAME, DOC_ID);
        await setDoc(docRef, content);
        return true;
    } catch (error) {
        console.error("Error updating sports page content:", error);
        return false;
    }
}
