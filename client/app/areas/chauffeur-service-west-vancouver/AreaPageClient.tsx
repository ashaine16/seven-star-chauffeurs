"use client";

import { AREAS } from "@/lib/data";
import AreaPage from "@/components/AreaPage";

const a = AREAS.find((x) => x.slug === "chauffeur-service-west-vancouver")!;

export default function AreaPageClient() {
  return <AreaPage area={a} />;
}
