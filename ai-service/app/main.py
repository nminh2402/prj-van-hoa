from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.predict import router as predict_router

app = FastAPI(
    title="Cultural Artifact AI Vision Service",
    description="Microservice nhận diện hiện vật di sản văn hóa sử dụng YOLO",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router)

@app.get("/health")
def health_check():
    return {"status": "OK", "service": "Cultural Artifact AI Service"}
