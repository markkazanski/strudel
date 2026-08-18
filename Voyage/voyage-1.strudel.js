stack(
    // 1. Kick Drum (Four-on-the-floor: Hits on 0, 2, 4, 6) [3]
  s("bd(4,8,0)")
    .bank("RolandTR909")
    .lpf(400)
    .gain(0.2)
     .duckorbit(3) // Targets Orbit 3 (our vocal track) [2, 3]
    .duckattack(0.3) // How fast the volume ducks [2, 3]
    .duckdepth(.8),

  // 2. Snare Drum (backbeats: Hits on 2 and 6) [4]
  // angle brackets <> to make it last 2 measures
  s("<[sd(2,8,2)] [~ [sd ~ ~ sd] ~ sd]>") // subdivide the 2-e-&-a
    .bank("RolandTR909")
    .lpf(900)
    .room(1)
    .gain(0.35),

  // 3. Offbeat Hi-Hats (Upbeat groove: Hits on 1, 3, 5, 7) [4]
  s("hh(4,8,1)")
    .bank("RolandTR909")
    .gain(0.05),

  // BASS line
  n("2 [~ 2] 1 ~")
  .scale("A1:minor")
  .superimpose(x => x.transpose(12))
  .sound("supersaw"),

  // CHORDS
  n("<0, 9, 11, 14> <0, 8, 11, 14>")
   .scale("A4:minor")
   .s("sawtooth")
  .attack(0.3).release(0.5)
  .lpf(sine.range(800, 1400).slow(8)).lpq(1.5) // Filter slowly opens and closes over 16 bars
  .hpf(500) // Keeps the pad floating above the bass
  .room(0.6).roomsize(0.8)
  .gain(0.1).orbit(3),
  
  // LEAD
 n(`1 2 4 0 1 2 _ -1 
 _ _ _ _ ~ ~ ~ ~
 1 2 6 1 2 5 1 2
 4 _ _ _ ~ ~ 4 _`)
  .slow(4)
  .scale("A3:minor")
  .sound("supersaw")
  .room(1),
   
).cpm(124/4)