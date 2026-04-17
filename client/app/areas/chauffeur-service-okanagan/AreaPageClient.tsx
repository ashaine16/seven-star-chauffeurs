"use client";

import { AREAS } from "@/lib/data";
import AreaPage from "@/components/AreaPage";

const a = AREAS.find((x) => x.slug === "chauffeur-service-okanagan")!;

export default function AreaPageClient() {
  return <AreaPage area={a} />;
}
