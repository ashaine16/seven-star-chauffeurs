"use client";

import { VEHICLES } from "@/lib/data";
import VehiclePage from "@/components/VehiclePage";

const v = VEHICLES.find((x) => x.slug === "rolls-royce-ghost")!;

export default function VehiclePageClient() {
  return <VehiclePage vehicle={v} />;
}
