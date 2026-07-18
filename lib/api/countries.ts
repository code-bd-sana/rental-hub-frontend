import { apiClient } from './client';

export const countryApi = {
  getAllCountries: async () => {
    const response = await apiClient.get('/countries');
    return response.data;
  },

  createCountry: async (data: { name: string; target?: number }) => {
    const response = await apiClient.post('/countries', data);
    return response.data;
  },

  updateCountry: async (id: string, data: { name?: string; target?: number }) => {
    const response = await apiClient.patch(`/countries/${id}`, data);
    return response.data;
  },

  deleteCountry: async (id: string) => {
    const response = await apiClient.delete(`/countries/${id}`);
    return response.data;
  }
};
