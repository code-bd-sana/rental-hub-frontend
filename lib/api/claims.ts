import { apiClient } from './client';

export const claimApi = {
  createClaim: async (formData: FormData) => {
    const res = await apiClient('/claims', {
      method: 'POST',
      data: formData,
      headers: {
        // Let the browser set Content-Type to multipart/form-data with boundary
      },
    });
    return res.data;
  },
};
