---
title: "Comparator"
id: "comparator"
namespace: "minecraft:comparator"
properties: [mode, facing]
---

# Overview

A redstone comparator is a block that can produce an output signal from its front by reading chests, lecterns, beehives and similar blocks, or repeat a signal without changing its strength. It can also be set to either stop outputting a signal when its side input receives a stronger one (front torch off), or subtract its side input's signal strength from its output (front torch on). 

# Usage

A redstone comparator can be placed on the top of any opaque block with a solid full-height top surface (including upside-down slabs and upside-down stairs).

The redstone comparator has a front and a back — the arrow on the top of the comparator points to the front. When placed, the comparator faces away from the player. The comparator has two miniature redstone torches at the back and one at the front. The back torches turn on when the comparator's output is greater than zero (the arrow on top also turns red). The front torch has two states that can be toggled by using the comparator:

- Down and unpowered (indicating the comparator is in "comparison mode")
- Up and powered (indicating the comparator is in "subtraction mode")

The redstone comparator can take a signal strength input from its rear as well as from both sides. Side inputs are accepted only from redstone dust, block of redstone, redstone repeaters, other comparators, and observers in specific scenarios. The redstone comparator's front is its output.

It takes 1 redstone tick (2 game ticks, or 0.1 seconds barring lag) for signals to move through a redstone comparator, either from the rear or from the sides. This applies to changing signal strengths as well as simply to turning on and off.

Redstone comparators check their power state before their scheduled ticks update. This results in redstone comparators not usually responding to 1-tick fluctuations of power or signal strength — for example, a 1-clock input is treated as always off from the side, and always on from the rear. This happens because the signal changes back to its original state before the redstone comparator checks its input states. However, certain setups such as powering any input with two separate observer pulses at the same time will cause a redstone comparator to respond to 2 gametick pulses.

The redstone comparator has four functions: maintain signal strength, compare signal strength, subtract signal strength, and measure certain block states (primarily the fullness of containers). 

# Maintain signal strength

A redstone comparator with no powered sides outputs the same signal strength as its rear input. 

# Compare signal strength

A redstone comparator in comparison mode (front torch down and unpowered) compares its rear input to its two side inputs. If either side input is greater than the rear input, the comparator output turns off. If neither side input is greater than the rear input, the comparator outputs the same signal strength as its rear input.

The formula for calculating the output signal strength is as follows:

output = rear × [left ≤ rear AND right ≤ rear]

# Subtract signal strength

A redstone comparator in subtraction mode (front torch up and powered) subtracts the signal strength of the higher side input from the signal strength of the rear input.

output = max(rear − max(left, right), 0)

For example: if the signal strength is 6 at the left input, 7 at the right input and 4 at the rear, the output signal has a strength of max(4 − max(6, 7), 0) = max(4−7, 0) = max(−3, 0) = 0.

If the signal strength is 9 at the rear, 2 at the right input and 5 at the left input, the output signal has a strength of max(9 − max(2, 5), 0) = max(9−5, 0) = 4. 

# Measure block state

A redstone comparator treats certain blocks behind it as power sources and outputs a signal strength proportional to the block's state. The comparator may be separated from the measured block by an opaque block. However, if the opaque block is powered to signal strength 15, then the comparator outputs 15 no matter the fullness of the container.

A redstone comparator can output a signal indicating how full a container is. (0 for empty, 15 for full, etc.) The table on the right is described more in detail, later in this section.

Containers that can be measured by a comparator include:

- Furnace
- Blast Furnace
- Smoker
- Brewing Stand
- Hopper
- Minecart with Hopper on top of a detector rail
- Dispenser
- Dropper
- Chest
- Trapped Chest
- Minecart with Chest on top of a detector rail
- Barrel
- Large chest
- Large trapped chest
- Shulker Box (any color)

Generally speaking, the comparator output signal strength represents the average fullness of the slots, based on how many of that item form a full stack (64, 16, or 1 for non-stackable items).

The Minimum Items for Container Signal Strength table (right) shows the minimum full-stack-equivalent (FSE) to produce different signal strengths from common containers. A full-stack-equivalent quantifies how many normal 64-stackable items are needed to output a corresponding signal strength. The 's' is a constant 64, with the additional amount needed following after.

One may also consider the terms: cumulative-weight or weighted-sum instead of full-stack-equivalent.

Items that stack to a max of 16 (snowballs, signs, ender pearls, etc.), contribute +4 to the full-stack-equivalent for each unity (count of 1 item). Similarly, items that stack to 1 (minecart, boat, etc.) contribute +64, and items that stack to 64 contribute +1.

Example 1: 3 ender pearls will contribute a 3 x 4 = 12 full-stack-equivalent.

Example 2: 16 ender pearls and 60 redstone dust contributes a 16x4 + 60x1 = 124 full-stack-equivalent.

Example 3: 1 minecart and 60 redstone dust contributes a 1x64 + 60x1 = 124 full-stack-equivalent.

Example 4: To produce a signal strength of 10 from a hopper, one requires a full-stack-equivalent of at least 3s + 14 = 206 but strictly less than than 3s + 37 = 229. This can be done with 3 minecarts, and 14 dirt.

When a comparator measures a large chest or large trapped chest, it measures the entire large chest (54 slots), not just the half directly behind the comparator. A chest or trapped chest that cannot be opened (either because it has an opaque block, ocelot, or cat above it) always produces an output of 0 no matter how many items are in the container — shulker boxes can always be measured, even if they cannot open. 

# Calculating signal strength from items

When a container is empty, the output is off.

When it is not empty, the output signal strength is calculated as follows:

signal strength = floor(1 + ((sum of all slots' fullnesses) / (number of slots in container)) × 14)

fullness of a slot = number of items in slot / max stack size for this type of item

Example: 300 blocks in a dispenser (which has 9 slots), where each block stacks to a maximum of 64 has a 300 full-stack-equivalent. This produces an output with a signal strength of 8:

1 + ((300 items / 64 items per slot) / 9 slots) × 14 = 8.292, floored is 8 

# Calculating items from signal strength

It can be useful in redstone circuits to use containers with comparators to create signals of a specific strength. The number of items required in a container to produce a signal of desired strength is calculated as follows:

items required = max(desired signal strength, roundup((total slots in container × 64 / 14) × (desired signal strength − 1)))

Example: To use a furnace (which has 3 slots) to create a strength 9 signal, players need 110 items:

max(9, (3×64/14) × (9−1)) = 109.714, rounded up is 110
