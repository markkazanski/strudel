setcps(0.7)

// 1. DRUMS (Subdivisions & Euclidean layers)
$KICK: s("<[bd - [- bd] -] [[bd - - [- bd]] - [- bd] -]>")
_$GHOST_KICK: s("<[- - [- -] -] [[- - - [- bd]] - [- -] -]>").gain(0.3)
$SNARE: s("~ sd ~ sd")
$HATS: s("[- - hh hh]*4").n("<0 1 2 3>").gain(0.5)
_$CLAP: s("cp(3,8)").pan(0.2).gain(0.3)
_$PERC: s("oh(5,8)").pan(0.8).gain(0.4) // Muted initially with '_'

// 2. BASS (Scale degrees & Subtractive Filtering)
$BASS: n("[0 0] [3 3 3] [2 2 2 2 2] [5 4]")
  .scale("C2:minor")
  .s("supersaw")
  .slow(2)
  .lpf(sine.range(300, 1200).slow(4))
  .lpq(20)

// UK Garage BASS
// $BASS: n(
//     `[1 - 5 5] [- 1 - -] [1 - 5 -] [1 - 5 5]
//      [1 - - -] [5 - - 5] [-] [1 - - -]
//      [1 - - -] [- 5 - -] [1 - 5 -] [5 - 8 5]
//      [1] [5 - - 1] [-] [1]
//     `
//   )
//     .scale("C2:minor")
//     .s("supersaw")
//     .slow(4)
//     .lpf(sine.range(200, 500).slow(4))
//     .lpq(15)
//     .attack(.01)
//     .release(.2)

// 3. ARP (LFO Modulation & Structural Reversal)
$ARP: n("0 2 4 7 4 2")
  .scale("C:minor")
  .s("supersaw")
  .fast(2)
  .lpf(sine.range(800, 3000).slow(4))
  .lpq(15)
  .distort(0.5)
  .every(4, rev)
  .room(0.4)
  .gain(0.5)
