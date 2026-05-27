import type { Metadata } from "next"
import { FlowCanvas } from "./flow-canvas"

export const metadata: Metadata = {
  title: "A Major Skills — Flow",
  description: "How A Major skills connect and depend on each other.",
}

export default function FlowPage() {
  return <FlowCanvas />
}
