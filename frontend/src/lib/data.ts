
export interface Review {
    id: string;
    user: string;
    rating: number;
    date: string;
    comment: string;
    avatarUrl?: string;
}

export interface Offer {
    id: string;
    title: string;
    price: number;
    description: string;
    type: "Permis B" | "Permis A" | "Code" | "Conduite Accompagnée";
    features: string[];
}

export interface Instructor {
    id: string;
    name: string;
    experience: string;
    photoUrl: string;
}

export interface DrivingSchool {
    id: string;
    name: string;
    address: string;
    city: string;
    price: number;
    rating: number;
    reviewCount: number;
    imageUrl: string;
    coordinates: [number, number]; // [lat, lng]
    features: string[];
    isVerified: boolean;

    // Detailed Fields
    description?: string;
    galleryImages?: string[];
    offers?: Offer[];
    reviews?: Review[];
    instructors?: Instructor[];
}

export const MOCK_SCHOOLS: DrivingSchool[] = [
    {
        id: "1",
        name: "Auto-École La Référence",
        address: "Carrefour Bastos, Yaoundé",
        city: "Yaoundé",
        price: 65000,
        rating: 4.8,
        reviewCount: 124,
        imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800&auto=format&fit=crop",
        coordinates: [3.8480, 11.5021],
        features: ["Permis B", "Code en ligne", "Paiement Mobile", "Véhicules Neufs"],
        isVerified: true,
        description: "Installée au cœur de Bastos depuis 10 ans, l'Auto-École La Référence forme les conducteurs de demain avec rigueur et bienveillance. Nous disposons d'une flotte de véhicules récents et climatisés (Toyota Yaris 2022). Nos cours de code sont disponibles en salle climatisée ou en ligne via notre application dédiée.",
        galleryImages: [
            "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1580273916550-e323be2ed532?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1621905252472-943af1f0dc0c?q=80&w=800&auto=format&fit=crop"
        ],
        offers: [
            {
                id: "o1",
                title: "Forfait Permis B Classique",
                price: 65000,
                type: "Permis B",
                description: "La formation complète pour obtenir votre permis B.",
                features: ["20h de Code", "15h de Conduite", "Frais d'examen inclus", "Livret d'apprentissage"]
            },
            {
                id: "o2",
                title: "Forfait Code Illimité",
                price: 15000,
                type: "Code",
                description: "Accès à la salle de code et à l'application en illimité.",
                features: ["Accès salle 6j/7", "App mobile", "Suivi progression"]
            },
            {
                id: "o3",
                title: "Permis Accéléré",
                price: 120000,
                type: "Permis B",
                description: "Votre permis en 3 semaines chrono.",
                features: ["Priorité planning", "20h de Conduite", "Code intensif"]
            }
        ],
        instructors: [
            { id: "i1", name: "Jean-Paul", experience: "15 ans", photoUrl: "" },
            { id: "i2", name: "Marie", experience: "8 ans", photoUrl: "" }
        ],
        reviews: [
            {
                id: "r1",
                user: "Junior M.",
                rating: 5,
                date: "12 Jan 2025",
                comment: "Super auto-école ! J'ai eu mon permis du premier coup. Merci à Jean-Paul pour sa patience."
            },
            {
                id: "r2",
                user: "Sarah K.",
                rating: 4,
                date: "05 Dec 2024",
                comment: "Très bonne formation, mais il faut s'y prendre tôt pour les créneaux du soir."
            }
        ]
    },
    {
        id: "2",
        name: "Planète Conduite Douala",
        address: "Akwa, Douala",
        city: "Douala",
        price: 60000,
        rating: 4.5,
        reviewCount: 89,
        imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ed532?q=80&w=800&auto=format&fit=crop",
        coordinates: [4.0511, 9.7679],
        features: ["Permis A", "Permis B", "Stages accélérés"],
        isVerified: true,
        description: "Située en plein cœur d'Akwa, Planète Conduite est la référence pour le permis moto et auto à Douala. Nos moniteurs certifiés vous accompagnent sur des circuits réels.",
        offers: [
            {
                id: "o2-1",
                title: "Permis Moto (A)",
                price: 45000,
                type: "Permis A",
                description: "Formation complète sur nos motos Yamaha neuves.",
                features: ["10h de plateau", "10h de circulation", "Casque fourni"]
            },
            {
                id: "o2-2",
                title: "Permis Auto (B)",
                price: 60000,
                type: "Permis B",
                description: "La formation classique efficace.",
                features: ["20h de Code", "20h de Conduite"]
            }
        ],
        reviews: [
            { id: "r2-1", user: "Alice Kobou", rating: 5, date: "10 Jan 2025", comment: "Très professionnels ! J'ai appris à conduire en 2 semaines." }
        ]
    },
    {
        id: "3",
        name: "Auto-École Emergence",
        address: "Biyem-Assi, Yaoundé",
        city: "Yaoundé",
        price: 55000,
        rating: 4.2,
        reviewCount: 45,
        imageUrl: "https://images.unsplash.com/photo-1599351431202-1e0f015886d3?q=80&w=800&auto=format&fit=crop",
        coordinates: [3.8300, 11.4900],
        features: ["Permis B", "Paiement en 3x"],
        isVerified: false,
        description: "L'option économique et flexible à Biyem-Assi. Payez à votre rythme.",
        offers: [
            {
                id: "o3-1",
                title: "Offre Étudiant",
                price: 55000,
                type: "Permis B",
                description: "Tarif spécial sur présentation de carte étudiant.",
                features: ["Horaires flexibles", "Paiement en 3 tranches"]
            }
        ]
    },
    {
        id: "4",
        name: "Campus Conduite",
        address: "Bonapriso, Douala",
        city: "Douala",
        price: 85000,
        rating: 4.9,
        reviewCount: 210,
        imageUrl: "https://images.unsplash.com/photo-1621905252472-943af1f0dc0c?q=80&w=800&auto=format&fit=crop",
        coordinates: [4.0400, 9.7100],
        features: ["Permis B", "Permis C", "Véhicules Climatisés", "Simulateur"],
        isVerified: true,
        description: "Le haut de gamme de la formation routière. Simulateur dernière génération inclus.",
        offers: [
            {
                id: "o4-1",
                title: "Pack Premium",
                price: 85000,
                type: "Permis B",
                description: "Confort et technologie pour une réussite assurée.",
                features: ["Simulateur de conduite", "Véhicule climatisé", "Moniteur dédié"]
            }
        ]
    },
    {
        id: "5",
        name: "Auto-École Université",
        address: "Ngoa-Ekélé, Yaoundé",
        city: "Yaoundé",
        price: 50000,
        rating: 3.9,
        reviewCount: 22,
        imageUrl: "https://images.unsplash.com/photo-1619643444265-d01804c81a2f?q=80&w=800&auto=format&fit=crop",
        coordinates: [3.8550, 11.5050],
        features: ["Étudiants", "Offre Duo"],
        isVerified: false,
        description: "Idéal pour les étudiants de Ngoa-Ekélé.",
    },
];

export function getSchoolById(id: string): DrivingSchool | undefined {
    return MOCK_SCHOOLS.find(s => s.id === id);
}
