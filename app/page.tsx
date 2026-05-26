import type { Metadata } from "next"
import { CopyCommand } from "@/components/copy-command"

export const metadata: Metadata = {
  title: "A Major Skills",
  description:
    "Simple, minimal, lean skills. ship.md, vibe.md, party.md, replay.md, and 30+ more.",
}

function repoBadges(repo: string, status: "beta" | "experimental") {
  const base = `https://shieldcn.dev`
  return [
    { src: `${base}/badge/status-${status}-${status === "beta" ? "blue" : "orange"}.svg?size=xs`, alt: "Status" },
    // { src: `${base}/github/stars/${repo}.svg?size=xs`, alt: "Stars" },
  ]
}

const flagships = [
  {
    emoji: "📦",
    name: "ship.md",
    tagline:
      "A thin, structured workflow for shipping features. Simple, minimal, lean. One interview, one plan, ship the thing.",
    commands: "/ship · /ship-fast",
    install: "npx skills add amajorai/ship.md",
    href: "https://github.com/amajorai/ship.md",
    badges: repoBadges("amajorai/ship.md", "beta"),
  },
  {
    emoji: "🪅",
    name: "vibe.md",
    tagline:
      "Spin up a 24/7 production-ready full-stack dev and deploy environment. One interview, one clean pass.",
    commands: "/vibe · /vibe-reconfigure · /vibe-provision-worker",
    install: "npx skills add amajorai/vibe.md",
    href: "https://github.com/amajorai/vibe.md",
    badges: repoBadges("amajorai/vibe.md", "beta"),
  },
  {
    emoji: "🎉",
    name: "party.md",
    tagline:
      "Most AI dev tools stop when you close your laptop. party.md doesn't. GitHub Projects as the interface - drop in issues, it ships them while you sleep.",
    commands: "/party",
    install: "npx skills add amajorai/party.md",
    href: "https://github.com/amajorai/party.md",
    badges: repoBadges("amajorai/party.md", "experimental"),
  },
  {
    emoji: "🎬",
    name: "replay.md",
    tagline:
      "Record a live video of your running app and share the link, straight from chat. Cursor has it. Now Claude Code has it too.",
    commands: "/replay",
    install: "npx skills add amajorai/replay.md",
    href: "https://github.com/amajorai/replay.md",
    badges: repoBadges("amajorai/replay.md", "experimental"),
    isNew: true,
  },
]

const utilitySkills = [
  "edge-cases",
  "e2e",
  "icons",
  "hardening",
  "seo",
  "lighthouse",
  "legal-compliance",
  "app-store-compliance",
  "aso",
  "better-t-stack",
  "distill-skill",
  "mirror",
  "reflect",
  "payments",
  "auth",
  "observability",
  "analytics",
  "email-transactional",
  "launch-checklist",
  "ci",
  "og-images",
  "waitlist",
  "cookie-consent",
  "a11y",
  "free-trial",
  "bundle-analysis",
  "i18n",
  "db-migrate",
  "load-test",
  "push-notifications",
  "context",
  "agent-quality",
  "youtube-to-skill",
]

const otherSkills = [
  {
    emoji: "🔎",
    name: "fix.md",
    tagline:
      "A systematic bug-fixing workflow. Explore first, instrument strategically, read the logs, fix surgically, verify clean with Playwright, Maestro, or Computer Use.",
    commands: "/fix",
    install: "npx skills add amajorai/fix.md",
    href: "https://github.com/amajorai/fix.md",
    badges: repoBadges("amajorai/fix.md", "experimental"),
    isNew: true,
  },
  {
    emoji: "🌼",
    name: "amajor.md",
    tagline:
      "Master skill directory. One install, discover every A Major skill. Built for agents to find the right tool for any task.",
    commands: "/amajor",
    install: "npx skills add amajorai/amajor.md",
    href: "https://github.com/amajorai/amajor.md",
    badges: repoBadges("amajorai/amajor.md", "beta"),
  },
  {
    emoji: "⚡",
    name: "amajorai/skills",
    tagline:
      "Smaller skills people don't think about when shipping. Edge cases, E2E, auth, payments, SEO, CI, and more.",
    commands: `+${utilitySkills.length} skills`,
    install: "npx skills add amajorai/skills",
    href: "https://github.com/amajorai/skills",
    badges: repoBadges("amajorai/skills", "experimental"),
  },
]

function SkillCard({ emoji, name, tagline, commands, install, href, badges, isNew }: {
  emoji: string; name: string; tagline: string; commands: string;
  install: string; href: string; badges: { src: string; alt: string }[]; isNew?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl p-4 -m-4 hover:bg-muted/50 transition-colors"
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
        <span className="font-heading text-xl font-medium">
          {emoji} {name}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {commands}
        </span>
        {isNew && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="https://shieldcn.dev/badge/new-green.svg?size=xs" alt="New" height={20} />
        )}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
        {tagline}
      </p>
      <CopyCommand command={install} />
      <div className="flex flex-wrap items-center gap-1.5 mt-2">
        {badges.map((b) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={b.alt} src={b.src} alt={b.alt} height={20} />
        ))}
      </div>
    </a>
  )
}

export default function Page() {
  return (
    <main className="min-h-svh px-6 py-24 flex flex-col justify-center">
      <section className="mb-20 w-full max-w-2xl mx-auto">
        <h1 className="font-heading text-4xl font-medium tracking-tight mb-4">
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
      </section>

      <section className="mb-16 max-w-screen-2xl mx-auto">
<div className="grid grid-cols-1 sm:grid-cols-4 gap-x-12 gap-y-12">
          {flagships.map((f) => (
            <SkillCard key={f.name} {...f} />
          ))}
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto">
<div className="flex flex-wrap justify-center gap-x-12 gap-y-12">
          {otherSkills.map((s) => (
            <div key={s.name} className="w-full sm:w-[calc(25%-2.25rem)]">
              <SkillCard {...s} />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
