var tl = gsap.timeline();

tl.from(".landing-page" , {
    opacity : 0,
    duration : 1,
    delay : 0.5
})

tl.from(".logo" , {
    y : -100,
    duration : 1,
})
tl.from(".container nav ul li" , {
    y : -100,
    duration : 1,
    stagger : 0.3,
})
gsap.from(".container .hero-text h1" , {
    opacity : 0,
    duration : 1,
    delay : 1,
    // rotate : 360,
    scale : 0,
})

var scroll = new LocomotiveScroll({
    el: document.querySelector('.landing-page'),
    smooth: true
});