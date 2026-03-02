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

  start: () => {
    const { workDuration } = get();
    set({
      status: "running",
      timeRemaining: workDuration * 60,
      progress: 0,
      sessionStartedAt: new Date().toISOString(),
    });
  },

  pause: () => {
    const { status } = get();
    if (status === "running") {
      set({ status: "paused" });
    }
  },

  resume: () => {
    const { status } = get();
    if (status === "paused") {
      set({ status: "running" });
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
        });
      } else {
        set({
          status: "break",
          timeRemaining: breakDuration * 60,
          progress: 0,
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
      });
    }
  },

  tick: () => {
    const {
      status,
      timeRemaining,
      currentSession,
      totalSessions,
      workDuration,
      breakDuration,
      longBreakDuration,
      label,
      sessionStartedAt,
    } = get();

    if (status !== "running" && status !== "break" && status !== "longBreak") {
      return;
    }

    const newTimeRemaining = timeRemaining - 1;

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
          });
        } else {
          set({
            status: "break",
            timeRemaining: breakDuration * 60,
            progress: 0,
            sessionStartedAt: null,
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
        });
      }
    } else {
      const totalTime = getTotalTime(
        status,
        workDuration,
        breakDuration,
        longBreakDuration
      );
      set({
        timeRemaining: newTimeRemaining,
        progress: calcProgress(status, newTimeRemaining, totalTime),
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
