import { Property } from "../types";
import { MOCK_USERS } from "./mockUsers";

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "s1",
    title: "Deluxe Room",
    host: MOCK_USERS["host1"],
    price: 77, // USD
    priceUnit: "night",
    rating: 5.0,
    reviewsCount: 124,
    images: ["/images/extracted_18.jpeg", "/images/extracted_19.jpeg"],
    amenities: ["Free Wi-Fi", "Pool", "Air Conditioning", "Room Service"],
    location: "Paramaribo",
    isSuperhost: true
  },
  {
    id: "s2",
    title: "Garden Room",
    host: MOCK_USERS["host1"],
    price: 65, // USD
    priceUnit: "night",
    rating: 4.8,
    reviewsCount: 89,
    images: ["/images/extracted_1.jpeg", "/images/extracted_21.jpeg"],
    amenities: ["Free Wi-Fi", "Garden View", "Air Conditioning"],
    location: "Paramaribo",
    isSuperhost: true
  },
  {
    id: "s3",
    title: "Pool View Suite",
    host: MOCK_USERS["host1"],
    price: 89, // USD
    priceUnit: "night",
    rating: 5.0,
    reviewsCount: 210,
    images: ["/images/extracted_6.jpeg"],
    amenities: ["Free Wi-Fi", "Pool View", "Air Conditioning", "Balcony"],
    location: "Paramaribo",
    isSuperhost: true
  },
  {
    id: "s4",
    title: "Poolside Apartment",
    host: MOCK_USERS["host1"],
    price: 100, // USD
    priceUnit: "night",
    rating: 5.0,
    reviewsCount: 156,
    images: ["/images/extracted_7.jpeg"],
    amenities: ["Free Wi-Fi", "Pool Access", "Kitchen", "Air Conditioning"],
    location: "Paramaribo",
    isSuperhost: true
  }
];
