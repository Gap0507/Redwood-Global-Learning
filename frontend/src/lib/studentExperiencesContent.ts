import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface Testimonial {
    id: string;
    text: string;
    image: string;
    name: string;
    role: string;
    country: string;
    flag: string;
}

export interface StudentExperiencesContent {
    sectionTagline: string;
    sectionTitle: string;
    sectionDescription: string;
    testimonials: Testimonial[];
}

export const defaultStudentExperiencesContent: StudentExperiencesContent = {
    sectionTagline: "TESTIMONIALS",
    sectionTitle: "Student Experiences",
    sectionDescription: "Hear directly from our students about their life-changing journeys.",
    testimonials: [
        {
            id: "1",
            text: "My exchange year was truly defined by the people I met. The bonds I formed with my host family and friends are lifelong.",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
            name: "Sarah Jenkins",
            role: "Student, France Program",
            country: "France",
            flag: "fr"
        },
        {
            id: "2",
            text: "Living in Tokyo opened my eyes to a completely different way of life. The culture shock was real but so rewarding.",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
            name: "Marcus Chen",
            role: "Student, Japan Program",
            country: "Japan",
            flag: "jp"
        },
        {
            id: "3",
            text: "I learned more about myself in 6 months abroad than I did in 3 years at home. It's a transformative experience.",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop",
            name: "Elena Rodriguez",
            role: "Student, Spain Program",
            country: "Spain",
            flag: "es"
        },
        {
            id: "4",
            text: "The support from Redwood Global was incredible. They made sure I felt safe and prepared every step of the way.",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
            name: "David Kim",
            role: "Student, USA Program",
            country: "USA",
            flag: "us"
        },
        {
            id: "5",
            text: "From the food to the festivals, every day was a new adventure. I can't wait to go back!",
            image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop",
            name: "Priya Patel",
            role: "Student, India Program",
            country: "India",
            flag: "in"
        },
        {
            id: "6",
            text: "Improving my language skills was my main goal, but I gained so much more confidence and independence.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
            name: "Tom Baker",
            role: "Student, Germany Program",
            country: "Germany",
            flag: "de"
        }
    ]
};

export const getStudentExperiencesContent = async (): Promise<StudentExperiencesContent> => {
    try {
        const docRef = doc(db, "content", "student-experiences");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as StudentExperiencesContent;
        }
    } catch (error) {
        console.error("Error fetching Student Experiences content:", error);
    }
    return defaultStudentExperiencesContent;
};

export const updateStudentExperiencesContent = async (content: StudentExperiencesContent): Promise<boolean> => {
    try {
        const docRef = doc(db, "content", "student-experiences");
        await setDoc(docRef, content);
        return true;
    } catch (error) {
        console.error("Error updating Student Experiences content:", error);
        return false;
    }
};
