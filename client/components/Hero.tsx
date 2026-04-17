"use client";

import { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function smoothScrollTo(target: string) {
  const el = document.querySelector(target);
  if (!el) return;
  const nav = document.querySelector("nav[aria-label='Primary']");
  const navH = nav ? nav.getBoundingClientRect().height : 72;
  const top = el.getBoundingClientRect().top + window.scrollY - navH;
  gsap.to(window, {
    duration: 1.4,
    ease: "power3.out",
    scrollTo: { y: Math.max(0, top), autoKill: true },
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

/* ─── Shared overlay content ─── */
function HeroContent({ onReserve, onFleet }: { onReserve: () => void; onFleet: () => void }) {
  return (
    <div
      data-hero-layer
      className="flex flex-col items-center"
      style={{
        padding: "clamp(24px, 3vw, 44px) clamp(28px, 4vw, 64px) clamp(20px, 2.4vw, 32px)",
        background: "linear-gradient(180deg, rgba(5,5,5,0.35) 0%, rgba(5,5,5,0.5) 100%)",
        backdropFilter: "blur(14px) saturate(1.15)",
        WebkitBackdropFilter: "blur(14px) saturate(1.15)",
        border: "1px solid rgba(197,165,90,0.15)",
        boxShadow:
          "0 30px 60px -20px rgba(0,0,0,0.4), 0 0 80px rgba(212,160,74,0.04)",
        maxWidth: "min(560px, 90vw)",
        width: "100%",
        position: "relative",
      }}
    >
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
            style={{ position: "absolute", width: "14px", height: "14px", opacity: 0.65, ...pos }}
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
            height: "clamp(140px, 18vw, 260px)",
            width: "auto",
            display: "block",
            filter: "drop-shadow(0 2px 24px rgba(5,5,5,0.6))",
          }}
        />
      </div>

      <h1
        className="page-in-heading text-center"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(32px, 5vw, 64px)",
          letterSpacing: "0.22em",
          color: "var(--gold)",
          marginTop: "clamp(-8px, -0.8vh, -4px)",
          paddingLeft: "0.22em",
          marginBottom: 0,
          lineHeight: 1,
          textTransform: "uppercase",
        }}
      >
        Luxury
      </h1>

      <div
        className="page-in-subhead text-center"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontStyle: "italic",
          fontSize: "clamp(20px, 3vw, 34px)",
          letterSpacing: "0.03em",
          color: "var(--ivory)",
          marginTop: "clamp(4px, 0.6vh, 8px)",
          lineHeight: 1,
        }}
      >
        Chauffeur Service
      </div>

      <div
        className="page-in-rule gold-pulse"
        style={{ marginTop: "clamp(20px, 3vh, 36px)", width: "48px", height: "1px", background: "var(--gold)" }}
        aria-hidden
      />

      <div
        className="page-in-cta flex flex-col sm:flex-row items-center gap-3"
        style={{ marginTop: "clamp(16px, 2vh, 26px)", width: "100%", justifyContent: "center" }}
      >
        <a
          href="#reserve"
          onClick={(e) => { e.preventDefault(); onReserve(); }}
          className="inline-flex items-center justify-center btn-gold"
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
            minWidth: "150px",
            boxShadow: "0 8px 24px -10px rgba(212,160,74,0.4)",
            transition: "box-shadow 400ms cubic-bezier(0.33,1,0.68,1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 12px 36px -8px rgba(212,160,74,0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 24px -10px rgba(212,160,74,0.4)";
          }}
        >
          Reserve
        </a>
        <a
          href="#fleet"
          onClick={(e) => { e.preventDefault(); onFleet(); }}
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
            minWidth: "150px",
            transition: "background 400ms cubic-bezier(0.33,1,0.68,1), color 400ms cubic-bezier(0.33,1,0.68,1), border-color 400ms cubic-bezier(0.33,1,0.68,1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(244,240,232,0.12)";
            e.currentTarget.style.borderColor = "var(--ivory)";
            e.currentTarget.style.color = "var(--ivory)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(244,240,232,0.35)";
            e.currentTarget.style.color = "var(--ivory)";
          }}
        >
          View Fleet
        </a>
      </div>
    </div>
  );
}

