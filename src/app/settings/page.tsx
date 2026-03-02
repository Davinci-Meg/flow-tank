"use client";

import { useState, useEffect } from "react";
import { useTimerStore } from "@/stores/timer-store";
import Button from "@/components/ui/Button";
import AppLayout from "@/components/layout/AppLayout";

export default function SettingsPage() {
  const {
    workDuration,
    breakDuration,
    longBreakDuration,
    totalSessions,
    setSettings,
  } = useTimerStore();

  const [work, setWork] = useState(workDuration);
  const [shortBreak, setShortBreak] = useState(breakDuration);
  const [longBreak, setLongBreak] = useState(longBreakDuration);
  const [sessionsCount, setSessionsCount] = useState(totalSessions);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setWork(workDuration);
    setShortBreak(breakDuration);
    setLongBreak(longBreakDuration);
    setSessionsCount(totalSessions);
  }, [workDuration, breakDuration, longBreakDuration, totalSessions]);

  const handleSave = () => {
    setSettings({
      workDuration: work,
      breakDuration: shortBreak,
      longBreakDuration: longBreak,
      totalSessions: sessionsCount,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppLayout>
      <div className="max-w-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-heading mb-6">設定</h1>

        <div className="bg-surface rounded-xl p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-heading">
                作業時間
              </label>
              <span className="text-sm font-bold text-muted-blue">
                {work}分
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={60}
              step={5}
              value={work}
              onChange={(e) => setWork(Number(e.target.value))}
              className="w-full accent-muted-blue"
            />
            <div className="flex justify-between text-xs text-warm-gray">
              <span>5分</span>
              <span>60分</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-heading">
                休憩時間
              </label>
              <span className="text-sm font-bold text-muted-blue">
                {shortBreak}分
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={shortBreak}
              onChange={(e) => setShortBreak(Number(e.target.value))}
              className="w-full accent-muted-blue"
            />
            <div className="flex justify-between text-xs text-warm-gray">
              <span>1分</span>
              <span>30分</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-heading">
                長休憩時間
              </label>
              <span className="text-sm font-bold text-muted-blue">
                {longBreak}分
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={60}
              step={5}
              value={longBreak}
              onChange={(e) => setLongBreak(Number(e.target.value))}
              className="w-full accent-muted-blue"
            />
            <div className="flex justify-between text-xs text-warm-gray">
              <span>5分</span>
              <span>60分</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-heading">
                セッション数
              </label>
              <span className="text-sm font-bold text-muted-blue">
                {sessionsCount}回
              </span>
            </div>
            <input
              type="number"
              min={1}
              max={10}
              value={sessionsCount}
              onChange={(e) =>
                setSessionsCount(
                  Math.max(1, Math.min(10, Number(e.target.value)))
                )
              }
              className="w-full bg-off-white rounded-lg px-3 py-2 text-sm text-dark-text focus:outline-none focus:ring-2 focus:ring-muted-blue"
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            {saved ? "保存しました" : "設定を保存"}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
