import { Service } from "../types";
import { MOCK_USERS } from "./mockUsers";

export const MOCK_SPA: Service[] = [
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