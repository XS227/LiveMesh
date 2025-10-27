"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const { width } = ctx.measureText(testLine);
    if (width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
};

export default function LiveMesh() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [generatedHtml, setGeneratedHtml] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const outputHtml = useMemo(() => {
    if (!generatedHtml) {
      return `<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8" />\n    <title>LiveMesh Preview</title>\n  </head>\n  <body>\n    <h1>My Website</h1>\n    <p>Welcome to my website. This is a simple landing page created with LiveMesh.</p>\n    <button>Learn More</button>\n  </body>\n</html>`;
    }

    return generatedHtml;
  }, [generatedHtml]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth * dpr;
    const height = canvas.clientHeight * dpr;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    // Draw background
    ctx.fillStyle = "#F8FAFC";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    // Draw header block
    ctx.fillStyle = "#0F172A";
    ctx.font = "700 18px 'Inter', system-ui";
    ctx.fillText("My Website", 24, 48);

    // Draw prompt-based subtitle
    ctx.fillStyle = "#1E293B";
    ctx.font = "400 14px 'Inter', system-ui";
    const wrappedPrompt = wrapText(ctx, prompt, canvas.clientWidth - 48);
    let textY = 78;
    wrappedPrompt.forEach((line) => {
      ctx.fillText(line, 24, textY);
      textY += 20;
    });

    // Draw call-to-action button
    const buttonWidth = 160;
    const buttonHeight = 40;
    const buttonX = 24;
    const buttonY = Math.min(textY + 12, canvas.clientHeight - buttonHeight - 24);
    ctx.fillStyle = "#2563EB";
    ctx.beginPath();
    const radius = 12;
    const r = Math.min(radius, buttonWidth / 2, buttonHeight / 2);
    ctx.moveTo(buttonX + r, buttonY);
    ctx.lineTo(buttonX + buttonWidth - r, buttonY);
    ctx.quadraticCurveTo(buttonX + buttonWidth, buttonY, buttonX + buttonWidth, buttonY + r);
    ctx.lineTo(buttonX + buttonWidth, buttonY + buttonHeight - r);
    ctx.quadraticCurveTo(
      buttonX + buttonWidth,
      buttonY + buttonHeight,
      buttonX + buttonWidth - r,
      buttonY + buttonHeight
    );
    ctx.lineTo(buttonX + r, buttonY + buttonHeight);
    ctx.quadraticCurveTo(buttonX, buttonY + buttonHeight, buttonX, buttonY + buttonHeight - r);
    ctx.lineTo(buttonX, buttonY + r);
    ctx.quadraticCurveTo(buttonX, buttonY, buttonX + r, buttonY);
    ctx.closePath();
    ctx.fill();
    ctx.font = "600 14px 'Inter', system-ui";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Explore", buttonX + 40, buttonY + 24);

    // Draw footer block
    ctx.fillStyle = "#E2E8F0";
    ctx.fillRect(24, canvas.clientHeight - 64, canvas.clientWidth - 48, 2);
    ctx.font = "400 12px 'Inter', system-ui";
    ctx.fillStyle = "#475569";
    ctx.fillText("LiveMesh Canvas Preview", 24, canvas.clientHeight - 36);

    return () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    };
  }, [prompt]);

  const handleGenerate = () => {
    setGeneratedHtml(`<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8" />\n    <title>${escapeHtml(prompt.slice(0, 60))}</title>\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <header>\n      <h1>${escapeHtml(prompt)}</h1>\n      <p>LiveMesh transformed your idea into a responsive landing experience.</p>\n    </header>\n    <main>\n      <section class="hero">\n        <p>${escapeHtml(
          "Describe your value proposition and key call-to-action here."
        )}</p>\n        <button>Get Started</button>\n      </section>\n    </main>\n    <footer>© ${new Date().getFullYear()} LiveMesh Launchpad</footer>\n  </body>\n</html>`);
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
                        onClick={() =>
                          setPrompt((current) =>
                            `${current.trim()} — polished hero, CTA, and testimonials`.trim()
                          )
                        }
                      >
                        Refine copy
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Canvas preview</label>
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2 text-[11px] text-slate-500">
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-400" />
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-300" />
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        <span className="ml-auto font-medium text-slate-600">LiveMesh Canvas</span>
                      </div>
                      <div className="bg-white p-4">
                        <canvas ref={canvasRef} className="h-48 w-full rounded-xl border border-slate-200 bg-slate-100" />
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-900 px-5 py-4 text-[11px] leading-relaxed text-emerald-200 shadow-inner">
                      <pre className="whitespace-pre-wrap font-mono">{outputHtml}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="order-2 space-y-6 text-left text-white/80 lg:order-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <h2 className="text-2xl font-semibold text-white">Launch-ready in minutes</h2>
              <p className="mt-3 text-sm text-white/80">
                Every prompt refresh updates the canvas and HTML preview instantly, so you can iterate before handing the code to
                your team or deploying with LiveMesh hosting.
              </p>
            </div>
            <div className="grid gap-4">
              {[
                {
                  title: "Type your idea",
                  description: "Start with any thought and watch the layout adapt in the canvas.",
                },
                {
                  title: "Generate variations",
                  description: "Use Refine copy to explore new angles without losing your progress.",
                },
                {
                  title: "Ship instantly",
                  description: "Copy the HTML output or push straight to LiveMesh for a hosted version.",
                },
              ].map((step, index) => (
                <Card key={step.title} className="rounded-2xl border-white/10 bg-white/10 backdrop-blur">
                  <CardContent className="space-y-2 px-6 py-6">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white/90">
                      {index + 1}.
                    </span>
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                    <p className="text-sm text-white/75">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
