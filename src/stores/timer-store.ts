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
}

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

  start: () => {
    const { workDuration } = get();
    set({
      status: "running",
      timeRemaining: workDuration * 60,
      progress: 0,
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
      // 作業セッション完了 → 休憩へ遷移
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
      // 休憩完了 → 次セッションへ
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
    } = get();

    if (status !== "running" && status !== "break" && status !== "longBreak") {
      return;
    }

    const newTimeRemaining = timeRemaining - 1;

    if (newTimeRemaining <= 0) {
      // タイマー完了 → 自動遷移
      if (status === "running") {
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
      } else {
        // 休憩完了 → idle（次セッション待ち）
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
      // idle状態の場合、timeRemainingも更新
      ...(status === "idle" ? { timeRemaining: newWorkDuration * 60 } : {}),
    });
  },
}));
