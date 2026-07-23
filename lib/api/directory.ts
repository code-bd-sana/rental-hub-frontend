import { apiClient } from './client';

export const directoryApi = {
  getPublicDirectories: async () => {
    const res = await apiClient('/directory/public');
    return res.data;
  },
  loadDirectory: async (formData: FormData) => {
    const res = await apiClient('/directory', {
      method: 'POST',
      data: formData,
      headers: {
        // Omitting Content-Type allows the browser to set it with the boundary for FormData
      }
    });
    return res.data;
  }
};
