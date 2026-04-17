"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function smoothScrollTo(target: string) {
  const navOffset = Math.min(
    Math.max(72, window.innerHeight * 0.09),
    108,
  );
  gsap.to(window, {
    duration: 1.6,
    ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    scrollTo: { y: target, offsetY: navOffset, autoKill: true },
  });
}

type ManifestFrame = { file: string; bytes?: number };
type Manifest = { count: number; frames: ManifestFrame[] };

const FRAMES_PATH = "/frames";
const MOBILE_BREAKPOINT = 768;

function scheduleIdle(cb: () => void) {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  };
  if (typeof w.requestIdleCallback === "function") {
    w.requestIdleCallback(cb, { timeout: 500 });
  } else {
    window.setTimeout(cb, 0);
  }
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const goldWashRef = useRef<HTMLDivElement>(null);
  const darkScrimRef = useRef<HTMLDivElement>(null);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const frameStateRef = useRef({ exact: 0, index: 0 });

  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const m = window.innerWidth < MOBILE_BREAKPOINT;
    setIsMobile(m);
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Progressive frame preload — first 30 eagerly, rest on idle
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const res = await fetch(`${FRAMES_PATH}/manifest.json`, { cache: "force-cache" });
      const manifest = (await res.json()) as Manifest;

      const images: HTMLImageElement[] = new Array(manifest.count);
      let loaded = 0;
      const bumpProgress = () => {
        loaded += 1;
        if (!cancelled) setLoadProgress(loaded / manifest.count);
      };

      const loadOne = (i: number) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.decoding = "async";
          img.src = `${FRAMES_PATH}/${manifest.frames[i].file}`;
          img.onload = () => {
            images[i] = img;
            bumpProgress();
            resolve();
          };
          img.onerror = () => {
            bumpProgress();
            resolve();
          };
        });

      // Eager: first 30 frames — enable scroll as soon as these land
      const eagerCount = Math.min(30, manifest.count);
      const eagerBatch = Promise.all(
        Array.from({ length: eagerCount }, (_, i) => loadOne(i)),
      );

      // Lazy: remaining frames — flush during idle
      const lazy = (): Promise<void> =>
        new Promise((resolveLazy) => {
          let i = eagerCount;
          const run = (deadline?: IdleDeadline) => {
            while (
              i < manifest.count &&
              (!deadline || deadline.timeRemaining() > 4 || deadline.didTimeout)
            ) {
              loadOne(i);
              i += 1;
            }
            if (i < manifest.count) {
              scheduleIdle(run);
            } else {
              resolveLazy();
            }
          };
          scheduleIdle(run);
        });

      await eagerBatch;
      if (cancelled) return;

      framesRef.current = images;
      setReady(true);

      lazy();
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Build pinned canvas + scroll-scrubbed timeline once frames are ready
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const pin = pinRef.current;
    const section = sectionRef.current;
    if (!canvas || !pin || !section) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const getSize = () => {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth ?? window.innerWidth;
      const h = parent?.clientHeight ?? window.innerHeight;
      return { w, h };
    };

    const findLoaded = (idx: number): HTMLImageElement | undefined => {
      const frames = framesRef.current;
      let img = frames[idx];
      for (let i = idx; i >= 0 && !img; i--) img = frames[i];
      return img;
    };

    const coverDraw = (img: HTMLImageElement, vw: number, vh: number) => {
      const scale = Math.max(vw / img.width, vh / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, (vw - w) / 2, (vh - h) / 2, w, h);
    };

    const drawAt = (exactIdx: number) => {
      const frames = framesRef.current;
      if (!frames.length) return;
      const last = frames.length - 1;
      const lo = Math.max(0, Math.min(Math.floor(exactIdx), last));
      const hi = Math.min(lo + 1, last);
      const frac = exactIdx - lo;

      const imgLo = findLoaded(lo);
      if (!imgLo) return;

      const { w: vw, h: vh } = getSize();
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, vw, vh);
      coverDraw(imgLo, vw, vh);

      if (frac > 0.005 && hi !== lo) {
        const imgHi = findLoaded(hi);
        if (imgHi && imgHi !== imgLo) {
          ctx.globalAlpha = frac;
          coverDraw(imgHi, vw, vh);
          ctx.globalAlpha = 1;
        }
      }
    };

    const sizeCanvas = () => {
      const { w, h } = getSize();
      if (w === 0 || h === 0) return;
      const baseDpr = Math.min(window.devicePixelRatio || 1, 2);
      const cap = isMobile ? 1600 : 3200;
      const longest = Math.max(w, h);
      const dpr = Math.min(baseDpr, cap / longest);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      drawAt(frameStateRef.current.exact);
    };

    const renderAt = (progress: number) => {
      const frames = framesRef.current;
      if (!frames.length) return;
      const exact = progress * (frames.length - 1);
      frameStateRef.current.exact = exact;
      frameStateRef.current.index = Math.round(exact);
      drawAt(exact);
    };

    sizeCanvas();
    window.addEventListener("resize", sizeCanvas, { passive: true });

    // SCROLL CHOREOGRAPHY — 400vh desktop, 300vh mobile
    const runway = isMobile ? 120 : 150;

    const ctxGsap = gsap.context(() => {
      // Master pin + frame scrub
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${runway}%`,
          pin: pin,
          scrub: 2,
          anticipatePin: 1,
        },
      });

      // 0 → 1: map scroll to frame index
      master.to(
        { p: 0 },
        {
          p: 1,
          duration: 1,
          ease: "none",
          onUpdate() {
            renderAt(this.targets()[0].p);
          },
        },
        0,
      );

      // Text fade — box dissolves early
      if (contentRef.current) {
        const items = contentRef.current.querySelectorAll<HTMLElement>("[data-hero-layer]");
        const s1 = 10 / runway;
        const e1 = 40 / runway;
        master.to(
          items,
          { opacity: 0, y: -30, duration: e1 - s1, ease: "power2.in" },
          s1,
        );
      }

      // Gold wash bleed
      if (goldWashRef.current) {
        const s = 30 / runway;
        const e = 120 / runway;
        master.to(
          goldWashRef.current,
          { opacity: 1, duration: e - s, ease: "power2.out" },
          s,
        );
      }

      // Canvas push-in scale
      if (canvasWrapRef.current) {
        const s = 70 / runway;
        const e = 1;
        master.to(
          canvasWrapRef.current,
          { scale: 1.12, duration: e - s, ease: "power2.out" },
          s,
        );
      }

      // Light scrim during pin — most of the dark blend happens post-pin via the second trigger below
      if (darkScrimRef.current) {
        const s = 110 / runway;
        const e = 1;
        master.to(
          darkScrimRef.current,
          { opacity: 0.35, duration: e - s, ease: "power1.in" },
          s,
        );
      }

      // POST-PIN: while the unpinned canvas scrolls away with the page, deepen the scrim
      // and drift the canvas upward — creates a continuous "animation-into-scroll" blend.
      if (darkScrimRef.current && canvasWrapRef.current) {
        gsap.to(darkScrimRef.current, {
          opacity: 0.95,
          ease: "power1.in",
          scrollTrigger: {
            trigger: section,
            start: `top+=${runway}% top`,
            end: `bottom top`,
            scrub: true,
          },
        });
        gsap.to(canvasWrapRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: `top+=${runway}% top`,
            end: `bottom top`,
            scrub: true,
          },
        });
      }

    }, section);

    return () => {
      ctxGsap.revert();
      window.removeEventListener("resize", sizeCanvas);
    };
  }, [ready, isMobile]);

  return (
    <section
      ref={sectionRef}
      aria-label="Seven Star Chauffeurs — cinematic door opening"
      className="relative w-full bg-[var(--obsidian)]"
      style={{ height: `${isMobile ? 220 : 260}vh` }}
    >
      {/* Pinned stage */}
      <div
        ref={pinRef}
        className="relative w-full h-[100svh] overflow-hidden"
      >
        {/* Canvas wrapper (receives scale transform) */}
        <div
          ref={canvasWrapRef}
          className="absolute inset-0"
          style={{
            transformOrigin: "center center",
            willChange: "transform",
          }}
        >
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="A chauffeur opens the coach door of a Rolls-Royce Phantom at the Fairmont Pacific Rim, warm interior light spilling onto wet cobblestone."
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Warm gold wash — bleeds in from the right as the door opens */}
        <div
          ref={goldWashRef}
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0,
            background:
              "radial-gradient(ellipse 70% 90% at 100% 50%, rgba(212,160,74,0.45) 0%, rgba(212,160,74,0.18) 30%, rgba(212,160,74,0) 65%)",
            mixBlendMode: "screen",
          }}
        />

        {/* Edge vignette (always on, deepens the tunnel-vision effect) */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 30%, rgba(5,5,5,0.55) 85%, rgba(5,5,5,0.85) 100%)",
          }}
        />

        {/* Dark scrim for the 'entering the car' transition */}
        <div
          ref={darkScrimRef}
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0,
            background: "rgba(5,5,5,1)",
          }}
        />

        {/* Filmic grain */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            backgroundSize: "240px 240px",
          }}
        />

        {/* Hero overlay — centered stack (The Stillness) inside a frosted panel */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
          style={{ paddingTop: "clamp(80px, 12vh, 140px)" }}
        >
          <div
            data-hero-layer
            className="flex flex-col items-center"
            style={{
              padding: "clamp(28px, 3.4vw, 44px) clamp(32px, 4.4vw, 64px) clamp(22px, 2.6vw, 32px)",
              background: "rgba(5,5,5,0.55)",
              backdropFilter: "blur(22px) saturate(1.1)",
              WebkitBackdropFilter: "blur(22px) saturate(1.1)",
              border: "1px solid rgba(197,165,90,0.22)",
              boxShadow:
                "0 0 0 1px rgba(5,5,5,0.4) inset, 0 30px 60px -20px rgba(0,0,0,0.55), 0 0 80px rgba(212,160,74,0.06)",
              maxWidth: "min(560px, 92vw)",
              width: "100%",
              position: "relative",
            }}
          >
            {/* Corner flourishes — thin gold ticks at the four corners */}
            {(["tl", "tr", "bl", "br"] as const).map((c) => {
              const pos =
                c === "tl"
                  ? { top: 10, left: 10, borderTop: "1px solid var(--gold)", borderLeft: "1px solid var(--gold)" }
                  : c === "tr"
                  ? { top: 10, right: 10, borderTop: "1px solid var(--gold)", borderRight: "1px solid var(--gold)" }
                  : c === "bl"
                  ? { bottom: 10, left: 10, borderBottom: "1px solid var(--gold)", borderLeft: "1px solid var(--gold)" }
                  : { bottom: 10, right: 10, borderBottom: "1px solid var(--gold)", borderRight: "1px solid var(--gold)" };
              return (
                <span
                  key={c}
                  aria-hidden
                  style={{
                    position: "absolute",
                    width: "14px",
                    height: "14px",
                    opacity: 0.65,
                    ...pos,
                  }}
                />
              );
            })}

            <div className="page-in-logo">
              <NextImage
                src="/logos/seven-star-gold.webp"
                alt="Seven Star Chauffeurs"
                width={1200}
                height={1200}
                priority
                style={{
                  height: "clamp(200px, 20vw, 260px)",
                  width: "auto",
                  display: "block",
                  filter: "drop-shadow(0 2px 24px rgba(5,5,5,0.6))",
                }}
              />
            </div>

            <h1
              className="page-in-text text-center"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontStyle: "normal",
                fontSize: "clamp(38px, 5.2vw, 64px)",
                letterSpacing: "0.22em",
                color: "var(--gold)",
                marginTop: "clamp(-12px, -1vh, -4px)",
                paddingLeft: "0.22em",
                marginBottom: 0,
                lineHeight: 1,
                textTransform: "uppercase",
              }}
            >
              Luxury
            </h1>

            <div
              className="page-in-text text-center"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontStyle: "italic",
                fontSize: "clamp(22px, 2.8vw, 32px)",
                letterSpacing: "0.01em",
                color: "var(--ivory)",
                marginTop: "clamp(4px, 0.6vh, 8px)",
                lineHeight: 1,
                textTransform: "none",
              }}
            >
              Chauffeur Service
            </div>

            <div
              className="page-in-rule gold-pulse"
              style={{
                marginTop: "clamp(24px, 3.2vh, 36px)",
                width: "48px",
                height: "1px",
                background: "var(--gold)",
              }}
              aria-hidden
            />

            <div
              className="page-in-cta flex flex-col sm:flex-row items-center gap-3"
              style={{ marginTop: "clamp(18px, 2.2vh, 26px)", width: "100%", justifyContent: "center" }}
            >
              <a
                href="#reserve"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("#reserve");
                }}
                className="btn-gold inline-flex items-center justify-center"
                style={{
                  padding: "12px 24px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "11px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--obsidian)",
                  background: "var(--gold)",
                  border: "1px solid var(--gold)",
                  borderRadius: "2px",
                  minWidth: "160px",
                  transition: "transform 300ms cubic-bezier(0.4,0,0.2,1), box-shadow 300ms",
                  boxShadow: "0 8px 24px -10px rgba(212,160,74,0.4)",
                }}
              >
                Reserve
              </a>
              <a
                href="#fleet"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("#fleet");
                }}
                className="inline-flex items-center justify-center"
                style={{
                  padding: "12px 24px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "11px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--ivory)",
                  background: "transparent",
                  border: "1px solid rgba(244,240,232,0.35)",
                  borderRadius: "2px",
                  minWidth: "160px",
                  transition: "border-color 300ms, color 300ms",
                }}
              >
                View Fleet
              </a>
            </div>
          </div>

        </div>

        {/* Preload progress — thin gold track until ready */}
        {!ready && (
          <div
            role="progressbar"
            aria-label="Loading hero sequence"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(loadProgress * 100)}
            className="absolute bottom-0 left-0 right-0 h-[1px] z-30"
            style={{ background: "rgba(184,184,184,0.08)" }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.max(6, Math.round(loadProgress * 100))}%`,
                background: "var(--gold)",
                transition: "width 240ms cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
