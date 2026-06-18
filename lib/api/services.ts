import { Service } from "../types";
import { MOCK_FOOD } from "../data/mockFood";
import { MOCK_SALON } from "../data/mockSalon";
import { MOCK_BARBER } from "../data/mockBarber";
import { MOCK_SPA } from "../data/mockSpa";

const MOCK_SERVICES: Service[] = [...MOCK_FOOD, ...MOCK_SALON, ...MOCK_BARBER, ...MOCK_SPA];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getServices(): Promise<Service[]> {
  await delay(500); // Simulate network delay
  return MOCK_SERVICES;
}

export async function getServiceById(id: string): Promise<Service | undefined> {
  await delay(300);
  return MOCK_SERVICES.find((s) => s.id === id);
}
