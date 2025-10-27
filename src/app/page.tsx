"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";

const DEFAULT_PROMPT = "A simple landing page for a personal portfolio";

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
};

const createDocument = ({ heading, tagline, promptLabel, promptLower }: DocumentOptions) => {
  const features = [
    {
      title: "Instant blueprint",
      description: `Build the sections you need for ${promptLabel} with semantic, accessible markup.`,
    },
    {
      title: "Editable copy",
      description: `Refine messaging for ${promptLabel} directly in the preview to keep every detail aligned.`,
    },
    {
      title: "Polished layout",
      description: `Spacing, color, and rhythm stay consistent so ${promptLabel} is ready to share.`,
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
        background: #f8fafc;
        color: #0f172a;
        display: flex;
        justify-content: center;
      }
      main.page {
        width: min(900px, 92%);
        display: flex;
        flex-direction: column;
        gap: 48px;
      }
      section.hero {
        background: #ffffff;
        border-radius: 28px;
        padding: 56px;
        border: 1px solid rgba(15, 23, 42, 0.08);
        box-shadow: 0 32px 60px rgba(15, 23, 42, 0.05);
      }
      .hero__badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        border-radius: 999px;
        background: rgba(15, 23, 42, 0.08);
        color: #0f172a;
        font-weight: 600;
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .hero h1 {
        margin: 24px 0 16px;
        font-size: clamp(34px, 5vw, 48px);
        line-height: 1.1;
      }
      .hero p {
        margin: 0 0 32px;
        font-size: 18px;
        color: #334155;
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
        background: #0f172a;
        color: #ffffff;
        box-shadow: 0 18px 32px rgba(15, 23, 42, 0.18);
      }
      .hero .actions button.secondary {
        background: #ffffff;
        color: #0f172a;
        border: 1px solid rgba(15, 23, 42, 0.15);
      }
      .hero .actions button:hover {
        transform: translateY(-1px);
        box-shadow: 0 20px 36px rgba(15, 23, 42, 0.18);
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
        border: 1px solid rgba(148, 163, 184, 0.32);
        box-shadow: inset 0 0 0 1px rgba(148, 163, 184, 0.12);
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
        background: rgba(15, 23, 42, 0.08);
        color: #0f172a;
        font-weight: 600;
        font-size: 14px;
      }
      .feature h3 {
        margin: 0;
        font-size: 18px;
      }
      .feature p {
        margin: 0;
        color: #475569;
        font-size: 15px;
        line-height: 1.55;
      }
      section.cta {
        background: #0f172a;
        color: #ffffff;
        padding: 40px 44px;
        border-radius: 28px;
        display: grid;
        gap: 16px;
        align-content: start;
      }
      section.cta p {
        margin: 0;
        color: rgba(241, 245, 249, 0.82);
        line-height: 1.6;
      }
      .cta__button {
        justify-self: start;
        padding: 12px 28px;
        border-radius: 999px;
        border: none;
        background: #e2e8f0;
        color: #0f172a;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 12px 26px rgba(226, 232, 240, 0.2);
      }
      footer {
        text-align: center;
        color: rgba(15, 23, 42, 0.6);
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
          <button class="secondary">Preview components</button>
        </div>
      </section>
      <section class="features">
        ${featuresHtml}
      </section>
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

const BASE_HTML = createDocument({
  heading: "Bring ideas to life in the browser",
  tagline: "Adjust the prompt to see how LiveMesh converts concepts into polished layouts.",
  promptLabel: "your next launch",
  promptLower: "your next launch",
});

const buildHtml = (prompt: string) => {
  const heading = formatHeading(prompt);
  const promptLabel = escapeHtml(limitLength(prompt));
  const promptLower = escapeHtml(prompt.toLowerCase());
  const tagline = `LiveMesh turns your ${promptLabel} into a shareable experience in real time.`;

  return createDocument({ heading, tagline, promptLabel, promptLower });
};

export default function LiveMesh() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [previewHtml, setPreviewHtml] = useState(() => buildHtml(DEFAULT_PROMPT));
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const trimmed = prompt.trim();
    setPreviewHtml(trimmed ? buildHtml(trimmed) : BASE_HTML);
  }, [prompt]);

  useEffect(() => {
    if (frameRef.current) {
      frameRef.current.srcdoc = previewHtml;
    }
  }, [previewHtml]);

  const handleGenerate = () => {
    const trimmed = prompt.trim();
    const html = trimmed ? buildHtml(trimmed) : BASE_HTML;

    setPrompt(trimmed || DEFAULT_PROMPT);
    setPreviewHtml(html);
  };

  const handleRefine = () => {
    setPrompt((current) => `${current.trim()} — polished hero, CTA, and testimonials`.trim());
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-16 lg:px-12 lg:py-24">
        <header className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-12">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.35em] text-slate-400">
              LiveMesh
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-400" aria-hidden />
              Preview
            </span>
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl md:text-[56px]">
              Big on clarity.
              <br className="hidden sm:block" />
              Minimal by default.
            </h1>
            <p className="max-w-xl text-base text-slate-500 sm:text-lg">
              Iterate on structure and copy without distractions. Adjust the prompt, regenerate the layout, and keep everything
              polished inside a single focused workspace.
            </p>
            <div className="hidden gap-3 sm:flex">
              <Button onClick={handleGenerate} className="rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white">
                Refresh preview
              </Button>
              <Button
                variant="secondary"
                onClick={handleRefine}
                className="rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-700"
              >
                Refine copy
              </Button>
            </div>
          </div>
          <div className="relative w-full overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_30px_60px_rgba(15,23,42,0.08)]">
            <div className="absolute inset-x-8 top-6 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.28em] text-slate-400">
              <span>Live preview</span>
              <span>Static HTML</span>
            </div>
            <div className="flex h-[420px] w-full items-center justify-center p-8 pt-16 sm:h-[500px] sm:p-10">
              <iframe
                ref={frameRef}
                title="Generated design preview"
                className="h-full w-full rounded-[24px] border border-slate-200/80 bg-white shadow-[inset_0_0_0_1px_rgba(148,163,184,0.18)]"
                loading="lazy"
              />
            </div>
          </div>
        </header>

        <section className="grid gap-8 rounded-[32px] border border-slate-200/80 bg-white/80 p-8 shadow-[0_30px_60px_rgba(15,23,42,0.06)] backdrop-blur md:grid-cols-[minmax(0,1fr)_minmax(0,320px)] md:items-end">
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Prompt</span>
              <Textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="A simple landing page for a personal portfolio"
                className="min-h-[160px] rounded-[28px] border border-slate-200 bg-white px-5 py-4 text-base text-slate-700 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.2)] focus-visible:ring-0"
              />
            </div>
            <p className="text-sm text-slate-400">
              Use natural language to describe sections, tone, and layout. LiveMesh translates it into clean, accessible HTML that
              updates instantly.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleGenerate}
              className="rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white"
            >
              Refresh preview
            </Button>
            <Button
              variant="secondary"
              className="rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-600"
              onClick={handleRefine}
            >
              Refine copy
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
