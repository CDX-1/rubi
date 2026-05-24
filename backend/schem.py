import mcschematic
from schemas import BlockPlacement

def create_schem(blocks: list[BlockPlacement]) -> mcschematic.MCSchematic:
    schematic = mcschematic.MCSchematic()
    for block in blocks:
        block_data = block.block_type + "["
        if not block_data.startswith("minecraft:"):
            block_data = "minecraft:" + block_data

        filtered_items = [
            f"{key}={value}"
            for key, value in block.data.__dict__.items()
            if value is not None
        ]

        block_data += ",".join(filtered_items)
        block_data += "]"

        if block_data.endswith("[]"):
            block_data = block_data[:-2]

        print((block.x, block.y, block.z), block_data.lower())
        
        schematic.setBlock((block.x, block.y, block.z), block_data.lower())
    schematic.save("schematics", "circuit", mcschematic.Version.JE_1_20)
    return schematic