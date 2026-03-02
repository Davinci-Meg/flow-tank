"use client";

import { useEffect, useRef } from "react";
import { useTimerStore } from "@/stores/timer-store";
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
  } = useTimerStore();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
        {/* ラベル入力 */}
        <LabelInput
          value={label}
          onChange={setLabel}
          disabled={status !== "idle"}
        />

        {/* 水槽 */}
        <WaterTank progress={progress} status={status} />

        {/* タイマー表示 */}
        <TimerDisplay
          timeRemaining={timeRemaining}
          currentSession={currentSession}
          totalSessions={totalSessions}
          status={status}
        />

        {/* 操作ボタン */}
        <TimerControls
          status={status}
          onStart={start}
          onPause={pause}
          onResume={resume}
          onReset={reset}
          onSkip={skip}
        />

      </div>
    </AppLayout>
  );
}
