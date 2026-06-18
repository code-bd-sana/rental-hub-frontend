import { Car } from "../types";
import { MOCK_USERS } from "./mockUsers";

export const MOCK_CARS: Car[] = [
  {
    id: "c1",
    model: "Toyota Rush",
    type: "SUV",
    year: 2022,
    seats: 7,
    transmission: "Automatic",
    pricePerDay: 54, // Converted from 600 SRD
    host: MOCK_USERS["host1"],
    rating: 4.8,
    reviewsCount: 124,
    images: ["/images/extracted_1.jpeg"],
    location: "Paramaribo, Suriname"
  },
  {
    id: "c2",
    model: "Hyundai Vitz",
    type: "Compact",
    year: 2021,
    seats: 5,
    transmission: "Automatic",
    pricePerDay: 41, // Converted from 450 SRD
    host: MOCK_USERS["host1"],
    rating: 4.7,
    reviewsCount: 89,
    images: ["/images/extracted_2.png"],
    location: "Paramaribo, Suriname"
  },
  {
    id: "c3",
    model: "Ford Fortuner",
    type: "SUV",
    year: 2023,
    seats: 7,
    transmission: "Automatic",
    pricePerDay: 54, // Converted from 600 SRD
    host: MOCK_USERS["host1"],
    rating: 4.9,
    reviewsCount: 156,
    images: ["/images/extracted_3.jpeg"],
    location: "Paramaribo, Suriname"
  },
  {
    id: "c4",
    model: "Isuzu Passo",
    type: "Compact",
    year: 2020,
    seats: 5,
    transmission: "Automatic",
    pricePerDay: 41, // Converted from 450 SRD
    host: MOCK_USERS["host1"],
    rating: 4.5,
    reviewsCount: 67,
    images: ["/images/extracted_4.jpeg"],
    location: "Paramaribo, Suriname"
  },
  {
    id: "c5",
    model: "Kia Mark X",
    type: "SUV",
    year: 2022,
    seats: 5,
    transmission: "Automatic",
    pricePerDay: 54, // Converted from 600 SRD
    host: MOCK_USERS["host1"],
    rating: 4.8,
    reviewsCount: 112,
    images: ["/images/extracted_5.jpeg"],
    location: "Paramaribo, Suriname"
  },
  {
    id: "c6",
    model: "Toyota Corolla",
    type: "Sedan",
    year: 2021,
    seats: 5,
    transmission: "Automatic",
    pricePerDay: 45,
    host: MOCK_USERS["host1"],
    rating: 4.6,
    reviewsCount: 94,
    images: ["/images/extracted_6.jpeg"],
    location: "Paramaribo, Suriname"
  },
  {
    id: "c7",
    model: "Honda Civic",
    type: "Sedan",
    year: 2022,
    seats: 5,
    transmission: "Automatic",
    pricePerDay: 48,
    host: MOCK_USERS["host1"],
    rating: 4.8,
    reviewsCount: 132,
    images: ["/images/extracted_7.jpeg"],
    location: "Paramaribo, Suriname"
  },
  {
    id: "c8",
    model: "Nissan CR-V",
    type: "SUV",
    year: 2023,
    seats: 7,
    transmission: "Automatic",
    pricePerDay: 60,
    host: MOCK_USERS["host1"],
    rating: 4.9,
    reviewsCount: 201,
    images: ["/images/extracted_8.jpeg"],
    location: "Paramaribo, Suriname"
  }
];