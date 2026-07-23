import { apiClient } from './client';

export const paymentApi = {
  createHostPaymentSession: async () => {
    const res = await apiClient('/payments/create-host-payment', {
      method: 'POST'
    });
    return res.data;
  },
  createGuestSubscriptionSession: async () => {
    const res = await apiClient('/payments/create-guest-subscription', {
      method: 'POST'
    });
    return res.data;
  }
};
