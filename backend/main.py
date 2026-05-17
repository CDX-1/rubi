from fastapi import FastAPI
from pydantic import BaseModel
from ai import generate_schematic

app = FastAPI()

class PromptRequest(BaseModel):
    prompt: str

@app.get("/")
def read_root():
    return {"message": "Welcome to Rubi!"}

@app.post("/api/generate")
async def generate_text(request: PromptRequest):
    return await generate_schematic(request.prompt)