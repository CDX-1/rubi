Redstone dust is a mineral that can transmit redstone power as a wire when placed as a block. It is also used in crafting and brewing.

# Placement

Redstone dust can be placed on opaque blocks as well as glowstone, upside-down slabs, glass, upside-down stairs, and hoppers. It can also be placed on some transparent blocks; see Opacity/Placement for more information. It cannot be placed suspended in midair, even with commands, which is not unintentional.

Redstone wire configures itself to point toward adjacent redstone power components and transmission component connection points. Redstone wire also configures itself to point toward adjacent redstone wire one block higher or lower – unless there is a solid opaque block above the lower redstone wire.

If there is only one such adjacent redstone component, redstone wire configures itself into a straight line pointing both at the neighbor and away from it. If there are two or more such adjacent components, redstone wire connects them in the form of a straight line, a corner, or a T-junction as needed.

When there are no adjacent components, a single redstone wire configures itself into a plus sign, which can provide power in all four directions. By right-clicking it can be changed into a dot, which does not provide power to any of the four directions.

When redstone wire is reconfigured after placement, it does not update other redstone components around it of the change unless that reconfiguration also includes a change in power level or another component provides an update. This can create situations where a mechanism component remains activated when it shouldn't, or vice versa, until it receives an update from something else – a "feature" of redstone wire that can be used to make a block update detector. 

# Behavior

Redstone wire can transmit power, which can be used to operate mechanism components (doors, pistons, redstone lamps, etc.). Redstone wire can be "powered" by a number of methods:
- from an adjacent power component or a strongly-powered block
- from the output of a redstone repeater or redstone comparator
- from adjacent redstone wire. The powering dust can be a level higher or lower, but with restrictions:
    - Redstone dust can be powered by redstone dust that is one level lower, or on an opaque block one level higher. A transparent block cannot pass power downward.
    - The block "between" the two dust blocks must be air or transparent. A solid block there "cuts" the connection between the higher and lower dust.

The "power level" of redstone dust can vary from 0 to 15. Most power components power-up adjacent redstone dust to power level 15, but a few (daylight sensors, trapped chests, and weighted pressure plates) may create a lower power level. Redstone repeaters output power level 15 (when turned on), but redstone comparators may output a lower power level.

Redstone wire can transmit power up to 15 blocks.

Power level drops by 1 for every block of redstone wire it crosses. Thus, redstone wire can transmit power for no more than 15 blocks. To go further, the power level must be re-strengthened – typically with a redstone repeater.

Powered redstone wire on top of, or pointing at, an opaque block provides weak power to the block. A weakly-powered block cannot power other adjacent redstone wire, but can still power redstone repeaters and comparators, and activate adjacent mechanism components. Transparent blocks cannot be powered.

When redstone wire is unpowered, it appears dark red. When powered, it becomes bright red at power level 15, fading to darker shades with decreasing power. Powered redstone wire also produces "dust" particles of the same color.

While redstone wire always provides power to the directions it points into, it can still point into directions in which it cannot give power. If redstone wire comes in the form of a cross, the player can right-click to toggle it between a cross and dot. A redstone dot does not power anything adjacent to it, but powers the block under it. 