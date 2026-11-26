setcps(0.5)

// $DRUMS: stack( 
//  s("bd*4")
// )

// TYPE LIVE
// 1. DRUMS 909
$DRUMS: stack( 
 s("bd*4"),
 s("[~ oh]*4").gain(.3),
 s("[hh hh - -]*4").gain(.4),
 s("~ cp ~ cp").gain(.8),
 s("[[- - rim rim] [- - rim -]]*2").gain(.4)
).bank("RolandTR909")
 .color("blueviolet cyan darkcyan magenta")
 ._punchcard()

// PRE-BAKE - filter tweaks type live
// 2. BASS 303 - .scale("C2:harmonic:minor")
// slider filter:   .lpf(slider(200, 20, 900, 10))
// .lpf(slider(1230, 50, 3800, 10)) // Demo first before adding lpf sine

$BASS: note("[C2 C2 C3 B1] [C2 C2 C3 B2] [C2 C4 C3 B1] [C2 C2 C3 Eb2]")
  ._punchcard()
  .s("supersaw")
  .lpf(sine.range(150, 800).slow(8)) 
  .lpq(25) 
  .lpenv(slider(3.5, 0, 5, .5)) 
  .lpd(0.18)
  .ftype("ladder") 
  .distort(0.4) 
  .decay(0.25)
  .sustain(0.1)
  .gain(.9)

  // 3. Harmony - soft pads
$CHORDS: note("<[c,eb,g]!3 [d,f,ab] [eb,g,b]!2 [f,ab,c]>")
  // ._punchcard()

  .s("supersaw")
  .attack(.5)                             
  .release(1)  
  
  .transpose(24)                     
  .superimpose(x => x.add(.04))      
  .add(perlin.range(0, .2))             
                          
  .lpf(sine.range(900, 2000).slow(32))  
  .hpf(slider(1040, 400, 2000, 10))
  .room(0.5)                            
  .gain(.2)
  .color("blueviolet cyan darkcyan magenta")


// 4. Lead melody
$LEAD: note(`
   [C3@7 C4]
   [C3]
   [G3@7 [Bb3@2 C4@3]]
   [Eb3@14 C4@2]
  `)
  .slow(4)
  .sound("sawtooth, square, supersaw")
    .color("blueviolet cyan darkcyan magenta").punchcard()
  .partials(new Array(22).fill(1))
  .attack(0.05)
  .decay(1)
  .sustain(.5)
  .release(.5)
  .lpf(sine.range(300, 2000).slow(8))
  .room(.7)
  .delay(0.3)
  .gain(.8)
// big screen `.punchcard()`

// 5. Accent - high-pitched synth
$NOTE: note("C4").sound("supersaw").lpf(sine.range(800, 1500).slow(8))

// 6. Pluck - short, sharp synth
$PLUCK: note("C4 ~ ~ ~")
  .sound("supersaw").attack(0.08).decay(.08).hpf(800).room(0.8)

