"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isWithinInterval,
  subDays,
} from "date-fns";
import { useSessionStore } from "@/stores/session-store";
import { useTranslation, interpolate } from "@/i18n";

const DONUT_COLORS = [
  "#7AACBF",
  "#E8A87C",
  "#85B79D",
  "#C38D94",
  "#A8B5C8",
  "#D4A574",
  "#8EC5D6",
];

export default function StatsCharts() {
  const t = useTranslation();
  const { sessions, getWeeklyStats, getMonthlyStats, getLabelStats } =
    useSessionStore();

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const rawWeeklyData = getWeeklyStats();
  const weeklyData = rawWeeklyData.map((d, i) => ({ ...d, day: t.stats.weekdays[i] }));
  const monthlyData = getMonthlyStats(year, month);
  const labelData = getLabelStats();

  const summary = useMemo(() => {
    const weekStart = startOfWeek(now);
    const weekEnd = endOfWeek(now);

    const weekSessions = sessions.filter((s) =>
      isWithinInterval(new Date(s.started_at), {
        start: weekStart,
        end: weekEnd,
      })
    );
    const weekTotal = weekSessions.reduce(
      (sum, s) => sum + s.duration_minutes,
      0
    );

    const monthSessions = sessions.filter((s) => {
      const d = new Date(s.started_at);
      return d.getFullYear() === year && d.getMonth() + 1 === month;
    });
    const monthTotal = monthSessions.reduce(
      (sum, s) => sum + s.duration_minutes,
      0
    );

    // 連続日数の計算
    let streak = 0;
    for (let i = 0; i < 365; i++) {
      const dateStr = format(subDays(now, i), "yyyy-MM-dd");
      const hasSessions = sessions.some(
        (s) => format(new Date(s.started_at), "yyyy-MM-dd") === dateStr
      );
      if (hasSessions) {
        streak++;
      } else {
        break;
      }
    }

    // 平均セッション数/日（直近7日）
    const last7 = eachDayOfInterval({
      start: subDays(now, 6),
      end: now,
    });
    const sessionsPerDay = last7.map((day) => {
      const dateStr = format(day, "yyyy-MM-dd");
      return sessions.filter(
        (s) => format(new Date(s.started_at), "yyyy-MM-dd") === dateStr
      ).length;
    });
    const avgSessions =
      sessionsPerDay.reduce((a, b) => a + b, 0) / sessionsPerDay.length;

    return { weekTotal, monthTotal, streak, avgSessions };
  }, [sessions, now, year, month]);

  const summaryCards = [
    { label: t.stats.weeklyTotal, value: `${summary.weekTotal}${t.common.minutes}` },
    { label: t.stats.monthlyTotal, value: `${summary.monthTotal}${t.common.minutes}` },
    { label: t.stats.streak, value: `${summary.streak}${t.common.days}` },
    { label: t.stats.avgSessions, value: `${summary.avgSessions.toFixed(1)}${t.common.times}` },
  ];

  return (
    <div className="space-y-6">
      {/* サマリーカード */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="bg-surface rounded-xl p-4 text-center"
          >
            <p className="text-xs text-warm-gray mb-1">{card.label}</p>
            <p className="text-xl font-bold text-heading">{card.value}</p>
          </div>
        ))}
      </div>

      {/* 週間棒グラフ */}
      <div className="bg-surface rounded-xl p-6">
        <h3 className="text-sm font-bold text-heading mb-4">{t.stats.weeklyChart}</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0D8CF" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: "#8C8279" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#8C8279" }}
              axisLine={false}
              tickLine={false}
              unit={t.common.minutes}
            />
            <Tooltip
              formatter={(value) => [`${value}${t.common.minutes}`, t.stats.focusTime]}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            />
            <Bar dataKey="minutes" fill="#7AACBF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 月間折れ線グラフ */}
      <div className="bg-surface rounded-xl p-6">
        <h3 className="text-sm font-bold text-heading mb-4">
          {interpolate(t.stats.monthlyChart, { month: String(month) })}
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0D8CF" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#8C8279" }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#8C8279" }}
              axisLine={false}
              tickLine={false}
              unit={t.common.minutes}
            />
            <Tooltip
              formatter={(value) => [`${value}${t.common.minutes}`, t.stats.focusTime]}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            />
            <Line
              type="monotone"
              dataKey="minutes"
              stroke="#7AACBF"
              strokeWidth={2}
              dot={{ fill: "#7AACBF", r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ラベル内訳ドーナツチャート */}
      <div className="bg-surface rounded-xl p-6">
        <h3 className="text-sm font-bold text-heading mb-4">
          {t.stats.labelBreakdown}
        </h3>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={labelData}
                dataKey="minutes"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
              >
                {labelData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={DONUT_COLORS[i % DONUT_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [
                  `${value}${t.common.minutes}`,
                  name,
                ]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center">
            {labelData.map((item, i) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      DONUT_COLORS[i % DONUT_COLORS.length],
                  }}
                />
                <span className="text-xs text-warm-gray">
                  {item.label} ({item.minutes}{t.common.minutes})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
