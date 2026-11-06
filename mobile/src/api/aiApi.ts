import { apiClient } from './client';
import { AiInferenceResponse } from '@prj-van-hoa/shared';

export const aiApi = {
  detectArtifact: (imageUri: string): Promise<AiInferenceResponse> => {
    const formData = new FormData();
    const filename = imageUri.split('/').pop() || 'photo.jpg';

    // @ts-ignore: React Native FormData file format
    formData.append('file', {
      uri: imageUri,
      name: filename,
      type: 'image/jpeg',
    });

    return apiClient.post('/ai/detect', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
