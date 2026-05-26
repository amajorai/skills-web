"use client"

import { useEffect } from "react"
import { useGlimm } from "glimm/next"

export function GlimmIntro() {
  const { sweep } = useGlimm()

  useEffect(() => {
    sweep(() => {})
  }, [sweep])

  return null
}
