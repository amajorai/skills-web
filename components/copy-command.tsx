"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Copy01Icon, Tick01Icon } from "@hugeicons/core-free-icons"

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  function copy(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="inline-flex items-center gap-3 bg-muted rounded-md px-3 py-1.5">
      <code className="font-mono text-xs text-muted-foreground select-all">
        {command}
      </code>
      <button
        onClick={copy}
        aria-label="Copy command"
        className={`transition-colors cursor-pointer shrink-0 ${copied ? "text-green-500" : "text-muted-foreground/50 hover:text-muted-foreground"}`}
      >
        <HugeiconsIcon
          icon={copied ? Tick01Icon : Copy01Icon}
          size={13}
          strokeWidth={2}
        />
      </button>
    </div>
  )
}
