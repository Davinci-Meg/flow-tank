"use client";

import { useEffect } from "react";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { type TimerStatus } from "@/stores/timer-store";

interface TimerControlsProps {
  status: TimerStatus;
  label: string;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export default function TimerControls({
  status,
  label,
  onStart,
  onPause,
  onResume,
  onReset,
  onSkip,
}: TimerControlsProps) {
  const canStart = label.trim().length > 0;
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code !== "Space") return;
      // テキスト入力中は無視
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      e.preventDefault();
      switch (status) {
        case "idle":
          if (canStart) onStart();
          break;
        case "running":
          onPause();
          break;
        case "paused":
          onResume();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, onStart, onPause, onResume]);

  const isActive = status !== "idle";
  const isRunning = status === "running";

  return (
    <div className="flex items-center gap-4">
      {/* リセット */}
      {isActive && (
        <button
          onClick={onReset}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-beige text-warm-gray transition-colors hover:bg-beige/80"
          aria-label="リセット"
        >
          <RotateCcw size={18} />
        </button>
      )}

      {/* メインボタン: スタート / 一時停止 / 再開 */}
      {status === "idle" ? (
        <button
          onClick={onStart}
          disabled={!canStart}
          className={`flex h-16 w-16 items-center justify-center rounded-full shadow-md transition-all active:scale-95 ${
            canStart
              ? "bg-muted-blue text-white hover:opacity-90 hover:shadow-lg"
              : "bg-beige text-warm-gray cursor-not-allowed opacity-50"
          }`}
          aria-label="スタート"
        >
          <Play size={28} className="ml-1" />
        </button>
      ) : isRunning ? (
        <button
          onClick={onPause}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-muted-blue text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg active:scale-95"
          aria-label="一時停止"
        >
          <Pause size={28} />
        </button>
      ) : status === "paused" ? (
        <button
          onClick={onResume}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-muted-blue text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg active:scale-95"
          aria-label="再開"
        >
          <Play size={28} className="ml-1" />
        </button>
      ) : (
        // break / longBreak: 休憩中は再生ボタンなし、スキップで次へ
        <div className="h-16 w-16" />
      )}

      {/* スキップ */}
      {isActive && (
        <button
          onClick={onSkip}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-beige text-warm-gray transition-colors hover:bg-beige/80"
          aria-label="スキップ"
        >
          <SkipForward size={18} />
        </button>
      )}
    </div>
  );
}
