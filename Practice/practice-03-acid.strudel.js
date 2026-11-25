setcps(0.5)

// 0. Euclidian demo
_$SIMPLE_KICK: s("bd bd bd bd")
_$THREE: s("mt(3,8)").pan(0.2).gain(0.3)
_$FIVE: s("hh(5,8)").pan(0.8).gain(0.4) 

// 1. DRUMS 909
$KICK: s("bd*4").bank("RolandTR909") // kick drums on each beat of the bar

$HATS_OPEN: s("[~ oh]*4").bank("RolandTR909").gain(.3) // open hats between each beat
$HATS: s("[hh hh - -]*4").bank("RolandTR909").gain(.4) // closed hats first two 16th notes of each beat.

$CLAPS: s("~ cp ~ cp").bank("RolandTR909").gain(.8) // claps/snare on the second and fourth beats of the bar

// rimshots on the third and fourth 16th notes of the first and third beat
// and on the second 8th notes of the second and fourth beats.
$RIM: s("[[- - rim rim] [- - rim -]]*2").bank("RolandTR909").gain(.4)

// 2. BASS 303
$BASS: note("[C2 C2 C3 B1] [C2 C2 C3 B2] [C2 C4 C3 B1] [C2 C2 C3 Eb2]").scale("C2:harmonic:minor")
  .s("supersaw") // Swap to "square" for a hollower acid tone
  .lpf(sine.range(150, 800).slow(8)) // Sweeps filter cutoff over 4 cycles
  // .lpf(slider(1230, 50, 3800, 10))
  .lpq(25) // High resonance for the classic squelch
  .lpenv(slider(3.5, 0, 5, .5)) // Filter envelope depth
  .lpd(0.18) // Short filter decay
  .ftype("ladder") // Ladder filter model for analog warmth
  .distort(0.4) // Adds grit and saturation
  .decay(0.25)
  .sustain(0.1)
  .gain(0.8)

$CHORDS: note("<[c,eb,g]!3 [d,f,ab] [eb,g,b]!2 [f,ab,c]>")
  .transpose(24)
  .slow(1)                               // Very slow changes
  .superimpose(x => x.add(.04))          // Slight detuning
  .add(perlin.range(0, .2))              // Subtle pitch drift
  .s("supersaw")
  .attack(.5)                             // Slow fade in
  .release(1)                            // Slow fade out
  .lpf(sine.range(900, 2000).slow(32))   // Gentle filter movement
  .hpf(slider(1040, 400, 2000, 10))
  .room(0.5)                              // Heavy reverb
  .gain(.1)

// note("[C3 _ _  C4] [C3] [G3 _ _ Bb3 C4] [Eb3 _ _ C4]")
$LEAD: note(`
   [C3@7 C4]
   [C3]
   [G3@7 [Bb3 C4@4]]
   [Eb3@14 C4@2]
  `)
  .slow(4)
  .sound("sawtooth, square, supersaw")
  .partials(new Array(22).fill(1))
  .attack(0.05)
  .decay(1)
  .sustain(.5)
  .release(.5)
  .lpf(sine.range(300, 2000).slow(8))
  .room(.7)
  .delay(0.3)
  .gain(.5)


$NOTE: note("C4").sound("supersaw").lpf(sine.range(800, 1500).slow(8))

$PLUCK: note("[C4 - - -]*4").slow(4)
  .sound("supersaw").attack(0.08).decay(.08).hpf(800).room(0.8)