/* ─── Mobile: static hero image ─── */
function MobileHero() {
  return (
    <section
      aria-label="Seven Star Chauffeurs"
      className="relative w-full bg-[var(--obsidian)]"
      style={{ height: "100svh", overflow: "hidden" }}
    >
      <NextImage
        src="/hero-mobile.webp"
        alt="A chauffeur opens the coach door of a Rolls-Royce at the Fairmont Pacific Rim"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "70% center", filter: "brightness(0.93) contrast(1.08) saturate(1.2)" }}
      />

      {/* Warm color grade — subtle gold wash to add richness */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(212,160,74,0.06)", mixBlendMode: "color" }}
      />

      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 25%, rgba(5,5,5,0.45) 75%, rgba(5,5,5,0.8) 100%)",
        }}
      />

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: "40%",
          background: "linear-gradient(to top, rgba(5,5,5,1) 0%, transparent 100%)",
        }}
      />

      {/* Grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px 240px",
        }}
      />

      {/* Content */}
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5"
        style={{ paddingTop: "clamp(60px, 10vh, 120px)" }}
      >
        <HeroContent
          onReserve={() => smoothScrollTo("#reserve")}
          onFleet={() => smoothScrollTo("#fleet")}
        />
      </div>
    </section>
  );
}

/* ─── Desktop: canvas scroll animation ─── */
function DesktopHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const goldWashRef = useRef<HTMLDivElement>(null);
  const darkScrimRef = useRef<HTMLDivElement>(null);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const progressRef = useRef(0);

  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady] = useState(false);

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
          img.onload = () => { images[i] = img; bumpProgress(); resolve(); };
          img.onerror = () => { bumpProgress(); resolve(); };
        });

      const eagerCount = Math.min(30, manifest.count);
      await Promise.all(Array.from({ length: eagerCount }, (_, i) => loadOne(i)));
      if (cancelled) return;

      framesRef.current = images;
      setReady(true);

      // Lazy-load remaining
      let idx = eagerCount;
      const run = (deadline?: IdleDeadline) => {
        while (idx < manifest.count && (!deadline || deadline.timeRemaining() > 4 || deadline.didTimeout)) {
          loadOne(idx);
          idx += 1;
        }
        if (idx < manifest.count) scheduleIdle(run);
      };
      scheduleIdle(run);
    })();

    return () => { cancelled = true; };
  }, []);

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

    /* Track last drawn frame to skip redundant redraws */
    let lastDrawnFloat = -1;

    /* Crossfade-capable frame renderer: blends frame A and B by fractional t */
    const drawBlended = (floatIdx: number) => {
      // Skip if we'd draw the exact same blend (within sub-pixel tolerance)
      if (Math.abs(floatIdx - lastDrawnFloat) < 0.005) return;
      lastDrawnFloat = floatIdx;

      const frames = framesRef.current;
      if (!frames.length) return;
      const last = frames.length - 1;
      const clamped = Math.max(0, Math.min(floatIdx, last));
      const lo = Math.floor(clamped);
      const hi = Math.min(lo + 1, last);
      const t = clamped - lo;

      let imgLo: HTMLImageElement | undefined = frames[lo];
      for (let i = lo; i >= 0 && !imgLo; i--) imgLo = frames[i];
      if (!imgLo) return;

      const { w: vw, h: vh } = getSize();

      if (t < 0.01 || lo === hi) {
        ctx.drawImage(imgLo, 0, 0, imgLo.width, imgLo.height, 
          ...coverFit(imgLo.width, imgLo.height, vw, vh));
      } else {
        let imgHi: HTMLImageElement | undefined = frames[hi];
        if (!imgHi) {
          ctx.drawImage(imgLo, 0, 0, imgLo.width, imgLo.height,
            ...coverFit(imgLo.width, imgLo.height, vw, vh));
        } else {
          const [dx, dy, dw, dh] = coverFit(imgLo.width, imgLo.height, vw, vh);
          ctx.globalAlpha = 1;
          ctx.drawImage(imgLo, 0, 0, imgLo.width, imgLo.height, dx, dy, dw, dh);
          ctx.globalAlpha = t;
          ctx.drawImage(imgHi, 0, 0, imgHi.width, imgHi.height, dx, dy, dw, dh);
          ctx.globalAlpha = 1;
        }
      }
    };

    /* Cover-fit helper: returns [dx, dy, dw, dh] */
    const coverFit = (iw: number, ih: number, vw: number, vh: number): [number, number, number, number] => {
      const scale = Math.max(vw / iw, vh / ih);
      const w = iw * scale;
      const h = ih * scale;
      return [(vw - w) / 2, (vh - h) / 2, w, h];
    };

    const sizeCanvas = () => {
      const { w, h } = getSize();
      if (w === 0 || h === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      drawBlended(progressRef.current * (framesRef.current.length - 1));
    };

    /* Render directly in GSAP onUpdate (already inside rAF) — no double-buffering lag */
    const renderAt = (progress: number) => {
      progressRef.current = progress;
      const frames = framesRef.current;
      if (!frames.length) return;
      drawBlended(progress * (frames.length - 1));
    };

    sizeCanvas();
    window.addEventListener("resize", sizeCanvas, { passive: true });

    const runway = 240;

    const ctxGsap = gsap.context(() => {
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${runway}%`,
          pin: pin,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      master.to(
        { p: 0 },
        {
          p: 1,
          duration: 1,
          ease: "none",
          onUpdate() { renderAt(this.targets()[0].p); },
        },
        0,
      );

      if (contentRef.current) {
        const items = contentRef.current.querySelectorAll<HTMLElement>("[data-hero-layer]");
        master.to(items, { opacity: 0, y: -30, duration: 30 / runway, ease: "power2.in" }, 5 / runway);
      }

      if (goldWashRef.current) {
        master.to(goldWashRef.current, { opacity: 1, duration: 100 / runway, ease: "power2.out" }, 30 / runway);
      }

      if (canvasWrapRef.current) {
        master.to(canvasWrapRef.current, { scale: 1.06, duration: (runway - 50) / runway, ease: "power2.out" }, 50 / runway);
      }

      if (darkScrimRef.current) {
        master.to(darkScrimRef.current, { opacity: 0.35, duration: (runway - 190) / runway, ease: "power1.in" }, 190 / runway);
      }

      if (darkScrimRef.current && canvasWrapRef.current) {
        gsap.to(darkScrimRef.current, {
          opacity: 0.95,
          ease: "power1.in",
          scrollTrigger: { trigger: section, start: `top+=${runway}% top`, end: "bottom top", scrub: true },
        });
        gsap.to(canvasWrapRef.current, {
          yPercent: -5,
          ease: "none",
          scrollTrigger: { trigger: section, start: `top+=${runway}% top`, end: "bottom top", scrub: true },
        });
      }
    }, section);

    return () => {
      ctxGsap.revert();
      window.removeEventListener("resize", sizeCanvas);
    };
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      aria-label="Seven Star Chauffeurs — cinematic door opening"
      className="relative w-full bg-[var(--obsidian)]"
      style={{ height: "340vh" }}
    >
      <div ref={pinRef} className="relative w-full h-[100svh] overflow-hidden">
        <div
          ref={canvasWrapRef}
          className="absolute inset-0"
          style={{ transformOrigin: "center center", willChange: "transform" }}
        >
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="A chauffeur opens the coach door of a Rolls-Royce Phantom"
            className="absolute inset-0 w-full h-full"
          />
        </div>

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

        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 30%, rgba(5,5,5,0.55) 85%, rgba(5,5,5,0.85) 100%)",
          }}
        />

        <div
          ref={darkScrimRef}
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0, background: "rgba(5,5,5,1)" }}
        />

        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            backgroundSize: "240px 240px",
          }}
        />

        <div
          ref={contentRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
          style={{ paddingTop: "clamp(80px, 12vh, 140px)" }}
        >
          <HeroContent
            onReserve={() => smoothScrollTo("#reserve")}
            onFleet={() => smoothScrollTo("#fleet")}
          />
        </div>

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

/* ─── Main export: picks mobile or desktop ─── */
export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    setMounted(true);
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!mounted) {
    return (
      <section className="relative w-full bg-[var(--obsidian)]" style={{ height: "100svh" }} />
    );
  }

  return isMobile ? <MobileHero /> : <DesktopHero />;
}
