"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  "Airport",
  "Corporate",
  "Wedding",
  "Whistler",
  "Nightlife",
  "Hourly Charter",
] as const;

const VEHICLES = [
  "Phantom",
  "Ghost",
  "Cullinan",
  "Maybach GLS 600",
  "Escalade IQ",
  "Party Bus",
  "No preference",
] as const;

type Service = (typeof SERVICES)[number];
type Vehicle = (typeof VEHICLES)[number];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  date: string;
  time: string;
  pickup: string;
  passengers: number;
  service: Service | "";
  vehicle: Vehicle | "";
  notes: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  tel: "",
  date: "",
  time: "",
  pickup: "",
  passengers: 2,
  service: "",
  vehicle: "",
  notes: "",
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctxGsap = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll<HTMLElement>("[data-contact-reveal]"),
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctxGsap.revert();
  }, []);

  return (
    <section
      id="reserve"
      ref={sectionRef}
      aria-label="Reserve"
      className="relative w-full bg-[var(--obsidian)]"
      style={{ overflow: "hidden" }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 60% at 20% 88%, rgba(197,165,90,0.08), transparent 60%)",
        }}
      />

      <div
        className="mx-auto relative"
        style={{
          maxWidth: "1400px",
          padding:
            "clamp(80px, 12vh, 140px) clamp(24px, 5vw, 64px) clamp(96px, 14vh, 180px)",
        }}
      >
        <div
          className="grid md:grid-cols-12"
          style={{ gap: "clamp(40px, 6vw, 96px)" }}
        >
          <div
            className="md:col-span-5"
            data-contact-reveal
            style={{ willChange: "transform, opacity" }}
          >
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
              V.&nbsp;&nbsp;Reserve
            </div>
            <div
              className="mt-4 h-[1px] bg-[var(--gold)]"
              style={{ width: "60px" }}
              aria-hidden
            />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                color: "var(--ivory)",
                fontSize: "clamp(32px, 4.6vw, 52px)",
                letterSpacing: "0.04em",
                lineHeight: 1.12,
                marginTop: "clamp(20px, 3vh, 32px)",
              }}
            >
              Begin a conversation.
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--gold)",
                }}
              >
                We reply within the hour.
              </em>
            </h2>
            <p
              style={{
                marginTop: "20px",
                maxWidth: "52ch",
                color: "var(--chrome)",
                fontSize: "15px",
                lineHeight: 1.75,
                letterSpacing: "0.02em",
                fontFamily: "var(--font-sans)",
              }}
            >
              Tell us when, where, and the occasion. A concierge, not an
              auto-responder, will be in touch directly to confirm vehicle,
              chauffeur, and itinerary.
            </p>

            <div
              style={{
                marginTop: "clamp(40px, 6vh, 64px)",
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <ContactLine
                label="Telephone"
                value="+1 (604) 000 0000"
                href="tel:+16040000000"
              />
              <ContactLine
                label="Correspondence"
                value="reservations@sevenstarchauffeurs.ca"
                href="mailto:reservations@sevenstarchauffeurs.ca"
              />
              <ContactLine
                label="Availability"
                value="By appointment, 24 hours a day"
              />
            </div>
          </div>

          <div
            className="md:col-span-7"
            data-contact-reveal
            style={{ willChange: "transform, opacity" }}
          >
            <ReserveForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLine({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const Tag: React.ElementType = href ? "a" : "div";
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 400,
          fontSize: "10px",
          letterSpacing: "0.5em",
          color: "var(--gold)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <Tag
        {...(href ? { href } : {})}
        className={href ? "link-ivory" : undefined}
        style={{
          marginTop: "8px",
          display: "inline-block",
          fontFamily: "var(--font-sans)",
          fontSize: "17px",
          fontWeight: 300,
          letterSpacing: "0.02em",
          color: "var(--ivory)",
          textDecoration: "none",
        }}
      >
        {value}
      </Tag>
    </div>
  );
}

function ReserveForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [reference, setReference] = useState("");

  const today = new Date().toISOString().split("T")[0];

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (touched[key]) {
      setErrors((e) => {
        const next = validate({ ...form, [key]: value });
        return { ...e, [key]: next[key] };
      });
    }
  }

  function markTouched(key: keyof FormState) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((e) => ({ ...e, ...validate(form) }));
  }

  function validate(f: FormState): Errors {
    const e: Errors = {};
    if (!f.firstName.trim()) e.firstName = "Please share your first name.";
    if (!f.lastName.trim()) e.lastName = "And your last name.";
    if (!f.email.trim()) e.email = "Please share your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
      e.email = "That email doesn't look quite right.";
    if (!f.tel.trim()) e.tel = "A telephone number lets us confirm quickly.";
    if (!f.date) e.date = "Please select a date.";
    if (!f.pickup.trim()) e.pickup = "Where should we collect you?";
    if (!f.service) e.service = "Please select a service.";
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      tel: true,
      date: true,
      pickup: true,
      service: true,
    });
    if (Object.keys(e).length > 0) {
      const first = document.querySelector<HTMLElement>("[data-error='true']");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      first?.focus?.();
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    const ref =
      "SSC-" +
      Math.random().toString(36).slice(2, 6).toUpperCase() +
      "-" +
      new Date().getTime().toString(36).slice(-4).toUpperCase();
    setReference(ref);
    setSubmitting(false);
    setSent(true);
  }

  if (sent) {
    return <ConfirmationPanel reference={reference} form={form} />;
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      style={{
        background: "rgba(5,5,5,0.4)",
        backdropFilter: "blur(20px) saturate(1.05)",
        WebkitBackdropFilter: "blur(20px) saturate(1.05)",
        border: "1px solid rgba(212,160,74,0.15)",
        padding: "clamp(28px, 3.6vw, 56px)",
        boxShadow:
          "0 0 0 1px rgba(5,5,5,0.3) inset, 0 30px 60px -20px rgba(0,0,0,0.55)",
      }}
    >
      <SectionHeading index="01" label="Your Details" />
      <div
        className="grid md:grid-cols-2"
        style={{ gap: "clamp(18px, 2.2vw, 28px)" }}
      >
        <Field
          label="First name"
          required
          value={form.firstName}
          onChange={(v) => update("firstName", v)}
          onBlur={() => markTouched("firstName")}
          error={touched.firstName ? errors.firstName : undefined}
          autoComplete="given-name"
        />
        <Field
          label="Last name"
          required
          value={form.lastName}
          onChange={(v) => update("lastName", v)}
          onBlur={() => markTouched("lastName")}
          error={touched.lastName ? errors.lastName : undefined}
          autoComplete="family-name"
        />
        <Field
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(v) => update("email", v)}
          onBlur={() => markTouched("email")}
          error={touched.email ? errors.email : undefined}
          autoComplete="email"
        />
        <Field
          label="Telephone"
          type="tel"
          required
          value={form.tel}
          onChange={(v) => update("tel", formatPhone(v))}
          onBlur={() => markTouched("tel")}
          error={touched.tel ? errors.tel : undefined}
          autoComplete="tel"
          placeholder="+1 (604) 000 0000"
        />
      </div>

      <Divider />
      <SectionHeading index="02" label="The Engagement" />
      <div
        className="grid md:grid-cols-2"
        style={{ gap: "clamp(18px, 2.2vw, 28px)" }}
      >
        <Field
          label="Date"
          type="date"
          required
          value={form.date}
          min={today}
          onChange={(v) => update("date", v)}
          onBlur={() => markTouched("date")}
          error={touched.date ? errors.date : undefined}
        />
        <Field
          label="Time"
          type="time"
          value={form.time}
          onChange={(v) => update("time", v)}
          placeholder="Flexible"
        />
        <Field
          label="Pickup location"
          required
          value={form.pickup}
          onChange={(v) => update("pickup", v)}
          onBlur={() => markTouched("pickup")}
          error={touched.pickup ? errors.pickup : undefined}
          autoComplete="street-address"
          placeholder="Hotel, residence, or YVR terminal"
        />
        <PassengersStepper
          value={form.passengers}
          onChange={(n) => update("passengers", n)}
        />
      </div>

      <Divider />
      <SectionHeading
        index="03"
        label="Service"
        required
        error={touched.service ? errors.service : undefined}
      />
      <ChipGroup
        options={SERVICES as readonly string[]}
        value={form.service}
        onChange={(v) => {
          update("service", v as Service);
          markTouched("service");
        }}
      />

      <Divider />
      <SectionHeading
        index="04"
        label="Vehicle Preference"
        hint="Optional. We'll recommend if you're unsure."
      />
      <ChipGroup
        options={VEHICLES as readonly string[]}
        value={form.vehicle}
        onChange={(v) => update("vehicle", v as Vehicle)}
      />

      <Divider />
      <SectionHeading
        index="05"
        label="Itinerary Notes"
        hint="Occasion, stopovers, special requests"
      />
      <Field
        label=""
        value={form.notes}
        onChange={(v) => update("notes", v)}
        multiline
        rows={4}
        hideLabel
        placeholder="Tell us anything that helps us tailor the day."
      />

      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        style={{
          marginTop: "clamp(32px, 4vh, 48px)",
          gap: "clamp(16px, 2vh, 24px)",
        }}
      >
        <p
          style={{
            color: "var(--chrome)",
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            lineHeight: 1.6,
            letterSpacing: "0.02em",
            maxWidth: "46ch",
            margin: 0,
          }}
        >
          Reviewed by a human, not a chatbot. We do not share contact details,
          ever.
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center"
          style={{
            padding: "18px 36px",
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "12px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "var(--gold)",
            background: "transparent",
            border: "1px solid var(--gold)",
            borderRadius: "6px",
            transition:
              "background 600ms cubic-bezier(0.33, 1, 0.68, 1), color 600ms cubic-bezier(0.33, 1, 0.68, 1), opacity 300ms",
            cursor: submitting ? "wait" : "pointer",
            minWidth: "220px",
            opacity: submitting ? 0.65 : 1,
          }}
          onMouseEnter={(e) => {
            if (submitting) return;
            e.currentTarget.style.background = "var(--gold)";
            e.currentTarget.style.color = "var(--obsidian)";
          }}
          onMouseLeave={(e) => {
            if (submitting) return;
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "var(--gold)";
          }}
        >
          {submitting ? "Submitting…" : "Submit Enquiry"}
        </button>
      </div>
    </form>
  );
}

