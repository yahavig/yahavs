"use client";

import dynamic from "next/dynamic";

const RetroGrid = dynamic(() => import("@/components/ui/RetroGrid"), { ssr: false });

export default function RetroGridClient(props) {
  return <RetroGrid {...props} />;
}
