import gsap from "gsap";

export function fadeInUp(target: string | Element, delay = 0) {
  return gsap.from(target, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    delay,
    ease: "power3.out",
  });
}
