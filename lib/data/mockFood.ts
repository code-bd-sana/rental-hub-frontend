import { Service } from "../types";
import { MOCK_USERS } from "./mockUsers";

export const MOCK_FOOD: Service[] = [
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
  }
];