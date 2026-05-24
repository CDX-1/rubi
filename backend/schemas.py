from pydantic import BaseModel, Field
from typing import Optional

class BlockData(BaseModel):
    facing: Optional[str] = Field(description="The direction this block should be facing (North, South, East, West)")
    face: Optional[str] = Field(description="The face this block should attach onto (ceiling, floor, wall)")
    delay: Optional[int] = Field(description="The number of ticks a repeater should delay by. (1-4) (Only if the block is a repeater)")
    mode: Optional[str] = Field(description="The mode of a redstone comparator. (compare, subtract)")

class BlockPlacement(BaseModel):
    x: int
    y: int
    z: int
    block_type: str = Field(description="Minecraft block ID (ex: 'diamond_block' or 'air')")
    data: BlockData = Field(description="Relevant data for the block placement.")

class MinecraftSchematic(BaseModel):
    name: str
    description: str
    blocks: list[BlockPlacement]