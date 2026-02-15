import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// --- Interfaces ---

export interface StatItem {
    value: string;
    label: string;
}

export interface BenefitItem {
    icon: string; // "Globe", "GraduationCap", "Users", etc.
    text: string;
}

export interface ProgramStep {
    title: string;
    description: string;
    icon: "BookOpen" | "Heart" | "Users" | "CheckCircle2";
}

export interface CountryProgram {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    description: string;
    image: string;
    flagUrl: string;
    programCount: number;
    featuredProgram?: string;
    highlights: string[];
}

export interface ImpactStat {
    value: string;
    label: string;
    icon: "Globe" | "BookOpen" | "Users" | "Star";
}

export interface StudentStory {
    id: string;
    name: string;
    origin: string;
    destination: string;
    quote: string;
    flagUrl: string;
}

export interface DifferenceCard {
    title: string;
    description: string;
    icon: "Leaf" | "Heart" | "Award";
}

export interface ProgramsPageContent {
    hero: {
        tagline: string;
        headline: string;
        description: string;
        stats: StatItem[];
    };
    whyGlobal: {
        tagline: string;
        headline: string;
        description: string;
        benefits: BenefitItem[];
    };
    howItWorks: {
        tagline: string;
        headline: string;
        description: string;
        steps: ProgramStep[];
    };
    countryPrograms: CountryProgram[];
    globalImpact: {
        tagline: string;
        headline: string;
        description: string;
        stats: ImpactStat[];
    };
    studentStories: {
        tagline: string;
        headline: string;
        description: string;
        stories: StudentStory[];
    };
    difference: {
        tagline: string;
        headline: string;
        cards: DifferenceCard[];
    };
    cta: {
        tagline: string;
        headline: string;
        description: string;
        applyButtonText: string;
        learnMoreButtonText: string;
    };
}

// --- Default Content (Mirrors current hardcoded page) ---

