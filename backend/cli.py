import asyncio

from ai import SYSTEM_INSTRUCTION, build_context, client, DEFAULT_MODEL
from google.genai import types

from schem import create_schem
from schemas import MinecraftSchematic

async def cli_chat_loop():
    print("====================================================")
    print(" Minecraft Schematic Generator CLI Chat             ")
    print(" Type 'exit' or 'quit' to end the session.          ")
    print("====================================================\n")

    chat = client.chats.create(
        model=DEFAULT_MODEL,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_INSTRUCTION
        )
    )

    while True:
        try:
            user_prompt = input("You: ")
            if not user_prompt:
                continue

            if user_prompt.lower() in ['exit', 'quit']:
                print("Goodbye!")
                break

            print("\nProcessing context and generating schematic...")

            context = build_context(user_prompt)

            message_context = f"Context:\n{context}\nUser Request: {user_prompt}"

            response = await asyncio.to_thread(
                chat.send_message,
                message=message_context,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_schema=MinecraftSchematic
                )
            )

            schematic_json = response.text
            schematic_data = MinecraftSchematic.model_validate_json(schematic_json)

            create_schem(schematic_data.blocks)

            print("\nSchematic generated successfully.")
            
        except KeyboardInterrupt:
            print("\nInterrupted. Exiting...")
            break

        except Exception as e:
            print(f"\nAn error occurred: {e}")

if __name__ == "__main__":
    asyncio.run(cli_chat_loop())