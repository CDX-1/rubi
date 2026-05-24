---
title: "Observer"
id: "observer"
namespace: "minecraft:observer"
properties: [facing]
---

# Overview

An observer is a block that emits a quick redstone pulse from its back when the block or fluid directly in front of its "face" experiences a change. 

# Usage

An observer is placed similarly to a piston. It observes the block that it is placed against. The texture of the detecting side is that of an observing face. As observers can detect the state of other observers, placing two adjacent observers, each watching the other, can make a fast and compact redstone clock. They send out a pulse.
Behavior

# Behavior

In Java Edition, an observer detects changes in its target's block states, or the breaking or placing of a block (i.e. changes in its block state, but not its block entity data). This means that changes like the age of crops can be detected because they are part of the block states.

When it detects something, the observer emits a redstone pulse of strong power at level 15 for 2 game ticks (1 redstone tick). The pulse can power redstone dust, a redstone comparator, a redstone repeater, or any mechanism component located at its opposite end.

The pulse is emitted with a delay of 1 redstone tick.

It also counts as a block update when the observer itself is moved by a piston. When this happens, an observer emits a pulse after being pushed or pulled, but not beforehand. This enables them to be used in flying machines.

Observers behave as both opaque and transparent blocks: they block light and allow mob spawning on top, but do not block opening chests below, do not cut off redstone wire, and cannot conduct redstone power.