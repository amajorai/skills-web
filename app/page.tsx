import type { Metadata } from "next"
import { HomeCanvas } from "./home-canvas"

export const metadata: Metadata = {
  title: "A Major Skills",
  description:
    "Simple, minimal, lean skills. ship.md, vibe.md, party.md, replay.md, and 30+ more.",
}

export default function Page() {
  return <HomeCanvas />
}
