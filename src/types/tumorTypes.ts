export interface BoundingBox {
  x: number;
  y: number;
  width: number; 
  height: number;
}

export interface TumorClassification {
  classification: string;
  confidence: number;
  boundingBox: BoundingBox | null;
  timestamp: string;
}
