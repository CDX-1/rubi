A redstone repeater is a block that produces a full-strength output signal from its front when its back is powered, with four configurable delay settings. It can also be locked into a power state by its side being directly powered by a repeater or a comparator. 

# Usage

A redstone repeater can be used in four different ways: to "repeat" redstone signals back to full strength, delay signals, prevent signals moving backwards, or to "lock" signals in one state.

A repeater can be placed only on top of opaque blocks (dirt, stone, etc.), on top of upside-down slabs, upside-down stairs, furnaces, and glass.

A redstone repeater has a front and back – An extremly faint light gray arrow on the top points to the repeater's front. A repeater also has two small redstone torches on its top – the color of the torches indicates whether its output is on (dark red when off, bright red when on) and the distance between them indicates the delay the repeater adds to the signal transmission.

A repeater is 0.125 (1⁄8) blocks high. 

# Signal transmission

A repeater transmits signals only from its back to its front, but its behavior can be modified from the side (see signal locking, below).
Different ways to power a repeater

Different ways to power a repeater

A redstone repeater can be powered by any of the following components at its back:

    an active power component (redstone torch, lever, block of redstone, etc.)
    powered redstone dust
    a powered redstone comparator or another powered redstone repeater facing the repeater
    a powered opaque block (including any opaque mechanism components, such as dispensers, redstone lamps, etc.)

A redstone repeater can power any of the following components at its front:

    redstone dust
    a redstone comparator or another redstone repeater facing away from the repeater
    any opaque block (including any opaque mechanism components)

A redstone repeater can activate any mechanism component it is facing.

An opaque block powered by a redstone repeater is called "strongly-powered" (as opposed to an opaque block "weakly-powered" by redstone dust). A strongly-powered opaque block can power adjacent redstone dust, as well as other redstone components. 

# Signal repeating

A redstone repeater can "repeat" a redstone signal, boosting it back up to power level 15.

Redstone signals have a maximum power level of 15 and that level drops by 1 for every block of redstone dust the signal travels through. If a signal must travel through more than 15 blocks of redstone dust, a redstone repeater can be used to boost the signal back up to full strength. An extra two blocks of distance can be achieved by placing solid opaque blocks before and after the repeater.

While redstone repeaters can allow signals to travel great distances, each always adds some delay to the transmission since the minimum amount of delay is 1 redstone tick (0.1 seconds, barring lag). 

# Signal delay

When initially placed, a redstone repeater has a delay of one redstone tick (equivalent to two game ticks, or 0.1 seconds barring lag).

A repeater's delay can be modified by using the Use Item control. Each use increases the repeater's delay by one redstone tick, to a maximum of four redstone ticks, then back to one redstone tick. Longer delays can be made with multiple repeaters – for example, a repeater set to 'four' and another to 'one' provides a half-second delay (0.4s + 0.1s = 0.5s).

A repeater set to a delay of two to four redstone ticks increases the length of any shorter on-pulse to match the length of the repeater's delay, and suppress any shorter off-pulse. For example, a repeater set to a 4-tick delay changes a 1-tick, 2-tick, or 3-tick on-pulse into a 4-tick on-pulse, and does not allow through any off-pulse shorter than 4 ticks.

Although a repeater cannot be set to have a delay of zero, instant repeater circuits are possible (circuits that repeat a signal with no delay). 

# Signal direction

A redstone repeater acts as a diode – it allows redstone signals through in one direction (unlike redstone dust or opaque blocks that can transmit redstone signals in any direction).

A diode can be used to protect a redstone circuit from redstone signals feeding back into the circuit from its output, or can be used to isolate one part of a circuit from another. 

# Signal locking

A redstone repeater can be "locked" by another powered redstone repeater facing its side. When locked, the repeater does not change its output (whether powered or unpowered), no matter what the input does. When the side repeater turns back off, the repeater returns to its normal behavior.

A repeater can also be locked by a powered redstone comparator facing its side. This offers additional possibilities for locking signals because a comparator's output can be affected from 3 sides as well as by containers.

If a repeater is locked again too quickly after unlocking (e.g. the lock is controlled by a fast clock circuit), or the lock and the input are changed only on the same tick (e.g. because they're fed by the same clock and both repeaters have the same delay), the repeater does not switch states. 