function ConfirmationPanel({
  reference,
  form,
}: {
  reference: string;
  form: FormState;
}) {
  const summary: { label: string; value: string }[] = [
    { label: "Name", value: `${form.firstName} ${form.lastName}`.trim() },
    { label: "Email", value: form.email },
    { label: "Telephone", value: form.tel },
    {
      label: "When",
      value: form.time
        ? `${formatDate(form.date)} · ${form.time}`
        : formatDate(form.date),
    },
    { label: "Pickup", value: form.pickup },
    { label: "Passengers", value: String(form.passengers) },
    { label: "Service", value: form.service || "Not specified" },
    ...(form.vehicle ? [{ label: "Vehicle", value: form.vehicle }] : []),
  ];

  return (
    <div
      style={{
        background: "rgba(5,5,5,0.4)",
        backdropFilter: "blur(20px) saturate(1.05)",
        WebkitBackdropFilter: "blur(20px) saturate(1.05)",
        border: "1px solid rgba(212,160,74,0.3)",
        padding: "clamp(36px, 4.2vw, 64px)",
        boxShadow:
          "0 0 0 1px rgba(5,5,5,0.3) inset, 0 30px 60px -20px rgba(0,0,0,0.55)",
      }}
    >
      <div
        aria-hidden
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          border: "1px solid var(--gold)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 12.5 L10 17.5 L19 7.5"
            stroke="var(--gold)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div
        style={{
          marginTop: "clamp(20px, 3vh, 28px)",
          fontFamily: "var(--font-sans)",
          fontWeight: 300,
          fontSize: "11px",
          letterSpacing: "0.5em",
          color: "var(--gold)",
          textTransform: "uppercase",
        }}
      >
        Enquiry received
      </div>

      <h3
        style={{
          marginTop: "14px",
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: "clamp(26px, 3vw, 38px)",
          color: "var(--ivory)",
          letterSpacing: "0.02em",
          lineHeight: 1.2,
        }}
      >
        Thank you, {form.firstName || "and welcome"}.
        <br />
        <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
          A concierge will reply within the hour.
        </em>
      </h3>

      <p
        style={{
          marginTop: "18px",
          maxWidth: "52ch",
          color: "var(--chrome)",
          fontFamily: "var(--font-sans)",
          fontSize: "15px",
          lineHeight: 1.75,
          letterSpacing: "0.02em",
        }}
      >
        Your reservation reference is{" "}
        <span
          style={{
            color: "var(--ivory)",
            fontWeight: 500,
            letterSpacing: "0.12em",
          }}
        >
          {reference}
        </span>
        . We've sent a copy to{" "}
        <span style={{ color: "var(--ivory)" }}>{form.email}</span>. Reply to
        that message with any revisions. The same concierge will hold your
        engagement.
      </p>

      <div
        style={{
          marginTop: "clamp(28px, 4vh, 40px)",
          paddingTop: "clamp(20px, 3vh, 28px)",
          borderTop: "1px solid rgba(184,184,184,0.12)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "clamp(16px, 2vw, 28px)",
        }}
      >
        {summary.map((s) => (
          <div key={s.label}>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                marginTop: "6px",
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 300,
                color: "var(--ivory)",
                letterSpacing: "0.015em",
                wordBreak: "break-word",
              }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({
  index,
  label,
  hint,
  required,
  error,
}: {
  index: string;
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div style={{ marginBottom: "clamp(18px, 2.2vh, 26px)" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "14px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
            fontSize: "10px",
            letterSpacing: "0.4em",
            color: "var(--gold)",
            textTransform: "uppercase",
          }}
        >
          {index}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(17px, 1.7vw, 20px)",
            color: "var(--ivory)",
            letterSpacing: "0.02em",
          }}
        >
          {label}
          {required && (
            <span style={{ color: "var(--gold)", marginLeft: "4px" }}>*</span>
          )}
        </span>
        {hint && (
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              color: "var(--chrome)",
              fontWeight: 300,
              letterSpacing: "0.02em",
            }}
          >
            {hint}
          </span>
        )}
      </div>
      {error && (
        <div
          style={{
            marginTop: "8px",
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            color: "var(--gold)",
            letterSpacing: "0.04em",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

function Divider() {
  return (
    <div
      aria-hidden
      style={{
        height: "1px",
        background: "rgba(184,184,184,0.1)",
        margin: "clamp(28px, 3.6vh, 40px) 0",
      }}
    />
  );
}

function Field({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  required,
  placeholder,
  autoComplete,
  multiline,
  rows = 3,
  min,
  error,
  hideLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  multiline?: boolean;
  rows?: number;
  min?: string;
  error?: string;
  hideLabel?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const hasError = Boolean(error);

  const baseInput: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: 0,
    color: "var(--ivory)",
    padding: "12px 0",
    fontFamily: "var(--font-sans)",
    fontSize: "16px",
    fontWeight: 300,
    lineHeight: 1.4,
    letterSpacing: "0.01em",
    borderRadius: 0,
    outline: "none",
  };

  return (
    <label
      data-error={hasError ? "true" : undefined}
      style={{
        position: "relative",
        display: "block",
        background: "rgba(22,22,22,0.55)",
        padding: hideLabel ? "14px 18px" : "14px 18px 6px",
        border: "1px solid",
        borderColor: hasError
          ? "rgba(212,160,74,0.6)"
          : focused
            ? "rgba(212,160,74,0.35)"
            : "rgba(184,184,184,0.08)",
        transition: "border-color 300ms cubic-bezier(0.33,1,0.68,1)",
      }}
    >
      {!hideLabel && (
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-sans)",
            fontSize: "10px",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: hasError
              ? "var(--gold)"
              : focused
                ? "var(--gold)"
                : "rgba(184,184,184,0.7)",
            transition: "color 300ms cubic-bezier(0.33,1,0.68,1)",
          }}
        >
          {label}
          {required && (
            <span style={{ marginLeft: "4px", color: "var(--gold)" }}>*</span>
          )}
        </span>
      )}

      {multiline ? (
        <textarea
          rows={rows}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          style={{ ...baseInput, resize: "vertical", minHeight: `${rows * 22}px` }}
        />
      ) : (
        <input
          type={type}
          min={min}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          style={baseInput}
        />
      )}

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          bottom: -1,
          height: "1px",
          width: "100%",
          background: hasError ? "var(--gold)" : "var(--gold)",
          transform: focused || hasError ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left center",
          transition: "transform 600ms cubic-bezier(0.33, 1, 0.68, 1)",
        }}
      />

      {error && (
        <div
          style={{
            marginTop: "6px",
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            color: "var(--gold)",
            letterSpacing: "0.04em",
          }}
        >
          {error}
        </div>
      )}
    </label>
  );
}

function PassengersStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const dec = () => onChange(Math.max(1, value - 1));
  const inc = () => onChange(Math.min(14, value + 1));

  return (
    <div
      style={{
        display: "block",
        background: "rgba(22,22,22,0.55)",
        padding: "14px 18px 10px",
        border: "1px solid rgba(184,184,184,0.08)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "10px",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "rgba(184,184,184,0.7)",
        }}
      >
        Passengers
      </div>
      <div
        style={{
          marginTop: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <StepperButton onClick={dec} disabled={value <= 1} label="–" />
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontFamily: "var(--font-display)",
            fontSize: "22px",
            fontWeight: 400,
            color: "var(--ivory)",
            letterSpacing: "0.04em",
          }}
        >
          {value}
        </div>
        <StepperButton onClick={inc} disabled={value >= 14} label="+" />
      </div>
    </div>
  );
}

