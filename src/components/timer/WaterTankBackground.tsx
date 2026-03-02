"use client";

import { type TimerStatus } from "@/stores/timer-store";

interface WaterTankBackgroundProps {
  progress: number;
  status: TimerStatus;
}

const BUBBLES = [
  { left: "15%", size: 8, delay: "0s", duration: "2.5s" },
  { left: "28%", size: 6, delay: "0.8s", duration: "2s" },
  { left: "42%", size: 10, delay: "0.3s", duration: "3s" },
  { left: "58%", size: 7, delay: "1.2s", duration: "2.2s" },
  { left: "72%", size: 9, delay: "0.6s", duration: "2.8s" },
  { left: "85%", size: 6, delay: "1.5s", duration: "2.4s" },
];

export default function WaterTankBackground({ progress, status }: WaterTankBackgroundProps) {
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const heightPercent = clampedProgress * 100;
  const isAnimating = status === "running" || status === "break" || status === "longBreak";

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {clampedProgress > 0 && (
        <div
          className="absolute bottom-0 left-0 right-0 transition-[height] duration-1000 ease-in-out"
          style={{ height: `${heightPercent}%` }}
        >
          {/* 波の表面: 2倍幅のSVGをスクロールさせて波を表現 */}
          {isAnimating && (
            <div className="absolute -top-[20px] left-0 w-[200%] h-[24px] animate-wave-scroll">
              <svg
                className="w-full h-full"
                viewBox="0 0 2880 24"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,12 C120,4 240,20 360,12 C480,4 600,20 720,12 C840,4 960,20 1080,12 C1200,4 1320,20 1440,12 C1560,4 1680,20 1800,12 C1920,4 2040,20 2160,12 C2280,4 2400,20 2520,12 C2640,4 2760,20 2880,12 L2880,24 L0,24 Z"
                  fill="#7AACBF"
                />
                <path
                  d="M0,16 C120,10 240,22 360,16 C480,10 600,22 720,16 C840,10 960,22 1080,16 C1200,10 1320,22 1440,16 C1560,10 1680,22 1800,16 C1920,10 2040,22 2160,16 C2280,10 2400,22 2520,16 C2640,10 2760,22 2880,16 L2880,24 L0,24 Z"
                  fill="#5A8FA3"
                  opacity="0.5"
                />
              </svg>
            </div>
          )}

          {/* 水本体 */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#5A8FA3] to-[#7AACBF]" />

          {/* 満水時の泡 */}
          {clampedProgress >= 1 && (
            <>
              {BUBBLES.map((b, i) => (
                <div
                  key={i}
                  className="absolute bottom-0 rounded-full bg-white/30 animate-bubble"
                  style={{
                    left: b.left,
                    width: b.size,
                    height: b.size,
                    animationDelay: b.delay,
                    animationDuration: b.duration,
                  }}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
