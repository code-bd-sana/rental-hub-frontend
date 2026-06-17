import { Property } from "../types";
import { MOCK_USERS } from "./mockUsers";

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "p1",
    title: "Deluxe Room",
    type: "Room",
    price: 77, // Converted from 850 SRD (approx)
    priceUnit: "night",
    rating: 5.0,
    reviewsCount: 124,
    location: "Paramaribo, Suriname",
    host: MOCK_USERS["host1"],
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    images: ["/images/extracted_10.png", "/images/extracted_11.jpeg", "/images/extracted_12.jpeg", "/images/extracted_13.jpeg"]
  },
  {
    id: "p2",
    title: "Garden Room",
    type: "Room",
    price: 65, // Converted from 720 SRD (approx)
    priceUnit: "night",
    rating: 5.0,
    reviewsCount: 89,
    location: "Paramaribo, Suriname",
    host: MOCK_USERS["host1"],
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    images: ["/images/extracted_14.jpeg", "/images/extracted_15.jpeg", "/images/extracted_16.jpeg", "/images/extracted_17.jpeg"]
  },
  {
    id: "p3",
    title: "Pool View Suite",
    type: "Suite",
    price: 89, // Converted from 980 SRD (approx)
    priceUnit: "night",
    rating: 5.0,
    reviewsCount: 156,
    location: "Paramaribo, Suriname",
    host: MOCK_USERS["host1"],
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    images: ["/images/extracted_18.jpeg", "/images/extracted_19.jpeg", "/images/extracted_1.jpeg", "/images/extracted_2.png"]
  },
  {
    id: "p4",
    title: "Poolside Apartment",
    type: "Apartment",
    price: 100, // Converted from 1100 SRD (approx)
    priceUnit: "night",
    rating: 5.0,
    reviewsCount: 201,
    location: "Paramaribo, Suriname",
    host: MOCK_USERS["host1"],
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 1,
    images: ["/images/extracted_3.jpeg", "/images/extracted_4.jpeg", "/images/extracted_5.jpeg", "/images/extracted_6.jpeg"]
  },
  {
    id: "p5",
    title: "Standard Room",
    type: "Room",
    price: 62, // Converted from 680 SRD (approx)
    priceUnit: "night",
    rating: 5.0,
    reviewsCount: 67,
    location: "Paramaribo, Suriname",
    host: MOCK_USERS["host1"],
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    images: ["/images/extracted_7.jpeg", "/images/extracted_8.jpeg", "/images/extracted_9.jpeg", "/images/extracted_10.png"]
  },
  {
    id: "p6",
    title: "Resort Day Pass",
    type: "Pass",
    price: 69, // Converted from 760 SRD (approx)
    priceUnit: "day",
    rating: 5.0,
    reviewsCount: 312,
    location: "Paramaribo, Suriname",
    host: MOCK_USERS["host1"],
    guests: 1,
    bedrooms: 0,
    beds: 0,
    baths: 1,
    images: ["/images/extracted_11.jpeg", "/images/extracted_12.jpeg", "/images/extracted_13.jpeg", "/images/extracted_14.jpeg"]
  }
];