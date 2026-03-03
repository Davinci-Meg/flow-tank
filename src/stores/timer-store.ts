import { create } from "zustand";

export type TimerStatus = "idle" | "running" | "paused" | "break" | "longBreak";

interface TimerState {
  status: TimerStatus;
  timeRemaining: number;
  currentSession: number;
  totalSessions: number;
  workDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  label: string;
  progress: number;
  sessionStartedAt: string | null;
  // バックグラウンド動作用タイムスタンプ
  _phaseStartedAt: number | null;
  _pausedAt: number | null;
  _totalPausedMs: number;
}

interface TimerActions {
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  skip: () => void;
  tick: () => void;
  setLabel: (label: string) => void;
  setSettings: (settings: {
    workDuration?: number;
    breakDuration?: number;
    longBreakDuration?: number;
    totalSessions?: number;
  }) => void;
  setOnSessionComplete: (cb: (label: string, durationMinutes: number, startedAt: string) => void) => void;
}

// セッション完了コールバック（ストア外に保持）
let onSessionComplete: ((label: string, durationMinutes: number, startedAt: string) => void) | null = null;

function calcProgress(
  status: TimerStatus,
  timeRemaining: number,
  totalTime: number
): number {
  if (status === "idle") return 0;
  if (totalTime <= 0) return 0;
  return (totalTime - timeRemaining) / totalTime;
}

function getTotalTime(
  status: TimerStatus,
  workDuration: number,
  breakDuration: number,
  longBreakDuration: number
): number {
  switch (status) {
    case "running":
    case "paused":
      return workDuration * 60;
    case "break":
      return breakDuration * 60;
    case "longBreak":
      return longBreakDuration * 60;
    default:
      return workDuration * 60;
  }
}

export const useTimerStore = create<TimerState & TimerActions>((set, get) => ({
  status: "idle",
  timeRemaining: 25 * 60,
  currentSession: 1,
  totalSessions: 4,
  workDuration: 25,
  breakDuration: 5,
  longBreakDuration: 15,
  label: "",
  progress: 0,
  sessionStartedAt: null,
  _phaseStartedAt: null,
  _pausedAt: null,
  _totalPausedMs: 0,

  start: () => {
    const { workDuration } = get();
    set({
      status: "running",
      timeRemaining: workDuration * 60,
      progress: 0,
      sessionStartedAt: new Date().toISOString(),
      _phaseStartedAt: Date.now(),
      _pausedAt: null,
      _totalPausedMs: 0,
    });
  },

  pause: () => {
    const { status } = get();
    if (status === "running") {
      set({ status: "paused", _pausedAt: Date.now() });
    }
  },

  resume: () => {
    const { status, _pausedAt, _totalPausedMs } = get();
    if (status === "paused" && _pausedAt !== null) {
      set({
        status: "running",
        _totalPausedMs: _totalPausedMs + (Date.now() - _pausedAt),
        _pausedAt: null,
      });
    }
  },

  reset: () => {
    const { workDuration } = get();
    set({
      status: "idle",
      timeRemaining: workDuration * 60,
      currentSession: 1,
      progress: 0,
      label: "",
      sessionStartedAt: null,
      _phaseStartedAt: null,
      _pausedAt: null,
      _totalPausedMs: 0,
    });
  },

  skip: () => {
    const {
      status,
      currentSession,
      totalSessions,
      workDuration,
      breakDuration,
      longBreakDuration,
    } = get();

    if (status === "running" || status === "paused") {
      const isLastSession = currentSession >= totalSessions;
      if (isLastSession) {
        set({
          status: "longBreak",
          timeRemaining: longBreakDuration * 60,
          progress: 0,
          _phaseStartedAt: Date.now(),
          _pausedAt: null,
          _totalPausedMs: 0,
        });
      } else {
        set({
          status: "break",
          timeRemaining: breakDuration * 60,
          progress: 0,
          _phaseStartedAt: Date.now(),
          _pausedAt: null,
          _totalPausedMs: 0,
        });
      }
    } else if (status === "break" || status === "longBreak") {
      const nextSession =
        status === "longBreak" ? 1 : currentSession + 1;
      set({
        status: "idle",
        timeRemaining: workDuration * 60,
        currentSession: nextSession,
        progress: 0,
        _phaseStartedAt: null,
        _pausedAt: null,
        _totalPausedMs: 0,
      });
    }
  },

  tick: () => {
    const {
      status,
      currentSession,
      totalSessions,
      workDuration,
      breakDuration,
      longBreakDuration,
      label,
      sessionStartedAt,
      _phaseStartedAt,
      _totalPausedMs,
    } = get();

    if (status !== "running" && status !== "break" && status !== "longBreak") {
      return;
    }

    if (_phaseStartedAt === null) return;

    // 現フェーズの総時間(ms)
    const phaseDurationMs = getTotalTime(status, workDuration, breakDuration, longBreakDuration) * 1000;
    const elapsedMs = Date.now() - _phaseStartedAt - _totalPausedMs;
    const newTimeRemaining = Math.max(0, Math.ceil((phaseDurationMs - elapsedMs) / 1000));

    if (newTimeRemaining <= 0) {
      if (status === "running") {
        // 作業セッション完了 → 記録
        if (onSessionComplete && sessionStartedAt) {
          onSessionComplete(label, workDuration, sessionStartedAt);
        }

        const isLastSession = currentSession >= totalSessions;
        if (isLastSession) {
          set({
            status: "longBreak",
            timeRemaining: longBreakDuration * 60,
            progress: 0,
            sessionStartedAt: null,
            _phaseStartedAt: Date.now(),
            _pausedAt: null,
            _totalPausedMs: 0,
          });
        } else {
          set({
            status: "break",
            timeRemaining: breakDuration * 60,
            progress: 0,
            sessionStartedAt: null,
            _phaseStartedAt: Date.now(),
            _pausedAt: null,
            _totalPausedMs: 0,
          });
        }
      } else {
        const nextSession =
          status === "longBreak" ? 1 : currentSession + 1;
        set({
          status: "idle",
          timeRemaining: workDuration * 60,
          currentSession: nextSession,
          progress: 0,
          _phaseStartedAt: null,
          _pausedAt: null,
          _totalPausedMs: 0,
        });
      }
    } else {
      const progress = Math.min(1, elapsedMs / phaseDurationMs);
      set({
        timeRemaining: newTimeRemaining,
        progress,
      });
    }
  },

  setLabel: (label: string) => {
    set({ label });
  },

  setSettings: (settings) => {
    const { status, workDuration } = get();
    const newWorkDuration = settings.workDuration ?? workDuration;

    set({
      workDuration: newWorkDuration,
      breakDuration: settings.breakDuration ?? get().breakDuration,
      longBreakDuration: settings.longBreakDuration ?? get().longBreakDuration,
      totalSessions: settings.totalSessions ?? get().totalSessions,
      ...(status === "idle" ? { timeRemaining: newWorkDuration * 60 } : {}),
    });
  },

  setOnSessionComplete: (cb) => {
    onSessionComplete = cb;
  },
}));
