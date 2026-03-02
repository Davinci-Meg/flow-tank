"use client";

import { useState, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  getDay,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isToday,
} from "date-fns";
import { ja } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Droplets } from "lucide-react";
import { useSessionStore } from "@/stores/session-store";
import Modal from "@/components/ui/Modal";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export default function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { sessions, getSessionsByDate } = useSessionStore();

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { locale: ja });
    const calEnd = endOfWeek(monthEnd, { locale: ja });
    return eachDayOfInterval({ start: calStart, end: calEnd });
  }, [currentMonth]);

  // 月内の最大セッション数（opacity計算用）
  const maxSessions = useMemo(() => {
    let max = 1;
    calendarDays.forEach((day) => {
      const dateStr = format(day, "yyyy-MM-dd");
      const count = sessions.filter(
        (s) => format(new Date(s.started_at), "yyyy-MM-dd") === dateStr
      ).length;
      if (count > max) max = count;
    });
    return max;
  }, [calendarDays, sessions]);

  const selectedSessions = selectedDate
    ? getSessionsByDate(selectedDate)
    : [];

  return (
    <div className="space-y-4">
      {/* ヘッダー: 月名 + ナビ */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
          className="p-2 rounded-lg hover:bg-surface transition-colors text-warm-gray"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-heading">
          {format(currentMonth, "yyyy年M月", { locale: ja })}
        </h2>
        <button
          onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
          className="p-2 rounded-lg hover:bg-surface transition-colors text-warm-gray"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-medium text-warm-gray py-2"
          >
            {d}
          </div>
        ))}
      </div>

      {/* 日付グリッド */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const daySessions = sessions.filter(
            (s) => format(new Date(s.started_at), "yyyy-MM-dd") === dateStr
          );
          const totalMinutes = daySessions.reduce(
            (sum, s) => sum + s.duration_minutes,
            0
          );
          const inMonth = isSameMonth(day, currentMonth);
          const today = isToday(day);
          const sessionOpacity =
            daySessions.length > 0
              ? 0.2 + (daySessions.length / maxSessions) * 0.8
              : 0;

          return (
            <button
              key={dateStr}
              onClick={() => setSelectedDate(dateStr)}
              className={`relative flex flex-col items-center gap-0.5 p-2 rounded-lg min-h-[64px] transition-colors ${
                inMonth
                  ? "hover:bg-surface"
                  : "opacity-40"
              } ${
                today
                  ? "ring-2 ring-muted-blue ring-inset"
                  : ""
              } ${
                selectedDate === dateStr
                  ? "bg-surface"
                  : ""
              }`}
            >
              <span
                className={`text-sm ${
                  inMonth ? "text-dark-text" : "text-warm-gray"
                } ${today ? "font-bold text-muted-blue" : ""}`}
              >
                {format(day, "d")}
              </span>

              {daySessions.length > 0 && (
                <>
                  <Droplets
                    size={14}
                    className="text-muted-blue"
                    style={{ opacity: sessionOpacity }}
                  />
                  <span className="text-[10px] text-warm-gray">
                    {totalMinutes}分
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* セッション詳細モーダル */}
      <Modal
        isOpen={selectedDate !== null}
        onClose={() => setSelectedDate(null)}
        title={selectedDate ? format(new Date(selectedDate), "M月d日のセッション", { locale: ja }) : ""}
      >
        {selectedSessions.length === 0 ? (
          <p className="text-warm-gray text-sm py-4 text-center">
            この日のセッションはありません。
          </p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {selectedSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between bg-surface rounded-lg px-3 py-2"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-dark-text">
                    {session.label || "未分類"}
                  </span>
                  <span className="text-xs text-warm-gray">
                    {format(new Date(session.started_at), "HH:mm")}
                  </span>
                </div>
                <span className="text-sm font-medium text-muted-blue">
                  {session.duration_minutes}分
                </span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
