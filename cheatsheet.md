# Strudel Quick-Reference Cheat Sheet

#### Keyboard Shortcuts

| Shortcut                          | Action                                               |
| :-------------------------------- | :--------------------------------------------------- |
| `Ctrl + Enter` (or `Alt + Enter`) | **Evaluate / Update code** (Play or update playback) |
| `Ctrl + .`                        | **Hush / Emergency Stop** (Stop all audio instantly) |
| `Ctrl + /`                        | **Comment / Uncomment** line of code                 |

#### Mini-Notation Syntax

| Symbol         | Function           | Description & Example                                                    |
| :------------- | :----------------- | :----------------------------------------------------------------------- |
| `Space`        | **Sequence**       | Squashes space-separated items into 1 cycle: `"bd hh sd hh"`.            |
| `*N`           | **Multiplication** | Speeds up pattern by factor of N: `"bd*4"`.                              |
| `/N`           | **Division**       | Slows pattern down across N cycles: `"[e5 b4 d5 c5]/2"`.                 |
| `~` **or** `-` | **Rest**           | Inserts silence into a step: `"bd - sd ~"`.                              |
| `[ ]`          | **Sub-sequence**   | Subdivides a single step into nested timing: `"bd [hh hh] sd"`.          |
| `< >`          | **Alternation**    | Plays **one event per cycle** sequentially: `"<c3 e3 g3>"`.              |
| `,`            | **Parallel**       | Plays multiple layers simultaneously: `"hh*4, bd sd"`.                   |
| `:N`           | **Sample Index**   | Selects sample variant index N from a bank: `"casio:1"` or `"jazz:2"`.   |
| `@N`           | **Elongation**     | Assigns step weight/duration relative to others: `"[c3@2 e3]"`.          |
| `!N`           | **Replication**    | Repeats an event N times without increasing tempo: `"<1!4 0!2>"`.        |
| `?`            | **Random Drop**    | Adds probability of triggering (50% drop by default, or `?0.1` for 10%). |
| `\|`           | **Random Pick**    | Randomly selects one choice per cycle: `"[g3 \| b3 \| e4]"`.             |
| `(b, s, o)`    | **Euclidean**      | Generates rhythm: `(beats, segments, offset)` e.g., `"bd(3,8,0)"`.       |

---

#### Core Functions Reference

- **Tempo & Timing Setup:**
  - `setcpm(120 / 4)` — Sets tempo to 120 BPM in 4/4 time.
- **Sound, Pitch, & Scale:**
  - `s("bd")` / `sound("bd")` — Triggers sample/synth sound.
  - `.bank("RolandTR909")` — Selects sample bank (`RolandTR808`, `LinnDrum`, `AkaiLinn`, etc.).
  - `n("0 2 3 5")` — Selects scale degrees or sample index patterns.
  - `note("c2 e2 g2")` — Triggers specific musical pitch names.
  - `.scale("C:minor")` — Quantizes scale degrees to musical scales (`minor`, `dorian`, `phrygian`, etc.).
- **Filter & Timbre Control:**
  - `.lpf(frequency)` — Low-pass filter cutoff.
  - `.hpf(frequency)` — High-pass filter cutoff.
  - `.lpq(resonance)` — Sets filter resonance (Q) for squelchy timbres.
- **Envelopes & Gain Staging:**
  - `.attack(sec)` / `.decay(sec)` / `.sustain(level)` / `.release(sec)` — ADSR amplitude control.
  - `.gain(0.8)` — Sets master volume level of pattern.
- **Modulation Signals & Time Modifiers:**
  - `sine`, `saw`, `tri`, `rand`, `perlin` — Continuous LFO shapes used with `.range(min, max).slow(bars)`.
  - `.slow(N)` / `.fast(N)` — Stretches or accelerates pattern by factor of N.
  - `.rev()` — Reverses pattern sequence.
  - `.every(N, function)` — Applies modifier function every N cycles.
- **Structure & Parallel Buses:**
  - `stack(p1, p2, ...)` — Combines independent pattern layers into parallel playback.
  - `cat(p1, p2, ...)` — Concatenates pattern sections sequentially.
  - `$: s("bd*4")` — Names independent pattern streams in performance mode.

### Default Sample Names

| **Drum**             | **Abbreviation** |
| -------------------- | ---------------- |
| Bass drum, Kick drum | bd               |
| Snare drum           | sd               |
| Rimshot              | rim              |
| Clap                 | cp               |
| Closed hi-hat        | hh               |
| Open hi-hat          | oh               |
| Crash                | cr               |
| Ride                 | rd               |
| High tom             | ht               |
| Medium tom           | mt               |
| Low tom              | lt               |
