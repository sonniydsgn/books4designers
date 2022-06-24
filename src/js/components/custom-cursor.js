import { gsap } from "gsap";
import { lerp, getMousePos, getSiblings } from "../functions/utils";

// Grab the mouse position and set it to mouse state
let mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", (ev) => (mouse = getMousePos(ev)));
export default class Cursor {
  constructor(el) {
    // Varibles
    this.Cursor = el;
    this.Cursor.style.opacity = 0;
    this.Link = document.querySelectorAll("a");
    this.Item = document.querySelectorAll(".footer-booktable__item");
    this.bounds = this.Cursor.getBoundingClientRect();
    this.cursorConfigs = {
      x: { previous: 0, current: 0, amt: 0.3 },
      y: { previous: 0, current: 0, amt: 0.3 },
    };
    this.onMouseMoveEv = () => {
      this.cursorConfigs.x.previous = this.cursorConfigs.x.current = mouse.x;
      this.cursorConfigs.y.previous = this.cursorConfigs.y.previous = mouse.y;

      // Set cursor opacity to 1 when hovered on screen
      gsap.to(this.Cursor, {
        duration: 1,
        ease: "Power3.easeOut",
        opacity: 1,
      });
      // Execute scale function
      this.onScaleMouse();

      // The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.
      requestAnimationFrame(() => this.render());
      // Clean up function
      window.removeEventListener("mousemove", this.onMouseMoveEv);
    };
    // Scale cursor animation
    window.addEventListener("mousemove", this.onMouseMoveEv);
  }

  onScaleMouse() {
    // all links
    this.Link.forEach((link) => {
      if (link.closest('.footer-booktable__item')) {
        this.Item.forEach((item) => {
          item.addEventListener("mouseenter", () => {
            this.setImg(item);
            this.Cursor.children[0].style.transform = 'translate(-50%, -50%) scale(1)';
            this.Cursor.style.mixBlendMode = 'normal';
          });
          item.addEventListener("mouseleave", () => {
            this.Cursor.children[0].style.transform = 'translate(-50%, -50%) scale(0)';
            this.Cursor.style.mixBlendMode = 'exclusion';
          });
        });
      } else {
        link.addEventListener("mouseenter", () => {
          this.Cursor.classList.add('hover')
        });
        link.addEventListener("mouseleave", () => {
          this.Cursor.classList.remove('hover')
        });
      }
    });
  }

  setImg(el) {
    // Grab the data-img-src and make sure it matches the img that should be displayed
    let src = el.getAttribute("data-img-src");
    let img = document.querySelector(`#${src}`);
    let siblings = getSiblings(img);

    if (img.id == src) {
      gsap.set(img, { zIndex: 4, opacity: 1 });
      siblings.forEach((i) => {
        gsap.set(i, { zIndex: 1, opacity: 0 });
      });
    }
  }

  render() {
    this.cursorConfigs.x.current = mouse.x;
    this.cursorConfigs.y.current = mouse.y;

    // lerp
    for (const key in this.cursorConfigs) {
      // key will be x & y
      // WTF IS LERP?
      // Lerp - A lerp returns the value between two numbers at a specified, decimal midpoint:
      this.cursorConfigs[key].previous = lerp(
        this.cursorConfigs[key].previous,
        this.cursorConfigs[key].current,
        this.cursorConfigs[key].amt
      );
    }
    // Setting the cursor x and y to our cursoer html element
    this.Cursor.style.transform = `translateX(${this.cursorConfigs.x.previous}px) translateY(${this.cursorConfigs.y.previous}px)`;

    // RAF
    requestAnimationFrame(() => this.render());
  }
}
