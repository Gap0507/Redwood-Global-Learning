import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface GlobalProgram {
    id: string;
    country: string;
    title: string;
    image: string;
    description: string;
    flag: string; // ISO 2-letter country code for flagcdn
}

export interface GlobalProgramsContent {
    sectionTitle: string;
    sectionDescription: string;
    programs: GlobalProgram[];
}

// Default content (fallback when Firestore has no data)
export const defaultGlobalProgramsContent: GlobalProgramsContent = {
    sectionTitle: "Global Exchange Programs",
    sectionDescription: "Join our global exchange programs aimed at providing meaningful academic exposure, cultural immersion, and guided learning experiences across selected international destinations.",
    programs: [
        {
            id: 'japan',
            country: 'Japan',
            title: 'Japan',
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
            description: 'Experience a unique academic and cultural environment where tradition meets innovation. Engage with structured learning while immersing yourself in Japan’s rich heritage, discipline, and modern global outlook.',
            flag: 'jp'
        },
        {
            id: 'united-states',
            country: 'United States',
            title: 'United States',
            image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800',
            description: 'Gain academic exposure in one of the world’s most diverse education ecosystems. Learn alongside global peers while experiencing innovation, campus life, and cultural diversity across the United States.',
            flag: 'us'
        },
        {
            id: 'bali',
            country: 'Bali',
            title: 'Bali',
            image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
            description: 'Participate in experiential learning programs that blend education with cultural immersion. Explore sustainability, creativity, and community-driven learning within Bali’s distinctive cultural setting.',
            flag: 'id'
        },
        {
            id: 'thailand',
            country: 'Thailand',
            title: 'Thailand',
            image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800',
            description: 'Engage in international learning experiences that combine academic exposure with cultural exploration: Discover Thailand’s vibrant traditions, global perspectives, and dynamic learning environments.',
            flag: 'th'
        },
        {
            id: 'vietnam',
            country: 'Vietnam',
            title: 'Vietnam',
            image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800',
            description: 'Engage in emerging global learning environments that combine academic exposure with cultural depth. Experience Vietnam’s dynamic growth, rich history, and evolving education landscape through immersive, real-world learning experiences.',
            flag: 'vn'
        },
        {
            id: 'india',
            country: 'India',
            title: 'India',
            image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800',
            description: 'Engage with a diverse learning environment shaped by history, culture, and contemporary thought. Experience India’s academic depth, community-driven learning, and cultural richness through immersive, real-world educational experiences.',
            flag: 'in'
        }
    ],
};

const PROGRAMS_DOC_ID = "global-programs";
const COLLECTION_NAME = "content";

/**
 * Fetch Global Programs content from Firestore with timeout
 */
export async function getGlobalProgramsContent(): Promise<GlobalProgramsContent> {
    try {
        const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Firestore timeout")), 5000)
        );

        const fetchPromise = (async () => {
            const docRef = doc(db, COLLECTION_NAME, PROGRAMS_DOC_ID);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data() as GlobalProgramsContent;
            }
            return defaultGlobalProgramsContent;
        })();

        return await Promise.race([fetchPromise, timeoutPromise]);
    } catch (error) {
        console.error("Error fetching global programs content (using defaults):", error);
        return defaultGlobalProgramsContent;
    }
}

/**
 * Update Global Programs content in Firestore
 */
export async function updateGlobalProgramsContent(content: GlobalProgramsContent): Promise<boolean> {
    try {
        const docRef = doc(db, COLLECTION_NAME, PROGRAMS_DOC_ID);
        await setDoc(docRef, content);
        return true;
    } catch (error) {
        console.error("Error updating global programs content:", error);
        return false;
    }
}
