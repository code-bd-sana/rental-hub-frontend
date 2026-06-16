import { Service } from "../types";
import { MOCK_USERS } from "./mockUsers";

export const MOCK_SERVICES: Service[] = [
  {
    id: "srv1",
    name: "Signature Facial",
    type: "Spa",
    provider: MOCK_USERS["host3"],
    rating: 5.0,
    reviewsCount: 45,
    image: "/images/extracted_2.jpeg"
  },
  {
    id: "srv2",
    name: "Classic Manicure",
    type: "Salon",
    provider: MOCK_USERS["host3"],
    rating: 4.8,
    reviewsCount: 88,
    image: "/images/extracted_3.jpeg"
  },
  {
    id: "srv3",
    name: "Wings Platter",
    type: "Food",
    provider: MOCK_USERS["host2"],
    rating: 4.9,
    reviewsCount: 230,
    image: "/images/extracted_4.jpeg"
  },
  {
    id: "srv4",
    name: "Fresh Fade Cut",
    type: "Barber",
    provider: MOCK_USERS["host3"],
    rating: 5.0,
    reviewsCount: 312,
    image: "/images/extracted_5.jpeg"
  }
];
