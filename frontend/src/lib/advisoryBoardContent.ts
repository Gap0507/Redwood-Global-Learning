import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// --- Interfaces ---

export interface BoardMember {
    id: string;
    name: string;
    title: string;
    organization: string;
    image: string;
}

export interface AdvisoryBoardContent {
    hero: {
        tagline: string;
        title: string;
        highlightText: string;
        description: string;
        image: string;
        ctaText: string;
        quote: string;
    };
    membersSection: {
        tagline: string;
        title: string;
        description: string;
        members: BoardMember[];
    };
    excellenceSection: {
        title: string;
        highlightText: string;
        description1: string;
        description2: string;
        stats: {
            members: string;
            countries: string;
            students: string;
        };
    };
}

// --- Default Content ---

export const defaultAdvisoryBoardContent: AdvisoryBoardContent = {
    hero: {
        tagline: "Advisory Board",
        title: "Distinguished",
        highlightText: "Leadership",
        description: "A curated collective of visionaries, educators, and global leaders shaping the future of international education through transformative experiences.",
        image: "/GuidingExcellance.png",
        ctaText: "Connect With Us",
        quote: "Together, we're building bridges between cultures and creating opportunities that transform lives.",
    },
    membersSection: {
        tagline: "Our Team",
        title: "Meet the Board",
        description: "Expertise spanning academia, international relations, and cultural exchange",
        members: [
            {
                id: "1",
                name: "Dr. Sarah Chen",
                title: "Director of International Programs",
                organization: "Harvard University",
                image: ""
            },
            {
                id: "2",
                name: "Prof. Michael Rodriguez",
                title: "Dean of Global Studies",
                organization: "Stanford University",
                image: ""
            },
            {
                id: "3",
                name: "Dr. Aisha Patel",
                title: "Head of Cultural Exchange",
                organization: "Oxford University",
                image: ""
            },
            {
                id: "4",
                name: "Prof. James Thompson",
                title: "Executive Director",
                organization: "UNESCO Education Division",
                image: ""
            },
            {
                id: "5",
                name: "Dr. Maria Santos",
                title: "VP of Global Partnerships",
                organization: "World Education Alliance",
                image: ""
            },
            {
                id: "6",
                name: "Prof. David Kim",
                title: "Director of International Relations",
                organization: "Yale University",
                image: ""
            },
            {
                id: "7",
                name: "Dr. Lisa Wong",
                title: "Chief Academic Officer",
                organization: "MIT Global Education",
                image: ""
            },
            {
                id: "8",
                name: "Prof. Robert Johnson",
                title: "President Emeritus",
                organization: "International Education Council",
                image: ""
            },
            {
                id: "9",
                name: "Dr. Fatima Al-Zahra",
                title: "Director of Student Mobility",
                organization: "European University Network",
                image: ""
            },
            {
                id: "10",
                name: "Prof. Hiroshi Tanaka",
                title: "Vice President",
                organization: "Asia-Pacific Education Forum",
                image: ""
            },
            {
                id: "11",
                name: "Dr. Emma Wilson",
                title: "Chief Innovation Officer",
                organization: "Global Learning Institute",
                image: ""
            },
            {
                id: "12",
                name: "Prof. Carlos Mendoza",
                title: "Director of Cultural Programs",
                organization: "Latin American Education Network",
                image: ""
            }
        ]
    },
    excellenceSection: {
        title: "Guiding Excellence in",
        highlightText: "Global Education",
        description1: "Our Advisory Board plays a crucial role in shaping the strategic direction of Redwood Global Learning. Comprised of distinguished leaders from academia, international education, and cultural exchange, they provide invaluable insights and guidance to ensure our programs meet the highest standards of excellence.",
        description2: "Through their collective expertise, we continue to expand our global reach, enhance program quality, and create meaningful connections between students and institutions worldwide.",
        stats: {
            members: "12+",
            countries: "45+",
            students: "2K+"
        }
    }
};

const DOC_ID = "advisory-board";
const COLLECTION_NAME = "content";

export async function getAdvisoryBoardContent(): Promise<AdvisoryBoardContent> {
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
                    hero: { ...defaultAdvisoryBoardContent.hero, ...data.hero },
                    membersSection: {
                        ...defaultAdvisoryBoardContent.membersSection,
                        ...data.membersSection,
                        members: data.membersSection?.members || defaultAdvisoryBoardContent.membersSection.members
                    },
                    excellenceSection: { ...defaultAdvisoryBoardContent.excellenceSection, ...data.excellenceSection },
                } as AdvisoryBoardContent;
            }
            return defaultAdvisoryBoardContent;
        })();

        return await Promise.race([fetchPromise, timeoutPromise]);
    } catch (error) {
        console.error("Error fetching advisory board content (using defaults):", error);
        return defaultAdvisoryBoardContent;
    }
}

export async function updateAdvisoryBoardContent(content: AdvisoryBoardContent): Promise<boolean> {
    try {
        const docRef = doc(db, COLLECTION_NAME, DOC_ID);
        await setDoc(docRef, content);
        return true;
    } catch (error) {
        console.error("Error updating advisory board content:", error);
        return false;
    }
}
