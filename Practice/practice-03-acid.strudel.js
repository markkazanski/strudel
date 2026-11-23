setcps(0.5)

// 0. Euclidian demo
_$SIMPLE_KICK: s("bd bd bd bd")
_$THREE: s("mt(3,8)").pan(0.2).gain(0.3)
_$FIVE: s("hh(5,8)").pan(0.8).gain(0.4) 

// 1. DRUMS 909
$KICK: s("bd*4").bank("RolandTR909") // kick drums on each beat of the bar

$HATS_OPEN: s("[~ oh]*4").bank("RolandTR909").gain(.5) // open hats between each beat
$HATS: s("[hh hh - -]*4").bank("RolandTR909").gain(.5) // closed hats first two 16th notes of each beat.

$CLAPS: s("~ cp ~ cp").bank("RolandTR909").gain(.6) // claps/snare on the second and fourth beats of the bar

// rimshots on the third and fourth 16th notes of the first and third beat
// and on the second 8th notes of the second and fourth beats.
$RIM: s("[- - rim rim] [- - rim -] [- - rim rim] [- - rim -]").bank("RolandTR909").gain(.4)

// 2. BASS 303
$BASS: n("[C2 C2 C3 B1] [C2 C2 C3 B2] [C2 C4 C3 B1] [C2 C2 C3 D#2]").scale("C2:minor")
  .s("supersaw") // Swap to "square" for a hollower acid tone
  .lpf(sine.range(250, 1800).slow(4)) // Sweeps filter cutoff over 4 cycles
  // .lpf(slider(160, 50, 3800, 10))
  .lpq(25) // High resonance for the classic squelch
  .lpenv(3.5) // Filter envelope depth
  .lpd(0.18) // Short filter decay
  .ftype("ladder") // Ladder filter model for analog warmth
  .distort(0.4) // Adds grit and saturation
  .decay(0.25)
  .sustain(0.1)
  .gain(0.8)
