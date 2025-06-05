from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
import io
import os
from ultralytics import YOLO
import numpy as np

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development; restrict in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load YOLOv11 model using ultralytics
MODEL_PATH = os.path.join("weights", "best.pt")
model = YOLO(MODEL_PATH)

# Print model.names to verify class order at startup
print("Loaded YOLO model class names:", model.names)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        # Run inference (pass PIL Image directly)
        results = model.predict(source=image, conf=0.5, save=False, verbose=False)
        detections = []
        for r in results:
            boxes = r.boxes
            for box in boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                conf = float(box.conf[0].item())
                cls = int(box.cls[0].item())
                # Raw YOLO class names
                yolo_class_names = ['Glioma', 'Meningioma', 'notumor', 'Pituitary']
                raw_label = yolo_class_names[cls] if cls < len(yolo_class_names) else f"Class {cls}"
                # Override based on your observations
                if raw_label == 'notumor':
                    final_label = 'Glioma'
                elif raw_label == 'Pituitary':
                    final_label = 'notumor'
                elif raw_label == 'Glioma':
                    final_label = 'Pituitary'
                else:
                    final_label = 'Meningioma'
                detections.append({
                    "box": [x1, y1, x2, y2],
                    "confidence": conf,
                    "class_id": cls,
                    "class_name": final_label
                })
        return {"detections": detections}
    except Exception as e:
        return {"error": str(e)}