function StepperButton({
  onClick,
  disabled,
  label,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label === "+" ? "Add passenger" : "Remove passenger"}
      style={{
        width: "44px",
        height: "44px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: "1px solid rgba(212,160,74,0.35)",
        color: "var(--gold)",
        fontFamily: "var(--font-sans)",
        fontSize: "18px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.35 : 1,
        borderRadius: "2px",
        transition: "background 300ms, color 300ms, border-color 300ms",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "var(--gold)";
        e.currentTarget.style.color = "var(--obsidian)";
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "var(--gold)";
      }}
    >
      {label}
    </button>
  );
}

function ChipGroup({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      role="radiogroup"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt)}
            style={{
              padding: "10px 18px",
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "12px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: active ? "var(--obsidian)" : "var(--ivory)",
              background: active ? "var(--gold)" : "rgba(22,22,22,0.55)",
              border: `1px solid ${active ? "var(--gold)" : "rgba(212,160,74,0.22)"}`,
              borderRadius: "2px",
              cursor: "pointer",
              transition:
                "background 400ms cubic-bezier(0.33,1,0.68,1), color 400ms cubic-bezier(0.33,1,0.68,1), border-color 400ms",
            }}
            onMouseEnter={(e) => {
              if (active) return;
              e.currentTarget.style.borderColor = "var(--gold)";
              e.currentTarget.style.color = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              if (active) return;
              e.currentTarget.style.borderColor = "rgba(212,160,74,0.22)";
              e.currentTarget.style.color = "var(--ivory)";
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function formatPhone(v: string): string {
  const digits = v.replace(/\D/g, "").slice(0, 15);
  return digits;
}

function formatDate(iso: string): string {
  if (!iso) return "Not specified";
  const d = new Date(iso + "T00:00");
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
