import { Service } from "../types";
import { MOCK_SERVICES } from "../data/mockServices";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getServices(): Promise<Service[]> {
  await delay(500); // Simulate network delay
  return MOCK_SERVICES;
}

export async function getServiceById(id: string): Promise<Service | undefined> {
  await delay(300);
  return MOCK_SERVICES.find((s) => s.id === id);
}
