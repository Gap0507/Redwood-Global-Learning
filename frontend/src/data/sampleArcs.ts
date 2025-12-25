// Program location data for Redwood Global Learning
// Each location has programs and navigation links

export interface ProgramLocation {
    id: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
    flagCode: string;
    programs: {
        name: string;
        description: string;
        duration: string;
        slug: string;
    }[];
}

export const programLocations: ProgramLocation[] = [
    {
        id: "india",
        city: "New Delhi",
        country: "India",
        lat: 28.6139,
        lng: 77.209,
        flagCode: "in",
        programs: [
            {
                name: "Cultural Immersion Program",
                description: "Experience India's rich heritage through community engagement and cultural exchange.",
                duration: "4 weeks",
                slug: "/programs/india-cultural-immersion"
            },
            {
                name: "Social Innovation Lab",
                description: "Work with local NGOs on sustainable development projects.",
                duration: "6 weeks",
                slug: "/programs/india-social-innovation"
            }
        ]
    },
    {
        id: "uk",
        city: "London",
        country: "United Kingdom",
        lat: 51.5074,
        lng: -0.1278,
        flagCode: "gb",
        programs: [
            {
                name: "Global Leadership Academy",
                description: "Develop leadership skills with world-class mentors and institutions.",
                duration: "3 weeks",
                slug: "/programs/uk-leadership-academy"
            }
        ]
    },
    {
        id: "thailand",
        city: "Bangkok",
        country: "Thailand",
        lat: 13.7563,
        lng: 100.5018,
        flagCode: "th",
        programs: [
            {
                name: "Southeast Asia Explorer",
                description: "Explore diverse cultures and ecosystems across Southeast Asia.",
                duration: "5 weeks",
                slug: "/programs/thailand-explorer"
            }
        ]
    },
    {
        id: "vietnam",
        city: "Hanoi",
        country: "Vietnam",
        lat: 21.0285,
        lng: 105.8542,
        flagCode: "vn",
        programs: [
            {
                name: "Vietnam Heritage Program",
                description: "Discover Vietnam's history and modern transformation.",
                duration: "4 weeks",
                slug: "/programs/vietnam-heritage"
            }
        ]
    },
    {
        id: "japan",
        city: "Tokyo",
        country: "Japan",
        lat: 35.6762,
        lng: 139.6503,
        flagCode: "jp",
        programs: [
            {
                name: "Innovation & Technology Exchange",
                description: "Experience Japan's cutting-edge technology and traditional craftsmanship.",
                duration: "4 weeks",
                slug: "/programs/japan-innovation"
            }
        ]
    }
];

// Arc data connecting program locations
export const sampleArcs = [
    {
        order: 1,
        startLat: 28.6139,
        startLng: 77.209,
        endLat: 51.5074,
        endLng: -0.1278,
        arcAlt: 0.3,
        color: "#E63946",
    },
    {
        order: 2,
        startLat: 28.6139,
        startLng: 77.209,
        endLat: 13.7563,
        endLng: 100.5018,
        arcAlt: 0.2,
        color: "#E63946",
    },
    {
        order: 3,
        startLat: 28.6139,
        startLng: 77.209,
        endLat: 21.0285,
        endLng: 105.8542,
        arcAlt: 0.25,
        color: "#17437B",
    },
    {
        order: 4,
        startLat: 28.6139,
        startLng: 77.209,
        endLat: 35.6762,
        endLng: 139.6503,
        arcAlt: 0.35,
        color: "#E63946",
    },
    {
        order: 5,
        startLat: 51.5074,
        startLng: -0.1278,
        endLat: 13.7563,
        endLng: 100.5018,
        arcAlt: 0.4,
        color: "#17437B",
    },
    {
        order: 6,
        startLat: 35.6762,
        startLng: 139.6503,
        endLat: 21.0285,
        endLng: 105.8542,
        arcAlt: 0.2,
        color: "#E63946",
    },
    {
        order: 7,
        startLat: 51.5074,
        startLng: -0.1278,
        endLat: 35.6762,
        endLng: 139.6503,
        arcAlt: 0.45,
        color: "#17437B",
    },
    {
        order: 8,
        startLat: 13.7563,
        startLng: 100.5018,
        endLat: 35.6762,
        endLng: 139.6503,
        arcAlt: 0.25,
        color: "#E63946",
    },
];

export const globeConfig = {
    pointSize: 4,
    globeColor: "#ffffff",
    showAtmosphere: true,
    atmosphereColor: "#ffffff",
    atmosphereAltitude: 0.1,
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(24, 24, 27, 0.9)",
    ambientLight: "#ffffff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    autoRotate: true,
    autoRotateSpeed: 1,
};
