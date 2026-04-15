import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* First content section — this is what the user "enters" through the open door.
          Kept minimal here; the Fleet Showcase is Prompt 2 of the implementation plan. */}
      <section
        id="next"
        className="relative min-h-screen bg-[var(--obsidian)]"
        style={{
          boxShadow: "0 -80px 120px -40px rgba(212,160,74,0.08) inset",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-32">
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "13px",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            I.&nbsp;&nbsp;The Fleet
          </div>
          <div
            className="mt-4 h-[1px] bg-[var(--gold)]"
            style={{ width: "60px" }}
          />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              color: "var(--ivory)",
              fontSize: "clamp(32px, 5vw, 56px)",
              letterSpacing: "0.08em",
              lineHeight: 1.1,
              marginTop: "32px",
              maxWidth: "880px",
            }}
          >
            Six vehicles. One standard.
          </h2>
          <p
            style={{
              marginTop: "24px",
              maxWidth: "62ch",
              color: "var(--chrome)",
              fontSize: "16px",
              lineHeight: 1.7,
              letterSpacing: "0.02em",
            }}
          >
            Rolls-Royce Phantom, Ghost Series II, Cullinan. Mercedes-Maybach
            GLS 600. Cadillac Escalade IQ — among the first fully-electric
            luxury chauffeur vehicles in Western Canada. And a touring coach
            reserved for private celebrations.
          </p>
        </div>
      </section>
    </>
  );
}
