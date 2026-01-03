import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface ApproachCard {
    title: string;
    subtitle: string;
    description: string;
    src: string;
    link: string;
    color: string;
    gradient: string;
    icon: string; // Icon name as string for CMS compatibility
    stat: string;
}

export interface ApproachContent {
    sectionTitle: string;
    sectionSubtitle: string;
    cards: ApproachCard[];
}

// Default content (fallback when Firestore has no data)
export const defaultApproachContent: ApproachContent = {
    sectionTitle: "Our Approach",
    sectionSubtitle: "A holistic journey designed to transform students into global citizens through education, cultural immersion, and guided support.",
    cards: [
        {
            title: "Academic exposure",
            subtitle: "World-Class Education",
            description: "Students engage with education in an international setting by learning within global classrooms and institutions. They explore subjects aligned with their interests, experience different teaching styles and academic cultures, and gain insight into how education is approached in different parts of the world. This exposure helps students broaden their perspective, build meaningful academic and professional networks, and gain clarity on future global opportunities.",
            src: "/academics.png",
            link: "/programs",
            color: "#17437B",
            gradient: "from-[#17437B] to-[#0D2B52]",
            icon: "GraduationCap",
            stat: "50+ Global Partners"
        },
        {
            title: "Explore globally, live locally",
            subtitle: "Authentic Living",
            description: "Students experience the country in its entirety. They explore cities, landmarks, and cultural spaces as travellers, while also living like locals through host family stays, community engagement, and everyday routines. This balance allows them to enjoy discovery while developing an authentic connection with the culture and people.",
            src: "/culture.png",
            link: "/about",
            color: "#E63946",
            gradient: "from-[#E63946] to-[#9E1019]",
            icon: "Globe",
            stat: "100% Immersive"
        },
        {
            title: "Guided experience",
            subtitle: "Safety & Mentorship",
            description: "Every exchange is thoughtfully planned and supported by Redwood. From preparation and logistics to on-ground guidance and assistance, students and families can rely on a structured, secure, and well-managed international experience throughout the journey.",
            src: "/guidedsupport.png",
            link: "/contact",
            color: "#457B9D",
            gradient: "from-[#457B9D] to-[#2A4D63]",
            icon: "ShieldCheck",
            stat: "24/7 Assistance"
        },
        {
            title: "Lasting growth",
            subtitle: "Future Ready",
            description: "Students return with more than experiences. They develop confidence, independence, and a global perspective shaped by real-world exposure and cross-cultural understanding—qualities that continue to influence their academic choices, careers, and life paths.",
            src: "/outcomes.png",
            link: "/programs",
            color: "#E63946",
            gradient: "from-[#17437B] to-[#E63946]",
            icon: "Rocket",
            stat: "Lifelong Network"
        },
    ],
};

const APPROACH_DOC_ID = "approach-section";
const COLLECTION_NAME = "content";

/**
 * Fetch Approach content from Firestore with timeout
 */
export async function getApproachContent(): Promise<ApproachContent> {
    try {
        const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Firestore timeout")), 5000)
        );

        const fetchPromise = (async () => {
            const docRef = doc(db, COLLECTION_NAME, APPROACH_DOC_ID);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data() as ApproachContent;
            }
            return defaultApproachContent;
        })();

        return await Promise.race([fetchPromise, timeoutPromise]);
    } catch (error) {
        console.error("Error fetching approach content (using defaults):", error);
        return defaultApproachContent;
    }
}

/**
 * Update Approach content in Firestore
 */
export async function updateApproachContent(content: ApproachContent): Promise<boolean> {
    try {
        const docRef = doc(db, COLLECTION_NAME, APPROACH_DOC_ID);
        await setDoc(docRef, content);
        return true;
    } catch (error) {
        console.error("Error updating approach content:", error);
        return false;
    }
}
