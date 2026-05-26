"use client"

import { useEffect } from "react"
import { createShader, playSweep } from "glimm"

export function GlimmIntro() {
  useEffect(() => {
    const ctrl = createShader()
    if (!ctrl) return

    Object.assign(ctrl.canvas.style, {
      position: "fixed",
      inset: "0",
      width: "100%",
      height: "100%",
      zIndex: "-1",
      pointerEvents: "none",
    })
    document.body.appendChild(ctrl.canvas)

    const handle = playSweep(ctrl)
    handle.done.then(() => {
      ctrl.destroy()
      ctrl.canvas.remove()
    })

    return () => {
      handle.cancel()
      ctrl.destroy()
      ctrl.canvas.remove()
    }
  }, [])

  return null
}
