import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// --- Interfaces ---

export interface ConferenceBenefit {
    title: string;
    description: string;
    icon: string;
    image: string;
}

export interface ImpactNumber {
    value: string;
    label: string;
}

export interface ConferencesPageContent {
    hero: {
        tagline: string;
        title: string;
        highlightedText: string;
        description: string;
        heroImage: string;
        ctaText: string;
        impactNumbers: ImpactNumber[];
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
        items: ConferenceBenefit[];
    };
    cta: {
        title: string;
        description: string;
        ctaText: string;
    };
}

// --- Default Content (mirrors current hardcoded page) ---

export const defaultConferencesPageContent: ConferencesPageContent = {
    hero: {
        tagline: "Global Conferences",
        title: "Inspire Through",
        highlightedText: "Global Dialogue",
        description: "Redwood Global Learning Group connects students with world-class conferences, academic events, and leadership platforms that enhance learning beyond the classroom.",
        heroImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=2000&q=80",
        ctaText: "Explore Opportunities",
        impactNumbers: [
            { value: "50+", label: "Partner Institutions" },
            { value: "30+", label: "Countries Represented" },
            { value: "5K+", label: "Student Participants" },
            { value: "100+", label: "Events Annually" },
        ],
    },
    mission: {
        title: "Learning Beyond the Classroom.",
        paragraphs: [
            "These events allow students to engage with new ideas, present their perspectives, and interact with peers and educators from different parts of the world.",
            "From Model United Nations debates in New York to academic summits in London, our conference programs are designed to cultivate critical thinking, cross-cultural understanding, and professional confidence in every participant.",
        ],
        calloutTitle: "Voice That Matters",
        calloutSubtitle: "Empowering students to present on global stages.",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1000&q=80",
    },
    benefits: {
        tagline: "Student Benefits",
        title: "Unlock Global Opportunities",
        subtitle: "Our conference programs are designed to develop well-rounded, globally-minded individuals ready to make an impact.",
        items: [
            {
                title: "Academic Conferences",
                description: "Participation in school and university academic conferences that broaden intellectual horizons and encourage scholarly discourse.",
                icon: "BookOpen",
                image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
            },
            {
                title: "International Seminars & Summits",
                description: "Access to world-class seminars, workshops, and summits that connect students with leading thinkers and innovators.",
                icon: "Globe",
                image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
            },
            {
                title: "Model United Nations & Leadership",
                description: "Opportunities to join prestigious student leadership platforms and Model United Nations programs across the globe.",
                icon: "Award",
                image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&q=80",
            },
            {
                title: "Global Professional Exposure",
                description: "Exposure to dynamic academic and professional environments that prepare students for impactful careers worldwide.",
                icon: "Presentation",
                image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80",
            },
            {
                title: "Communication & Networking",
                description: "Development of essential communication, presentation, and networking skills through real-world engagement and collaboration.",
                icon: "MessageSquare",
                image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
            },
        ],
    },
    cta: {
        title: "Building Bridges Through Knowledge & Dialogue",
        description: "We are actively building partnerships with schools, universities, and conference organizers to expand these opportunities for students across the world.",
        ctaText: "Apply to a Program Today",
    },
};

const DOC_ID = "conferences-page";
const COLLECTION_NAME = "content";

export async function getConferencesPageContent(): Promise<ConferencesPageContent> {
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
                    hero: { ...defaultConferencesPageContent.hero, ...data.hero, impactNumbers: data.hero?.impactNumbers || defaultConferencesPageContent.hero.impactNumbers },
                    mission: { ...defaultConferencesPageContent.mission, ...data.mission },
                    benefits: { ...defaultConferencesPageContent.benefits, ...data.benefits, items: data.benefits?.items || defaultConferencesPageContent.benefits.items },
                    cta: { ...defaultConferencesPageContent.cta, ...data.cta },
                } as ConferencesPageContent;
            }
            return defaultConferencesPageContent;
        })();

        return await Promise.race([fetchPromise, timeoutPromise]);
    } catch (error) {
        console.error("Error fetching conferences page content (using defaults):", error);
        return defaultConferencesPageContent;
    }
}

export async function updateConferencesPageContent(content: ConferencesPageContent): Promise<boolean> {
    try {
        const docRef = doc(db, COLLECTION_NAME, DOC_ID);
        await setDoc(docRef, content);
        return true;
    } catch (error) {
        console.error("Error updating conferences page content:", error);
        return false;
    }
}
