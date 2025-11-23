"use client";

import Image from "next/image";
import { useState } from "react";

const slides = [
  "/screenshots/landing.svg",
  "/screenshots/dashboard.svg",
  "/screenshots/mobile.svg",
  "/screenshots/landing.svg",
  "/screenshots/dashboard.svg",
  "/screenshots/mobile.svg",
  "/screenshots/landing.svg",
  "/screenshots/dashboard.svg",
  "/screenshots/mobile.svg",
  "/screenshots/landing.svg",
];

const navLinks = [
  { href: "#behandlinger", label: "Behandlinger" },
  { href: "#fordeler", label: "Hvorfor SOMI" },
  { href: "#about", label: "Om klinikken" },
  { href: "#team", label: "Team" },
  { href: "#faq", label: "Spørsmål & svar" },
  { href: "#contact", label: "Bestill time", isCta: true },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 text-slate-900 shadow-[0_8px_30px_rgba(15,23,42,0.05)] backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex flex-col leading-none">
            <span className="font-serif text-lg tracking-[0.18em]">SOMI</span>
            <span className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-600">
              KLINIKK
            </span>
          </a>

          <nav className="flex items-center gap-6" aria-label="Hovedmeny">
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition hover:border-slate-300 hover:shadow-sm md:hidden"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Lukk meny" : "Åpne meny"}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 w-6 rounded-full bg-slate-900 transition ${isMenuOpen ? "translate-y-[6px] rotate-45" : ""}`}
                />
                <span
                  className={`block h-0.5 w-6 rounded-full bg-slate-900 transition ${isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
                />
              </span>
            </button>

            <ul
              className={`absolute left-0 right-0 top-full mx-6 mt-3 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg transition md:static md:mx-0 md:mt-0 md:flex md:flex-row md:items-center md:gap-5 md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
                isMenuOpen ? "flex" : "hidden md:flex"
              }`}
            >
              {navLinks.map((link) => (
                <li key={link.href} className="font-medium">
                  <a
                    href={link.href}
                    className={`${
                      link.isCta
                        ? "rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-[1px] hover:shadow-md"
                        : "block rounded-full px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:py-16">
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-lg">
            <Image
              src="/screenshots/landing.svg"
              alt="Slide 1"
              width={960}
              height={600}
              priority
              className="h-auto w-full"
            />
          </div>

          <ol className="grid gap-6 md:grid-cols-2" aria-label="Slides">
            {slides.map((src, index) => (
              <li
                key={`${src}-${index}`}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  width={640}
                  height={400}
                  className="h-auto w-full"
                />
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
}
