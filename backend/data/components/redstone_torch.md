---
title: "Redstone Torch"
id: "redstone_torch"
namespace: "minecraft:redstone_torch"
properties: []
keynotes:
    - "It should be noted that TWO different block ids can be used for the redstone torch (the redstone_torch AND the redstone_wall_torch. the redstone_torch has no properties and will automatically be fixed to the floor under it. The redstone_wall_torch has a 'facing' property that determines the direction it faces)."
    - "The redstone torch does NOT have the 'face' property, when using the redstone_wall_torch it has the 'facing' property instead. Otherwise, it has no properties."
---

# Overview

A redstone torch is a non-solid block that produces a full-strength redstone signal on all sides adjacent to it, except for its attached block, and can power the block directly above it. It deactivates while the block it is attached to is powered. 

# Placement

To place a redstone torch, use the Place Block control while aiming at the surface to which the redstone torch should be attached.

A redstone torch can be attached to:

the top or side of any full solid opaque block (stone, dirt, blocks of gold, etc.), including full-block mechanism components (command blocks, dispensers, droppers, note blocks, and redstone lamps)
the top only or side only of certain block. SeeOpacity/Placement.

Redstone torches cannot be attached to the bottoms of any blocks.

Attempting to attach a redstone torch to an invalid surface can cause it to "snap" to a valid surface adjacent to the same space. For example, if a fence is on the ground, attempting to attach a redstone torch to the side of the fence causes the redstone torch to be attached to the top of the ground next to the fence instead.

# Activation

A redstone torch is active unless the block it is attached to is powered. Effectively, a redstone torch inverts the signal applied to its attachment block: power level 0 is changed to 15 and power levels 1 to 15 are changed to 0 (for an alternative that produces a greater range of output power levels, consider a redstone comparator in subtraction mode).

Walls, fences, glass, slabs, hoppers, and stairs cannot be powered so redstone torches attached to them cannot be deactivated.

A redstone torch takes 1 redstone tick (2 game ticks, or 0.1 seconds barring lag) to change state and usually does not respond to 1-tick fluctuations of power.

# Behavior

While active, a redstone torch:

- powers adjacent redstone dust to power level 15, including beneath the redstone torch if it is attached to the side of a block
- powers adjacent redstone comparators or redstone repeaters facing away from the redstone torch to power level 15
- strongly powers a full solid opaque block above the redstone torch to power level 15 (but not next to or below it)
- activates adjacent mechanism components, including above or below, such as pistons, redstone lamps, etc.
- produces "reddust" particles

A redstone torch never affects the block it is attached to, even if it is a mechanism component. For example, a redstone torch attached to a redstone lamp does not activate the lamp.

A redstone torch experiences "burn-out" when it is forced to change state (by powering and de-powering the block it is attached to) more than eight times in 60 game ticks (three seconds, barring lag). After burning out, a redstone torch produces a "smoke" particle and a hiss similar to an extinguished fire, deactivates, and then ignores attempts to change its state until the number of state changes in the last 60 game ticks drops to fewer than eight—after that it re-activates when it receives a block update (an adjacent block changing its state) or a redstone update that would not normally deactivate the redstone torch. There is no limit on how often a single redstone torch can burn out.
