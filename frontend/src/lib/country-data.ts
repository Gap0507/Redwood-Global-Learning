export interface ProgramCard {
  title: string
  duration: string
  description: string
  image?: string
}

export interface LifeSection {
  housing: {
    title: string
    description: string
  }
  culture: {
    title: string
    description: string
  }
  language: {
    title: string
    description: string
  }
}

export interface Testimonial {
  name: string
  title: string
  quote: string
  image?: string
}

export interface CountryData {
  name: string
  heroTitle: string
  heroDescription: string
  programs: ProgramCard[]
  life: LifeSection
  testimonials: Testimonial[]
}

export const countryData: Record<string, CountryData> = {
  india: {
    name: "India",
    heroTitle: "Explore Our Programs in India",
    heroDescription: "Discover one of the world's oldest civilizations with a rapidly growing economy. Study in New Delhi or Mumbai while exploring India's diverse cultures, languages, and traditions across its vibrant cities.",
    programs: [
      {
        title: "Cultural Immersion Program",
        duration: "4 WEEKS",
        description: "Experience India's rich heritage through community engagement and cultural exchange. Visit ancient temples, participate in traditional festivals, and engage with local communities to understand India's diverse cultural tapestry.",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80"
      },
      {
        title: "Social Innovation Lab",
        duration: "6 WEEKS",
        description: "Work with local NGOs on sustainable development projects in rural and urban communities. Learn about India's social challenges and contribute to meaningful solutions through hands-on project work.",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80"
      },
      {
        title: "Business & Entrepreneurship",
        duration: "8 WEEKS",
        description: "Study India's emerging startup ecosystem in Bangalore and Mumbai. Meet entrepreneurs, visit innovation hubs, and learn about India's transformation into a global technology powerhouse.",
        image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&q=80"
      }
    ],
    life: {
      housing: {
        title: "Housing",
        description: "We offer a range of vetted housing options including modern dormitories, private apartments, and homestays with local families. Experience authentic Indian hospitality while enjoying comfortable, safe accommodations in prime locations."
      },
      culture: {
        title: "Culture",
        description: "Navigate India's rich cultural diversity with ease through our pre-departure orientation and on-site cultural workshops. From bustling street markets to serene temples, experience the vibrant tapestry of Indian traditions and customs."
      },
      language: {
        title: "Language",
        description: "No prior Hindi or regional language experience is required. We provide comprehensive language support services and optional beginner to advanced Hindi/English courses to help you communicate effectively during your stay."
      }
    },
    testimonials: [
      {
        name: "Sarah Chen",
        title: "Cultural Immersion Alumna",
        quote: "My time in India was transformative. The cultural immersion program opened my eyes to perspectives I never imagined. From the Taj Mahal to rural villages, every moment was filled with discovery and growth."
      },
      {
        name: "Marcus Johnson",
        title: "Social Innovation Participant",
        quote: "Working on sustainable development projects in India showed me the real impact of global education. The mentorship and hands-on experience prepared me for a career in international development."
      }
    ]
  },
  uk: {
    name: "United Kingdom",
    heroTitle: "Explore Our Programs in the United Kingdom",
    heroDescription: "Study in London and experience the UK's prestigious academic tradition, rich history, and cultural heritage. Home to some of the world's most renowned universities and institutions.",
    programs: [
      {
        title: "Global Leadership Academy",
        duration: "3 WEEKS",
        description: "Develop leadership skills with world-class mentors at prestigious London institutions. Learn from Oxford and Cambridge academics while exploring the UK's role in global affairs and innovation.",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80"
      },
      {
        title: "Creative Arts & Culture",
        duration: "4 WEEKS",
        description: "Immerse yourself in the UK's vibrant creative scene. Visit world-famous museums, attend theater productions in the West End, and explore contemporary art galleries across London and Edinburgh.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
      },
      {
        title: "STEM Innovation Program",
        duration: "6 WEEKS",
        description: "Experience cutting-edge research at UK universities and innovation hubs. From Cambridge's tech cluster to London's financial district, discover how the UK leads in science and technology.",
        image: "https://images.unsplash.com/photo-1520637836862-4d197d17c25a?w=800&q=80"
      }
    ],
    life: {
      housing: {
        title: "Housing",
        description: "We provide carefully selected accommodation options including university dormitories, private apartments in central London, and homestays with British families. Enjoy London's world-class amenities while living comfortably and safely."
      },
      culture: {
        title: "Culture",
        description: "Experience British culture through our comprehensive orientation program and ongoing cultural activities. From traditional pubs to modern cultural institutions, discover the UK's unique blend of tradition and innovation."
      },
      language: {
        title: "Language",
        description: "All programs are conducted in English. We offer advanced English language support and cultural communication workshops to help you navigate different British accents and cultural contexts."
      }
    },
    testimonials: [
      {
        name: "Elena Rodriguez",
        title: "Leadership Academy Graduate",
        quote: "The Global Leadership Academy in London exceeded my expectations. The networking opportunities and mentorship from Oxford professors opened doors I never knew existed. This program changed my career trajectory."
      },
      {
        name: "David Park",
        title: "STEM Innovation Participant",
        quote: "Studying innovation in the UK showed me how research and entrepreneurship intersect. The access to Cambridge labs and London tech startups was incredible. I made connections that continue to benefit my work today."
      }
    ]
  },
  thailand: {
    name: "Thailand",
    heroTitle: "Explore Our Programs in Thailand",
    heroDescription: "Experience Thailand's perfect blend of ancient temples and modern innovation. Study in Bangkok while exploring Southeast Asia's rich cultural heritage and rapidly developing economy.",
    programs: [
      {
        title: "Southeast Asia Explorer",
        duration: "5 WEEKS",
        description: "Explore diverse cultures and ecosystems across Southeast Asia with Bangkok as your base. Visit ancient temples, experience local markets, and learn about Thailand's economic transformation.",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80"
      },
      {
        title: "Digital Nomad Experience",
        duration: "4 WEEKS",
        description: "Experience Thailand's growing digital economy and startup ecosystem. Meet entrepreneurs, visit co-working spaces, and learn about Thailand's emergence as a regional tech hub.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
      },
      {
        title: "Sustainable Tourism & Conservation",
        duration: "6 WEEKS",
        description: "Study Thailand's approach to sustainable tourism and environmental conservation. Work with local organizations on community-based tourism projects and learn about preserving Thailand's natural heritage.",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80"
      }
    ],
    life: {
      housing: {
        title: "Housing",
        description: "We arrange comfortable accommodation ranging from modern serviced apartments in Bangkok to traditional Thai houses in rural areas. Experience Thai hospitality while enjoying safe, convenient living arrangements."
      },
      culture: {
        title: "Culture",
        description: "Navigate Thailand's rich cultural landscape with our comprehensive cultural orientation and ongoing support. From Buddhist temples to floating markets, discover the warmth and traditions of Thai culture."
      },
      language: {
        title: "Language",
        description: "Thai language courses are available for all levels. Our programs include basic Thai language instruction to help you communicate effectively and show respect for local customs during your stay."
      }
    },
    testimonials: [
      {
        name: "Anna Kowalski",
        title: "Southeast Asia Explorer",
        quote: "Thailand was the perfect introduction to Southeast Asia. From Bangkok's energy to Chiang Mai's tranquility, every aspect of the program was thoughtfully designed. The cultural insights I gained continue to enrich my life."
      },
      {
        name: "James Wilson",
        title: "Digital Nomad Experience",
        quote: "Thailand's startup ecosystem surprised me with its innovation and energy. The program connected me with entrepreneurs who are shaping the future of digital business in Asia. An incredible learning experience."
      }
    ]
  },
  vietnam: {
    name: "Vietnam",
    heroTitle: "Explore Our Programs in Vietnam",
    heroDescription: "Discover Vietnam's remarkable transformation from ancient civilization to modern economic powerhouse. Study in Hanoi while experiencing the country's rich history and dynamic future.",
    programs: [
      {
        title: "Vietnam Heritage Program",
        duration: "4 WEEKS",
        description: "Explore Vietnam's incredible history from ancient civilizations to modern economic transformation. Visit UNESCO heritage sites, experience local traditions, and learn about Vietnam's remarkable development journey.",
        image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80"
      },
      {
        title: "Innovation & Technology Hub",
        duration: "5 WEEKS",
        description: "Experience Vietnam's rapidly growing tech sector in Ho Chi Minh City and Hanoi. Meet startup founders, visit innovation centers, and understand how Vietnam became a regional technology leader.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
      },
      {
        title: "Rural Development Initiative",
        duration: "6 WEEKS",
        description: "Work on sustainable development projects in Vietnam's rural communities. Learn about agricultural innovation, community development, and Vietnam's approach to balancing tradition with progress.",
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80"
      }
    ],
    life: {
      housing: {
        title: "Housing",
        description: "We provide comfortable accommodation options including modern apartments in city centers, traditional Vietnamese homes, and eco-friendly resorts. Experience authentic Vietnamese hospitality in safe, welcoming environments."
      },
      culture: {
        title: "Culture",
        description: "Immerse yourself in Vietnamese culture through our detailed orientation and cultural activities. From traditional water puppet shows to local markets, discover the rich traditions that shape Vietnamese society."
      },
      language: {
        title: "Language",
        description: "Vietnamese language courses are available at all levels. Our programs include essential Vietnamese phrases and cultural context to help you communicate respectfully and build meaningful connections."
      }
    },
    testimonials: [
      {
        name: "Maria Garcia",
        title: "Heritage Program Graduate",
        quote: "Vietnam's history came alive through this program. From Halong Bay to the Cu Chi tunnels, every experience was educational and transformative. The program's balance of history and contemporary culture was perfect."
      },
      {
        name: "Robert Kim",
        title: "Innovation Hub Participant",
        quote: "Vietnam's tech scene is booming, and this program gave me incredible insights. Meeting startup founders and visiting innovation centers showed me the future of technology in Southeast Asia."
      }
    ]
  },
  japan: {
    name: "Japan",
    heroTitle: "Explore Our Programs in Japan",
    heroDescription: "Immerse yourself in a unique blend of ancient traditions and cutting-edge innovation. Study in Tokyo while experiencing Japan's rich cultural heritage, world-class education, and technological excellence.",
    programs: [
      {
        title: "Innovation & Technology Exchange",
        duration: "4 WEEKS",
        description: "Experience Japan's cutting-edge technology and traditional craftsmanship. Visit robotics labs, meet innovators, and explore how Japan blends ancient wisdom with modern technological advancement.",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80"
      },
      {
        title: "Cultural Arts & Traditions",
        duration: "5 WEEKS",
        description: "Dive deep into Japanese arts and traditions. Study calligraphy, tea ceremony, martial arts, and traditional crafts while experiencing Japan's unique cultural heritage and contemporary art scene.",
        image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80"
      },
      {
        title: "Global Business & Trade",
        duration: "6 WEEKS",
        description: "Study Japan's role in global business and international trade. Visit corporate headquarters, experience Japanese business culture, and learn about Japan's economic influence in the Asia-Pacific region.",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80"
      }
    ],
    life: {
      housing: {
        title: "Housing",
        description: "We arrange comfortable accommodation in traditional and modern settings, from capsule hotels to private apartments. Experience Japanese hospitality while enjoying clean, efficient, and culturally immersive living arrangements."
      },
      culture: {
        title: "Culture",
        description: "Navigate Japanese customs with confidence through our comprehensive cultural training and ongoing support. From proper etiquette to seasonal festivals, discover the depth and beauty of Japanese culture."
      },
      language: {
        title: "Language",
        description: "Japanese language courses are available for all levels. Our programs include essential Japanese language instruction combined with cultural context to help you communicate effectively and respectfully."
      }
    },
    testimonials: [
      {
        name: "Lisa Thompson",
        title: "Innovation Exchange Graduate",
        quote: "Japan's blend of tradition and technology is mesmerizing. The program perfectly balanced cutting-edge robotics labs with ancient temples. Every day brought new discoveries and challenged my perspectives on innovation."
      },
      {
        name: "Carlos Mendoza",
        title: "Cultural Arts Participant",
        quote: "Learning tea ceremony and calligraphy in Kyoto was transformative. The program's respect for tradition while embracing modernity showed me a different way of thinking. Japan changed how I see the world."
      }
    ]
  },
  usa: {
    name: "United States",
    heroTitle: "Explore Our Programs in the United States",
    heroDescription: "Experience world-class education in America's top universities. From New York to California, explore diverse landscapes and cultures while building your global network and developing leadership skills.",
    programs: [
      {
        title: "American Dream Program",
        duration: "6 WEEKS",
        description: "Experience the American higher education system and cultural diversity. Study at partner universities, engage with local communities, and explore how America balances tradition with innovation across different regions.",
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80"
      },
      {
        title: "Innovation & Entrepreneurship",
        duration: "8 WEEKS",
        description: "Dive into America's startup ecosystem in Silicon Valley and beyond. Meet entrepreneurs, visit innovation hubs, and learn about the culture of creativity and risk-taking that drives American innovation.",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80"
      },
      {
        title: "Social Impact & Community Service",
        duration: "5 WEEKS",
        description: "Engage in community service projects across America. Work with local organizations on social issues, learn about American civic engagement, and contribute to meaningful community development initiatives.",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
      }
    ],
    life: {
      housing: {
        title: "Housing",
        description: "We provide a variety of accommodation options including university dormitories, private apartments, and homestays with American families. Experience American hospitality while living comfortably in vibrant, diverse communities."
      },
      culture: {
        title: "Culture",
        description: "Navigate America's diverse cultural landscape through our comprehensive orientation and ongoing cultural activities. From Broadway shows to local diners, discover the many facets of American culture and society."
      },
      language: {
        title: "Language",
        description: "All programs are conducted in English. We provide advanced English language support and cultural communication workshops to help you understand different American regional accents and cultural contexts."
      }
    },
    testimonials: [
      {
        name: "Priya Patel",
        title: "American Dream Graduate",
        quote: "The American Dream program opened my eyes to so many possibilities. Studying at different universities across states showed me the incredible diversity of American education and culture. It was life-changing."
      },
      {
        name: "Ahmed Hassan",
        title: "Innovation Participant",
        quote: "Silicon Valley exceeded my expectations. Meeting startup founders and visiting innovation labs showed me how American entrepreneurship really works. The networking opportunities were incredible."
      }
    ]
  }
}

export function getCountryData(country: string): CountryData | null {
  return countryData[country.toLowerCase()] || null
}

export function getAllCountries(): string[] {
  return Object.keys(countryData)
}
