import { db } from "./firebase";
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc } from "firebase/firestore";

// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface GlobeProgram {
    name: string;
    description: string;
    duration: string;
    slug: string;
}

export interface MasterCountry {
    slug: string;            // "india", "uk", "japan" — unique ID
    name: string;            // "India", "United Kingdom"
    flagCode: string;        // ISO 2-letter: "in", "gb", "jp"
    city: string;            // Main city: "New Delhi", "London"
    lat: number;             // Latitude for globe pin
    lng: number;             // Longitude for globe pin
    // Programs shown in the Hero Globe modal when clicking the pin
    heroGlobePrograms: GlobeProgram[];
    // Description shown on the left card of the "Where Can You Go" lower globe
    lowerGlobeDescription: string;
    lowerGlobeDuration: string; // e.g. "2 - 6 Weeks"
}

// ─── Default Countries (matches existing hardcoded data) ─────────────────────

export const defaultMasterCountries: MasterCountry[] = [
    {
        slug: "india",
        name: "India",
        flagCode: "in",
        city: "New Delhi",
        lat: 28.6139,
        lng: 77.209,
        heroGlobePrograms: [
            { name: "Cultural Immersion Program", description: "Experience India's rich heritage through community engagement and cultural exchange.", duration: "4 weeks", slug: "/programs/india-cultural-immersion" },
            { name: "Social Innovation Lab", description: "Work with local NGOs on sustainable development projects.", duration: "6 weeks", slug: "/programs/india-social-innovation" },
        ],
        lowerGlobeDescription: "Discover one of the world's oldest civilizations with a rapidly growing economy. Study in New Delhi while exploring India's diverse cultures, languages, and traditions.",
        lowerGlobeDuration: "2 - 6 Weeks",
    },
    {
        slug: "uk",
        name: "United Kingdom",
        flagCode: "gb",
        city: "London",
        lat: 51.5074,
        lng: -0.1278,
        heroGlobePrograms: [
            { name: "Global Leadership Academy", description: "Develop leadership skills with world-class mentors and institutions.", duration: "3 weeks", slug: "/programs/uk-leadership-academy" },
        ],
        lowerGlobeDescription: "Study in London and experience the UK's prestigious academic tradition, rich history, and cultural heritage.",
        lowerGlobeDuration: "2 - 6 Weeks",
    },
    {
        slug: "thailand",
        name: "Thailand",
        flagCode: "th",
        city: "Bangkok",
        lat: 13.7563,
        lng: 100.5018,
        heroGlobePrograms: [
            { name: "Southeast Asia Explorer", description: "Explore diverse cultures and ecosystems across Southeast Asia.", duration: "5 weeks", slug: "/programs/thailand-explorer" },
        ],
        lowerGlobeDescription: "Experience Thailand's perfect blend of ancient temples and modern innovation. Study in Bangkok while exploring Southeast Asia's rich cultural heritage.",
        lowerGlobeDuration: "2 - 6 Weeks",
    },
    {
        slug: "vietnam",
        name: "Vietnam",
        flagCode: "vn",
        city: "Hanoi",
        lat: 21.0285,
        lng: 105.8542,
        heroGlobePrograms: [
            { name: "Vietnam Heritage Program", description: "Discover Vietnam's history and modern transformation.", duration: "4 weeks", slug: "/programs/vietnam-heritage" },
        ],
        lowerGlobeDescription: "Discover Vietnam's remarkable transformation from ancient civilization to modern economic powerhouse.",
        lowerGlobeDuration: "2 - 6 Weeks",
    },
    {
        slug: "japan",
        name: "Japan",
        flagCode: "jp",
        city: "Tokyo",
        lat: 35.6762,
        lng: 139.6503,
        heroGlobePrograms: [
            { name: "Innovation & Technology Exchange", description: "Experience Japan's cutting-edge technology and traditional craftsmanship.", duration: "4 weeks", slug: "/programs/japan-innovation" },
        ],
        lowerGlobeDescription: "Immerse yourself in a unique blend of ancient traditions and cutting-edge innovation. Study in Tokyo while experiencing Japan's rich cultural heritage.",
        lowerGlobeDuration: "2 - 6 Weeks",
    },
    {
        slug: "usa",
        name: "United States",
        flagCode: "us",
        city: "New York",
        lat: 40.7128,
        lng: -74.006,
        heroGlobePrograms: [
            { name: "American Innovation Program", description: "Experience world-class education in America's top universities.", duration: "4 weeks", slug: "/programs/usa-innovation" },
        ],
        lowerGlobeDescription: "Experience world-class education in America's top universities. From New York to California, explore diverse landscapes and cultures.",
        lowerGlobeDuration: "2 - 6 Weeks",
    },
    {
        slug: "bali",
        name: "Bali, Indonesia",
        flagCode: "id",
        city: "Denpasar",
        lat: -8.4095,
        lng: 115.1889,
        heroGlobePrograms: [
            { name: "Island Explorer Program", description: "Discover Bali's unique blend of spirituality, art, and natural beauty.", duration: "4 weeks", slug: "/programs/bali-explorer" },
        ],
        lowerGlobeDescription: "Discover Bali's unique blend of spirituality, art, and natural beauty. Learn about sustainable living and cultural preservation.",
        lowerGlobeDuration: "2 - 6 Weeks",
    },
];

// ─── Firestore CRUD ──────────────────────────────────────────────────────────

const COLLECTION = "masterCountries";

/** Fetch all master countries. Falls back to defaults on error. */
export async function getMasterCountries(): Promise<MasterCountry[]> {
    try {
        const snap = await getDocs(collection(db, COLLECTION));
        if (snap.empty) return defaultMasterCountries;
        return snap.docs.map(d => d.data() as MasterCountry);
    } catch (err) {
        console.error("Error fetching master countries:", err);
        return defaultMasterCountries;
    }
}

/** Fetch a single master country by slug. */
export async function getMasterCountry(slug: string): Promise<MasterCountry | null> {
    try {
        const docSnap = await getDoc(doc(db, COLLECTION, slug));
        if (docSnap.exists()) return docSnap.data() as MasterCountry;
        return defaultMasterCountries.find(c => c.slug === slug) || null;
    } catch {
        return defaultMasterCountries.find(c => c.slug === slug) || null;
    }
}

/** Save (create or update) a master country. Uses slug as doc ID. */
export async function saveMasterCountry(country: MasterCountry): Promise<boolean> {
    try {
        await setDoc(doc(db, COLLECTION, country.slug), country);
        return true;
    } catch (err) {
        console.error("Error saving master country:", err);
        return false;
    }
}

/** Delete a master country by slug. */
export async function deleteMasterCountry(slug: string): Promise<boolean> {
    try {
        await deleteDoc(doc(db, COLLECTION, slug));
        return true;
    } catch (err) {
        console.error("Error deleting master country:", err);
        return false;
    }
}

/** Seed Firestore with default countries if collection is empty. */
export async function seedMasterCountries(): Promise<void> {
    const snap = await getDocs(collection(db, COLLECTION));
    if (!snap.empty) return; // already seeded
    for (const c of defaultMasterCountries) {
        await setDoc(doc(db, COLLECTION, c.slug), c);
    }
}
