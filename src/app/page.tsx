"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function LiveMesh() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4338CA] via-[#3730A3] to-[#111827] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-6 py-16 lg:py-24">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white/80">
              LiveMesh
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              Ship in seconds
            </span>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              From idea to live website – in seconds.
            </h1>
            <p className="text-lg text-white/80 md:text-xl">
              LiveMesh combines AI coding, automated deployment, and expert review to turn your thoughts into ready-to-use web
              experiences.
            </p>
            <div className="flex flex-col items-center gap-4 text-sm text-white/70 lg:flex-row lg:items-center">
              <Button className="h-12 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#22D3EE] px-8 text-base font-semibold text-white shadow-lg shadow-indigo-500/40">
                Try LiveMesh now
              </Button>
              <p>Watch a live deployment in under 30 seconds.</p>
            </div>
          </div>
          <Card className="flex-1 rounded-[32px] border-white/10 bg-white/10 backdrop-blur">
            <CardHeader className="space-y-4 text-left">
              <CardTitle className="text-2xl font-semibold">See your idea come alive instantly</CardTitle>
              <p className="text-sm text-white/70">
                Live preview, auto-hosted builds, and human polish ensure every launch looks and feels professional.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-[24px] border border-white/10 bg-white text-left text-slate-900 shadow-[0_40px_80px_rgba(15,23,42,0.35)]">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3 text-xs font-medium text-slate-500">
                  <span className="uppercase tracking-wide">Deployed live in 23 seconds</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-600">
                    Ready
                  </span>
                </div>
                <div className="grid gap-5 px-6 py-6 lg:grid-cols-2">
                  <div className="space-y-3">
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Prompt</label>
                    <Textarea
                      placeholder="Describe the website you imagine..."
                      className="min-h-[140px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 shadow-inner focus-visible:ring-0"
                    />
                    <div className="flex gap-2">
                      <Button className="flex-1 rounded-xl bg-slate-900 py-2 text-sm text-white hover:bg-slate-800">Generate &amp; Preview</Button>
                      <Button
                        variant="secondary"
                        className="flex-1 rounded-xl border border-slate-200 bg-white py-2 text-sm text-slate-900 hover:bg-slate-100"
                      >
                        Refine copy
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Preview</label>
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2 text-[11px] text-slate-500">
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-400" />
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-300" />
                        <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        <span className="ml-auto font-medium text-slate-600">Simple landing page</span>
                      </div>
                      <div className="space-y-3 px-5 py-5 text-sm text-slate-600">
                        <div className="space-y-2">
                          <p className="text-base font-semibold text-slate-900">My Website</p>
                          <p>Welcome to my website. This is a simple landing page created with LiveMesh.</p>
                        </div>
                        <Button
                          variant="secondary"
                          className="w-full justify-center rounded-lg border border-slate-200 bg-white py-2 text-sm text-slate-900 hover:bg-slate-100"
                        >
                          Learn More
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-slate-900 px-5 py-4 text-[11px] leading-relaxed text-emerald-200 shadow-inner">
                      <pre className="whitespace-pre-wrap font-mono">
{`<html>
  <head>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>My Website</h1>
    <p>Welcome to my website.</p>
  </body>
</html>`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <section className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Type your idea",
              description: "Describe what you imagine and LiveMesh handles the rest.",
            },
            {
              title: "AI builds and deploys",
              description: "Code is generated, pushed, and hosted automatically.",
            },
            {
              title: "Expert review",
              description: "Our human team refines design, speed, and polish.",
            },
          ].map((step, index) => (
            <Card key={step.title} className="rounded-3xl border-white/10 bg-white/10 backdrop-blur">
              <CardContent className="space-y-3 px-8 py-10 text-center lg:text-left">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg font-semibold text-white/90">
                  {index + 1}.
                </span>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-white/75">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </div>
  );
}
