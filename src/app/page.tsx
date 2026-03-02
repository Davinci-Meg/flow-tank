"use client";

import { useEffect, useRef } from "react";
import { useTimerStore } from "@/stores/timer-store";
import { useSessionStore } from "@/stores/session-store";
import AppLayout from "@/components/layout/AppLayout";
import WaterTank from "@/components/timer/WaterTank";
import TimerDisplay from "@/components/timer/TimerDisplay";
import TimerControls from "@/components/timer/TimerControls";
import LabelInput from "@/components/timer/LabelInput";

export default function Home() {
  const {
    status,
    timeRemaining,
    currentSession,
    totalSessions,
    progress,
    label,
    start,
    pause,
    resume,
    reset,
    skip,
    tick,
    setLabel,
    setOnSessionComplete,
  } = useTimerStore();

  const addSession = useSessionStore((s) => s.addSession);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // セッション完了時の記録を接続
  useEffect(() => {
    setOnSessionComplete((sessionLabel, durationMinutes, startedAt) => {
      addSession({
        user_id: "local",
        label: sessionLabel || null,
        duration_minutes: durationMinutes,
        completed: true,
        started_at: startedAt,
        completed_at: new Date().toISOString(),
      });
    });
  }, [setOnSessionComplete, addSession]);

  useEffect(() => {
    if (status === "running" || status === "break" || status === "longBreak") {
      intervalRef.current = setInterval(tick, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status, tick]);

  return (
    <AppLayout>
      <div className="flex min-h-full flex-col items-center justify-center gap-8 py-8">
        <LabelInput
          value={label}
          onChange={setLabel}
          disabled={status !== "idle"}
        />

        <WaterTank progress={progress} status={status} />

        <TimerDisplay
          timeRemaining={timeRemaining}
          currentSession={currentSession}
          totalSessions={totalSessions}
          status={status}
        />

        <TimerControls
          status={status}
          onStart={start}
          onPause={pause}
          onResume={resume}
          onReset={reset}
          onSkip={skip}
        />

        <p className="mt-4 text-xs text-warm-gray">
          ログインすると記録が保存されます
        </p>
      </div>
    </AppLayout>
  );
}
