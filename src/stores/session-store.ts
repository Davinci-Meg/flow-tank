import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { ja } from "date-fns/locale";
import type { Session } from "@/types/database";

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

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      sessions: [],

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
    }),
    {
      name: "flow-tank-sessions",
    }
  )
);
