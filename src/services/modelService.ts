import { TumorClassification } from '../types/tumorTypes';

export const modelService = {
  async predictTumor(image: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', image);

    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Prediction failed');
    return await response.json();
  },

};