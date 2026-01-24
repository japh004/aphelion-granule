export interface School {
    id: string;
    name: string;
    description?: string;
    address: string;
    city: string;
    phone?: string;
    email?: string;
    rating: number;
    reviewCount?: number;
    priceRange: {
        min: number;
        max: number;
    };
    imageUrl?: string;
    gallery?: string[];
    offers?: Offer[];
}

export interface Offer {
    id: string;
    name: string;
    description?: string;
    price: number;
    hours: number;
}

export interface SchoolFilters {
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
}
