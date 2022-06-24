// IMPORTS
const pageContainer = document.querySelector("[data-scroll-container]")
const parallaxSpeed = document.querySelectorAll("[data-scroll-speed]")
import locomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { isDesktop } from "../functions/check-viewport";
gsap.registerPlugin(ScrollTrigger);



// DESKTOP CHECK
if (!isDesktop()) {
  parallaxSpeed.forEach(el => {
    delete el.dataset.scrollSpeed;
  })
}



// SMOOTH SCROLL
const locoScroll = new locomotiveScroll({
  el: pageContainer,
  smooth: true,
  multiplier: 1,
  touchMultiplier: 4,
  smartphone: {
    smooth: true
  },
  tablet: {
    smooth: true
  }
});

locoScroll.on("scroll", ScrollTrigger.update);



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
ScrollTrigger.scrollerProxy(pageContainer, {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  pinType: pageContainer.style.transform ? "transform" : "fixed"
});



// HORIZONTAL SCROLL
let libraryList = document.querySelector('.library__list');
let getToValue = () => -(libraryList.scrollWidth - window.innerWidth);

gsap.to('.library__list', {
  x: getToValue(),
  ease: "none",
  scrollTrigger: {
    scroller: pageContainer,
    scrub: true,
    trigger: '.library',
    pin: true,
    start: "bottom bottom",
    end: () => "+=" + libraryList.scrollWidth
  }
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