export const defaultProgramsPageContent: ProgramsPageContent = {
    hero: {
        tagline: "Global Programs",
        headline: "Explore Our Global Destinations",
        description: "Discover transformative educational experiences across 5 countries. Each destination offers unique opportunities for academic growth, cultural immersion, and personal development.",
        stats: [
            { value: "7", label: "Countries" },
            { value: "12+", label: "Programs" },
            { value: "2K+", label: "Students" },
            { value: "98%", label: "Success" }
        ]
    },
    whyGlobal: {
        tagline: "Why Global Learning",
        headline: "Why Study Across Borders?",
        description: "Global education unlocks far more than academic knowledge. It builds independence, intercultural awareness, and the confidence to navigate an interconnected world. Each Redwood destination blends learning with real-world cultural immersion — helping students discover new perspectives and grow personally and professionally.",
        benefits: [
            { icon: "Globe", text: "Broaden your worldview through direct exposure to different cultures" },
            { icon: "GraduationCap", text: "Gain academic and professional advantages recognized internationally" },
            { icon: "Users", text: "Build global networks that shape future careers and opportunities" }
        ]
    },
    howItWorks: {
        tagline: "Program Structure",
        headline: "How Our Global Programs Work",
        description: "Each destination is built around a structured learning experience that combines academics, cultural exploration, and personal development.",
        steps: [
            { title: "Specialized Academic Modules", description: "Our programs feature carefully curated academic content taught by local educators and international experts. Each module is designed to provide deep insights into the destination's culture, history, and contemporary developments.", icon: "BookOpen" },
            { title: "Cultural Immersion Activities", description: "Experience authentic cultural exchanges through museum visits, heritage walks, community interactions, and hands-on workshops. These activities help students develop a genuine understanding of local customs and traditions.", icon: "Heart" },
            { title: "Guided Mentorship", description: "Each student is supported by mentors from the Redwood international advisory network. Our mentors provide academic guidance, career counseling, and personal development support throughout the program.", icon: "Users" },
            { title: "Safe, Well-Planned Itineraries", description: "Every aspect of your journey is carefully planned with safety as our top priority. From pre-departure orientation to on-ground support, we ensure a seamless and secure experience.", icon: "CheckCircle2" }
        ]
    },
    countryPrograms: [
        {
            id: "india",
            slug: "india",
            name: "India",
            tagline: "Diversity in Unity",
            description: "Discover one of the world's oldest civilizations with a rapidly growing economy. Study in New Delhi or Mumbai while exploring India's diverse cultures, languages, and traditions across its vibrant cities.",
            image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
            flagUrl: "https://flagcdn.com/w80/in.png",
            programCount: 2,
            featuredProgram: "Cultural Immersion",
            highlights: ["Rich cultural diversity", "Affordable living costs", "Growing tech industry", "Historical landmarks"]
        },
        {
            id: "uk",
            slug: "uk",
            name: "United Kingdom",
            tagline: "Excellence Through History",
            description: "Study in London and experience the UK's prestigious academic tradition, rich history, and cultural heritage. Home to some of the world's most renowned universities and institutions.",
            image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
            flagUrl: "https://flagcdn.com/w80/gb.png",
            programCount: 1,
            featuredProgram: "Leadership Academy",
            highlights: ["Prestigious universities", "Rich historical heritage", "English language immersion", "Cultural capital of Europe"]
        },
        {
            id: "thailand",
            slug: "thailand",
            name: "Thailand",
            tagline: "Where Tradition Meets Tomorrow",
            description: "Experience Thailand's perfect blend of ancient temples and modern innovation. Study in Bangkok while exploring Southeast Asia's rich cultural heritage and rapidly developing economy.",
            image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
            flagUrl: "https://flagcdn.com/w80/th.png",
            programCount: 1,
            featuredProgram: "Explorer Program",
            highlights: ["Cultural heritage sites", "Modern urban centers", "Affordable education", "Strategic location in Asia"]
        },
        {
            id: "vietnam",
            slug: "vietnam",
            name: "Vietnam",
            tagline: "Ancient Wisdom, Modern Spirit",
            description: "Discover Vietnam's remarkable transformation from ancient civilization to modern economic powerhouse. Study in Hanoi while experiencing the country's rich history and dynamic future.",
            image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80",
            flagUrl: "https://flagcdn.com/w80/vn.png",
            programCount: 1,
            featuredProgram: "Heritage Program",
            highlights: ["Historical heritage", "Economic growth", "Cultural richness", "Educational excellence"]
        },
        {
            id: "japan",
            slug: "japan",
            name: "Japan",
            tagline: "Tradition Meets Tomorrow",
            description: "Immerse yourself in a unique blend of ancient traditions and cutting-edge innovation. Study in Tokyo while experiencing Japan's rich cultural heritage, world-class education, and technological excellence.",
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
            flagUrl: "https://flagcdn.com/w80/jp.png",
            programCount: 1,
            featuredProgram: "Innovation Exchange",
            highlights: ["Cultural immersion programs", "Language learning opportunities", "Advanced technology exposure", "Rich historical heritage"]
        },
        {
            id: "usa",
            slug: "usa",
            name: "United States",
            tagline: "Land of Opportunity",
            description: "Experience world-class education in America's top universities. From New York to California, explore diverse landscapes and cultures while building your global network.",
            image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80",
            flagUrl: "https://flagcdn.com/w80/us.png",
            programCount: 2,
            featuredProgram: "American Dream",
            highlights: ["Ivy League experience", "Innovation hubs", "Diverse culture", "Career opportunities"]
        },
        {
            id: "bali",
            slug: "bali",
            name: "Bali, Indonesia",
            tagline: "Island of Gods",
            description: "Discover Bali's unique blend of spirituality, art, and natural beauty. Learn about sustainable living and cultural preservation in this tropical paradise.",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
            flagUrl: "https://flagcdn.com/w80/id.png",
            programCount: 1,
            featuredProgram: "Island Explorer",
            highlights: ["Spiritual retreats", "Art and culture", "Sustainable living", "Natural beauty"]
        }
    ],
    globalImpact: {
        tagline: "Our Reach",
        headline: "Global Impact",
        description: "Students from around the world have transformed their academic and personal growth through Redwood's international learning experiences.",
        stats: [
            { value: "5+", label: "Countries", icon: "Globe" },
            { value: "12+", label: "Programs", icon: "BookOpen" },
            { value: "2K+", label: "Students", icon: "Users" },
            { value: "98%", label: "Satisfaction", icon: "Star" }
        ]
    },
    studentStories: {
        tagline: "Student Stories",
        headline: "Student Stories From Around the World",
        description: "Real experiences from students who transformed their lives through Redwood's international programs",
        stories: [
            {
                id: "story-1",
                quote: "My time in Japan with Redwood changed how I understand culture and communication.",
                name: "Aanya",
                origin: "India",
                destination: "Japan",
                flagUrl: "https://flagcdn.com/w80/jp.png"
            },
            {
                id: "story-2",
                quote: "The UK program helped me build global confidence and clarity about my career.",
                name: "Matteo",
                origin: "Italy",
                destination: "UK",
                flagUrl: "https://flagcdn.com/w80/gb.png"
            },
            {
                id: "story-3",
                quote: "Exploring heritage sites in Vietnam made history come alive.",
                name: "Sara",
                origin: "UAE",
                destination: "Vietnam",
                flagUrl: "https://flagcdn.com/w80/vn.png"
            }
        ]
    },
    difference: {
        tagline: "Our Difference",
        headline: "What Makes Redwood Different?",
        cards: [
            { title: "Rooted in Growth", description: "Inspired by the redwood tree, our programs nurture lifelong curiosity and resilience.", icon: "Leaf" },
            { title: "Authentic Exchange", description: "Every destination prioritizes real cultural immersion, not tourism.", icon: "Heart" },
            { title: "Global Academic Excellence", description: "Programs shaped by advisors, educators, and global partners.", icon: "Award" }
        ]
    },
    cta: {
        tagline: "Begin Your Journey",
        headline: "Begin Your Global Journey",
        description: "Join students who have expanded their horizons through Redwood's international programs. Whether you're interested in cultural immersion, academic advancement, or global discovery, your journey starts here.",
        applyButtonText: "Apply Now",
        learnMoreButtonText: "Learn More"
    }
};

