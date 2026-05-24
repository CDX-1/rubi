import os
from sre_parse import IN
from dotenv import load_dotenv
from google import genai
from google.genai import types
from schem import create_schem
from schemas import MinecraftSchematic
import frontmatter

load_dotenv()

client = genai.Client()

DATA_DIR = "data"
INSTRUCTION_FILE = "instruction.md"
if os.path.exists(INSTRUCTION_FILE):
    with open(INSTRUCTION_FILE, "r") as f:
        SYSTEM_INSTRUCTION = f.read().strip()
else:
    SYSTEM_INSTRUCTION = "You are a helpful assistant."

DEFAULT_MODEL = "gemini-3.1-flash-lite"

docs = []

for root, _, files in os.walk(DATA_DIR):
    for file in files:
        if file.endswith(".md"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                post = frontmatter.load(f)
                
                docs.append({
                    "path": path,
                    "metadata": post.metadata,
                    "content": post.content
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

        body_context = "\n\n".join(best_chunks)
        
        meta = doc["metadata"]
        title = meta.get("title", "Unknown Source")
        block_id = meta.get("id", "N/A")
        properties = meta.get("properties", [])
        keynotes = meta.get("keynotes", [])

        metadata_header = (
            f"Source: {title}\n"
            f"Block ID: {block_id}\n"
            f"Properties: {properties}\n"
        )

        if keynotes:
            metadata_header += "CRITICAL BLOCK RULES:\n" + "\n".join(f"- {note}" for note in keynotes) + "\n"

        chunk_context = f"{metadata_header}\nContext Snippets:\n{body_context}"
        context_parts.append(chunk_context)

    return "\n\n---\n\n".join(context_parts)

async def generate_schematic(prompt: str) -> MinecraftSchematic:
    context = build_context(prompt)
    print(context)
    response = client.models.generate_content(
        model=DEFAULT_MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction=f"""
            {SYSTEM_INSTRUCTION}
            Context:
            {context}
            """,
            response_mime_type="application/json",
            response_schema=MinecraftSchematic,
        ),
    )

    create_schem(MinecraftSchematic.model_validate_json(response.text).blocks)
    return MinecraftSchematic.model_validate_json(response.text)