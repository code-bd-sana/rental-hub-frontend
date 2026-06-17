import { Car } from "../types";
import { MOCK_USERS } from "./mockUsers";

export const MOCK_CARS: Car[] = [
  {
    id: "c1",
    model: "Rush",
    brand: "Toyota",
    host: MOCK_USERS["host4"],
    pricePerDay: 55,
    rating: 4.9,
    reviewsCount: 65,
    images: ["/images/extracted_32.jpeg"],
    specs: {
      seats: 7,
      transmission: "Automatic",
      fuel: "Petrol"
    },
    location: "Paramaribo Airport"
  },
  {
    id: "c2",
    model: "RAV4",
    brand: "Toyota",
    host: MOCK_USERS["host4"],
    pricePerDay: 70,
    rating: 5.0,
    reviewsCount: 142,
    images: ["/images/extracted_33.jpeg"],
    specs: {
      seats: 5,
      transmission: "Automatic",
      fuel: "Hybrid"
    },
    location: "Paramaribo City Center"
  },
  {
    id: "c3",
    model: "Ractis",
    brand: "Toyota",
    host: MOCK_USERS["host4"],
    pricePerDay: 33,
    rating: 4.5,
    reviewsCount: 30,
    images: ["/images/extracted_34.jpeg"],
    specs: {
      seats: 5,
      transmission: "Automatic",
      fuel: "Petrol"
    },
    location: "Paramaribo North"
  },
  {
    id: "c4",
    model: "Sienta",
    brand: "Toyota",
    host: MOCK_USERS["host4"],
    pricePerDay: 47,
    rating: 4.7,
    reviewsCount: 88,
    images: ["/images/extracted_35.jpeg"],
    specs: {
      seats: 7,
      transmission: "Automatic",
      fuel: "Petrol"
    },
    location: "Paramaribo City Center"
  }
];
