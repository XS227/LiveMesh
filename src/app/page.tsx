"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
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
        padding: 48px 0 64px;
        background: linear-gradient(180deg, #eef2ff 0%, #e0e7ff 100%);
        color: #0f172a;
        display: flex;
        justify-content: center;
      }
      main.page {
        width: min(720px, 92%);
        display: flex;
        flex-direction: column;
        gap: 40px;
      }
      section.hero {
        background: #ffffff;
        border-radius: 24px;
        padding: 48px;
        border: 1px solid rgba(15, 23, 42, 0.08);
        box-shadow: 0 30px 60px rgba(79, 70, 229, 0.18);
      }
      .hero__badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        border-radius: 999px;
        background: rgba(79, 70, 229, 0.1);
        color: #4338ca;
        font-weight: 600;
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .hero h1 {
        margin: 24px 0 16px;
        font-size: clamp(32px, 5vw, 44px);
        line-height: 1.15;
      }
      .hero p {
        margin: 0 0 32px;
        font-size: 18px;
        color: #334155;
        line-height: 1.5;
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
        padding: 12px 24px;
        font-weight: 600;
        font-size: 15px;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .hero .actions button.primary {
        background: #4338ca;
        color: #ffffff;
        box-shadow: 0 16px 30px rgba(67, 56, 202, 0.35);
      }
      .hero .actions button.secondary {
        background: #ffffff;
        color: #4338ca;
        border: 1px solid rgba(67, 56, 202, 0.2);
      }
      .hero .actions button:hover {
        transform: translateY(-1px);
        box-shadow: 0 18px 34px rgba(67, 56, 202, 0.4);
      }
      section.features {
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }
      .feature {
        background: rgba(255, 255, 255, 0.9);
        border-radius: 20px;
        padding: 24px;
        border: 1px solid rgba(148, 163, 184, 0.35);
        box-shadow: 0 20px 40px rgba(148, 163, 184, 0.2);
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
        background: rgba(67, 56, 202, 0.12);
        color: #4338ca;
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
        padding: 36px 40px;
        border-radius: 24px;
        display: grid;
        gap: 16px;
        align-content: start;
      }
      section.cta p {
        margin: 0;
        color: rgba(241, 245, 249, 0.85);
        line-height: 1.6;
      }
      .cta__button {
        justify-self: start;
        padding: 12px 24px;
        border-radius: 999px;
        border: none;
        background: #38bdf8;
        color: #0f172a;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 18px 32px rgba(56, 189, 248, 0.35);
      }
      footer {
        text-align: center;
        color: rgba(15, 23, 42, 0.6);
        font-size: 14px;
      }
      @media (max-width: 640px) {
        section.hero {
          padding: 32px 28px;
        }
        section.cta {
          padding: 28px;
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
    <div className="min-h-screen bg-gradient-to-b from-[#4338CA] via-[#3730A3] to-[#111827] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-14 px-6 py-16 lg:gap-20 lg:py-24">
        <header className="space-y-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white/80">
            LiveMesh Builder
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            Start instantly
          </span>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Describe what you need and watch the page take shape.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80 md:text-xl">
            The LiveMesh builder launches right away so you can experiment, generate layouts, and polish copy without leaving the
            screen.
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
          <Card className="order-1 flex-1 rounded-[32px] border-white/10 bg-white/10 backdrop-blur lg:order-1">
            <CardHeader className="space-y-4 text-left">
              <CardTitle className="text-2xl font-semibold">Build your page right here</CardTitle>
              <p className="text-sm text-white/70">
                Tweak the prompt, preview layout changes, and copy production-ready HTML without switching tabs.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-[24px] border border-white/10 bg-white text-left text-slate-900 shadow-[0_40px_80px_rgba(15,23,42,0.35)]">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3 text-xs font-medium text-slate-500">
                  <span className="uppercase tracking-wide">Live builder</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-600">
                    Ready to edit
                  </span>
                </div>
                <div className="grid gap-5 px-6 py-6 lg:grid-cols-2">
                  <div className="space-y-3">
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Prompt</label>
                    <Textarea
                      value={prompt}
                      onChange={(event) => setPrompt(event.target.value)}
                      placeholder="Describe the website you imagine..."
                      className="min-h-[140px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 shadow-inner focus-visible:ring-0"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={handleGenerate}
                        className="flex-1 rounded-xl bg-slate-900 py-2 text-sm text-white hover:bg-slate-800"
                      >
                        Generate &amp; Preview
                      </Button>
                      <Button
                        variant="secondary"
                        className="flex-1 rounded-xl border border-slate-200 bg-white py-2 text-sm text-slate-900 hover:bg-slate-100"
                        onClick={handleRefine}
                      >
                        Refine copy
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Live preview</label>
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2 text-[11px] text-slate-500">
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-400" />
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-300" />
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        <span className="ml-auto font-medium text-slate-600">LiveMesh Preview</span>
                      </div>
                      <div className="bg-white p-4">
                        <iframe
                          ref={frameRef}
                          title="Generated design preview"
                          className="h-[22rem] w-full rounded-xl border border-slate-200 bg-white shadow-[inset_0_0_0_1px_rgba(148,163,184,0.35)] lg:h-[26rem]"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
