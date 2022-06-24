import Cursor from "../components/custom-cursor";
import { isDesktop } from '../functions/check-viewport';
import { gsap } from "gsap";
import vars from '../_vars';

window.onload = () => {
  vars.bodyEl.classList.remove("loading");
  gsap.from(vars.bodyEl, {
    opacity: 0,
    duration: 0.8,
    ease: "Power3.easeInOut",
  });
  if (isDesktop()) {
    const cursor = new Cursor(document.querySelector(".cursor"));
  }
};
