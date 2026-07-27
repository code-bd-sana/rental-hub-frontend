import { apiClient } from './client';

export const bookingApi = {
  createBooking: async (payload: { listingId: string; totalAmount: number; depositAmount: number; bookingData: any }) => {
    const res = await apiClient('/bookings', {
      method: 'POST',
      data: payload
    });
    return res.data;
  },

  cancelBooking: async (id: string) => {
    const res = await apiClient.patch(`/bookings/${id}/cancel`);
    return res.data;
  },

  getMyBookings: async () => {
    const res = await apiClient('/bookings/my-bookings');
    return res.data;
  },
  getBookingById: async (id: string) => {
    const res = await apiClient(`/bookings/${id}`);
    return res.data;
  },
  getHostBookings: async () => {
    const res = await apiClient('/bookings/host-bookings');
    return res.data;
  }
};
