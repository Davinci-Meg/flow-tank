"use client";

import { useTranslation } from "@/i18n";
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

export default function TimerDisplay({
  timeRemaining,
  currentSession,
  totalSessions,
  status,
}: TimerDisplayProps) {
  const t = useTranslation();

  const statusLabels: Record<TimerStatus, string> = {
    running: t.timer.running,
    paused: t.timer.paused,
    break: t.timer.break,
    longBreak: t.timer.longBreak,
    idle: t.timer.idle,
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm text-warm-gray">
        {statusLabels[status]}
      </p>
      <time className="font-mono text-6xl font-light tracking-wider text-deep-navy tabular-nums">
        {formatTime(timeRemaining)}
      </time>
      <p className="text-sm text-warm-gray">
        {`${t.timer.session} ${currentSession}/${totalSessions}`}
      </p>
    </div>
  );
}
