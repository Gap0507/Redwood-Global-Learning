import { db } from "./firebase";
import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from "firebase/firestore";

// --- Interfaces ---

export interface CarouselImage {
    image: string;
    title: string;
    description: string;
}

export interface ProgramCard {
    image: string;
    timeline: string;
    title: string;
    description: string;
}

export interface ProgramButton {
    text: string;
    link: string;
}

export interface InfoSection {
    content: string;
    image: string;
}

export interface StudentStory {
    description: string;
    name: string;
    program: string;
    starRating: number;
}

export interface CountryPageContent {
    slug: string;
    name: string;
    hero: {
        heroImage: string;
        heroTitle: string;
        heroDescription: string;
        carouselImages: CarouselImage[];
    };
    // 2. Our Programs
    programs: {
        mainTitle: string;
        description: string;
        programCards: ProgramCard[];
        buttons: ProgramButton[];
    };
    // 3. Life Experience
    lifeExperience: {
        title: string;
        description: string;
        buttonNames: string[];
    };
    // 4. Information Sections
    information: {
        housing: InfoSection;
        culture: InfoSection;
        language: InfoSection;
    };
    // 5. Student Stories
    studentStories: StudentStory[];
    // 6. CTA
    cta: {
        ctaImage: string;
    };
}

// --- Default Content (seeded from current static country-data.ts) ---

