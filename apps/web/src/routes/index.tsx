import { Button } from "@diffy/ui/components/button";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRightIcon,
  CpuIcon,
  GitBranchIcon,
  ZapIcon,
  ScaleIcon,
  WorkflowIcon,
  TerminalIcon,
  GitCompareIcon,
  LayersIcon,
  CheckIcon,
  ShieldIcon,
  MonitorIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react";
import { useTheme } from "tanstack-theme-kit";

import { Logo } from "@/components/logo";

export const Route = createFileRoute("/")({ component: App });

function Nav() {
  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-lg">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <nav className="flex items-center justify-between py-3">
          <a href="/" aria-label="Homepage" className="text-foreground">
            <Logo className="h-6" />
          </a>
          <div className="hidden lg:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm/6 text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#agentic"
              className="text-sm/6 text-muted-foreground hover:text-foreground transition-colors"
            >
              Agentic
            </a>
            <a
              href="https://github.com/diffy"
              className="text-sm/6 text-muted-foreground hover:text-foreground transition-colors"
            >
              Open Source
            </a>
            <a
              href="#pricing"
              className="text-sm/6 text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#login"
              className="text-sm/6 font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </a>
            <Button className="text-sm/6">
              Get started
              <ArrowRightIcon className="size-3.5 shrink-0" />
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden py-30">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/4 right-0 h-125 w-175 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />
      </div>
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="max-w-3xl">
          <h1 className="mt-10 max-w-[24ch] text-5xl font-semibold tracking-tight text-balance sm:text-7xl sm:mt-12">
            Code collaboration that keeps up with your agents
          </h1>
          <p className="mt-8 max-w-[48ch] text-lg/8 text-muted-foreground text-pretty">
            Legacy platforms buckle under agentic workflows. diffy is built from
            scratch to handle the speed, scale, and complexity of AI-driven
            development.
          </p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="py-6 px-4 text-lg">
              Start building for free
              <ArrowRightIcon className="size-4 shrink-0" />
            </Button>
            <Button size="lg" variant="outline" className="py-6 px-4 text-lg">
              Watch the demo
            </Button>
          </div>
        </div>
        <div className="mt-20">
          <img
            src="https://assets.ui.sh/screenshots/1.webp?top=1500&left=2000&position=bottom-right"
            alt="diffy interface showing agent-driven pull requests and code review"
            className="w-full rounded-xl ring-1 ring-black/5 dark:ring-white/10"
          />
        </div>
      </div>
    </section>
  );
}

