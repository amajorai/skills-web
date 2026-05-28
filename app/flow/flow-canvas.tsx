"use client"

import { useTheme } from "next-themes"
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  MarkerType,
  useNodesState,
  useEdgesState,
  type NodeProps,
  type Node,
  type Edge,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import Link from "next/link"
import { CopyCommand } from "@/components/copy-command"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SkillData = {
  emoji: string
  name: string
  tagline: string
  commands: string
  install: string
  href: string
  badges: { src: string; alt: string }[]
  isNew?: boolean
}

const HANDLE_STYLE = {
  opacity: 0,
  pointerEvents: "none" as const,
  width: 1,
  height: 1,
  minWidth: 1,
  minHeight: 1,
  border: "none",
}

function SkillNodeComponent({ data }: NodeProps) {
  const d = data as SkillData
  return (
    <>
      <Handle type="target" position={Position.Top} style={HANDLE_STYLE} />
      <Handle type="target" position={Position.Left} style={HANDLE_STYLE} />
      <a
        href={d.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-xl p-4 border border-border bg-background hover:bg-muted/50 transition-colors"
        style={{ width: 300, textDecoration: "none" }}
      >
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
          <span className="font-heading text-xl font-medium text-foreground">
            {d.emoji} {d.name}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {d.commands}
          </span>
          {d.isNew && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="https://shieldcn.dev/badge/new-green.svg?size=xs" alt="New" height={20} />
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          {d.tagline}
        </p>
        <CopyCommand command={d.install} />
        <div className="flex flex-wrap items-center gap-1.5 mt-2">
          {d.badges.map((b) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={b.alt} src={b.src} alt={b.alt} height={20} />
          ))}
        </div>
      </a>
      <Handle type="source" position={Position.Bottom} style={HANDLE_STYLE} />
      <Handle type="source" position={Position.Right} style={HANDLE_STYLE} />
    </>
  )
}

const nodeTypes = { skill: SkillNodeComponent }

const EDGE_DEFAULTS = {
  style: { stroke: "var(--muted-foreground)", strokeWidth: 1.5 },
  markerEnd: { type: MarkerType.ArrowClosed, color: "var(--muted-foreground)" },
  labelStyle: { fontSize: 10, fill: "var(--muted-foreground)" },
  labelBgStyle: { fill: "var(--background)" },
  labelBgPadding: [4, 2] as [number, number],
  labelBgBorderRadius: 3,
}

function e(id: string, source: string, target: string, label: string): Edge {
  return { id, source, target, label, ...EDGE_DEFAULTS }
}

function badge(status: "beta" | "experimental") {
  const color = status === "beta" ? "blue" : "orange"
  return [{ src: `https://shieldcn.dev/badge/status-${status}-${color}.svg?size=xs`, alt: "Status" }]
}

const initialNodes: Node[] = [
  {
    id: "amajor", type: "skill", position: { x: 1200, y: 1216 },
    data: {
      emoji: "🌼", name: "amajor.md",
      tagline: "Master skill directory. One install, discover every A Major skill. Built for agents to find the right tool for any task.",
      commands: "/amajor",
      install: "npx skills add amajorai/amajor.md",
      href: "https://github.com/amajorai/amajor.md",
      badges: badge("beta"),
    },
  },
  {
    id: "vibe", type: "skill", position: { x: -68, y: -6 },
    data: {
      emoji: "🪅", name: "vibe.md",
      tagline: "Spin up a 24/7 production-ready full-stack dev and deploy environment. One interview, one clean pass.",
      commands: "/vibe · /vibe-reconfigure · /vibe-provision-worker",
      install: "npx skills add amajorai/vibe.md",
      href: "https://github.com/amajorai/vibe.md",
      badges: badge("beta"),
    },
  },
  {
    id: "spec", type: "skill", position: { x: 464, y: -109 },
    data: {
      emoji: "👻", name: "spec.md",
      tagline: "Spec-driven development. Takes any task and breaks it into the smallest possible atomic units — each one agent-ready with clear acceptance criteria.",
      commands: "/spec",
      install: "npx skills add amajorai/spec.md",
      href: "https://github.com/amajorai/spec.md",
      badges: badge("beta"),
      isNew: true,
    },
  },
  {
    id: "skills", type: "skill", position: { x: 1121, y: 226 },
    data: {
      emoji: "⚡", name: "amajorai/skills",
      tagline: "Smaller skills people don't think about when shipping. Edge cases, E2E, auth, payments, SEO, CI, and more.",
      commands: "30+ skills",
      install: "npx skills add amajorai/skills",
      href: "https://github.com/amajorai/skills",
      badges: badge("experimental"),
    },
  },
  {
    id: "ship", type: "skill", position: { x: 436, y: 686 },
    data: {
      emoji: "📦", name: "ship.md",
      tagline: "A thin, structured workflow for shipping features. Simple, minimal, lean. One interview, one plan, ship the thing.",
      commands: "/ship · /ship-fast",
      install: "npx skills add amajorai/ship.md",
      href: "https://github.com/amajorai/ship.md",
      badges: badge("beta"),
    },
  },
  {
    id: "party", type: "skill", position: { x: 1243, y: 739 },
    data: {
      emoji: "🎉", name: "party.md",
      tagline: "Most AI dev tools stop when you close your laptop. party.md doesn't. GitHub Projects as the interface - drop in issues, it ships them while you sleep.",
      commands: "/party",
      install: "npx skills add amajorai/party.md",
      href: "https://github.com/amajorai/party.md",
      badges: badge("experimental"),
    },
  },
  {
    id: "fix", type: "skill", position: { x: -261, y: 892 },
    data: {
      emoji: "🔎", name: "fix.md",
      tagline: "A systematic bug-fixing workflow. Explore first, instrument strategically, read the logs, fix surgically, verify clean.",
      commands: "/fix",
      install: "npx skills add amajorai/fix.md",
      href: "https://github.com/amajorai/fix.md",
      badges: badge("experimental"),
    },
  },
  {
    id: "replay", type: "skill", position: { x: 692, y: 1407 },
    data: {
      emoji: "🎬", name: "replay.md",
      tagline: "Record a live video of your running app and share the link, straight from chat. Cursor has it. Now Claude Code has it too.",
      commands: "/replay",
      install: "npx skills add amajorai/replay.md",
      href: "https://github.com/amajorai/replay.md",
      badges: badge("experimental"),
    },
  },
  {
    id: "sandbox", type: "skill", position: { x: 73, y: 1366 },
    data: {
      emoji: "🧪", name: "sandbox.md",
      tagline: "Build and verify features inside an isolated cloud sandbox — ship from a clean environment every time.",
      commands: "/sandbox",
      install: "npx skills add amajorai/sandbox.md",
      href: "https://github.com/amajorai/sandbox.md",
      badges: badge("experimental"),
    },
  },
  {
    id: "context", type: "skill", position: { x: -483, y: 375 },
    data: {
      emoji: "📋", name: "context.md",
      tagline: "Initialize CLAUDE.md and AGENTS.md for the current workspace. Explores the codebase, interviews for gaps, and writes structured context files so every agent starts fully oriented.",
      commands: "/context",
      install: "npx skills add amajorai/context.md",
      href: "https://github.com/amajorai/context.md",
      badges: badge("experimental"),
    },
  },
]

const initialEdges: Edge[] = [
  e("amajor-vibe",     "amajor",  "vibe",    "start with env"),
  e("amajor-spec",     "amajor",  "spec",    "plan it first"),
  e("vibe-ship",       "vibe",    "ship",    "dev env ready"),
  e("vibe-party",      "vibe",    "party",   "dev env ready"),
  e("spec-ship",       "spec",    "ship",    "one unit at a time"),
  e("spec-party",      "spec",    "party",   "ship all 24/7"),
  e("skills-ship",     "skills",  "ship",    "quality gates"),
  e("skills-fix",      "skills",  "fix",     "diagnostic tools"),
  e("skills-vibe",     "skills",  "vibe",    "hardening"),
  e("ship-fix",        "ship",    "fix",     "when it breaks"),
  e("ship-replay",     "ship",    "replay",  "record proof"),
  e("fix-ship",        "fix",     "ship",    "re-ship after fix"),
  e("party-replay",    "party",   "replay",  "per build"),
  e("fix-replay",      "fix",     "replay",  "before & after"),
  e("context-spec",    "context", "spec",    "orient first"),
  e("context-ship",    "context", "ship",    "orient first"),
]

export function FlowCanvas() {
  const { resolvedTheme } = useTheme()
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, , onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div className="w-screen h-svh">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        colorMode={resolvedTheme === "dark" ? "dark" : "light"}
        nodesConnectable={false}
        fitView
        fitViewOptions={{ padding: 0.55 }}
        proOptions={{ hideAttribution: true }}
        style={{ background: "var(--background)" }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="var(--border)"
          style={{ background: "var(--background)" }}
        />
      </ReactFlow>
      <Link
        href="/"
        className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "absolute top-6 left-6 z-10 gap-2 text-muted-foreground")}
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
        A Major Skills
      </Link>
    </div>
  )
}
