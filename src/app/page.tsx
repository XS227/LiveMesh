"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Download,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";

const navLinks = [
  { href: "#hero", label: "Intro" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

const experiences = [
  {
    role: "Senior Frontend Engineer",
    company: "Northwind Labs",
    timeframe: "2021 — Present",
    summary: [
      "Lead the design system efforts for a suite of enterprise apps.",
      "Built a11y-first component library with Storybook and testing.",
      "Mentored 4 engineers and established frontend review rituals.",
    ],
  },
  {
    role: "Product Designer & Engineer",
    company: "Atlas Studio",
    timeframe: "2019 — 2021",
    summary: [
      "Shipped marketing sites with headless CMS and Next.js.",
      "Introduced performance budgets and brought LCP < 1.4s.",
      "Co-led discovery workshops with clients across EU/US.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Indie Freelance",
    timeframe: "2016 — 2019",
    summary: [
      "Delivered 30+ web experiences for startups and agencies.",
      "Specialized in design-to-code and rapid prototypes.",
    ],
  },
];

const education = [
  {
    title: "B.Sc. Interaction Design",
    place: "Aalborg University",
    timeframe: "2012 — 2015",
    summary: ["Graduated with focus on human-computer interaction and UI systems."],
  },
  {
    title: "Exchange: Digital Media",
    place: "Parsons School of Design",
    timeframe: "2014",
    summary: ["Research on responsive motion systems for product marketing sites."],
  },
];

const portfolio = [
  {
    title: "Layered Finance",
    tags: ["Web App", "UI Systems"],
    blurb: "Design system + dashboard for a fintech orchestration layer.",
  },
  {
    title: "Horizon Docs",
    tags: ["Docs", "DX"],
    blurb: "Interactive documentation with guided tours and live code blocks.",
  },
  {
    title: "Pulse Commerce",
    tags: ["Ecommerce", "Brand"],
    blurb: "Full brand refresh with headless storefront and shoppable lookbook.",
  },
  {
    title: "Beacon UI",
    tags: ["Design", "Component Library"],
    blurb: "Token-driven component library for SaaS dashboards and marketing.",
  },
];

const testimonials = [
  {
    name: "Maya Solberg",
    role: "Product Lead, Northwind",
    quote:
      "Ryan moves effortlessly between strategy, design, and code. Our ship cadence doubled once he owned the design system.",
  },
  {
    name: "Leo Winters",
    role: "CEO, Atlas Studio",
    quote: "He creates clarity fast and delivers prototypes the team can test the same day. A rare blend of craft and speed.",
  },
];

const posts = [
  {
    title: "Design tokens for real teams",
    date: "Aug 02, 2024",
    snippet: "A practical playbook for rolling out tokens without stopping feature work.",
  },
  {
    title: "Shipping motion that feels calm",
    date: "Jun 18, 2024",
    snippet: "Micro-interactions that read well in both light and dark UI themes.",
  },
];

const skillTags = {
  tech: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Tailwind",
    "Framer Motion",
    "Storybook",
    "Figma",
    "Design Tokens",
    "Accessibility",
  ],
  soft: ["Product thinking", "Workshop facilitation", "Mentorship", "Systems mindset", "Stakeholder comms", "Rapid prototyping"],
};

const quickFacts = [
  { label: "Location", value: "Copenhagen, DK" },
  { label: "Experience", value: "8+ years" },
  { label: "Available", value: "Freelance & fractional" },
  { label: "Preferred stack", value: "React, Next.js, Design Tokens" },
];

export default function Home() {
  const [active, setActive] = useState(navLinks[0].href);
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");
  const [importDemo, setImportDemo] = useState(true);

  const handleScroll = (href: string) => {
    setActive(href);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const heroActions = useMemo(
    () => [
      { label: "Download CV", icon: <Download size={18} />, href: "#", variant: "solid" },
      { label: "Contact Me", icon: <ArrowUpRight size={18} />, href: "#contact", variant: "ghost" },
    ],
    []
  );

  return (
    <div className="relative min-h-screen px-4 pb-14 pt-10 text-slate-900 md:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-[6%] top-[10%] h-64 w-64 rounded-full bg-cyan-200 blur-3xl" />
        <div className="absolute right-[10%] top-[18%] h-72 w-72 rounded-full bg-blue-200 blur-3xl" />
        <div className="absolute bottom-[10%] right-[22%] h-64 w-64 rounded-full bg-sky-100 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row">
        <aside className="section-shell sticky top-6 h-fit w-full max-w-xl self-start border border-white/60 p-6 shadow-2xl shadow-blue-500/10 lg:max-w-sm">
          <div className="flex items-start gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-gradient-to-tr from-blue-500 via-sky-400 to-emerald-300 p-[2px] shadow-lg">
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-white/90 text-2xl font-semibold text-slate-900">
                R
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Portfolio</p>
              <h1 className="font-display text-2xl font-semibold text-slate-900">Ryan Carter</h1>
              <p className="text-sm font-medium text-slate-600">Frontend developer & product designer</p>
              <div className="flex items-center gap-2">
                <span className="glow-pill inline-flex items-center gap-2 text-xs text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(52,211,153,0.28)]" />
                  Available for freelance
                </span>
              </div>
            </div>
            </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {heroActions.map((action) => (
              <button
                key={action.label}
                onClick={() => handleScroll(action.href)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition hover:-translate-y-[1px] hover:shadow-md ${
                  action.variant === "solid"
                    ? "border-transparent bg-slate-900 text-white"
                    : "border-slate-200 bg-white/80 text-slate-800"
                }`}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-700">
            {quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-white/70 bg-white/80 p-3 shadow-sm shadow-slate-900/5"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{fact.label}</p>
                <p className="mt-1 font-semibold text-slate-900">{fact.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Navigate</p>
            <nav className="flex flex-wrap gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  className="anchor-link"
                  aria-current={active === link.href}
                  onClick={() => handleScroll(link.href)}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <a className="flex items-center gap-2 text-slate-800 transition hover:text-slate-950" href="mailto:ryan@example.com">
              <Mail size={16} /> ryan@example.com
            </a>
            <a className="flex items-center gap-2 text-slate-800 transition hover:text-slate-950" href="tel:+4512345678">
              <Phone size={16} /> +45 1234 5678
            </a>
            <span className="flex items-center gap-2 text-slate-800">
              <MapPin size={16} /> Copenhagen, DK
            </span>
            <div className="flex gap-2 pt-2 text-slate-700">
              <a className="rounded-full border border-slate-200 p-2 hover:border-slate-300" href="#">
                <Linkedin size={16} />
              </a>
              <a className="rounded-full border border-slate-200 p-2 hover:border-slate-300" href="#">
                <Github size={16} />
              </a>
              <a className="rounded-full border border-slate-200 p-2 hover:border-slate-300" href="#">
                <Globe size={16} />
              </a>
            </div>
          </div>
        </aside>

        <main className="section-shell w-full border border-white/60 p-6 shadow-2xl shadow-blue-500/10 lg:p-8">
          <section id="hero" className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Hello</p>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">
                Hi, I&apos;m Ryan — Frontend developer crafting crisp product experiences.
              </h2>
              <span className="glow-pill inline-flex items-center gap-2 text-xs">
                <Sparkles size={14} /> 10-day onboarding for new teams
              </span>
            </div>
            <p className="max-w-3xl text-lg text-slate-700">
              I design and build interfaces that feel effortless. From design tokens to production-ready components,
              I help teams ship faster without sacrificing polish or accessibility.
            </p>
            <div className="flex flex-wrap gap-3">
              {heroActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleScroll(action.href)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition hover:-translate-y-[1px] hover:shadow-md ${
                    action.variant === "solid"
                      ? "border-transparent bg-slate-900 text-white"
                      : "border-slate-200 bg-white/80 text-slate-800"
                  }`}
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm" aria-labelledby="setup-wizard">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Install</p>
                <h3 id="setup-wizard" className="font-display text-2xl font-semibold text-slate-900">
                  Ready-to-install CV template wizard
                </h3>
              </div>
              <span className="glow-pill">Your CV is ready</span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step 1</p>
                <p className="mt-2 font-semibold text-slate-900">Choose mode</p>
                <div className="mt-3 flex gap-2">
                  {(["light", "dark"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setColorMode(mode)}
                      className={`flex-1 rounded-full border px-3 py-2 text-sm font-semibold capitalize transition ${
                        colorMode === mode
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-200 bg-white text-slate-800"
                      }`}
                    >
                      {mode} mode
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step 2</p>
                <p className="mt-2 font-semibold text-slate-900">Import demo content?</p>
                <div className="mt-3 flex items-center justify-between rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
                  <span>{importDemo ? "Demo content included" : "Start blank"}</span>
                  <button
                    onClick={() => setImportDemo((val) => !val)}
                    className="rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm transition hover:-translate-y-[1px]"
                  >
                    {importDemo ? "Disable" : "Enable"}
                  </button>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Step 3</p>
                <p className="mt-2 font-semibold text-slate-900">Launch your CV card</p>
                <p className="mt-2 text-sm text-slate-700">Tailored download bundle based on your choices.</p>
                <button
                  onClick={() => handleScroll("#hero")}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-[1px] hover:shadow-xl"
                >
                  Show my CV
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">Download-ready ZIP will respect {colorMode} mode with {importDemo ? "demo sections" : "your blank canvas"} enabled.</p>
          </section>

          <section id="about" className="mt-12 grid gap-6 md:grid-cols-[1.2fr_0.9fr]">
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm">
              <h3 className="font-display text-xl font-semibold text-slate-900">About</h3>
              <p className="mt-3 text-slate-700">
                I blend product intuition with engineering depth to design systems that stay consistent while teams move fast.
                I prefer working in small squads where I can shape direction, pair on architecture, and mentor designers and
                engineers. When I&apos;m not building, I host design critiques and run workshops on tokens and documentation.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm">
              <h3 className="font-display text-xl font-semibold text-slate-900">Quick facts</h3>
              <div className="mt-4 grid gap-3">
                {quickFacts.map((fact) => (
                  <div key={fact.label} className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-600">{fact.label}</p>
                    <p className="text-sm font-semibold text-slate-900">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="experience" className="mt-12 space-y-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Timeline</p>
              <h3 className="font-display text-2xl font-semibold text-slate-900">Experience & Education</h3>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm">
              <div className="timeline relative space-y-6">
                {experiences.map((item) => (
                  <div key={item.role} className="timeline-item">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-lg font-semibold text-slate-900">{item.role}</h4>
                      <span className="rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white">
                        {item.timeframe}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-600">{item.company}</p>
                    <ul className="mt-2 space-y-1 text-sm text-slate-700">
                      {item.summary.map((point) => (
                        <li key={point}>
                          <span className="mr-2 text-slate-400">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-slate-900">Education</h4>
              <div className="mt-4 space-y-4">
                {education.map((edu) => (
                  <div key={edu.title} className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3 last:border-none last:pb-0">
                    <div>
                      <p className="font-semibold text-slate-900">{edu.title}</p>
                      <p className="text-sm text-slate-600">{edu.place}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{edu.timeframe}</span>
                    <p className="w-full text-sm text-slate-700 md:w-auto">{edu.summary[0]}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="skills" className="mt-12 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-display text-2xl font-semibold text-slate-900">Skills</h3>
              <span className="tag-pill">Level: <strong>Expert</strong></span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-slate-900">Tech stack</h4>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skillTags.tech.map((skill) => (
                    <span key={skill} className="tag-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-slate-900">How I work</h4>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skillTags.soft.map((skill) => (
                    <span key={skill} className="tag-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="portfolio" className="mt-12 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-2xl font-semibold text-slate-900">Selected work</h3>
              <a className="anchor-link" href="#">
                View all
                <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="card-grid">
              {portfolio.map((project) => (
                <article
                  key={project.title}
                  className="group rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white/90 via-white to-slate-50/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-slate-900">{project.title}</h4>
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">Case study</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-700">{project.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-white px-3 py-1 shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                    View project
                    <ArrowUpRight className="transition group-hover:translate-x-1" size={16} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="testimonials" className="mt-12 space-y-5">
            <h3 className="font-display text-2xl font-semibold text-slate-900">Testimonials</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {testimonials.map((item) => (
                <blockquote
                  key={item.name}
                  className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm"
                >
                  <p className="text-slate-700">“{item.quote}”</p>
                  <div className="mt-4">
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-600">{item.role}</p>
                  </div>
                </blockquote>
              ))}
            </div>
          </section>

          <section id="blog" className="mt-12 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-semibold text-slate-900">Latest writing</h3>
              <a className="anchor-link" href="#">
                All posts <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {posts.map((post) => (
                <article
                  key={post.title}
                  className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{post.date}</p>
                  <h4 className="mt-2 text-lg font-semibold text-slate-900">{post.title}</h4>
                  <p className="mt-2 text-sm text-slate-700">{post.snippet}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                    Read article <ArrowUpRight size={16} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className="mt-12 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Contact</p>
                <h3 className="font-display text-2xl font-semibold text-slate-900">Let&apos;s build together</h3>
              </div>
              <span className="glow-pill">Replies within 24 hours</span>
            </div>
            <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
              <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-slate-900">Quick note</h4>
                <p className="mt-2 text-sm text-slate-700">
                  Tell me about your timeline, team, and the outcome you want. I can join for discovery, audits, or end-to-end
                  delivery.
                </p>
                <div className="mt-4 space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <Mail size={16} /> ryan@example.com
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} /> +45 1234 5678
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} /> Copenhagen, DK
                  </div>
                </div>
              </div>
              <form className="rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-sm">
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="space-y-1 text-sm font-semibold text-slate-700">
                    Name
                    <input
                      type="text"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="space-y-1 text-sm font-semibold text-slate-700">
                    Email
                    <input
                      type="email"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>
                <label className="mt-3 block space-y-1 text-sm font-semibold text-slate-700">
                  Project
                  <textarea
                    rows={4}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                    placeholder="What are you building?"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => handleScroll("#hero")}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-[1px] hover:shadow-xl"
                >
                  Send message
                  <ArrowUpRight size={16} />
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
