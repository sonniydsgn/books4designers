import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from 'split-type';

const quoteDkdnd = new SplitType('#quote-dkdnd', { types: 'lines' });
const quoteIc = new SplitType('#quote-ic', { types: 'lines' });
const quoteTvevideod = new SplitType('#quote-tvevideod', { types: 'lines' });
const quoteNzmd = new SplitType('#quote-nzmd', { types: 'lines' });
const quoteSsp = new SplitType('#quote-ssp', { types: 'lines' });
const quoteKknss = new SplitType('#quote-kknss', { types: 'lines' });

window.addEventListener("load", function () {
  gsap.fromTo(quoteDkdnd.lines,
    { opacity: 0.35 },
    { opacity: 1,
    stagger: 1,
    scrollTrigger: {
      trigger: ('#quote-dkdnd'),
      scroller: '[data-scroll-container]',
      scrub: 1,
      start: 'top center',
      end: 'bottom center'
    }
  });

  gsap.fromTo(quoteIc.lines,
    { opacity: 0.35 },
    { opacity: 1,
    stagger: 1,
    scrollTrigger: {
      trigger: ('#quote-ic'),
      scroller: '[data-scroll-container]',
      scrub: 1,
      start: 'top center',
      end: 'bottom center'
    }
  });

  gsap.fromTo(quoteTvevideod.lines,
    { opacity: 0.35 },
    { opacity: 1,
    stagger: 1,
    scrollTrigger: {
      trigger: ('#quote-tvevideod'),
      scroller: '[data-scroll-container]',
      scrub: 1,
      start: 'top center',
      end: 'bottom center'
    }
  });

  gsap.fromTo(quoteNzmd.lines,
    { opacity: 0.35 },
    { opacity: 1,
    stagger: 1,
    scrollTrigger: {
      trigger: ('#quote-nzmd'),
      scroller: '[data-scroll-container]',
      scrub: 1,
      start: 'top center',
      end: 'bottom center'
    }
  });

  gsap.fromTo(quoteSsp.lines,
    { opacity: 0.35 },
    { opacity: 1,
    stagger: 1,
    scrollTrigger: {
      trigger: ('#quote-ssp'),
      scroller: '[data-scroll-container]',
      scrub: 1,
      start: 'top center',
      end: 'bottom center'
    }
  });

  gsap.fromTo(quoteKknss.lines,
    { opacity: 0.35 },
    { opacity: 1,
    stagger: 1,
    scrollTrigger: {
      trigger: ('#quote-kknss'),
      scroller: '[data-scroll-container]',
      scrub: 1,
      start: 'top center',
      end: 'bottom center'
    }
  });
});
