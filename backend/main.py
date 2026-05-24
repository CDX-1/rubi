from fastapi import FastAPI
from pydantic import BaseModel
from ai import generate_schematic
import uvicorn

app = FastAPI()

class PromptRequest(BaseModel):
    prompt: str

@app.get("/")
def read_root():
    return {"message": "Welcome to Rubi!"}

@app.post("/api/generate")
async def generate_text(request: PromptRequest):
    return await generate_schematic(request.prompt)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)