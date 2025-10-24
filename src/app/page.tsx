"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function LiveMesh() {
  return (
    <div className="min-h-screen bg-[#f9f7f3] text-[#1f1f1f] px-4 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 lg:flex-row">
        <Card className="flex-1 rounded-[32px] border-black/5 bg-white shadow-[0_15px_60px_rgba(15,23,42,0.05)]">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-lg font-medium tracking-tight text-[#111827]">
              Describe what you want
            </CardTitle>
            <p className="text-sm text-[#6b7280]">
              A minimal landing page for a baby-care subscription, modern sans-serif, hero + features + pricing. Use
              Next.js + Tailwind.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="A minimal landing page for a baby-care subscription, modern sans-serif, hero + features + pricing. Use Next.js + Tailwind."
              className="min-h-[160px] resize-none rounded-[24px] border border-black/10 bg-[#fbfaf7] px-5 py-4 text-base text-[#1f2937] shadow-inner"
            />
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-2xl bg-[#111827] px-6 py-2 text-sm font-medium text-white hover:bg-[#0b1220]">
                Generate
              </Button>
              <Button
                variant="secondary"
                className="rounded-2xl border border-[#d1d5db] bg-white px-6 py-2 text-sm font-medium text-[#111827] shadow-sm hover:bg-[#f9fafb]"
              >
                Refine
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1 rounded-[32px] border-black/5 bg-white shadow-[0_15px_60px_rgba(15,23,42,0.05)]">
          <CardHeader className="pb-6">
            <CardTitle className="text-lg font-medium tracking-tight text-[#111827]">
              Instant mock preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="overflow-hidden rounded-[24px] border border-dashed border-[#d1d5db] bg-[#fbfaf7]">
              <div className="flex items-center gap-1 border-b border-[#e5e7eb] px-4 py-2 text-xs text-[#9ca3af]">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#f87171]" />
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#34d399]" />
                <span className="ml-auto">(mock preview)</span>
              </div>
              <div className="grid place-items-center px-8 py-16 text-center text-sm text-[#6b7280]">
                <div className="max-w-xs space-y-2">
                  <p className="text-lg font-medium text-[#111827]">Your site appears here as you type</p>
                  <p>Instant feedback as you iterate on copy, layout, and content.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                className="rounded-2xl border border-[#d1d5db] bg-white px-6 py-2 text-sm font-medium text-[#111827] shadow-sm hover:bg-[#f9fafb]"
              >
                Open live preview
              </Button>
              <Button className="rounded-2xl bg-[#111827] px-6 py-2 text-sm font-medium text-white hover:bg-[#0b1220]">
                Ship
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