function LogoCloud() {
  const logos = ["relay", "orbital", "looply", "pinelabs", "quirk"];

  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <p className="text-center text-sm/6 font-medium text-muted-foreground">
          Trusted by teams shipping with agents
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo) => (
            <img
              key={logo}
              src={`https://assets.ui.sh/logos/${logo}.svg?color=737373&accent-color=737373`}
              alt={logo}
              className="h-7 opacity-50 dark:brightness-150 dark:opacity-60"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: GitBranchIcon,
      title: "Agent-native branches",
      description:
        "Automatic branch isolation for every agent session. Review, approve, or rollback agent changes without polluting your main line.",
    },
    {
      icon: ZapIcon,
      title: "Blazing-fast diffs",
      description:
        "Patent-pending diff engine processes 10x larger PRs in milliseconds. No more timeout errors on agentic code generation.",
    },
    {
      icon: ShieldIcon,
      title: "Agent permissions",
      description:
        "Fine-grained access controls that understand the difference between human and agent actions. Set boundaries, not just keys.",
    },
    {
      icon: ScaleIcon,
      title: "Horizontal scale",
      description:
        "Built on an event-sourced architecture that scales linearly. Your repo handles thousands of concurrent agents without degradation.",
    },
    {
      icon: WorkflowIcon,
      title: "Smart merge queues",
      description:
        "Merge queues that understand agent cohort relationships. Related changes land together, conflicts resolve before they block.",
    },
    {
      icon: TerminalIcon,
      title: "First-class CLI",
      description:
        "A full-featured CLI built for automation first. Script agent workflows, hook into CI, and pipeline changes without brittle API shimming.",
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-sm/6 font-semibold text-primary">Features</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-balance">
            Everything you need. Nothing you don't.
          </h2>
          <p className="mt-4 text-lg/8 text-muted-foreground text-pretty max-w-[48ch]">
            diffy reimagines every layer of the collaboration stack to handle
            the throughput that agentic coding demands.
          </p>
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-3">
              <dt className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                  <feature.icon className="size-4 shrink-0 text-primary" />
                </div>
                <span className="text-base/7 font-semibold">
                  {feature.title}
                </span>
              </dt>
              <dd className="text-sm/6 text-muted-foreground text-pretty max-w-[40ch]">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function AgenticSection() {
  const comparisons = [
    { label: "Concurrent agent operations", value: "Unlimited" },
    { label: "Avg. diff rendering (10k lines)", value: "< 200ms" },
    { label: "Merge conflict auto-resolution", value: "Built-in" },
    { label: "Agent audit trail granularity", value: "Per-action" },
  ];

  return (
    <section
      id="agentic"
      className="border-t border-border py-24 sm:py-32 bg-muted/30"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="max-w-lg">
            <p className="text-sm/6 font-semibold text-primary">
              Agentic-first
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-balance">
              Your agents shouldn't wait in line
            </h2>
            <p className="mt-6 text-lg/8 text-muted-foreground text-pretty">
              Traditional platforms were designed for human speed. When agents
              generate hundreds of PRs per hour, every bottleneck compounds.
              diffy eliminates them.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
              {comparisons.map((item) => (
                <div key={item.label}>
                  <dt className="text-sm/6 text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex items-center">
            <div className="w-full rounded-xl border border-border bg-card p-6 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-2 text-sm/6 text-muted-foreground">
                <GitCompareIcon className="size-4 shrink-0" />
                <span>diffy agent review --pr 847</span>
              </div>
              <div className="mt-4 space-y-3 font-mono text-sm/6">
                <div className="flex items-center gap-3 text-foreground">
                  <CheckIcon className="size-4 shrink-0 text-primary" />
                  <span>src/api/handlers.ts</span>
                  <span className="ml-auto text-sm text-emerald-600 dark:text-emerald-400">
                    +124 -8
                  </span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <CheckIcon className="size-4 shrink-0 text-primary" />
                  <span>src/api/middleware.ts</span>
                  <span className="ml-auto text-sm text-emerald-600 dark:text-emerald-400">
                    +56 -12
                  </span>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <CheckIcon className="size-4 shrink-0 text-primary" />
                  <span>src/db/schema.ts</span>
                  <span className="ml-auto text-sm text-emerald-600 dark:text-emerald-400">
                    +32 -0
                  </span>
                </div>
                <div className="mt-4 border-t border-border pt-4">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Agent cohaskell-4 passed all checks</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      Approved
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-muted-foreground">
                    <span>Merge queue position: 1</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      Merging
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  const layers = [
    {
      icon: CpuIcon,
      title: "Event-sourced core",
      description:
        "Every operation is an event. Replay, audit, and branch from any point in your repository's history.",
    },
    {
      icon: LayersIcon,
      title: "Content-addressable storage",
      description:
        "Deduplicated storage means agents never re-upload the same data. Your repo stays lean even with thousands of generation cycles.",
    },
    {
      icon: GitBranchIcon,
      title: "Conflict-free replicated data types",
      description:
        "CRDTs enable true concurrent editing. Multiple agents can modify the same file and merge without conflicts.",
    },
  ];

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm/6 font-semibold text-primary">Architecture</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-balance">
            Not a fork. A rewrite.
          </h2>
          <p className="mt-4 text-lg/8 text-muted-foreground text-pretty">
            We didn't patch agent support onto an existing platform. We started
            from first principles.
          </p>
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {layers.map((layer) => (
            <div
              key={layer.title}
              className="rounded-xl border border-border bg-card p-8 shadow-sm dark:shadow-none"
            >
              <dt className="flex items-center gap-3">
                <layer.icon className="size-5 shrink-0 text-primary" />
                <span className="text-base/7 font-semibold">{layer.title}</span>
              </dt>
              <dd className="mt-3 text-sm/6 text-muted-foreground text-pretty">
                {layer.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance">
            Ready to ship faster?
          </h2>
          <p className="mt-4 text-lg/8 text-muted-foreground text-pretty">
            diffy is free for open source and small teams. Start your first
            agent in under a minute.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="py-6 px-4 text-lg">
              Get started for free
              <ArrowRightIcon className="size-4 shrink-0" />
            </Button>
            <Button variant="outline" size="lg" className="py-6 px-4 text-lg">
              Read the docs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options = [
    { value: "system", icon: MonitorIcon, label: "System" },
    { value: "light", icon: SunIcon, label: "Light" },
    { value: "dark", icon: MoonIcon, label: "Dark" },
  ] as const;

  return (
    <div className="inline-flex items-center rounded-full bg-muted p-1 gap-0.5">
      {options.map((option) => {
        const Icon = option.icon;
        const isActive = theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            className={`relative flex size-8 items-center justify-center rounded-full transition-colors cursor-pointer ${
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label={`Switch to ${option.label} theme`}
            aria-pressed={isActive}
          >
            <Icon className="size-4" />
          </button>
        );
      })}
    </div>
  );
}

function Footer() {
  const columns = [
    {
      label: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Security", href: "#" },
      ],
    },
    {
      label: "Legal",
      links: [
        { label: "Terms", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "DPA", href: "#" },
      ],
    },
    {
      label: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Changelog", href: "#" },
        { label: "Pricing", href: "#pricing" },
      ],
    },
    {
      label: "Resources",
      links: [
        { label: "Docs", href: "#" },
        { label: "API", href: "#" },
        { label: "Status", href: "#" },
      ],
    },
    {
      label: "Connect",
      links: [
        { label: "GitHub", href: "https://github.com/diffy" },
        { label: "X", href: "#" },
        { label: "Discord", href: "#" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-muted/20">
      {/* Top links area */}
      <div className="mx-auto max-w-6xl px-6 sm:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-5 sm:gap-4">
          {columns.map((col, i) => (
            <div
              key={col.label}
              className={
                i < columns.length - 1
                  ? "sm:border-r sm:border-border sm:pr-4"
                  : ""
              }
            >
              <h3 className="text-sm/6 text-muted-foreground">{col.label}</h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm/6 font-normal text-foreground hover:text-muted-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Giant text */}
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div
          className="text-center font-bold -tracking-[0.055em] select-none pointer-events-none text-border"
          style={{
            fontSize: "clamp(180px, 28vw, 520px)",
          }}
        >
          diffy
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>&copy; 2026 Diffy, Inc.</span>
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon className="size-4" />
              SOC 2 Certified
            </span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}

export function App() {
  return (
    <main>
      <Nav />
      <Hero />
      <LogoCloud />
      <Features />
      <AgenticSection />
      <ArchitectureSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
