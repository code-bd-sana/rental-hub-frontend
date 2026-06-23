import { Property } from "../types";
import { MOCK_PROPERTIES } from "../data/mockProperties";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getProperties(): Promise<Property[]> {
  await delay(500); // Simulate network delay
  return MOCK_PROPERTIES;
}

export async function getPropertyById(id: string): Promise<Property | undefined> {
  await delay(300);
  return MOCK_PROPERTIES.find((p) => p.id === id);
}
