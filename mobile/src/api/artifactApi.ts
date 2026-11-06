import { apiClient } from './client';
import { CulturalArtifact, ApiResponse } from '@prj-van-hoa/shared';

export const artifactApi = {
  getAll: (category?: string): Promise<ApiResponse<CulturalArtifact[]>> => {
    return apiClient.get('/artifacts', { params: { category } });
  },

  getById: (id: string): Promise<ApiResponse<CulturalArtifact>> => {
    return apiClient.get(`/artifacts/${id}`);
  },
};
