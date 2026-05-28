"use client"

import { useState, useCallback, useEffect, useRef, createContext, useContext } from "react"
import { useTheme } from "next-themes"
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  MarkerType,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type NodeProps,
  type Node,
  type Edge,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { CopyCommand } from "@/components/copy-command"
import { HugeiconsIcon } from "@hugeicons/react"
import { Flowchart01Icon, GridViewIcon, Copy01Icon, Refresh01Icon } from "@hugeicons/core-free-icons"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Mode = "grid" | "flow"

const CanvasContext = createContext<{ mode: Mode; onToggle: () => void }>({
  mode: "grid",
  onToggle: () => {},
})

// ─── Node data types ────────────────────────────────────────────────────────

type HeaderData = Record<string, never>

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

// ─── Handle style (invisible, kept for edge routing) ────────────────────────

const HANDLE_STYLE = {
  opacity: 0,
  pointerEvents: "none" as const,
  width: 1,
  height: 1,
  minWidth: 1,
  minHeight: 1,
  border: "none",
}

// ─── Header node ─────────────────────────────────────────────────────────────

function HeaderNodeComponent(_: NodeProps) {
  return (
    <div style={{ width: 480 }}>
      <h1 className="font-heading text-4xl font-medium tracking-tight mb-3 text-foreground">
        A Major Skills
      </h1>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Simple, minimal, lean. Things we ship with at{" "}
        <a
          href="https://amajor.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
        >
          A Major
        </a>
        .
      </p>
    </div>
  )
}

// ─── Toggle node ─────────────────────────────────────────────────────────────

function ToggleNodeComponent(_: NodeProps) {
  const { mode, onToggle } = useContext(CanvasContext)
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onToggle() }}
      className={cn(buttonVariants({ variant: "default", size: "sm" }), "gap-2 cursor-pointer")}
    >
      <HugeiconsIcon icon={mode === "grid" ? Flowchart01Icon : GridViewIcon} size={14} />
      {mode === "grid" ? "View graph" : "View as grid"}
    </button>
  )
}

// ─── Skill node ───────────────────────────────────────────────────────────────

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
        className="group block rounded-xl p-4 bg-background hover:bg-muted transition-colors"
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

