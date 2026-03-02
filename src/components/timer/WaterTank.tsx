"use client";

import { useId } from "react";
import { type TimerStatus } from "@/stores/timer-store";

interface WaterTankProps {
  progress: number;
  status: TimerStatus;
}

function getWaveAnimationClass(status: TimerStatus): string {
  switch (status) {
    case "running":
      return "animate-wave";
    case "break":
    case "longBreak":
      return "animate-wave-slow";
    case "paused":
    case "idle":
    default:
      return "";
  }
}

function Bubbles({ progress }: { progress: number }) {
  if (progress < 1) return null;

  // 満水時の泡パーティクル
  const bubbles = [
    { cx: 60, r: 3, delay: "0s", dur: "2s" },
    { cx: 100, r: 2.5, delay: "0.5s", dur: "2.4s" },
    { cx: 140, r: 2, delay: "1s", dur: "1.8s" },
    { cx: 80, r: 3.5, delay: "0.3s", dur: "2.2s" },
    { cx: 120, r: 2, delay: "0.8s", dur: "2.6s" },
  ];

  return (
    <g>
      {bubbles.map((b, i) => (
        <circle
          key={i}
          cx={b.cx}
          cy={240}
          r={b.r}
          fill="white"
          opacity={0}
        >
          <animate
            attributeName="cy"
            from="240"
            to="50"
            dur={b.dur}
            begin={b.delay}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.6;0.6;0"
            keyTimes="0;0.1;0.7;1"
            dur={b.dur}
            begin={b.delay}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </g>
  );
}

export default function WaterTank({ progress, status }: WaterTankProps) {
  const id = useId();
  const gradientId = `waterGradient${id}`;
  const clipId = `tankClip${id}`;
  const clampedProgress = Math.max(0, Math.min(1, progress));
  const waveClass = getWaveAnimationClass(status);

  // 水の高さ計算: コンテナ内部の高さ (約240px) に対する比率
  const containerTop = 20;
  const containerBottom = 260;
  const containerHeight = containerBottom - containerTop;
  const waterHeight = containerHeight * clampedProgress;
  const waterTop = containerBottom - waterHeight;

  return (
    <div className="w-full max-w-[300px] mx-auto">
      <svg
        viewBox="0 0 200 280"
        className="w-full h-auto"
        role="img"
        aria-label={`水槽: ${Math.round(clampedProgress * 100)}% 完了`}
      >
        <defs>
          {/* 水のグラデーション */}
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7AACBF" />
            <stop offset="100%" stopColor="#5A8FA3" />
          </linearGradient>

          {/* コンテナ内部クリップ */}
          <clipPath id={clipId}>
            <rect x="10" y={containerTop} width="180" height={containerHeight} rx="16" />
          </clipPath>
        </defs>

        {/* 水 (クリップで容器内に収める) */}
        {clampedProgress > 0 && (
          <g clipPath={`url(#${clipId})`}>
            {/* 水本体 */}
            <rect
              x="10"
              y={waterTop}
              width="180"
              height={waterHeight}
              fill={`url(#${gradientId})`}
              className="transition-[y,height] duration-1000 ease-in-out"
            />

            {/* 波の表面 */}
            {waveClass && (
              <svg
                x="10"
                y={waterTop - 8}
                width="180"
                height="16"
                viewBox="0 0 180 16"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,8 Q22.5,2 45,8 T90,8 T135,8 T180,8 L180,16 L0,16 Z"
                  fill="#7AACBF"
                  className={waveClass}
                />
                <path
                  d="M0,10 Q22.5,5 45,10 T90,10 T135,10 T180,10 L180,16 L0,16 Z"
                  fill="#5A8FA3"
                  opacity="0.5"
                  className={waveClass}
                  style={{ animationDelay: "-0.5s" }}
                />
              </svg>
            )}

            {/* 満水時の泡 */}
            <Bubbles progress={clampedProgress} />
          </g>
        )}

        {/* 容器の輪郭 */}
        <rect
          x="10"
          y={containerTop}
          width="180"
          height={containerHeight}
          rx="20"
          fill="transparent"
          stroke="#1B3A4B"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
