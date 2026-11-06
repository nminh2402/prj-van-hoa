from fastapi import APIRouter, File, UploadFile, HTTPException
import time
from app.services.detector import detector

router = APIRouter(prefix="/api/v1", tags=["Predict"])

@router.post("/predict")
async def predict_artifact(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Chỉ chấp nhận file hình ảnh")

    try:
        start_time = time.time()
        contents = await file.read()
        detections = detector.detect(contents)
        inference_time_ms = round((time.time() - start_time) * 1000, 2)

        return {
            "success": True,
            "inferenceTimeMs": inference_time_ms,
            "detections": detections
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi nhận diện: {str(e)}")
