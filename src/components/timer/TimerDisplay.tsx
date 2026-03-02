"use client";

import { type TimerStatus } from "@/stores/timer-store";

interface TimerDisplayProps {
  timeRemaining: number;
  currentSession: number;
  totalSessions: number;
  status: TimerStatus;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function getStatusLabel(status: TimerStatus): string {
  switch (status) {
    case "running":
      return "作業中";
    case "paused":
      return "一時停止";
    case "break":
      return "休憩中";
    case "longBreak":
      return "長い休憩中";
    case "idle":
    default:
      return "スタート待ち";
  }
}

export default function TimerDisplay({
  timeRemaining,
  currentSession,
  totalSessions,
  status,
}: TimerDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm text-warm-gray">
        {getStatusLabel(status)}
      </p>
      <time className="font-mono text-6xl font-light tracking-wider text-deep-navy tabular-nums">
        {formatTime(timeRemaining)}
      </time>
      <p className="text-sm text-warm-gray">
        セッション {currentSession}/{totalSessions}
      </p>
    </div>
  );
}
