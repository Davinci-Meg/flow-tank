"use client";

import Link from "next/link";
import { Timer, Droplets, BarChart3, CheckSquare, Globe, Eye } from "lucide-react";
import { useTranslation } from "@/i18n";
import WaterTankBackground from "@/components/timer/WaterTankBackground";

export default function LandingPage() {
  const t = useTranslation();

  return (
    <div className="min-h-screen bg-off-white text-dark-text">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 装飾背景: 水槽を35%で静止表示 */}
        <WaterTankBackground progress={0.35} status="running" />

        <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-deep-navy leading-tight">
            {t.common.appName}
          </h1>
          <p className="text-lg sm:text-xl text-deep-navy/80 font-medium max-w-md">
            {t.landing.heroTagline}
          </p>
          <p className="text-sm sm:text-base text-warm-gray max-w-lg">
            {t.landing.heroDescription}
          </p>
          <Link
            href="/auth"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-deep-navy px-8 py-3 text-white font-semibold text-base shadow-lg transition hover:bg-deep-navy/90 hover:shadow-xl active:scale-[0.98]"
          >
            {t.landing.ctaStart}
          </Link>
        </div>
      </section>

      {/* ── Concept (3ステップ) ── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-deep-navy mb-14">
            {t.landing.conceptTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Timer, title: t.landing.conceptStep1Title, desc: t.landing.conceptStep1Desc, num: "1" },
              { icon: Droplets, title: t.landing.conceptStep2Title, desc: t.landing.conceptStep2Desc, num: "2" },
              { icon: BarChart3, title: t.landing.conceptStep3Title, desc: t.landing.conceptStep3Desc, num: "3" },
            ].map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center gap-4 animate-fade-in-up">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-muted-blue/15">
                  <step.icon className="w-7 h-7 text-muted-blue" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-muted-blue bg-muted-blue/10 rounded-full w-6 h-6 flex items-center justify-center">
                    {step.num}
                  </span>
                  <h3 className="text-lg font-bold text-deep-navy">{step.title}</h3>
                </div>
                <p className="text-sm text-warm-gray leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features (2x2グリッド) ── */}
      <section className="py-20 px-4 bg-off-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-deep-navy mb-14">
            {t.landing.featuresTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Eye, title: t.landing.feature1Title, desc: t.landing.feature1Desc },
              { icon: BarChart3, title: t.landing.feature2Title, desc: t.landing.feature2Desc },
              { icon: CheckSquare, title: t.landing.feature3Title, desc: t.landing.feature3Desc },
              { icon: Globe, title: t.landing.feature4Title, desc: t.landing.feature4Desc },
            ].map((feat) => (
              <div
                key={feat.title}
                className="rounded-2xl bg-white p-6 shadow-sm border border-beige/60 hover:shadow-md transition animate-fade-in-up"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted-blue/15">
                    <feat.icon className="w-5 h-5 text-muted-blue" />
                  </div>
                  <h3 className="font-bold text-deep-navy">{feat.title}</h3>
                </div>
                <p className="text-sm text-warm-gray leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA (下部) ── */}
      <section className="py-20 px-4 bg-white">
        <div className="flex flex-col items-center gap-6 text-center">
          <Droplets className="w-10 h-10 text-muted-blue" />
          <h2 className="text-2xl sm:text-3xl font-bold text-deep-navy">
            {t.landing.ctaBottom}
          </h2>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 rounded-full bg-deep-navy px-8 py-3 text-white font-semibold text-base shadow-lg transition hover:bg-deep-navy/90 hover:shadow-xl active:scale-[0.98]"
          >
            {t.landing.ctaStart}
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-4 bg-off-white border-t border-beige">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-warm-gray">
          <span>{t.landing.footerCopy}</span>
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-deep-navy transition"
          >
            ☕ {t.common.buyMeCoffee}
          </a>
        </div>
      </footer>
    </div>
  );
}
