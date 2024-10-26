var tl = gsap.timeline();

gsap.from(".landing-page" , {
    opacity : 0,
    duration : 1,
    delay : 0.5
})

tl.from(".logo" , {
    y : -100,
    duration : 1,
})
tl.from("nav" , {
    y : -100,
    duration : 1,
    stagger : 0.3
})
gsap.from(".container .hero-text h1" , {
    opacity : 0,
    duration : 1,
    delay : 1,
    // rotate : 360,
    scale : 0,
    stagger : 0.3
})