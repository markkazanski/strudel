stack(
  s("bd(4,8,0)")
    .bank("RolandTR909")
    .lpf(400)
    .gain(0.9)._punchcard(), 

    s("hh(1,8,0)")
    .bank("RolandTR909")
    .gain(0.55),
  
  note(`
  1 1 1 1 1 1 1 3 
  _ 3 3 3 3 3 3 3 2
  _ 2 2 2 2 2 2 2 1
  _ 1 1 1 1 1 1 6 7
`)
   .scale("A1:minor")
  .slow(4)
  .s("piano")._pianoroll() 
).cpm(90/4 )