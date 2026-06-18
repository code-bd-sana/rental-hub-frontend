import { Service } from "../types";
import { MOCK_USERS } from "./mockUsers";

export const MOCK_BARBER: Service[] = [
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
  }
];