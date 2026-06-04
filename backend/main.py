from fastapi import Depends, FastAPI
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel
from ai import generate_schematic
import uvicorn
from database.auth import get_current_user
from database.crud import create_client

app = FastAPI()
security = HTTPBearer()

class PromptRequest(BaseModel):
    prompt: str

class ProjectRequest(BaseModel):
    name: str | None = None
    initialPrompt: str

@app.get("/")
def read_root():
    return {"message": "Welcome to Rubi!"}

@app.post('/api/projects')
async def create_project(
    project_data: ProjectRequest,
    user: dict = Depends(get_current_user),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    raw_token = credentials.credentials
    client = await create_client(raw_token)
    client.table('projects').insert({
        'author_id': user.get('sub'),
        'title': project_data.name,
        'phase': 'initial'
    }).execute()

@app.post("/api/generate")
async def generate_text(request: PromptRequest, user: dict = Depends(get_current_user)):
    return await generate_schematic(request.prompt)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)