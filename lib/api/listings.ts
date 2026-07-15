import { apiClient } from './client';

export const listingApi = {
  // Get all public/approved listings
  getAllListings: async (params?: any) => {
    const response = await apiClient.get('/listings', { params });
    return response.data;
  },

  // Get a specific listing by ID
  getListingById: async (id: string) => {
    const response = await apiClient.get(`/listings/${id}`);
    return response.data;
  },

  // Get host's own listings
  getMyListings: async () => {
    const response = await apiClient.get('/listings/my-listings');
    return response.data;
  },

  // Create a new listing
  createListing: async (data: any) => {
    const response = await apiClient.post('/listings', data);
    return response.data;
  },

  // Update a listing
  updateListing: async (id: string, data: any) => {
    const response = await apiClient.patch(`/listings/${id}`, data);
    return response.data;
  },

  // Delete a listing
  deleteListing: async (id: string) => {
    const response = await apiClient.delete(`/listings/${id}`);
    return response.data;
  },

  // Approve a listing (admin/agent only)
  approveListing: async (id: string, status: string) => {
    const response = await apiClient.patch(`/listings/${id}/approve`, { status });
    return response.data;
  }
};
