samples('github:tidalcycles/dirt-samples')
setcpm(125 / 4)


stack
  (stack(
    // 1. Kick: Hard mono (pan 0.5), low-pass filtered around 60Hz to isolate the low punch [1]
    s("bd*4")
      .pan(0.5)
      .lpf(80) // 6
      .gain(1)._punchcard(),

    // 2. Clap/Snare: Centered (pan 0.5), layered on beats 2 and 4 [1, 2]
    s("~ [cp, sd] ~ [cp, sd]")
      .pan(0.5)
      .gain(0.55),

    // 3. Closed Hi-Hats: Centered (pan 0.5) playing an 8th-note grid [1]
    s("[hh hh - -] [hh - hh -] [hh - hh -] [hh - hh -]")
      .pan(0.5)
      .gain(0.5)._punchcard(),

    // 4. Open Hi-Hat: Offbeats, panned 15% Right (0.5 center + 0.15 = 0.65) [1]
    s("[- oh]*4")
      .pan(0.65)
      .gain(0.6)._punchcard(),

    // 5. Percussion Loop: High-passed at 150Hz, panned 20% Left (0.5 center - 0.2 = 0.3) [1]
    // s("cym*4")
    //   .hpf(150)
    //   .pan(0.3)
    //   .gain(0.5),

  ).bank("RolandTR909"),

    // --- SUB-STACK 2: BASS (Uses Synths) ---
    stack(
      // Sub-Bass (Centered Sine)
      note("~ e2 ~ e2")
        .s("sine")
        .pan(0.5)
        .gain(0.8),

      // Mid-Bass (Plucky Sawtooth)
      note("~ e2 [g2 b1] e2")
        .s("sawtooth")
        .decay(0.12).sustain(0).release(0.1)
        .hpf(90)
        .pan(0.5)
        .gain(0.5)
    ),

    stack(
      chord("<Em7 Am9 Bm7 CM9>")
        .dict('ireal')
        .voicing()
        .s("sawtooth")
        // 1. Long sustain allows the synth to ring out behind the gate
        .attack(.03).decay(.15).sustain(0.6).release(0.15)
        .set
        .mix(gain("[1 0 1 1 0 1 0 1 1 1 0 1 0 0 1 0]"))
        .lpf(sine.range(200, 2500).slow(16))
        .lpq(3)
        .hpf(300)
        .pan(sine.range(0.25, 0.75).slow(4))

    ),



  )

