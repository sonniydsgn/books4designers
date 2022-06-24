// IMPORTS
import locomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


// SMOOTH SCROLL
const locoScroll = new locomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true
});


// ANCHORS SCROLL
const anchorLinks = document.querySelectorAll('a[href^=\\#]:not([href$=\\#])');

anchorLinks.forEach((anchorLink) => {
  let hashval = anchorLink.getAttribute('href');
  let target = document.querySelector(hashval);

  anchorLink.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    locoScroll.scrollTo(target);
  });
});


// SYNC LOCOMOTIVE & GSAP
ScrollTrigger.scrollerProxy("[data-scroll-container]", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
});


// HORIZONTAL SCROLL
let libraryList = document.querySelector('.library__list');
let getToValue = () => -(libraryList.scrollWidth - window.innerWidth);

gsap.fromTo(libraryList,
  { x: 0 },
  { x: getToValue(),
  ease: "none",
  scrollTrigger: {
    trigger: '.library',
    scroller: '[data-scroll-container]',
    start: "bottom bottom",
    end: () => "+=" + libraryList.scrollWidth,
    pin: true,
    scrub: true,
  }
});


// UPDATES LOCOMOTIVE & GSAP
locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();