const nodeTypes = {
  header: HeaderNodeComponent,
  toggle: ToggleNodeComponent,
  skill: SkillNodeComponent,
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function badge(status: "beta" | "experimental") {
  const color = status === "beta" ? "blue" : "orange"
  return [{ src: `https://shieldcn.dev/badge/status-${status}-${color}.svg?size=xs`, alt: "Status" }]
}

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

// ─── Edges ───────────────────────────────────────────────────────────────────

const flowEdges: Edge[] = [
  e("vibe-ship",    "vibe",   "ship",   "dev env ready"),
  e("vibe-party",   "vibe",   "party",  "dev env ready"),
  e("spec-ship",    "spec",   "ship",   "one unit at a time"),
  e("spec-party",   "spec",   "party",  "ship all 24/7"),
  e("skills-ship",  "skills", "ship",   "quality gates"),
  e("ship-fix",     "ship",   "fix",    "when it breaks"),
  e("ship-replay",  "ship",   "replay", "record proof"),
  e("party-replay", "party",  "replay", "per build"),
  e("fix-replay",   "fix",    "replay",   "before & after"),
  e("vibe-sandbox", "vibe",   "sandbox",  "host server"),
  e("ship-sandbox", "ship",   "sandbox",  "build in isolation"),
]

// ─── Positions ───────────────────────────────────────────────────────────────

// Header centered over the 1320px wide grid (4×300 + 3×40 gap)
const GRID_POSITIONS: Record<string, { x: number; y: number }> = {
  header: { x: 420, y: -280 },
  toggle: { x: 420, y: -160 },
  spec:   { x: 0,   y: 0 },
  ship:   { x: 340, y: 0 },
  fix:    { x: 680, y: 0 },
  replay: { x: 1020, y: 0 },
  vibe:   { x: 0,   y: 320 },
  party:  { x: 340, y: 320 },
  amajor: { x: 680, y: 320 },
  skills: { x: 1020, y: 320 },
  sandbox: { x: 340, y: 640 },
  context: { x: 680, y: 640 },
}

const FLOW_POSITIONS: Record<string, { x: number; y: number }> = {
  header: { x: 400,  y: -340 },
  toggle: { x: 400,  y: -220 },
  vibe:   { x: 16,   y: 86 },
  spec:   { x: 575,  y: -116 },
  skills: { x: 1124, y: 170 },
  ship:   { x: 272,  y: 574 },
  party:  { x: 862,  y: 582 },
  fix:    { x: 0,    y: 920 },
  replay: { x: 581,  y: 1321 },
  amajor:  { x: 1191, y: 1025 },
  sandbox: { x: 272,  y: 1200 },
  context: { x: -200, y: 350 },
}

// ─── Nodes ───────────────────────────────────────────────────────────────────

const allSkills: { id: string; data: SkillData }[] = [
  { id: "spec",   data: { emoji: "👻", name: "spec.md",         tagline: "Spec-driven development. Takes any task and breaks it into the smallest possible atomic units — each one agent-ready with clear acceptance criteria. The first step before /ship or /party.", commands: "/spec",                                    install: "npx skills add amajorai/spec.md",   href: "https://github.com/amajorai/spec.md",   badges: badge("beta"),         isNew: true } },
  { id: "ship",   data: { emoji: "📦", name: "ship.md",         tagline: "A thin, structured workflow for shipping features. Simple, minimal, lean. One interview, one plan, ship the thing.",                                                                           commands: "/ship · /ship-fast",                  install: "npx skills add amajorai/ship.md",   href: "https://github.com/amajorai/ship.md",   badges: badge("beta") } },
  { id: "fix",    data: { emoji: "🔎", name: "fix.md",          tagline: "A systematic bug-fixing workflow. Explore first, instrument strategically, read the logs, fix surgically, verify clean with Playwright, Maestro, or Computer Use.",                           commands: "/fix",                                install: "npx skills add amajorai/fix.md",    href: "https://github.com/amajorai/fix.md",    badges: badge("experimental") } },
  { id: "replay", data: { emoji: "🎬", name: "replay.md",       tagline: "Record a live video of your running app and share the link, straight from chat. Cursor has it. Now Claude Code has it too.",                                                                  commands: "/replay",                             install: "npx skills add amajorai/replay.md", href: "https://github.com/amajorai/replay.md", badges: badge("experimental") } },
  { id: "vibe",   data: { emoji: "🪅", name: "vibe.md",         tagline: "Spin up a 24/7 production-ready full-stack dev and deploy environment. One interview, one clean pass.",                                                                                       commands: "/vibe · /vibe-reconfigure · /vibe-provision-worker", install: "npx skills add amajorai/vibe.md",   href: "https://github.com/amajorai/vibe.md",   badges: badge("beta") } },
  { id: "party",  data: { emoji: "🎉", name: "party.md",        tagline: "Most AI dev tools stop when you close your laptop. party.md doesn't. GitHub Projects as the interface - drop in issues, it ships them while you sleep.",                                      commands: "/party",                              install: "npx skills add amajorai/party.md",  href: "https://github.com/amajorai/party.md",  badges: badge("experimental") } },
  { id: "amajor", data: { emoji: "🌼", name: "amajor.md",       tagline: "Master skill directory. One install, discover every A Major skill. Built for agents to find the right tool for any task.",                                                                    commands: "/amajor",                             install: "npx skills add amajorai/amajor.md", href: "https://github.com/amajorai/amajor.md", badges: badge("beta") } },
  { id: "skills", data: { emoji: "⚡", name: "amajorai/skills", tagline: "Smaller skills people don't think about when shipping. Edge cases, E2E, auth, payments, SEO, CI, and more.",                                                                                  commands: "30+ skills",                          install: "npx skills add amajorai/skills",    href: "https://github.com/amajorai/skills",    badges: badge("experimental") } },
  { id: "sandbox", data: { emoji: "🧪", name: "sandbox.md",      tagline: "Self-hosted cloud sandbox environment. Choose Daytona, Docker+Bun, or Firecracker. Spawn ephemeral exec sandboxes or long-lived dev workspaces on your own server.",                commands: "/sandbox",                            install: "npx skills add amajorai/sandbox.md", href: "https://github.com/amajorai/sandbox.md", badges: badge("experimental"), isNew: true } },
  { id: "context", data: { emoji: "📋", name: "context.md",       tagline: "Write and maintain CLAUDE.md and AGENTS.md for any workspace. Explores the codebase, interviews for gaps, and gives every agent full orientation in a single read.",                           commands: "/context-md · /context-md-update",    install: "npx skills add amajorai/context.md", href: "https://github.com/amajorai/context.md", badges: badge("experimental"), isNew: true } },
]

const initialNodes: Node[] = [
  {
    id: "header",
    type: "header",
    position: GRID_POSITIONS.header,
    data: {} as HeaderData,
    draggable: true,
  },
  {
    id: "toggle",
    type: "toggle",
    position: GRID_POSITIONS.toggle,
    data: {},
    draggable: true,
  },
  ...allSkills.map((s) => ({
    id: s.id,
    type: "skill" as const,
    position: GRID_POSITIONS[s.id],
    data: s.data,
    draggable: true,
  })),
]

// ─── localStorage helpers ─────────────────────────────────────────────────────

const FLOW_LS_KEY = "amajor-flow-positions"

function loadFlowPositions(): Record<string, { x: number; y: number }> {
  try {
    const saved = localStorage.getItem(FLOW_LS_KEY)
    if (saved) return { ...FLOW_POSITIONS, ...JSON.parse(saved) }
  } catch {}
  return FLOW_POSITIONS
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function HomeCanvas() {
  return (
    <ReactFlowProvider>
      <HomeCanvasInner />
    </ReactFlowProvider>
  )
}

function HomeCanvasInner() {
  const { resolvedTheme } = useTheme()
  const { fitView } = useReactFlow()
  const [mode, setMode] = useState<Mode>("grid")
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Debounced save of flow positions to localStorage whenever nodes move in flow mode
  useEffect(() => {
    if (mode !== "flow") return
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      const positions: Record<string, { x: number; y: number }> = {}
      nodes.forEach((n) => { positions[n.id] = n.position })
      localStorage.setItem(FLOW_LS_KEY, JSON.stringify(positions))
    }, 600)
  }, [nodes, mode])

  const toggle = useCallback(() => {
    const next = mode === "grid" ? "flow" : "grid"
    setMode(next)
    if (next === "flow") {
      const positions = loadFlowPositions()
      setNodes((prev) => prev.map((n) => ({ ...n, position: positions[n.id] ?? n.position })))
      setEdges(flowEdges)
    } else {
      setNodes((prev) => prev.map((n) => ({ ...n, position: GRID_POSITIONS[n.id] ?? n.position })))
      setEdges([])
    }
    setTimeout(() => fitView({ duration: 500, padding: next === "flow" ? 0.2 : 0.55 }), 750)
  }, [mode, setNodes, setEdges, fitView])

  const copyPositions = useCallback(() => {
    const positions: Record<string, { x: number; y: number }> = {}
    nodes.forEach((n) => { positions[n.id] = { x: Math.round(n.position.x), y: Math.round(n.position.y) } })
    navigator.clipboard.writeText(JSON.stringify(positions, null, 2))
  }, [nodes])

  const resetPositions = useCallback(() => {
    localStorage.removeItem(FLOW_LS_KEY)
    setNodes((prev) => prev.map((n) => ({ ...n, position: FLOW_POSITIONS[n.id] ?? n.position })))
    setTimeout(() => fitView({ duration: 500, padding: 0.2 }), 100)
  }, [setNodes, fitView])

  return (
    <CanvasContext.Provider value={{ mode, onToggle: toggle }}>
      <div className="h-svh home-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          colorMode={resolvedTheme === "dark" ? "dark" : "light"}
          panOnDrag={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
          zoomOnDoubleClick={false}
          nodesConnectable={false}
          fitView
          fitViewOptions={{ padding: 0.55 }}
          proOptions={{ hideAttribution: true }}
          style={{ background: "var(--background)" }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="var(--canvas-dot)"
            style={{ background: "var(--background)" }}
          />
        </ReactFlow>
        {mode === "flow" && (
          <div className="fixed bottom-6 right-6 z-20 flex gap-2">
            <button
              onClick={copyPositions}
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2 text-muted-foreground")}
            >
              <HugeiconsIcon icon={Copy01Icon} size={14} />
              Copy positions
            </button>
            <button
              onClick={resetPositions}
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2 text-muted-foreground")}
            >
              <HugeiconsIcon icon={Refresh01Icon} size={14} />
              Reset layout
            </button>
          </div>
        )}
      </div>
    </CanvasContext.Provider>
  )
}
