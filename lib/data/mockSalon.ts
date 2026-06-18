import { Service } from "../types";
import { MOCK_USERS } from "./mockUsers";

export const MOCK_SALON: Service[] = [
  {
    id: "s1",
    name: "Classic Manicure",
    type: "Salon",
    provider: MOCK_USERS["host3"],
    rating: 4.7,
    reviewsCount: 89,
    image: "/images/extracted_70.jpeg"
  },
  {
    id: "s2",
    name: "Gel Manicure",
    type: "Salon",
    provider: MOCK_USERS["host3"],
    rating: 4.9,
    reviewsCount: 156,
    image: "/images/extracted_71.jpeg"
  },
  {
    id: "s3",
    name: "French Tips",
    type: "Salon",
    provider: MOCK_USERS["host3"],
    rating: 4.6,
    reviewsCount: 67,
    image: "/images/extracted_54.jpeg"
  },
  {
    id: "s4",
    name: "Classic Pedicure",
    type: "Salon",
    provider: MOCK_USERS["host3"],
    rating: 4.8,
    reviewsCount: 112,
    image: "/images/extracted_59.jpeg"
  },
  {
    id: "s5",
    name: "Spa Pedicure",
    type: "Salon",
    provider: MOCK_USERS["host3"],
    rating: 5.0,
    reviewsCount: 201,
    image: "/images/extracted_70.jpeg"
  },
  {
    id: "s6",
    name: "Nail Art",
    type: "Salon",
    provider: MOCK_USERS["host3"],
    rating: 4.8,
    reviewsCount: 134,
    image: "/images/extracted_71.jpeg"
  },
  {
    id: "s7",
    name: "Mani and Pedi Combo",
    type: "Salon",
    provider: MOCK_USERS["host3"],
    rating: 4.9,
    reviewsCount: 245,
    image: "/images/extracted_54.jpeg"
  }
];