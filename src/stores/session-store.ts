import { create } from "zustand";
import {
  format,
  subDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { ja } from "date-fns/locale";
import type { Session } from "@/types/database";

const LABELS = ["作業", "勉強", "読書", "運動", "企画", "コーディング", "デザイン"];

function generateDummySessions(): Session[] {
  const sessions: Session[] = [];
  const now = new Date();

  for (let i = 0; i < 30; i++) {
    const date = subDays(now, i);
    // 1日あたり0〜5セッション
    const count = Math.floor(Math.random() * 5) + (i < 7 ? 1 : 0);
    for (let j = 0; j < count; j++) {
      const hour = 8 + Math.floor(Math.random() * 12);
      const startedAt = new Date(date);
      startedAt.setHours(hour, Math.floor(Math.random() * 60), 0, 0);
      const duration = [15, 20, 25, 30, 45][Math.floor(Math.random() * 5)];

      sessions.push({
        id: crypto.randomUUID(),
        user_id: "local",
        label: LABELS[Math.floor(Math.random() * LABELS.length)],
        duration_minutes: duration,
        completed: true,
        started_at: startedAt.toISOString(),
        completed_at: new Date(
          startedAt.getTime() + duration * 60 * 1000
        ).toISOString(),
      });
    }
  }

  return sessions;
}

interface SessionState {
  sessions: Session[];
  addSession: (session: Omit<Session, "id">) => void;
  getSessionsByDate: (date: string) => Session[];
  getWeeklyStats: () => { day: string; minutes: number }[];
  getMonthlyStats: (
    year: number,
    month: number
  ) => { date: string; minutes: number }[];
  getLabelStats: () => { label: string; minutes: number }[];
}

export const useSessionStore = create<SessionState>((set, get) => ({
  sessions: generateDummySessions(),

  addSession: (session) => {
    const newSession: Session = {
      ...session,
      id: crypto.randomUUID(),
    };
    set((state) => ({ sessions: [newSession, ...state.sessions] }));
  },

  getSessionsByDate: (date: string) => {
    const { sessions } = get();
    return sessions.filter(
      (s) => format(new Date(s.started_at), "yyyy-MM-dd") === date
    );
  },

  getWeeklyStats: () => {
    const { sessions } = get();
    const now = new Date();
    const weekStart = startOfWeek(now, { locale: ja });
    const weekEnd = endOfWeek(now, { locale: ja });
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
    const dayLabels = ["日", "月", "火", "水", "木", "金", "土"];

    return days.map((day) => {
      const dateStr = format(day, "yyyy-MM-dd");
      const daySessions = sessions.filter(
        (s) => format(new Date(s.started_at), "yyyy-MM-dd") === dateStr
      );
      const minutes = daySessions.reduce(
        (sum, s) => sum + s.duration_minutes,
        0
      );
      return { day: dayLabels[day.getDay()], minutes };
    });
  },

  getMonthlyStats: (year: number, month: number) => {
    const start = startOfMonth(new Date(year, month - 1));
    const end = endOfMonth(start);
    const days = eachDayOfInterval({ start, end });
    const { sessions } = get();

    return days.map((day) => {
      const dateStr = format(day, "yyyy-MM-dd");
      const daySessions = sessions.filter(
        (s) => format(new Date(s.started_at), "yyyy-MM-dd") === dateStr
      );
      const minutes = daySessions.reduce(
        (sum, s) => sum + s.duration_minutes,
        0
      );
      return { date: format(day, "M/d"), minutes };
    });
  },

  getLabelStats: () => {
    const { sessions } = get();
    const map = new Map<string, number>();
    sessions.forEach((s) => {
      const label = s.label || "未分類";
      map.set(label, (map.get(label) || 0) + s.duration_minutes);
    });
    return Array.from(map.entries())
      .map(([label, minutes]) => ({ label, minutes }))
      .sort((a, b) => b.minutes - a.minutes);
  },
}));
