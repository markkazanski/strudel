// Prebake script
//
// This is code that is loaded before your pattern is run.
// You can use it to define custom functions to use in any pattern.
// 
// This is an initial example script. You can edit it to add 
// your own funtions.
//
// To use a script shared by some other user you can use
// the import-button or paste the script in this editor.

const ratchet = register('ratchet', (pat) => pat.sometimes(ply(2)))

setcpm(90/4)

stack(
  // 1. Core dry snare body (Roland R-8 stand-in for R-70/R-8, dead center)
  // s("~ sd ~ sd")
  //   .bank("RolandR8")
  //   .n(1)
  //   .pan(0.5)
  //   .hpf(150)             // Clear low mud for the heavy kick
  //   .shape(0.65)          // Aggressive SSL-style console saturation
  //   .distort(0.45)
  //   .gain(0.95),

  // 2. Zoom 9030-style metallic ring-mod / clang layer
  // s("~ sd ~ sd")
  //   .bank("RolandR8")
  //   .n(1)
  //   .orbit(2)
  //   .fm(2.5)              // Adds metallic, inharmonic ring-mod clang
  //   .fmh(3.14)            // Non-integer ratio for dissonant industrial edge
  //   .bpf(1400).bpq(1.2)   // Focus the metallic ring in the mids
  //   .crush(11)            // Subtle early-90s Akai S1100 16-bit sampler grit
  //   .gain(0.45),

  // 3. Tight gated room smash (non-linear ambience)
  s("~ sd ~ sd")
    .bank("RolandR8")
    .n(1)
    .orbit(3)
    .room(0.85)
    .roomsize(3.5)
    .roomfade(0.2)
    .clip(0.16)           // Hard gate cutoff before the next beat
    .hpf(280)
    .distort(0.5)         // Gritty, squashed reverb burst
    .gain(0.65)
)