export const defaultCountryPages: Record<string, CountryPageContent> = {
    india: {
        slug: "india",
        name: "India",
        hero: {
            heroImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
            heroTitle: "India Programs",
            heroDescription: "Discover one of the world's oldest civilizations with a rapidly growing economy. Study in New Delhi or Mumbai while exploring India's diverse cultures, languages, and traditions across its vibrant cities.",
            carouselImages: [
                { image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&q=80", title: "Social Innovation", description: "Work with local NGOs" },
                { image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=400&q=80", title: "Business Hub", description: "Explore startup ecosystem" },
                { image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80", title: "Cultural Heritage", description: "Ancient temples & traditions" },
                { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", title: "Nature & Landscape", description: "Diverse natural beauty" },
                { image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", title: "Community Service", description: "Make a difference" },
                { image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&q=80", title: "Modern India", description: "Innovation & growth" },
            ],
        },
        programs: {
            mainTitle: "Programs Rooted in Global Learning",
            description: "Tailored academic experiences inspired by cultural discovery and real-world immersion in India.",
            programCards: [
                { image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80", timeline: "4 WEEKS", title: "Cultural Immersion Program", description: "Experience India's rich heritage through community engagement and cultural exchange. Visit ancient temples, participate in traditional festivals, and engage with local communities to understand India's diverse cultural tapestry." },
                { image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80", timeline: "6 WEEKS", title: "Social Innovation Lab", description: "Work with local NGOs on sustainable development projects in rural and urban communities. Learn about India's social challenges and contribute to meaningful solutions through hands-on project work." },
                { image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&q=80", timeline: "8 WEEKS", title: "Business & Entrepreneurship", description: "Study India's emerging startup ecosystem in Bangalore and Mumbai. Meet entrepreneurs, visit innovation hubs, and learn about India's transformation into a global technology powerhouse." },
            ],
            buttons: [
                { text: "Academic Credits", link: "#" },
                { text: "Cultural Activities", link: "#" },
                { text: "24/7 Support", link: "#" },
            ],
        },
        lifeExperience: {
            title: "Life in India",
            description: "Everything you need to know about living and learning",
            buttonNames: ["Housing", "Culture", "Language"],
        },
        information: {
            housing: { content: "We offer a range of vetted housing options including modern dormitories, private apartments, and homestays with local families. Experience authentic Indian hospitality while enjoying comfortable, safe accommodations in prime locations.", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80" },
            culture: { content: "Navigate India's rich cultural diversity with ease through our pre-departure orientation and on-site cultural workshops. From bustling street markets to serene temples, experience the vibrant tapestry of Indian traditions and customs.", image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80" },
            language: { content: "No prior Hindi or regional language experience is required. We provide comprehensive language support services and optional beginner to advanced Hindi/English courses to help you communicate effectively during your stay.", image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&q=80" },
        },
        studentStories: [
            { description: "My time in India was transformative. The cultural immersion program opened my eyes to perspectives I never imagined. From the Taj Mahal to rural villages, every moment was filled with discovery and growth.", name: "Sarah Chen", program: "Cultural Immersion Alumna", starRating: 5 },
            { description: "Working on sustainable development projects in India showed me the real impact of global education. The mentorship and hands-on experience prepared me for a career in international development.", name: "Marcus Johnson", program: "Social Innovation Participant", starRating: 5 },
        ],
        cta: { ctaImage: "" },
    },
    uk: {
        slug: "uk",
        name: "United Kingdom",
        hero: {
            heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
            heroTitle: "United Kingdom Programs",
            heroDescription: "Study in London and experience the UK's prestigious academic tradition, rich history, and cultural heritage. Home to some of the world's most renowned universities and institutions.",
            carouselImages: [
                { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", title: "Creative Arts", description: "UK's vibrant creative scene" },
                { image: "https://images.unsplash.com/photo-1520637836862-4d197d17c25a?w=400&q=80", title: "STEM Innovation", description: "Cutting-edge research" },
                { image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80", title: "London Skyline", description: "Iconic city views" },
                { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", title: "Natural Beauty", description: "Countryside exploration" },
                { image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", title: "Community", description: "Cultural engagement" },
                { image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&q=80", title: "Academic Life", description: "World-class universities" },
            ],
        },
        programs: {
            mainTitle: "Programs Rooted in Global Learning",
            description: "Tailored academic experiences inspired by cultural discovery and real-world immersion in the United Kingdom.",
            programCards: [
                { image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80", timeline: "3 WEEKS", title: "Global Leadership Academy", description: "Develop leadership skills with world-class mentors at prestigious London institutions. Learn from Oxford and Cambridge academics while exploring the UK's role in global affairs and innovation." },
                { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", timeline: "4 WEEKS", title: "Creative Arts & Culture", description: "Immerse yourself in the UK's vibrant creative scene. Visit world-famous museums, attend theater productions in the West End, and explore contemporary art galleries across London and Edinburgh." },
                { image: "https://images.unsplash.com/photo-1520637836862-4d197d17c25a?w=800&q=80", timeline: "6 WEEKS", title: "STEM Innovation Program", description: "Experience cutting-edge research at UK universities and innovation hubs. From Cambridge's tech cluster to London's financial district, discover how the UK leads in science and technology." },
            ],
            buttons: [
                { text: "Academic Credits", link: "#" },
                { text: "Cultural Activities", link: "#" },
                { text: "24/7 Support", link: "#" },
            ],
        },
        lifeExperience: {
            title: "Life in United Kingdom",
            description: "Everything you need to know about living and learning",
            buttonNames: ["Housing", "Culture", "Language"],
        },
        information: {
            housing: { content: "We provide carefully selected accommodation options including university dormitories, private apartments in central London, and homestays with British families. Enjoy London's world-class amenities while living comfortably and safely.", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80" },
            culture: { content: "Experience British culture through our comprehensive orientation program and ongoing cultural activities. From traditional pubs to modern cultural institutions, discover the UK's unique blend of tradition and innovation.", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
            language: { content: "All programs are conducted in English. We offer advanced English language support and cultural communication workshops to help you navigate different British accents and cultural contexts.", image: "https://images.unsplash.com/photo-1520637836862-4d197d17c25a?w=800&q=80" },
        },
        studentStories: [
            { description: "The Global Leadership Academy in London exceeded my expectations. The networking opportunities and mentorship from Oxford professors opened doors I never knew existed. This program changed my career trajectory.", name: "Elena Rodriguez", program: "Leadership Academy Graduate", starRating: 5 },
            { description: "Studying innovation in the UK showed me how research and entrepreneurship intersect. The access to Cambridge labs and London tech startups was incredible. I made connections that continue to benefit my work today.", name: "David Park", program: "STEM Innovation Participant", starRating: 5 },
        ],
        cta: { ctaImage: "" },
    },
    thailand: {
        slug: "thailand",
        name: "Thailand",
        hero: {
            heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
            heroTitle: "Thailand Programs",
            heroDescription: "Experience Thailand's perfect blend of ancient temples and modern innovation. Study in Bangkok while exploring Southeast Asia's rich cultural heritage and rapidly developing economy.",
            carouselImages: [
                { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", title: "Digital Innovation", description: "Growing tech ecosystem" },
                { image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&q=80", title: "Conservation", description: "Sustainable tourism" },
                { image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80", title: "Temple Life", description: "Ancient traditions" },
                { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", title: "Natural Beauty", description: "Tropical paradise" },
                { image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", title: "Community", description: "Local engagement" },
                { image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&q=80", title: "Modern Bangkok", description: "Urban exploration" },
            ],
        },
        programs: {
            mainTitle: "Programs Rooted in Global Learning",
            description: "Tailored academic experiences inspired by cultural discovery and real-world immersion in Thailand.",
            programCards: [
                { image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80", timeline: "5 WEEKS", title: "Southeast Asia Explorer", description: "Explore diverse cultures and ecosystems across Southeast Asia with Bangkok as your base. Visit ancient temples, experience local markets, and learn about Thailand's economic transformation." },
                { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", timeline: "4 WEEKS", title: "Digital Nomad Experience", description: "Experience Thailand's growing digital economy and startup ecosystem. Meet entrepreneurs, visit co-working spaces, and learn about Thailand's emergence as a regional tech hub." },
                { image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80", timeline: "6 WEEKS", title: "Sustainable Tourism & Conservation", description: "Study Thailand's approach to sustainable tourism and environmental conservation. Work with local organizations on community-based tourism projects and learn about preserving Thailand's natural heritage." },
            ],
            buttons: [
                { text: "Academic Credits", link: "#" },
                { text: "Cultural Activities", link: "#" },
                { text: "24/7 Support", link: "#" },
            ],
        },
        lifeExperience: {
            title: "Life in Thailand",
            description: "Everything you need to know about living and learning",
            buttonNames: ["Housing", "Culture", "Language"],
        },
        information: {
            housing: { content: "We arrange comfortable accommodation ranging from modern serviced apartments in Bangkok to traditional Thai houses in rural areas. Experience Thai hospitality while enjoying safe, convenient living arrangements.", image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80" },
            culture: { content: "Navigate Thailand's rich cultural landscape with our comprehensive cultural orientation and ongoing support. From Buddhist temples to floating markets, discover the warmth and traditions of Thai culture.", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
            language: { content: "Thai language courses are available for all levels. Our programs include basic Thai language instruction to help you communicate effectively and show respect for local customs during your stay.", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80" },
        },
        studentStories: [
            { description: "Thailand was the perfect introduction to Southeast Asia. From Bangkok's energy to Chiang Mai's tranquility, every aspect of the program was thoughtfully designed. The cultural insights I gained continue to enrich my life.", name: "Anna Kowalski", program: "Southeast Asia Explorer", starRating: 5 },
            { description: "Thailand's startup ecosystem surprised me with its innovation and energy. The program connected me with entrepreneurs who are shaping the future of digital business in Asia. An incredible learning experience.", name: "James Wilson", program: "Digital Nomad Experience", starRating: 5 },
        ],
        cta: { ctaImage: "" },
    },
    vietnam: {
        slug: "vietnam",
        name: "Vietnam",
        hero: {
            heroImage: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80",
            heroTitle: "Vietnam Programs",
            heroDescription: "Discover Vietnam's remarkable transformation from ancient civilization to modern economic powerhouse. Study in Hanoi while experiencing the country's rich history and dynamic future.",
            carouselImages: [
                { image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", title: "Innovation Hub", description: "Growing tech sector" },
                { image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&q=80", title: "Rural Development", description: "Community projects" },
                { image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&q=80", title: "Heritage Sites", description: "UNESCO landmarks" },
                { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", title: "Natural Beauty", description: "Stunning landscapes" },
                { image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", title: "Community", description: "Local engagement" },
                { image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&q=80", title: "Modern Vietnam", description: "Economic growth" },
            ],
        },
        programs: {
            mainTitle: "Programs Rooted in Global Learning",
            description: "Tailored academic experiences inspired by cultural discovery and real-world immersion in Vietnam.",
            programCards: [
                { image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80", timeline: "4 WEEKS", title: "Vietnam Heritage Program", description: "Explore Vietnam's incredible history from ancient civilizations to modern economic transformation. Visit UNESCO heritage sites, experience local traditions, and learn about Vietnam's remarkable development journey." },
                { image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", timeline: "5 WEEKS", title: "Innovation & Technology Hub", description: "Experience Vietnam's rapidly growing tech sector in Ho Chi Minh City and Hanoi. Meet startup founders, visit innovation centers, and understand how Vietnam became a regional technology leader." },
                { image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80", timeline: "6 WEEKS", title: "Rural Development Initiative", description: "Work on sustainable development projects in Vietnam's rural communities. Learn about agricultural innovation, community development, and Vietnam's approach to balancing tradition with progress." },
            ],
            buttons: [
                { text: "Academic Credits", link: "#" },
                { text: "Cultural Activities", link: "#" },
                { text: "24/7 Support", link: "#" },
            ],
        },
        lifeExperience: {
            title: "Life in Vietnam",
            description: "Everything you need to know about living and learning",
            buttonNames: ["Housing", "Culture", "Language"],
        },
        information: {
            housing: { content: "We provide comfortable accommodation options including modern apartments in city centers, traditional Vietnamese homes, and eco-friendly resorts. Experience authentic Vietnamese hospitality in safe, welcoming environments.", image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80" },
            culture: { content: "Immerse yourself in Vietnamese culture through our detailed orientation and cultural activities. From traditional water puppet shows to local markets, discover the rich traditions that shape Vietnamese society.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
            language: { content: "Vietnamese language courses are available at all levels. Our programs include essential Vietnamese phrases and cultural context to help you communicate respectfully and build meaningful connections.", image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80" },
        },
        studentStories: [
            { description: "Vietnam's history came alive through this program. From Halong Bay to the Cu Chi tunnels, every experience was educational and transformative. The program's balance of history and contemporary culture was perfect.", name: "Maria Garcia", program: "Heritage Program Graduate", starRating: 5 },
            { description: "Vietnam's tech scene is booming, and this program gave me incredible insights. Meeting startup founders and visiting innovation centers showed me the future of technology in Southeast Asia.", name: "Robert Kim", program: "Innovation Hub Participant", starRating: 5 },
        ],
        cta: { ctaImage: "" },
    },
    japan: {
        slug: "japan",
        name: "Japan",
        hero: {
            heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
            heroTitle: "Japan Programs",
            heroDescription: "Immerse yourself in a unique blend of ancient traditions and cutting-edge innovation. Study in Tokyo while experiencing Japan's rich cultural heritage, world-class education, and technological excellence.",
            carouselImages: [
                { image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&q=80", title: "Cultural Arts", description: "Traditional crafts" },
                { image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80", title: "Global Business", description: "International trade" },
                { image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80", title: "Cherry Blossoms", description: "Seasonal beauty" },
                { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", title: "Mt. Fuji", description: "Iconic landscapes" },
                { image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", title: "Community", description: "Cultural exchange" },
                { image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&q=80", title: "Tech Innovation", description: "Cutting-edge tech" },
            ],
        },
        programs: {
            mainTitle: "Programs Rooted in Global Learning",
            description: "Tailored academic experiences inspired by cultural discovery and real-world immersion in Japan.",
            programCards: [
                { image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", timeline: "4 WEEKS", title: "Innovation & Technology Exchange", description: "Experience Japan's cutting-edge technology and traditional craftsmanship. Visit robotics labs, meet innovators, and explore how Japan blends ancient wisdom with modern technological advancement." },
                { image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80", timeline: "5 WEEKS", title: "Cultural Arts & Traditions", description: "Dive deep into Japanese arts and traditions. Study calligraphy, tea ceremony, martial arts, and traditional crafts while experiencing Japan's unique cultural heritage and contemporary art scene." },
                { image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80", timeline: "6 WEEKS", title: "Global Business & Trade", description: "Study Japan's role in global business and international trade. Visit corporate headquarters, experience Japanese business culture, and learn about Japan's economic influence in the Asia-Pacific region." },
            ],
            buttons: [
                { text: "Academic Credits", link: "#" },
                { text: "Cultural Activities", link: "#" },
                { text: "24/7 Support", link: "#" },
            ],
        },
        lifeExperience: {
            title: "Life in Japan",
            description: "Everything you need to know about living and learning",
            buttonNames: ["Housing", "Culture", "Language"],
        },
        information: {
            housing: { content: "We arrange comfortable accommodation in traditional and modern settings, from capsule hotels to private apartments. Experience Japanese hospitality while enjoying clean, efficient, and culturally immersive living arrangements.", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80" },
            culture: { content: "Navigate Japanese customs with confidence through our comprehensive cultural training and ongoing support. From proper etiquette to seasonal festivals, discover the depth and beauty of Japanese culture.", image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80" },
            language: { content: "Japanese language courses are available for all levels. Our programs include essential Japanese language instruction combined with cultural context to help you communicate effectively and respectfully.", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80" },
        },
        studentStories: [
            { description: "Japan's blend of tradition and technology is mesmerizing. The program perfectly balanced cutting-edge robotics labs with ancient temples. Every day brought new discoveries and challenged my perspectives on innovation.", name: "Lisa Thompson", program: "Innovation Exchange Graduate", starRating: 5 },
            { description: "Learning tea ceremony and calligraphy in Kyoto was transformative. The program's respect for tradition while embracing modernity showed me a different way of thinking. Japan changed how I see the world.", name: "Carlos Mendoza", program: "Cultural Arts Participant", starRating: 5 },
        ],
        cta: { ctaImage: "" },
    },
    usa: {
        slug: "usa",
        name: "United States",
        hero: {
            heroImage: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80",
            heroTitle: "United States Programs",
            heroDescription: "Experience world-class education in America's top universities. From New York to California, explore diverse landscapes and cultures while building your global network and developing leadership skills.",
            carouselImages: [
                { image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&q=80", title: "Innovation Hub", description: "Silicon Valley & beyond" },
                { image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", title: "Community Service", description: "Social impact projects" },
                { image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=400&q=80", title: "NYC Skyline", description: "Urban exploration" },
                { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", title: "Natural Wonders", description: "National parks" },
                { image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80", title: "Community", description: "Diverse cultures" },
                { image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&q=80", title: "Campus Life", description: "University experience" },
            ],
        },
        programs: {
            mainTitle: "Programs Rooted in Global Learning",
            description: "Tailored academic experiences inspired by cultural discovery and real-world immersion in the United States.",
            programCards: [
                { image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80", timeline: "6 WEEKS", title: "American Dream Program", description: "Experience the American higher education system and cultural diversity. Study at partner universities, engage with local communities, and explore how America balances tradition with innovation across different regions." },
                { image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80", timeline: "8 WEEKS", title: "Innovation & Entrepreneurship", description: "Dive into America's startup ecosystem in Silicon Valley and beyond. Meet entrepreneurs, visit innovation hubs, and learn about the culture of creativity and risk-taking that drives American innovation." },
                { image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80", timeline: "5 WEEKS", title: "Social Impact & Community Service", description: "Engage in community service projects across America. Work with local organizations on social issues, learn about American civic engagement, and contribute to meaningful community development initiatives." },
            ],
            buttons: [
                { text: "Academic Credits", link: "#" },
                { text: "Cultural Activities", link: "#" },
                { text: "24/7 Support", link: "#" },
            ],
        },
        lifeExperience: {
            title: "Life in United States",
            description: "Everything you need to know about living and learning",
            buttonNames: ["Housing", "Culture", "Language"],
        },
        information: {
            housing: { content: "We provide a variety of accommodation options including university dormitories, private apartments, and homestays with American families. Experience American hospitality while living comfortably in vibrant, diverse communities.", image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80" },
            culture: { content: "Navigate America's diverse cultural landscape through our comprehensive orientation and ongoing cultural activities. From Broadway shows to local diners, discover the many facets of American culture and society.", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80" },
            language: { content: "All programs are conducted in English. We provide advanced English language support and cultural communication workshops to help you understand different American regional accents and cultural contexts.", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80" },
        },
        studentStories: [
            { description: "The American Dream program opened my eyes to so many possibilities. Studying at different universities across states showed me the incredible diversity of American education and culture. It was life-changing.", name: "Priya Patel", program: "American Dream Graduate", starRating: 5 },
            { description: "Silicon Valley exceeded my expectations. Meeting startup founders and visiting innovation labs showed me how American entrepreneurship really works. The networking opportunities were incredible.", name: "Ahmed Hassan", program: "Innovation Participant", starRating: 5 },
        ],
        cta: { ctaImage: "" },
    },
};

const COLLECTION_NAME = "content";
const DOC_PREFIX = "country-page-";

/**
 * Get the Firestore document ID for a country page
 */
function getDocId(slug: string): string {
    return `${DOC_PREFIX}${slug.toLowerCase()}`;
}

/**
 * Fetch country page content from Firestore with timeout
 * Returns default content if document doesn't exist or on error
 */
export async function getCountryPageContent(slug: string): Promise<CountryPageContent | null> {
    const normalizedSlug = slug.toLowerCase();
    try {
        const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("Firestore timeout")), 5000)
        );

        const fetchPromise = (async () => {
            const docRef = doc(db, COLLECTION_NAME, getDocId(normalizedSlug));
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data() as CountryPageContent;
            }
            // Fallback to default data
            return defaultCountryPages[normalizedSlug] || null;
        })();

        return await Promise.race([fetchPromise, timeoutPromise]);
    } catch (error) {
        console.error(`Error fetching country page content for ${slug} (using defaults):`, error);
        return defaultCountryPages[normalizedSlug] || null;
    }
}

/**
 * Update country page content in Firestore
 */
export async function updateCountryPageContent(slug: string, content: CountryPageContent): Promise<boolean> {
    try {
        const docRef = doc(db, COLLECTION_NAME, getDocId(slug.toLowerCase()));
        await setDoc(docRef, content);
        return true;
    } catch (error) {
        console.error(`Error updating country page content for ${slug}:`, error);
        return false;
    }
}

/**
 * Delete a country page from Firestore
 */
export async function deleteCountryPage(slug: string): Promise<boolean> {
    try {
        const docRef = doc(db, COLLECTION_NAME, getDocId(slug.toLowerCase()));
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error(`Error deleting country page for ${slug}:`, error);
        return false;
    }
}

/**
 * Get all country page slugs (from defaults + any custom ones in Firestore)
 */
export async function getAllCountryPageSlugs(): Promise<string[]> {
    const defaultSlugs = Object.keys(defaultCountryPages);
    try {
        const colRef = collection(db, COLLECTION_NAME);
        const snapshot = await getDocs(colRef);
        const firestoreSlugs: string[] = [];
        snapshot.forEach((docSnap) => {
            if (docSnap.id.startsWith(DOC_PREFIX)) {
                firestoreSlugs.push(docSnap.id.replace(DOC_PREFIX, ""));
            }
        });
        // Merge: defaults + any extra from Firestore
        const allSlugs = new Set([...defaultSlugs, ...firestoreSlugs]);
        return Array.from(allSlugs);
    } catch (error) {
        console.error("Error fetching all country page slugs:", error);
        return defaultSlugs;
    }
}
