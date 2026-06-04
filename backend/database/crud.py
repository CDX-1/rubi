from supabase import create_client as create_supabase_client, Client
import os
import dotenv
from supabase.client import ClientOptions

dotenv.load_dotenv()

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL") or "?"
SUPABASE_PUBLISHABLE_KEY = os.getenv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") or "?"

async def create_client(token: str) -> Client:
    options: ClientOptions = ClientOptions(headers={"Authorization": f"Bearer {token}"})
    
    client: Client = create_supabase_client(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY,
        options=options
    )

    return client