"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import {
  Timer,
  Droplets,
  BarChart3,
  CheckSquare,
  Globe,
  Eye,
  Coffee,
  ChevronDown,
} from "lucide-react";
import { useTranslation } from "@/i18n";
import WaterTankBackground from "@/components/timer/WaterTankBackground";

/** スクロールで要素が可視になったら true を返すフック */
function useInView(threshold = 0.15): [RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

export default function LandingPage() {
  const t = useTranslation();
  const [conceptRef, conceptVisible] = useInView();
  const [featuresRef, featuresVisible] = useInView();
  const [ctaRef, ctaVisible] = useInView();

  return (
    <div className="min-h-screen bg-off-white text-dark-text">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <WaterTankBackground progress={0.35} status="running" />

        <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center lp-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-deep-navy leading-tight tracking-tight">
            {t.common.appName}
          </h1>
          <p className="text-lg sm:text-xl text-deep-navy/80 font-medium max-w-md leading-relaxed">
            {t.landing.heroTagline}
          </p>
          <p className="text-base text-warm-gray max-w-lg leading-relaxed">
            {t.landing.heroDescription}
          </p>
          <Link
            href="/auth"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-deep-navy px-8 py-3.5 text-white font-semibold text-base shadow-lg cursor-pointer transition-all duration-200 hover:bg-deep-navy/90 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-navy active:scale-[0.98]"
          >
            {t.landing.ctaStart}
          </Link>
        </div>

        {/* スクロール誘導 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 lp-fade-in lp-delay-1000">
          <ChevronDown className="w-6 h-6 text-deep-navy/40 animate-bounce" />
        </div>
      </section>

      {/* Hero以降は水の上にスタック（WaterTankBackgroundがfixed z-0のため） */}
      <div className="relative z-10">

      {/* ── Concept (3ステップ) ── */}
      <section
        ref={conceptRef as RefObject<HTMLElement>}
        className="py-24 px-6 bg-white"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className={`text-2xl sm:text-3xl font-bold text-center text-deep-navy mb-16 transition-all duration-500 ${
              conceptVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {t.landing.conceptTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Timer, title: t.landing.conceptStep1Title, desc: t.landing.conceptStep1Desc, num: "1" },
              { icon: Droplets, title: t.landing.conceptStep2Title, desc: t.landing.conceptStep2Desc, num: "2" },
              { icon: BarChart3, title: t.landing.conceptStep3Title, desc: t.landing.conceptStep3Desc, num: "3" },
            ].map((step, i) => (
              <div
                key={step.num}
                className={`flex flex-col items-center text-center gap-4 transition-all duration-500 ${
                  conceptVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  transitionDelay: conceptVisible ? `${(i + 1) * 150}ms` : "0ms",
                }}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-muted-blue/15">
                  <step.icon className="w-7 h-7 text-muted-blue" strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-muted-blue bg-muted-blue/10 rounded-full w-6 h-6 flex items-center justify-center">
                    {step.num}
                  </span>
                  <h3 className="text-lg font-bold text-deep-navy">{step.title}</h3>
                </div>
                <p className="text-base text-warm-gray leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features (2x2グリッド) ── */}
      <section
        ref={featuresRef as RefObject<HTMLElement>}
        className="py-24 px-6 bg-off-white"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className={`text-2xl sm:text-3xl font-bold text-center text-deep-navy mb-16 transition-all duration-500 ${
              featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {t.landing.featuresTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Eye, title: t.landing.feature1Title, desc: t.landing.feature1Desc },
              { icon: BarChart3, title: t.landing.feature2Title, desc: t.landing.feature2Desc },
              { icon: CheckSquare, title: t.landing.feature3Title, desc: t.landing.feature3Desc },
              { icon: Globe, title: t.landing.feature4Title, desc: t.landing.feature4Desc },
            ].map((feat, i) => (
              <div
                key={feat.title}
                className={`rounded-2xl bg-white p-6 shadow-sm border border-beige/60 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                  featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  transitionDelay: featuresVisible ? `${(i + 1) * 100}ms` : "0ms",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted-blue/15">
                    <feat.icon className="w-5 h-5 text-muted-blue" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-deep-navy">{feat.title}</h3>
                </div>
                <p className="text-base text-warm-gray leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA (下部) ── */}
      <section
        ref={ctaRef as RefObject<HTMLElement>}
        className="py-24 px-6 bg-white"
      >
        <div
          className={`flex flex-col items-center gap-6 text-center transition-all duration-600 ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Droplets className="w-10 h-10 text-muted-blue" strokeWidth={1.5} />
          <h2 className="text-2xl sm:text-3xl font-bold text-deep-navy">
            {t.landing.ctaBottom}
          </h2>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 rounded-full bg-deep-navy px-8 py-3.5 text-white font-semibold text-base shadow-lg cursor-pointer transition-all duration-200 hover:bg-deep-navy/90 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-navy active:scale-[0.98]"
          >
            {t.landing.ctaStart}
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 bg-off-white border-t border-beige">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-warm-gray">
          <span>{t.landing.footerCopy}</span>
          <a
            href="https://buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 cursor-pointer transition-colors duration-200 hover:text-deep-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-navy"
          >
            <Coffee className="w-4 h-4" strokeWidth={1.5} />
            {t.common.buyMeCoffee}
          </a>
        </div>
      </footer>

      </div>{/* /relative z-10 */}
    </div>
  );
}
