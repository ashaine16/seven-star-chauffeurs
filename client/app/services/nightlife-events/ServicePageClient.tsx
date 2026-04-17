"use client";

import { SERVICES } from "@/lib/data";
import ServicePage from "@/components/ServicePage";

const s = SERVICES.find((x) => x.slug === "nightlife-events")!;

export default function ServicePageClient() {
  return <ServicePage service={s} />;
}
