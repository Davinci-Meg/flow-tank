"use client";

import { useEffect, useRef } from "react";
import { useTimerStore } from "@/stores/timer-store";
import { useSessionStore } from "@/stores/session-store";
import { useAuthStore } from "@/stores/auth-store";
import AppLayout from "@/components/layout/AppLayout";
import WaterTankBackground from "@/components/timer/WaterTankBackground";
import TimerDisplay from "@/components/timer/TimerDisplay";
import TimerControls from "@/components/timer/TimerControls";
import LabelInput from "@/components/timer/LabelInput";

export default function TimerPage() {
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

  const user = useAuthStore((s) => s.user);
  const addSession = useSessionStore((s) => s.addSession);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // セッション完了時の記録を接続
  useEffect(() => {
    setOnSessionComplete((sessionLabel, durationMinutes, startedAt) => {
      addSession({
        user_id: user?.uid ?? "local",
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
    <AppLayout fullBleed>
      {/* 画面全体の水槽背景 */}
      <WaterTankBackground progress={progress} status={status} />

      {/* タイマーUI（水槽の上に浮かぶフロストガラスカード） */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-8">
        <div className="flex flex-col items-center gap-8 rounded-2xl bg-white/60 backdrop-blur-md px-8 py-10 shadow-lg max-w-sm w-full">
          <LabelInput
            value={label}
            onChange={setLabel}
            disabled={status !== "idle"}
          />

          <TimerDisplay
            timeRemaining={timeRemaining}
            currentSession={currentSession}
            totalSessions={totalSessions}
            status={status}
          />

          <TimerControls
            status={status}
            label={label}
            onStart={start}
            onPause={pause}
            onResume={resume}
            onReset={reset}
            onSkip={skip}
          />
        </div>
      </div>
    </AppLayout>
  );
}
