"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";

const DEFAULT_PROMPT = "A simple landing page for a personal portfolio";

type LayoutDensity = "compact" | "spacious";
type FocusMode = "conversion" | "storytelling" | "onboarding";

type LayoutOptions = {
  density: LayoutDensity;
  focus: FocusMode;
  includeChecklist: boolean;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const formatHeading = (value: string) => escapeHtml(value).replaceAll("\n", "<br />");

const limitLength = (value: string, length = 72) => (value.length > length ? `${value.slice(0, length - 1)}…` : value);

type DocumentOptions = {
  heading: string;
  tagline: string;
  promptLabel: string;
  promptLower: string;
} & LayoutOptions;

const createDocument = ({
  heading,
  tagline,
  promptLabel,
  promptLower,
  density,
  focus,
  includeChecklist,
}: DocumentOptions) => {
  const densityTitle = density === "compact" ? "Compact sections" : "Open rhythm";
  const densityDescription =
    density === "compact"
      ? `Every block for ${promptLabel} stays concise and goal-focused with reduced spacing and nested callouts.`
      : `Relaxed spacing and tall line-heights help ${promptLabel} feel breathable without losing structure.`;

  const focusMap: Record<FocusMode, { title: string; description: string }> = {
    conversion: {
      title: "Conversion journey",
      description: `Hero, proof, and CTA flow are sequenced to keep ${promptLabel} focused on outcomes and sign-ups.`,
    },
    storytelling: {
      title: "Story framework",
      description: `Narrative anchors highlight the why, what, and how of ${promptLabel} to keep readers engaged.`,
    },
    onboarding: {
      title: "Onboarding clarity",
      description: `Guided steps and contextual cues help ${promptLabel} educate newcomers with ease.`,
    },
  };

  const features = [
    { title: densityTitle, description: densityDescription },
    focusMap[focus],
    includeChecklist
      ? {
          title: "Actionable checklist",
          description: `Each section includes reminders to launch ${promptLabel} with confidence and complete stakeholder review.`,
        }
      : {
          title: "Insightful notes",
          description: `Inline notes capture the tone and voice that keeps ${promptLabel} aligned with brand storytelling.`,
        },
  ];

  const featuresHtml = features
    .map(
      (feature, index) => `
        <article class="feature">
          <span class="feature__index">${index + 1}</span>
          <h3>${escapeHtml(feature.title)}</h3>
          <p>${feature.description}</p>
        </article>`
    )
    .join("");

  const checklistHtml = includeChecklist
    ? `
      <section class="checklist">
        <h2>Launch checklist</h2>
        <ul>
          <li>Define success metrics for ${promptLower} and align the core CTA.</li>
          <li>Collect supporting visuals and testimonials that validate the promise.</li>
          <li>Review accessibility contrasts, headings, and focus states before handoff.</li>
        </ul>
      </section>`
    : `
      <section class="insights">
        <h2>Editorial guidance</h2>
        <p>Capture voice, pacing, and storytelling cues directly in the layout so ${promptLower} stays consistent across channels.</p>
        <p>Highlight differentiators with supporting evidence and imagery that reinforce the brand promise.</p>
      </section>`;

  const plainTitle = heading.replace(/<[^>]+>/g, " ").trim() || "LiveMesh Preview";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${plainTitle}</title>
    <style>
      :root {
        color-scheme: light;
        font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 56px 0 64px;
        background: #ecfdf5;
        color: #064e3b;
        display: flex;
        justify-content: center;
      }
      main.page {
        width: min(920px, 92%);
        display: flex;
        flex-direction: column;
        gap: 48px;
      }
      section.hero {
        background: #ffffff;
        border-radius: 28px;
        padding: 56px;
        border: 1px solid rgba(4, 120, 87, 0.18);
        box-shadow: 0 32px 60px rgba(4, 120, 87, 0.12);
      }
      .hero__badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        border-radius: 999px;
        background: rgba(16, 185, 129, 0.18);
        color: #047857;
        font-weight: 600;
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .hero__badge::after {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 999px;
        background: rgba(4, 120, 87, 0.8);
      }
      .hero h1 {
        margin: 24px 0 16px;
        font-size: clamp(36px, 5vw, 52px);
        line-height: 1.1;
      }
      .hero p {
        margin: 0 0 32px;
        font-size: 18px;
        color: rgba(4, 47, 46, 0.72);
        line-height: 1.6;
      }
      .hero .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }
      .hero .actions button {
        appearance: none;
        border: none;
        border-radius: 999px;
        padding: 12px 28px;
        font-weight: 600;
        font-size: 15px;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .hero .actions button.primary {
        background: #047857;
        color: #f0fdf4;
        box-shadow: 0 18px 32px rgba(4, 120, 87, 0.18);
      }
      .hero .actions button.secondary {
        background: #ecfdf5;
        color: #047857;
        border: 1px solid rgba(4, 120, 87, 0.28);
      }
      .hero .actions button:hover {
        transform: translateY(-1px);
        box-shadow: 0 20px 36px rgba(4, 120, 87, 0.22);
      }
      section.features {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      }
      .feature {
        background: #ffffff;
        border-radius: 24px;
        padding: 24px;
        border: 1px solid rgba(16, 185, 129, 0.24);
        box-shadow: inset 0 0 0 1px rgba(4, 120, 87, 0.08);
        display: grid;
        gap: 12px;
        align-content: start;
      }
      .feature__index {
        display: inline-flex;
        width: 36px;
        height: 36px;
        border-radius: 12px;
        align-items: center;
        justify-content: center;
        background: rgba(16, 185, 129, 0.18);
        color: #047857;
        font-weight: 600;
        font-size: 14px;
      }
      .feature h3 {
        margin: 0;
        font-size: 18px;
      }
      .feature p {
        margin: 0;
        color: rgba(4, 47, 46, 0.72);
        font-size: 15px;
        line-height: 1.55;
      }
      section.checklist,
      section.insights {
        background: #ffffff;
        border-radius: 24px;
        padding: 32px;
        border: 1px solid rgba(4, 120, 87, 0.16);
        box-shadow: inset 0 0 0 1px rgba(4, 120, 87, 0.06);
      }
      section.checklist h2,
      section.insights h2 {
        margin: 0 0 16px;
        font-size: 22px;
      }
      section.checklist ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: 12px;
      }
      section.checklist li {
        padding-left: 28px;
        position: relative;
        line-height: 1.55;
      }
      section.checklist li::before {
        content: '\u2713';
        position: absolute;
        left: 0;
        top: 0;
        color: #047857;
        font-weight: 700;
      }
      section.insights p {
        margin: 0 0 12px;
        color: rgba(4, 47, 46, 0.7);
        line-height: 1.6;
      }
      section.cta {
        background: linear-gradient(135deg, rgba(4, 120, 87, 0.94), rgba(5, 150, 105, 0.88));
        color: #ecfdf5;
        padding: 40px 44px;
        border-radius: 28px;
        display: grid;
        gap: 16px;
        align-content: start;
      }
      section.cta p {
        margin: 0;
        color: rgba(236, 253, 245, 0.85);
        line-height: 1.6;
      }
      .cta__button {
        justify-self: start;
        padding: 12px 28px;
        border-radius: 999px;
        border: none;
        background: #ecfdf5;
        color: #047857;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 12px 26px rgba(236, 253, 245, 0.18);
      }
      footer {
        text-align: center;
        color: rgba(4, 47, 46, 0.6);
        font-size: 14px;
      }
      @media (max-width: 640px) {
        section.hero {
          padding: 36px 28px;
        }
        section.cta {
          padding: 32px;
        }
        .hero .actions {
          flex-direction: column;
        }
        .hero .actions button {
          width: 100%;
          text-align: center;
        }
      }
    </style>
  </head>
  <body>
    <main class="page">
      <section class="hero">
        <span class="hero__badge">LiveMesh concept</span>
        <h1>${heading}</h1>
        <p>${tagline}</p>
        <div class="actions">
          <button class="primary">Start building</button>
          <button class="secondary">Share preview</button>
        </div>
      </section>
      <section class="features">
        ${featuresHtml}
      </section>
      ${checklistHtml}
      <section class="cta">
        <strong>Ready to launch?</strong>
        <p>Ship ${promptLower} with confidence using LiveMesh hosting.</p>
        <button class="cta__button">Publish with LiveMesh</button>
      </section>
      <footer>© ${new Date().getFullYear()} LiveMesh Prototype</footer>
    </main>
  </body>
</html>`;
};

const DEFAULT_OPTIONS: LayoutOptions = {
  density: "spacious",
  focus: "conversion",
  includeChecklist: true,
};

const buildHtml = (prompt: string, options: LayoutOptions) => {
  const heading = formatHeading(prompt);
  const promptLabel = escapeHtml(limitLength(prompt));
  const promptLower = escapeHtml(prompt.toLowerCase());
  const tagline = `LiveMesh turns your ${promptLabel} into a shareable experience in real time.`;

  return createDocument({ heading, tagline, promptLabel, promptLower, ...options });
};

const SAMPLE_PROMPTS = [
  "A product launch hub for a green energy startup",
  "A feature tour for a collaborative design tool",
  "An onboarding journey for a community knowledge base",
];

export default function LiveMesh() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [density, setDensity] = useState<LayoutDensity>(DEFAULT_OPTIONS.density);
  const [focus, setFocus] = useState<FocusMode>(DEFAULT_OPTIONS.focus);
  const [includeChecklist, setIncludeChecklist] = useState<boolean>(DEFAULT_OPTIONS.includeChecklist);
  const [previewHtml, setPreviewHtml] = useState(() => buildHtml(DEFAULT_PROMPT, DEFAULT_OPTIONS));
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  const currentOptions = useMemo<LayoutOptions>(
    () => ({ density, focus, includeChecklist }),
    [density, focus, includeChecklist]
  );

  useEffect(() => {
    const trimmed = prompt.trim();
    const nextHtml = buildHtml(trimmed || DEFAULT_PROMPT, currentOptions);
    setPreviewHtml(nextHtml);
  }, [prompt, currentOptions]);

  useEffect(() => {
    if (frameRef.current) {
      frameRef.current.srcdoc = previewHtml;
    }
  }, [previewHtml]);

  const handleGenerate = () => {
    const trimmed = prompt.trim();
    const safePrompt = trimmed || DEFAULT_PROMPT;
    setPrompt(safePrompt);
    setPreviewHtml(buildHtml(safePrompt, currentOptions));
  };

  const handleRefine = () => {
    const adjustments = [
      density === "compact" ? "compact sections" : "roomy spacing",
      focus === "conversion"
        ? "conversion highlights"
        : focus === "storytelling"
        ? "story-driven flow"
        : "guided onboarding moments",
      includeChecklist ? "actionable checklist" : "immersive narrative notes",
    ];

    setPrompt((current) => {
      const trimmed = current.trim() || DEFAULT_PROMPT;
      return `${trimmed} — emphasize ${adjustments.join(", ")}`;
    });
  };

  const handleApplyPrompt = (value: string) => {
    setPrompt(value);
    setPreviewHtml(buildHtml(value, currentOptions));
  };

  return (
    <div className="min-h-screen bg-emerald-50 text-emerald-950">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-12 px-6 py-12 lg:px-12 lg:py-16">
        <header className="overflow-hidden rounded-3xl border border-emerald-200 bg-white/90 px-6 py-10 shadow-[0_40px_80px_rgba(4,120,87,0.12)] backdrop-blur lg:px-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
                LiveMesh
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                Workspace
              </span>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-emerald-950 sm:text-[44px] md:text-[52px]">
                Launch a green-forward experience without leaving the editor.
              </h1>
              <p className="text-lg text-emerald-900/80">
                Adjust copy, density, and storytelling emphasis in one focused canvas. LiveMesh keeps the preview responsive while
                staying aligned with your brand palette.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleGenerate}
                  className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-50 shadow-[0_18px_40px_rgba(5,150,105,0.25)] hover:bg-emerald-700"
                >
                  Refresh preview
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleRefine}
                  className="rounded-full border border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700 hover:bg-emerald-100"
                >
                  Refine copy
                </Button>
              </div>
            </div>
            <dl className="grid w-full max-w-xl gap-4 rounded-3xl border border-emerald-100/80 bg-emerald-50/80 p-6 text-sm text-emerald-900 shadow-[0_24px_48px_rgba(4,120,87,0.14)] sm:grid-cols-3">
              <div className="space-y-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">Palette</dt>
                <dd className="text-lg font-semibold">Emerald</dd>
                <p className="text-xs text-emerald-700/80">Accessible contrast ratios maintained automatically.</p>
              </div>
              <div className="space-y-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">Preview</dt>
                <dd className="text-lg font-semibold">Realtime</dd>
                <p className="text-xs text-emerald-700/80">Changes sync to the frame as you type or adjust settings.</p>
              </div>
              <div className="space-y-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">Export</dt>
                <dd className="text-lg font-semibold">Static HTML</dd>
                <p className="text-xs text-emerald-700/80">Copy-and-paste output ready for production review.</p>
              </div>
            </dl>
          </div>
        </header>

        <div className="grid flex-1 gap-8 lg:grid-cols-[minmax(0,360px)_1fr] xl:grid-cols-[minmax(0,400px)_1fr]">
          <aside className="space-y-8 rounded-3xl border border-emerald-200/80 bg-white/90 p-6 shadow-[0_30px_60px_rgba(4,120,87,0.12)] backdrop-blur">
            <div className="space-y-3">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">Prompt</span>
                <Textarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="A simple landing page for a personal portfolio"
                  className="min-h-[180px] rounded-3xl border border-emerald-200 bg-white px-5 py-4 text-base text-emerald-900 shadow-[inset_0_0_0_1px_rgba(4,120,87,0.12)] placeholder:text-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                />
              </div>
              <p className="text-sm text-emerald-800/80">
                Describe structure, tone, or components. The preview updates instantly while preserving the green-first palette.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">Layout density</span>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setDensity("compact")}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    density === "compact"
                      ? "border-emerald-400 bg-emerald-100 text-emerald-800"
                      : "border-transparent bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  Compact
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setDensity("spacious")}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    density === "spacious"
                      ? "border-emerald-400 bg-emerald-100 text-emerald-800"
                      : "border-transparent bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  Spacious
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">Focus</span>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setFocus("conversion")}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    focus === "conversion"
                      ? "border-emerald-400 bg-emerald-100 text-emerald-800"
                      : "border-transparent bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  Conversion
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setFocus("storytelling")}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    focus === "storytelling"
                      ? "border-emerald-400 bg-emerald-100 text-emerald-800"
                      : "border-transparent bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  Storytelling
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setFocus("onboarding")}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    focus === "onboarding"
                      ? "border-emerald-400 bg-emerald-100 text-emerald-800"
                      : "border-transparent bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  Onboarding
                </Button>
              </div>
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-800 shadow-[inset_0_0_0_1px_rgba(4,120,87,0.08)]">
              <input
                type="checkbox"
                checked={includeChecklist}
                onChange={(event) => setIncludeChecklist(event.target.checked)}
                className="mt-1 h-4 w-4 rounded border border-emerald-400 text-emerald-600 focus:ring-emerald-500"
              />
              <span>
                Include launch checklist inside the generated layout to keep tasks and approvals visible for collaborators.
              </span>
            </label>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">Quick starters</span>
              <div className="flex flex-col gap-2">
                {SAMPLE_PROMPTS.map((sample) => (
                  <Button
                    key={sample}
                    type="button"
                    variant="secondary"
                    onClick={() => handleApplyPrompt(sample)}
                    className="justify-start rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-left text-sm font-medium text-emerald-800 hover:bg-emerald-100"
                  >
                    {sample}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 rounded-3xl border border-emerald-100 bg-emerald-50/80 p-4 text-xs text-emerald-700">
              <span className="font-semibold uppercase tracking-[0.25em] text-emerald-500">Session log</span>
              <p>
                1. Define the goal of your experience.
                <br />
                2. Adjust density and focus for the audience.
                <br />
                3. Share the HTML snippet with your engineering partner.
              </p>
            </div>
          </aside>

          <main className="flex flex-col gap-8">
            <div className="relative overflow-hidden rounded-[36px] border border-emerald-200 bg-white shadow-[0_40px_80px_rgba(4,120,87,0.18)]">
              <div className="absolute inset-x-8 top-6 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.32em] text-emerald-500">
                <span>Live preview</span>
                <span>Static HTML</span>
              </div>
              <div className="flex h-[440px] w-full items-center justify-center p-8 pt-16 sm:h-[520px] sm:p-10">
                <iframe
                  ref={frameRef}
                  title="Generated design preview"
                  className="h-full w-full rounded-[28px] border border-emerald-200/80 bg-white shadow-[inset_0_0_0_1px_rgba(4,120,87,0.16)]"
                  loading="lazy"
                />
              </div>
              <div className="grid gap-2 border-t border-emerald-100 bg-emerald-50/80 px-8 py-5 text-sm text-emerald-800 sm:grid-cols-3">
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-emerald-500">Density</span>
                  <span className="font-medium capitalize">{density}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-emerald-500">Focus</span>
                  <span className="font-medium capitalize">{focus}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-emerald-500">Checklist</span>
                  <span className="font-medium">{includeChecklist ? "Enabled" : "Hidden"}</span>
                </div>
              </div>
            </div>

            <section className="grid gap-6 rounded-3xl border border-emerald-200 bg-white/90 p-6 text-sm text-emerald-900 shadow-[0_30px_60px_rgba(4,120,87,0.12)] sm:grid-cols-3">
              <div className="space-y-2">
                <h2 className="text-base font-semibold text-emerald-800">Implementation notes</h2>
                <p className="text-sm text-emerald-800/80">
                  Export the HTML to reuse typography tokens or swap components in your design system without losing structure.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-500">Review</h3>
                <p className="text-sm text-emerald-800/80">Check accessibility, copy length, and localization needs.</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-500">Handoff</h3>
                <p className="text-sm text-emerald-800/80">Attach the preview link or download a clean HTML file for developers.</p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
