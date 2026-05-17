import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

load_dotenv()

client = genai.Client()

DATA_DIR = "data"
SYSTEM_INSTRUCTION = "You are a helpful assistant."
DEFAULT_MODEL = "gemini-3.1-flash-lite"

docs = []

for root, _, files in os.walk(DATA_DIR):
    for file in files:
        if file.endswith(".md"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                docs.append({
                    "path": path,
                    "content": f.read()
                })

def score_doc(query, doc):
    q = query.lower()
    content = doc["content"].lower()

    score = 0

    for word in q.split():
        if word in content:
            score += 2

    return score

def retrieve_docs(query, k=5):
    ranked = sorted(docs, key=lambda doc: score_doc(query, doc), reverse=True)
    return ranked[:k]

def chunk_md(text):
    chunks = text.split("\n## ")
    return chunks

def build_context(query):
    top_docs = retrieve_docs(query)
    
    context_parts = []

    for doc in top_docs:
        chunks = chunk_md(doc["content"])
        best_chunks = sorted(
            chunks,
            key=lambda c: score_doc(query, {"content": c}),
            reverse=True
        )[:2]

        context_parts.append("\n\n".join(best_chunks))

    return "\n\n---\n\n".join(context_parts)

class BlockPlacement(BaseModel):
    x: int
    y: int
    z: int
    block_type: str = Field(description="Minecraft block ID (ex: 'diamond_block' or 'air')")

class MinecraftSchematic(BaseModel):
    name: str
    description: str
    blocks: list[BlockPlacement]

async def generate_schematic(prompt: str) -> MinecraftSchematic:
    response = client.models.generate_content(
        model=DEFAULT_MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction=f"""
            {SYSTEM_INSTRUCTION}
            Context:
            {build_context(prompt)}
            """,
            response_mime_type="application/json",
            response_schema=MinecraftSchematic,
        ),
    )

    return MinecraftSchematic.model_validate_json(response.text)