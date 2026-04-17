"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Variant =
  | "fade-up"
  | "fade-left"
  | "fade-right"
  | "scale-in"
  | "parallax-up"
  | "rotate-in"
  | "stagger-children";

interface Props {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof JSX.IntrinsicElements;
}

const VARIANTS: Record<Variant, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
  "fade-up": {
    from: { opacity: 0, y: 48 },
    to: { opacity: 1, y: 0 },
  },
  "fade-left": {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0 },
  },
  "fade-right": {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0 },
  },
  "scale-in": {
    from: { opacity: 0, scale: 0.92 },
    to: { opacity: 1, scale: 1 },
  },
  "parallax-up": {
    from: { opacity: 0, y: 80 },
    to: { opacity: 1, y: 0 },
  },
  "rotate-in": {
    from: { opacity: 0, rotateX: 12, y: 40, transformPerspective: 800 },
    to: { opacity: 1, rotateX: 0, y: 0 },
  },
  "stagger-children": {
    from: { opacity: 0, y: 32 },
    to: { opacity: 1, y: 0 },
  },
};

export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.9,
  className,
  style,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const v = VARIANTS[variant];
    const ctx = gsap.context(() => {
      if (variant === "stagger-children") {
        gsap.fromTo(el.children, v.from, {
          ...v.to,
          duration,
          delay,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      } else {
        gsap.fromTo(el, v.from, {
          ...v.to,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [variant, delay, duration]);

  // @ts-ignore — dynamic tag
  return <Tag ref={ref} className={className} style={style}>{children}</Tag>;
}
