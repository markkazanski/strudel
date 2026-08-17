setcpm(121/4) // 1. Locked EBM Tempo (121 BPM) [3, 5]

stack(
  // ── DRUM ARCHITECTURE ────────────────────────────────────────────────

  // Locomotive Hi-Hats: Constant 16th-note driving rail [5]
  s("hh*16")
    .bank("AkaiXR10") // Vintage raw, industrial character drum machine [6]
    .gain(0.4),

  // Kick Drum: Precise four-on-the-floor [5]
  s("bd*4")
    .bank("AkaiXR10")
    .gain(0.9),

  // "Junkyard" Snare: Metallic, aggressive smash on beats 2 & 4 [5]
  s("~ ~ ~ ~ sd ~ ~ ~ ~ ~ ~ ~ sd ~ ~ ~")
    .bank("AkaiXR10")
    .distort(0.2)
    .gain(0.8),

  // Syncopated Perc Ticks: High-pitched accents [5]
  s("~ ~ ~ rim ~ ~ rim ~ ~ ~ ~ rim ~ ~ rim ~")
    .bank("AkaiXR10")
    .gain(0.5),


  // ── MELODIC & BASS WEIGHT ────────────────────────────────────────────

  // Relentless EBM Bassline: Key of F Minor, chugging between F2 and Ab2 [5]
  n("f2 f2 f2 f2 ab2 ab2 f2 f2 f2 f2 f2 f2 ab2 ab2 f2 f2")
    .s("sawtooth")
    .lpf(400).lpq(12) // Muffled low-pass filter with heavy edge resonance [5]
    .decay(0.1).sustain(0) // Snappy envelope to prevent notes bleeding [5]
    .gain(0.65),


  // ── VOCALS & COMMANDS ────────────────────────────────────────────────

  // Drill-Sergeant Vocals: FIXED to use note() and stable Bandpass filter formant simulation!
  note("~ f4 ~ ~ ~ c4 ~ ~ ~ ab4 ~ ~ ~ eb4 ~ ~")
    .s("sawtooth")
    .bpf(600)                      // Vocal-range formant focus
    .bpq(3.5)                      // Pinches the filter for a megaphone feel
  .crush(6)
    .distort(0.8)                  // Megaphone saturation
    .decay(0.12).sustain(0)        // Sharp, staccato bark
    .delay(0.2)
    .delaytime(0.124)              // 16th-note warehouse delay [4]
    .delayfeedback(0.35)
    .gain(0.55),

    // Staccato "Drill-Sergeant" Vocals: Simulates "Lies! Gold! Guns! Fire!" [1]
  note("~ f4 ~ ~ ~ c4 ~ ~ ~ ab4 ~ ~ ~ eb4 ~ ~")
    .s("sawtooth")
    .vowel("oe o") // Formant vocal simulation [1, 3]
  .crush(6)
    .distort(0.4) // Heavily saturated megaphoned tone [1]
    .decay(0.12).sustain(0) // Sharp, staccato bark [1]
    .delay(0.2)
    .delaytime(0.124) // Timed perfectly to a cold 16th-note slapback delay [1]
    .delayfeedback(0.35)
    .gain(0.55)
)