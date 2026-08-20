samples('github:tidalcycles/dirt-samples')
setcpm(125 / 4)

// ==========================================================
// 🎛️ GLOBAL ARRANGEMENT MASKS (18-Bar Timeline)
// ==========================================================
// Section Layout: Intro (1 bars) -> Build 1 (3 bars) -> Breakdown (4 bars) -> Build-up (2 bars) -> Main Drop (8 bars) [1]
const kickPercMask = "<1@1 1@3 0@4 0@2 1@10>"; // Active: Intro, Build 1, Main Drop
const dropOnlyMask = "<0@1 0@3 0@4 0@2 1@10>"; // Active: Main Drop only
const buildAndDropMask = "<0@1 1@3 0@4 0@2 1@10>"; // Active: Build 1, Main Drop
const buildupOnlyMask = "<0@1 0@3 0@4 1@2 0@10>"; // Active: Build-up only
const introOnlyMask = "<1@1 0@3 0@4 0@2 0@10>"; // Active: Intro only
const breakdownToDropMask = "<0@1 0@3 1@4 1@2 1@10>"; // Active: Breakdown, Build-up, Main Drop
const buildToDropMask = "<0@1 1@3 1@4 1@2 1@10>"; // Active: Build 1 through Main Drop

stack
  (stack(
    // 1. Kick: Hard mono (pan 0.5), low-pass filtered around 60Hz to isolate the low punch [1]
    s("bd*4")
      .pan(0.5)
      .lpf(800) // 6
      .gain(1)
      .mask(kickPercMask),

    // 2. Clap/Snare: Centered (pan 0.5), layered on beats 2 and 4 [1, 2]
    s("~ [cp, sd] ~ [cp, sd]")
      .pan(0.5)
      .gain(0.55)
      .mask(dropOnlyMask),

    // 3. Closed Hi-Hats: Centered (pan 0.5) playing an 8th-note grid [1]
    s("[hh hh - -] [hh - hh -] [hh - hh -] [hh - hh -]")
      .pan(0.5)
      .gain(0.5)
      .mask(buildAndDropMask),

    // 4. Open Hi-Hat: Offbeats, panned 15% Right (0.5 center + 0.15 = 0.65) [1]
    s("[- oh]*4")
      .pan(0.65)
      .gain(0.6)
      .mask(buildAndDropMask),

    // 5. Percussion Loop: High-passed at 150Hz, panned 20% Left (0.5 center - 0.2 = 0.3) [1]
    // s("cym*4")
    //   .hpf(150)
    //   .pan(0.3)
    //   .gain(0.5)
    //     .mask(kickPercMask),

    // 6. Build-up Snare Roll: Accelerating roll with a volume swell
    s("sd*16")
      .gain(saw.range(0.1, 0.75).slow(4)) // Swells smoothly over 4 bars of Build-up
      .pan(0.5)
      .bank("RolandTR909")
      .mask(buildupOnlyMask),
  ).bank("RolandTR909"),

    // --- SUB-STACK 2: BASS (Uses Synths) ---
    stack(
      // 7. Intro Bass Riff: Mid-bass only, sweeping open during the Intro [1]
      note("~ e2 [g2 b1] e2")
        .s("sawtooth")
        .decay(0.12).sustain(0).release(0.1)
        .lpf(saw.range(150, 450).slow(4)) // Filter sweeps completely open across the 4-bar Intro
        .pan(0.5)
        .gain(0.45)
        .mask(introOnlyMask),

      // Sub-Bass (Centered Sine)
      note("~ e2 ~ e2")
        .s("sine")
        .pan(0.5)
        .gain(0.8)
        .mask(buildAndDropMask),

      // Mid-Bass (Plucky Sawtooth)
      note("~ e2 [g2 b1] e2")
        .s("sawtooth")
        .decay(0.12).sustain(0).release(0.1)
        .hpf(90)
        .pan(0.5)
        .gain(0.5)
        .mask(buildAndDropMask),
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
        .lpf(sine.range(200, 2500).slow(8))
        .lpq(3)
        .hpf(300)
        .pan(sine.range(0.25, 0.75).slow(4))
        .mask(breakdownToDropMask),

      // 11. Subtle Vocal Chops: Introduced at Build 1, active through Drop [1]
      s("~ numbers:1 ~ numbers:2")
        .delay(0.25).room(0.5)
        .decay(.3).sustain(0.1)
        .set
        .mix(gain("[1 0 1 1 0 1 0 1 1 1 0 1 0 0 1 0]"))
        .mask(buildToDropMask)

    ),
  )

  // https://strudel.cc/#c2FtcGxlcygnZ2l0aHViOnRpZGFsY3ljbGVzL2RpcnQtc2FtcGxlcycpCnNldGNwbSgxMjUgLyA0KQoKLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PQovLyDwn46b77iPIEdMT0JBTCBBUlJBTkdFTUVOVCBNQVNLUyAoMTgtQmFyIFRpbWVsaW5lKQovLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ci8vIFNlY3Rpb24gTGF5b3V0OiBJbnRybyAoMSBiYXJzKSAtPiBCdWlsZCAxICgzIGJhcnMpIC0%2BIEJyZWFrZG93biAoNCBiYXJzKSAtPiBCdWlsZC11cCAoMiBiYXJzKSAtPiBNYWluIERyb3AgKDggYmFycykgWzFdCmNvbnN0IGtpY2tQZXJjTWFzayA9ICI8MUAxIDFAMyAwQDQgMEAyIDFAMTA%2BIjsgLy8gQWN0aXZlOiBJbnRybywgQnVpbGQgMSwgTWFpbiBEcm9wCmNvbnN0IGRyb3BPbmx5TWFzayA9ICI8MEAxIDBAMyAwQDQgMEAyIDFAMTA%2BIjsgLy8gQWN0aXZlOiBNYWluIERyb3Agb25seQpjb25zdCBidWlsZEFuZERyb3BNYXNrID0gIjwwQDEgMUAzIDBANCAwQDIgMUAxMD4iOyAvLyBBY3RpdmU6IEJ1aWxkIDEsIE1haW4gRHJvcApjb25zdCBidWlsZHVwT25seU1hc2sgPSAiPDBAMSAwQDMgMEA0IDFAMiAwQDEwPiI7IC8vIEFjdGl2ZTogQnVpbGQtdXAgb25seQpjb25zdCBpbnRyb09ubHlNYXNrID0gIjwxQDEgMEAzIDBANCAwQDIgMEAxMD4iOyAvLyBBY3RpdmU6IEludHJvIG9ubHkKY29uc3QgYnJlYWtkb3duVG9Ecm9wTWFzayA9ICI8MEAxIDBAMyAxQDQgMUAyIDFAMTA%2BIjsgLy8gQWN0aXZlOiBCcmVha2Rvd24sIEJ1aWxkLXVwLCBNYWluIERyb3AKY29uc3QgYnVpbGRUb0Ryb3BNYXNrID0gIjwwQDEgMUAzIDFANCAxQDIgMUAxMD4iOyAvLyBBY3RpdmU6IEJ1aWxkIDEgdGhyb3VnaCBNYWluIERyb3AKCnN0YWNrCiAgKHN0YWNrKAogICAgLy8gMS4gS2ljazogSGFyZCBtb25vIChwYW4gMC41KSwgbG93LXBhc3MgZmlsdGVyZWQgYXJvdW5kIDYwSHogdG8gaXNvbGF0ZSB0aGUgbG93IHB1bmNoIFsxXQogICAgcygiYmQqNCIpCiAgICAgIC5wYW4oMC41KQogICAgICAubHBmKDgwMCkgLy8gNgogICAgICAuZ2FpbigxKQogICAgICAubWFzayhraWNrUGVyY01hc2spLAoKICAgIC8vIDIuIENsYXAvU25hcmU6IENlbnRlcmVkIChwYW4gMC41KSwgbGF5ZXJlZCBvbiBiZWF0cyAyIGFuZCA0IFsxLCAyXQogICAgcygifiBbY3AsIHNkXSB%2BIFtjcCwgc2RdIikKICAgICAgLnBhbigwLjUpCiAgICAgIC5nYWluKDAuNTUpCiAgICAgIC5tYXNrKGRyb3BPbmx5TWFzayksCgogICAgLy8gMy4gQ2xvc2VkIEhpLUhhdHM6IENlbnRlcmVkIChwYW4gMC41KSBwbGF5aW5nIGFuIDh0aC1ub3RlIGdyaWQgWzFdCiAgICBzKCJbaGggaGggLSAtXSBbaGggLSBoaCAtXSBbaGggLSBoaCAtXSBbaGggLSBoaCAtXSIpCiAgICAgIC5wYW4oMC41KQogICAgICAuZ2FpbigwLjUpCiAgICAgIC5tYXNrKGJ1aWxkQW5kRHJvcE1hc2spLAoKICAgIC8vIDQuIE9wZW4gSGktSGF0OiBPZmZiZWF0cywgcGFubmVkIDE1JSBSaWdodCAoMC41IGNlbnRlciArIDAuMTUgPSAwLjY1KSBbMV0KICAgIHMoIlstIG9oXSo0IikKICAgICAgLnBhbigwLjY1KQogICAgICAuZ2FpbigwLjYpCiAgICAgIC5tYXNrKGJ1aWxkQW5kRHJvcE1hc2spLAoKICAgIC8vIDUuIFBlcmN1c3Npb24gTG9vcDogSGlnaC1wYXNzZWQgYXQgMTUwSHosIHBhbm5lZCAyMCUgTGVmdCAoMC41IGNlbnRlciAtIDAuMiA9IDAuMykgWzFdCiAgICAvLyBzKCJjeW0qNCIpCiAgICAvLyAgIC5ocGYoMTUwKQogICAgLy8gICAucGFuKDAuMykKICAgIC8vICAgLmdhaW4oMC41KQogICAgLy8gICAgIC5tYXNrKGtpY2tQZXJjTWFzayksCgogICAgLy8gNi4gQnVpbGQtdXAgU25hcmUgUm9sbDogQWNjZWxlcmF0aW5nIHJvbGwgd2l0aCBhIHZvbHVtZSBzd2VsbAogICAgcygic2QqMTYiKQogICAgICAuZ2FpbihzYXcucmFuZ2UoMC4xLCAwLjc1KS5zbG93KDQpKSAvLyBTd2VsbHMgc21vb3RobHkgb3ZlciA0IGJhcnMgb2YgQnVpbGQtdXAKICAgICAgLnBhbigwLjUpCiAgICAgIC5iYW5rKCJSb2xhbmRUUjkwOSIpCiAgICAgIC5tYXNrKGJ1aWxkdXBPbmx5TWFzayksCiAgKS5iYW5rKCJSb2xhbmRUUjkwOSIpLAoKICAgIC8vIC0tLSBTVUItU1RBQ0sgMjogQkFTUyAoVXNlcyBTeW50aHMpIC0tLQogICAgc3RhY2soCiAgICAgIC8vIDcuIEludHJvIEJhc3MgUmlmZjogTWlkLWJhc3Mgb25seSwgc3dlZXBpbmcgb3BlbiBkdXJpbmcgdGhlIEludHJvIFsxXQogICAgICBub3RlKCJ%2BIGUyIFtnMiBiMV0gZTIiKQogICAgICAgIC5zKCJzYXd0b290aCIpCiAgICAgICAgLmRlY2F5KDAuMTIpLnN1c3RhaW4oMCkucmVsZWFzZSgwLjEpCiAgICAgICAgLmxwZihzYXcucmFuZ2UoMTUwLCA0NTApLnNsb3coNCkpIC8vIEZpbHRlciBzd2VlcHMgY29tcGxldGVseSBvcGVuIGFjcm9zcyB0aGUgNC1iYXIgSW50cm8KICAgICAgICAucGFuKDAuNSkKICAgICAgICAuZ2FpbigwLjQ1KQogICAgICAgIC5tYXNrKGludHJvT25seU1hc2spLAoKICAgICAgLy8gU3ViLUJhc3MgKENlbnRlcmVkIFNpbmUpCiAgICAgIG5vdGUoIn4gZTIgfiBlMiIpCiAgICAgICAgLnMoInNpbmUiKQogICAgICAgIC5wYW4oMC41KQogICAgICAgIC5nYWluKDAuOCkKICAgICAgICAubWFzayhidWlsZEFuZERyb3BNYXNrKSwKCiAgICAgIC8vIE1pZC1CYXNzIChQbHVja3kgU2F3dG9vdGgpCiAgICAgIG5vdGUoIn4gZTIgW2cyIGIxXSBlMiIpCiAgICAgICAgLnMoInNhd3Rvb3RoIikKICAgICAgICAuZGVjYXkoMC4xMikuc3VzdGFpbigwKS5yZWxlYXNlKDAuMSkKICAgICAgICAuaHBmKDkwKQogICAgICAgIC5wYW4oMC41KQogICAgICAgIC5nYWluKDAuNSkKICAgICAgICAubWFzayhidWlsZEFuZERyb3BNYXNrKSwKICAgICksCgogICAgc3RhY2soCiAgICAgIGNob3JkKCI8RW03IEFtOSBCbTcgQ005PiIpCiAgICAgICAgLmRpY3QoJ2lyZWFsJykKICAgICAgICAudm9pY2luZygpCiAgICAgICAgLnMoInNhd3Rvb3RoIikKICAgICAgICAvLyAxLiBMb25nIHN1c3RhaW4gYWxsb3dzIHRoZSBzeW50aCB0byByaW5nIG91dCBiZWhpbmQgdGhlIGdhdGUKICAgICAgICAuYXR0YWNrKC4wMykuZGVjYXkoLjE1KS5zdXN0YWluKDAuNikucmVsZWFzZSgwLjE1KQogICAgICAgIC5zZXQKICAgICAgICAubWl4KGdhaW4oIlsxIDAgMSAxIDAgMSAwIDEgMSAxIDAgMSAwIDAgMSAwXSIpKQogICAgICAgIC5scGYoc2luZS5yYW5nZSgyMDAsIDI1MDApLnNsb3coOCkpCiAgICAgICAgLmxwcSgzKQogICAgICAgIC5ocGYoMzAwKQogICAgICAgIC5wYW4oc2luZS5yYW5nZSgwLjI1LCAwLjc1KS5zbG93KDQpKQogICAgICAgIC5tYXNrKGJyZWFrZG93blRvRHJvcE1hc2spLAoKICAgICAgLy8gMTEuIFN1YnRsZSBWb2NhbCBDaG9wczogSW50cm9kdWNlZCBhdCBCdWlsZCAxLCBhY3RpdmUgdGhyb3VnaCBEcm9wIFsxXQogICAgICBzKCJ%2BIG51bWJlcnM6MSB%2BIG51bWJlcnM6MiIpCiAgICAgICAgLmRlbGF5KDAuMjUpLnJvb20oMC41KQogICAgICAgIC5kZWNheSguMykuc3VzdGFpbigwLjEpCiAgICAgICAgLnNldAogICAgICAgIC5taXgoZ2FpbigiWzEgMCAxIDEgMCAxIDAgMSAxIDEgMCAxIDAgMCAxIDBdIikpCiAgICAgICAgLm1hc2soYnVpbGRUb0Ryb3BNYXNrKQoKICAgICksCiAgKQoK
