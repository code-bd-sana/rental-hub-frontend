export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  isVerified: boolean;
}

export interface Property {
  id: string;
  title: string;
  host: User;
  price: number;
  priceUnit: "night" | "month";
  rating: number;
  reviewsCount: number;
  images: string[];
  amenities: string[];
  location: string;
  isSuperhost?: boolean;
}

export interface Car {
  id: string;
  model: string;
  brand: string;
  host: User;
  pricePerDay: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  specs: {
    seats: number;
    transmission: "Manual" | "Automatic";
    fuel: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  };
  location: string;
}

export interface Service {
  id: string;
  name: string;
  type: "Food" | "Salon" | "Spa" | "Barber";
  provider: User;
  rating: number;
  reviewsCount: number;
  image: string;
}

export interface Booking {
  id: string;
  userId: string;
  itemId: string; // Property ID or Car ID
  itemType: "property" | "car" | "service";
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export interface Review {
  id: string;
  userId: string;
  itemId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