const DOC_ID = "programs-page";
const COLLECTION_NAME = "content";

/**
 * Fetch Programs Page content from Firestore
 */
export async function getProgramsPageContent(): Promise<ProgramsPageContent> {
    try {
        const docRef = doc(db, COLLECTION_NAME, DOC_ID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            // Deep merge with defaults to ensure all fields exist
            return {
                hero: { ...defaultProgramsPageContent.hero, ...data.hero },
                whyGlobal: { ...defaultProgramsPageContent.whyGlobal, ...data.whyGlobal },
                howItWorks: { ...defaultProgramsPageContent.howItWorks, ...data.howItWorks },
                countryPrograms: data.countryPrograms || defaultProgramsPageContent.countryPrograms,
                globalImpact: { ...defaultProgramsPageContent.globalImpact, ...data.globalImpact },
                studentStories: { ...defaultProgramsPageContent.studentStories, ...data.studentStories },
                difference: { ...defaultProgramsPageContent.difference, ...data.difference },
                cta: { ...defaultProgramsPageContent.cta, ...data.cta }
            } as ProgramsPageContent;
        }
        return defaultProgramsPageContent;
    } catch (error) {
        console.error("Error fetching programs page content:", error);
        return defaultProgramsPageContent;
    }
}

/**
 * Update Programs Page content in Firestore
 */
export async function updateProgramsPageContent(content: ProgramsPageContent): Promise<boolean> {
    try {
        const docRef = doc(db, COLLECTION_NAME, DOC_ID);
        await setDoc(docRef, content);
        return true;
    } catch (error) {
        console.error("Error updating programs page content:", error);
        return false;
    }
}
