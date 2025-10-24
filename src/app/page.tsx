"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Terminal,
  Cloud,
  Link as LinkIcon,
  Rocket,
  Server,
  Github,
  ShieldCheck,
  Eye,
  Images,
  Sparkles,
} from "lucide-react";

function OptionRow({
  icon,
  title,
  desc,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="p-4 border rounded-2xl bg-white mt-2"
    >
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-xl bg-gray-100 grid place-items-center">{icon}</div>
        <div className="font-medium text-sm">{title}</div>
      </div>
      <p className="text-xs text-gray-500 mt-1">{desc}</p>
      <div className="mt-3 space-y-2">{children}</div>
    </motion.div>
  );
}

export default function LiveMesh() {
  const screenshotTiles = [
    {
      label: "Hero concept",
      path: "/screenshots/landing.svg",
      description: "Top of funnel hero with CTA layout",
    },
    {
      label: "Dashboard",
      path: "/screenshots/dashboard.svg",
      description: "Analytics + collaboration overview",
    },
    {
      label: "Mobile",
      path: "/screenshots/mobile.svg",
      description: "Responsive mobile-ready handoff",
    },
  ];

  const integrationLogos = [
    { name: "GitHub", path: "/logos/github.svg" },
    { name: "OpenAI Codex", path: "/logos/openai-codex.svg" },
    { name: "Slack", path: "/logos/slack.svg" },
    { name: "Linear", path: "/logos/linear.svg" },
  ];

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 p-6 md:p-10">
      <header className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-black text-white grid place-items-center text-sm font-bold">LM</div>
          <div>
            <h1 className="text-xl font-semibold leading-tight">LiveMesh</h1>
            <p className="text-xs text-gray-500 -mt-0.5">Type → See → Ship</p>
          </div>
        </div>
        <Badge variant="secondary" className="rounded-xl">
          alpha
        </Badge>
      </header>

      <main className="max-w-6xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Chat-first composer */}
        <section className="space-y-4">
          <Card className="rounded-2xl border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Terminal className="h-4 w-4" /> Describe what you want
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="e.g. A minimal landing page for a baby-care subscription, modern sans-serif, hero + features + pricing. Use Next.js + Tailwind." />
              <div className="flex items-center gap-2 mt-2">
                <Button className="rounded-2xl">Generate</Button>
                <Button variant="secondary" className="rounded-2xl">
                  Refine
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Eye className="h-4 w-4" /> Instant mock preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full bg-gray-50 border rounded-xl grid place-items-center">
                <div className="text-center">
                  <div className="text-xs text-gray-400">(mock preview)</div>
                  <div className="font-medium mt-1">Your site appears here as you type</div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="secondary" className="rounded-2xl">
                  <Cloud className="h-4 w-4 mr-1" /> Open live preview
                </Button>
                <Button className="rounded-2xl">
                  <Rocket className="h-4 w-4 mr-1" /> Ship
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                No setup needed to try. You can deploy to a temporary *.livemesh.setaei.com subdomain.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Images className="h-4 w-4" /> Screenshots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500 mb-3">
                Capture key states as you iterate. Drag in mockups or auto-generate previews to share progress with your team.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Hero concept", "Dashboard", "Mobile"].map((label) => (
                  <div
                    key={label}
                    className="aspect-video w-full rounded-xl border border-dashed border-gray-300 bg-gray-50 p-3 flex flex-col justify-between"
                  >
                    <div className="text-[10px] uppercase tracking-wide text-gray-400">{label}</div>
                    <div className="text-xs text-gray-500 text-right">+ Add screenshot</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RIGHT: Minimal options, collapsed by default */}
        <section className="space-y-4">
          <Card className="rounded-2xl border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Options (advanced)</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="host">
                  <AccordionTrigger className="text-sm">Hosting</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-2">
                      <OptionRow
                        icon={<Cloud className="h-4 w-4" />}
                        title="Use LiveMesh hosting"
                        desc="Fast preview & staging on *.livemesh.setaei.com with auto SSL"
                      >
                        <Button variant="secondary" className="rounded-2xl">
                          Enable
                        </Button>
                      </OptionRow>
                      <OptionRow
                        icon={<Server className="h-4 w-4" />}
                        title="Connect your server"
                        desc="SSH to your VPS for production deploys"
                      >
                        <Input placeholder="ssh user@host" />
                        <Button className="rounded-2xl mt-2">Test connection</Button>
                      </OptionRow>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="domain">
                  <AccordionTrigger className="text-sm">Domain &amp; SSL</AccordionTrigger>
                  <AccordionContent>
                    <OptionRow
                      icon={<Globe className="h-4 w-4" />}
                      title="Custom domain"
                      desc="Point A/AAAA/CNAME to your target"
                    >
                      <Input placeholder="www.yourdomain.com" />
                      <Button variant="secondary" className="rounded-2xl mt-2">
                        DNS guide
                      </Button>
                    </OptionRow>
                    <div className="flex items-center gap-2 mt-3">
                      <Button className="rounded-2xl">
                        <ShieldCheck className="h-4 w-4 mr-1" /> Issue SSL
                      </Button>
                      <Button variant="secondary" className="rounded-2xl">
                        <LinkIcon className="h-4 w-4 mr-1" /> Copy URL
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="source">
                  <AccordionTrigger className="text-sm">Source control</AccordionTrigger>
                  <AccordionContent>
                    <OptionRow
                      icon={<Github className="h-4 w-4" />}
                      title="Connect GitHub"
                      desc="Sync changes, auto-deploy on push"
                    >
                      <Input placeholder="owner/repo or URL" />
                      <Button className="rounded-2xl mt-2">Connect</Button>
                    </OptionRow>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Integrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500 mb-3">
                LiveMesh connects to the tools you already rely on. Link AI builders, repos, and collaboration hubs in seconds.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-xl bg-black text-white">GitHub</Badge>
                <Badge variant="secondary" className="rounded-xl">
                  OpenAI Codex
                </Badge>
                <Badge variant="secondary" className="rounded-xl">
                  Slack
                </Badge>
                <Badge variant="secondary" className="rounded-xl">
                  Linear
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-8 text-xs text-gray-500">
        <p>Focus: chat-first → immediate preview → optional connections. Minimal decisions, minimal friction.</p>
        <p className="mt-1">© Copyright Setaei. All rights reserved.</p>
      </footer>
    </div>
  );
}
