---
title: "Lever"
id: "lever"
namespace: "minecraft:lever"
properties: [face, facing]
---

# Overview

A lever is a non-solid block that can provide switchable redstone power. 

# Usage

A lever can be used as a player-switchable redstone power source. 

# Placement

A lever can be attached to the top, side, or bottom of any full solid opaque block (stone, dirt, blocks of gold, etc.), or to the top of an upside-down slab or upside-down stairs (but not to the bottom of a right-side-up slab or stairs). When placed on the top or bottom of a block, the lever orients itself in-line with the placing player.

When placed on the side of blocks, down is on and up is off. On the top or bottom of blocks, off is north or west, on is south or east. 

# Activation

To activate or deactivate a lever, use the "Use Item/Place Block" control (right-click, by default). A lever can be turned on and off as fast as it can be clicked.

Breezes can activate levers by launching wind charges at it. Player-launched wind charges also activate levers. 

# Behavior

While active, a lever:

- powers any adjacent redstone dust (including beneath the lever) to power level 15
- powers any adjacent redstone comparator or redstone repeater facing away from the lever to power level 15
- strongly powers its attachment block to power level 15 (only if the attachment block is a full solid opaque block)
- activates any adjacent mechanism components, including above or below, such as pistons, redstone lamps, etc.
- emits redstone particles to indicate that it is active.