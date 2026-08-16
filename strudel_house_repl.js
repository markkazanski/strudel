// 1. Declare external samples first as a standalone top-level function
samples('https://raw.githubusercontent.com/sonidosingapura/blu-mar-ten/refs/heads/main/Vocals/strudel.json')

// samples({
//   bad_boy: 'Bad_Boy_10A.wav',
// }, 'github:sonidosingapura/blu-mar-ten/main/Vocals');

// GLOBAL

const BD = .9;
const SD = .7; 
const HH = .4;

const CHORDS =.4;
const BASS = 1;
const TOMS = .7;
const VOX =  .6;

const SNARE_ROLL =  0;

stack(
    // 1. Muted, Deep Kick
  s("bd*4").bank("RolandTR909").lpf(400).gain(BD),

 // 2. True Offbeat Hi-Hats (Hits strictly BETWEEN the kicks)
  s("[~ hh]*4").bank("RolandTR909")
  .hpf(700)
  .gain(HH)
   .swingBy(1/6, 4), // Delays the "hh" hits slightly ,

   // 3. Crisp Rimshot on 2 and 4
  s("~ sd ~ sd").bank("RolandTR909").hpf(7700).gain(SD),

  // 1. Snare roll accelerating from 4 to 32 hits over 4 bars
  s("<sd*4 sd*8 sd*16 sd*32>")
    .bank("RolandTR909")
    // Volume swells from quiet (0.2) to loud (0.8) over 4 bars
    .gain(saw.range(0.2, 0.8).slow(4)) 
  .postgain(SNARE_ROLL)
    // High-pass filter sweeps open from 200Hz to 2000Hz to build tension
    .hpf(saw.range(200, 2000).slow(4))
    .room(1),

  // 2. A rising white noise sweep to accompany the roll
  s("white*16")
    .gain(saw.range(0, 0.15).slow(4))
  .postgain(SNARE_ROLL)
    .hpf(saw.range(1000, 8000).slow(4))
.slow(4), // Stretches the overall pattern loop over 4 bars

  // 4. Lush, Jazzy Chord Progression (Filtered triangle wave)
  note("<[c3,eb3,g3,bb3] [f3,ab3,c4,eb4]>")
    .s("supersaw")
  .attack(.5).decay(.5).sustain(0.6).release(0.25)
    .hpf(sine.range(4000, 1000).slow(8)) 
    .resonance(5)
  .room(sine.range(1, 5).slow(5))
    .gain(CHORDS),

  // 5. Bass
  note("<[c2,eb2]@4 [f2,bb2]@4>")
  .sound("saw")          // Uses a sawtooth synth waveform
  .lpf(400)              // Low-pass filter to remove harsh highs
  .lpq(1)                // Adds filter resonance/character
 .decay("<1, 3>").sustain(.3)
  .gain(BASS), 

    // 6. Randomized Toms Accents (Plays only 30% of the time)
  s("~ [mt*3] ~ ht")
    .bank("RolandTR909")
    .degradeBy(0.7) // Randomly skips conga hits 70% of the time
    .gain(TOMS),

  // // 7 vocals
  // s("numbers")
  // .slice(8, "0 2  7") // Chops the spoken numbers into 8 slices
  // .delay(0.5)              // Adds a spacey stereo echo
  // .room(0.4)               // Puts them in a warm reverb space
  // .gain(0.6),

  
  // s("bmt_vocals_65")
  // .slice(8, "~ 0 2  7") // Chops the spoken numbers into 8 slices
  // .delay(0.5)              // Adds a spacey stereo echo
  // .room(0.4)               // Puts them in a warm reverb space
  // .gain(0.6)
  // .degradeBy(0.5),

  note("<g2 c3 eb1 g1>") // Pitch shifts the vocals in key with your chords!
    .s("bmt_soul_vox")
    .delay(0.5)
  .lpf("800 999")
  .lpq(5)
    .room(0.5)
    .gain(VOX)
  .degradeBy(0.8),

   // 5. Automated Squelchy TB-303 Acid Bassline
  note("c2 [c3 c2] <eb2 f2> [c3 ~]")
    .s("sawtooth")
    .decay(0.14)
    .sustain(0)
    .release(0.05)
    // Squelchy ladder filter with high resonance
    .ftype("ladder")
    .lpq(16)
    // Evolving LFO filter sweep over 8 bars
    .lpf(sine.range(250, 1600).slow(8)) 
    // Spatial processing
    .delay(0.5)
    .room(1)
    .gain(sine.range(.5, 5).slow(5)) 

  
)

