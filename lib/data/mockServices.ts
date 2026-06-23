import { Service } from "../types";
import { MOCK_USERS } from "./mockUsers";

export const MOCK_SERVICES: Service[] = [
  // --- FOOD ---
  {
    id: "f1",
    name: "Creamy Chicken Plate",
    type: "Food",
    provider: MOCK_USERS["host2"],
    rating: 4.8,
    reviewsCount: 112,
    image: "/images/extracted_20.jpeg"
  },
  {
    id: "f2",
    name: "Crispy Chicken Bites",
    type: "Food",
    provider: MOCK_USERS["host2"],
    rating: 4.6,
    reviewsCount: 84,
    image: "/images/extracted_21.jpeg"
  },
  {
    id: "f3",
    name: "Signature Cocktail",
    type: "Food",
    provider: MOCK_USERS["host2"],
    rating: 4.9,
    reviewsCount: 45,
    image: "/images/extracted_22.jpeg"
  },
  {
    id: "f4",
    name: "Grilled Chicken Wrap",
    type: "Food",
    provider: MOCK_USERS["host2"],
    rating: 4.7,
    reviewsCount: 120,
    image: "/images/extracted_23.jpeg"
  },
  {
    id: "f5",
    name: "Surinamese Curry",
    type: "Food",
    provider: MOCK_USERS["host2"],
    rating: 5.0,
    reviewsCount: 320,
    image: "/images/extracted_24.jpeg"
  },
  {
    id: "f6",
    name: "Rice Bowl Duo",
    type: "Food",
    provider: MOCK_USERS["host2"],
    rating: 4.5,
    reviewsCount: 78,
    image: "/images/extracted_25.jpeg"
  },
  {
    id: "f7",
    name: "Veggie Wrap",
    type: "Food",
    provider: MOCK_USERS["host2"],
    rating: 4.4,
    reviewsCount: 56,
    image: "/images/extracted_26.jpeg"
  },
  {
    id: "f8",
    name: "Coconut Curry",
    type: "Food",
    provider: MOCK_USERS["host2"],
    rating: 4.8,
    reviewsCount: 145,
    image: "/images/extracted_27.jpeg"
  },
  
  // --- SALON ---
  {
    id: "s1",
    name: "Classic Manicure",
    type: "Salon",
    provider: MOCK_USERS["host3"],
    rating: 4.7,
    reviewsCount: 89,
    image: "/images/extracted_28.jpeg"
  },
  {
    id: "s2",
    name: "Gel Manicure",
    type: "Salon",
    provider: MOCK_USERS["host3"],
    rating: 4.9,
    reviewsCount: 156,
    image: "/images/extracted_29.jpeg"
  },
  {
    id: "s3",
    name: "French Tips",
    type: "Salon",
    provider: MOCK_USERS["host3"],
    rating: 4.6,
    reviewsCount: 67,
    image: "/images/extracted_30.jpeg"
  },
  {
    id: "s4",
    name: "Classic Pedicure",
    type: "Salon",
    provider: MOCK_USERS["host3"],
    rating: 4.8,
    reviewsCount: 112,
    image: "/images/extracted_31.jpeg"
  },
  {
    id: "s5",
    name: "Spa Pedicure",
    type: "Salon",
    provider: MOCK_USERS["host3"],
    rating: 5.0,
    reviewsCount: 201,
    image: "/images/extracted_32.jpeg"
  },
  {
    id: "s6",
    name: "Nail Art",
    type: "Salon",
    provider: MOCK_USERS["host3"],
    rating: 4.8,
    reviewsCount: 134,
    image: "/images/extracted_33.jpeg"
  },
  {
    id: "s7",
    name: "Mani and Pedi Combo",
    type: "Salon",
    provider: MOCK_USERS["host3"],
    rating: 4.9,
    reviewsCount: 245,
    image: "/images/extracted_34.jpeg"
  },
  
  // --- BARBER ---
  {
    id: "b1",
    name: "Fresh Fade",
    type: "Barber",
    provider: MOCK_USERS["host3"],
    rating: 4.9,
    reviewsCount: 312,
    image: "/images/extracted_35.jpeg"
  },
  {
    id: "b2",
    name: "Classic Cut",
    type: "Barber",
    provider: MOCK_USERS["host3"],
    rating: 4.7,
    reviewsCount: 189,
    image: "/images/extracted_36.jpeg"
  },
  {
    id: "b3",
    name: "Beard and Line Up",
    type: "Barber",
    provider: MOCK_USERS["host3"],
    rating: 4.8,
    reviewsCount: 245,
    image: "/images/extracted_37.jpeg"
  },
  {
    id: "b4",
    name: "Crew Cut",
    type: "Barber",
    provider: MOCK_USERS["host3"],
    rating: 4.6,
    reviewsCount: 76,
    image: "/images/extracted_38.jpeg"
  },
  {
    id: "b5",
    name: "Buzz Cut",
    type: "Barber",
    provider: MOCK_USERS["host3"],
    rating: 4.5,
    reviewsCount: 45,
    image: "/images/extracted_39.jpeg"
  },
  {
    id: "b6",
    name: "Kids Cut",
    type: "Barber",
    provider: MOCK_USERS["host3"],
    rating: 4.9,
    reviewsCount: 156,
    image: "/images/extracted_40.jpeg"
  },
  {
    id: "b7",
    name: "Wash and Blow Dry",
    type: "Barber",
    provider: MOCK_USERS["host3"],
    rating: 4.8,
    reviewsCount: 112,
    image: "/images/extracted_41.jpeg"
  },
  
  // --- SPA ---
  {
    id: "sp1",
    name: "Signature Facial",
    type: "Spa",
    provider: MOCK_USERS["host3"],
    rating: 5.0,
    reviewsCount: 345,
    image: "/images/extracted_42.jpeg"
  },
  {
    id: "sp2",
    name: "Deep Cleansing Facial",
    type: "Spa",
    provider: MOCK_USERS["host3"],
    rating: 4.9,
    reviewsCount: 212,
    image: "/images/extracted_43.jpeg"
  },
  {
    id: "sp3",
    name: "Foot Spa Ritual",
    type: "Spa",
    provider: MOCK_USERS["host3"],
    rating: 4.8,
    reviewsCount: 178,
    image: "/images/extracted_44.jpeg"
  },
  {
    id: "sp4",
    name: "Hair and Scalp Treatment",
    type: "Spa",
    provider: MOCK_USERS["host3"],
    rating: 4.7,
    reviewsCount: 134,
    image: "/images/extracted_45.jpeg"
  },
  {
    id: "sp5",
    name: "Body Scrub",
    type: "Spa",
    provider: MOCK_USERS["host3"],
    rating: 4.9,
    reviewsCount: 267,
    image: "/images/extracted_46.jpeg"
  },
  {
    id: "sp6",
    name: "Relax and Glow Package",
    type: "Spa",
    provider: MOCK_USERS["host3"],
    rating: 5.0,
    reviewsCount: 412,
    image: "/images/extracted_47.jpeg"
  }
];