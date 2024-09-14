gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

let sections = document.querySelectorAll(".section");
let scrollContainer = document.querySelector(".scrollContainer");

let scrollTween = gsap.to(scrollContainer, {
  x: () => -(scrollContainer.scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: scrollContainer,
    invalidateOnRefresh: true,
    pin: true,
    scrub: 1,
    end: () => "+=" + scrollContainer.scrollWidth,
  },
});

gsap.utils.toArray(".parallax").forEach(text => {
  gsap.timeline({
    defaults: {ease: "none"},
    scrollTrigger: {
      containerAnimation: scrollTween,
      trigger: text,
      start: "left right",
      end: "left left",
      scrub: true
    }
  })
  .fromTo(text, {x: 250}, {x: -250}, 0)
});