"use client";

import { SERVICES } from "@/lib/data";
import ServicePage from "@/components/ServicePage";

const s = SERVICES.find((x) => x.slug === "airport-chauffeur-yvr")!;

export default function ServicePageClient() {
  return <ServicePage service={s} />;
}
