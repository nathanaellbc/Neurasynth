import { useState, useCallback } from 'react';
import { TumorClassification } from '../types/tumorTypes';
import { modelService } from '../services/modelService';

export const useModelPrediction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<TumorClassification | null>(null);
  const [error, setError] = useState<string | null>(null);

  const predict = useCallback(async (image: File) => {
    setIsLoading(true);
    setError(null);
    try {
      // Load image to get dimensions for percentage conversion
      const img = new window.Image();
      const imageUrl = URL.createObjectURL(image);
      img.src = imageUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      const imgWidth = img.width;
      const imgHeight = img.height;
      URL.revokeObjectURL(imageUrl);

      const response = await modelService.predictTumor(image);
      const detection = Array.isArray(response.detections)
        ? response.detections[0]
        : response;

      if (detection) {
        const [x1, y1, x2, y2] = detection.box;
        // Map 'notumor' and 'nottumor' to 'Normal' for display, capitalize others
        const classNameLower = detection.class_name.toLowerCase();
        let classification;
        if (classNameLower === 'nottumor' || classNameLower === 'notumor') {
          classification = 'Normal';
        } else {
          // Capitalize first letter, lowercase the rest
          classification = detection.class_name.charAt(0).toUpperCase() + detection.class_name.slice(1).toLowerCase();
        }
        setResults({
          classification,
          confidence: Math.round(detection.confidence * 100),
          boundingBox: {
            x: (x1 / imgWidth) * 100,
            y: (y1 / imgHeight) * 100,
            width: ((x2 - x1) / imgWidth) * 100,
            height: ((y2 - y1) / imgHeight) * 100,
          },
          timestamp: new Date().toISOString(),
        });
      } else {
        setResults({
          classification: "Normal",
          confidence: 100,
          boundingBox: null,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error('Error during prediction:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    predict,
    isLoading,
    results,
    error
  };
};