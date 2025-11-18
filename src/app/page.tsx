import Image from "next/image";

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

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
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
  );
}
