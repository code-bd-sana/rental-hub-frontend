import { apiClient } from './client';

export const listingApi = {
  // Get all public/approved listings
  getAllListings: async (params?: any) => {
    const response = await apiClient.get('/listings', { params });
    return response.data;
  },

  // Get a specific listing by ID
  getListingById: async (id: string) => {
    const res = await apiClient(`/listings/${id}`);
    return res.data;
  },

  // Get host's own listings
  getMyListings: async () => {
    const res = await apiClient('/listings/my-listings');
    return res.data;
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
