import { apiClient } from './client';
import { HeritageSite, ApiResponse } from '@prj-van-hoa/shared';

export const siteApi = {
  getAll: (limit: number = 50): Promise<ApiResponse<HeritageSite[]>> => {
    return apiClient.get('/sites', { params: { limit } });
  },

  getById: (id: string): Promise<ApiResponse<HeritageSite>> => {
    return apiClient.get(`/sites/${id}`);
  },
};
