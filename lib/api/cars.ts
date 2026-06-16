import { Car } from "../types";
import { MOCK_CARS } from "../data/mockCars";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getCars(): Promise<Car[]> {
  await delay(500); // Simulate network delay
  return MOCK_CARS;
}

export async function getCarById(id: string): Promise<Car | undefined> {
  await delay(300);
  return MOCK_CARS.find((c) => c.id === id);
}
