"use client";

import CalendarView from "@/components/calendar/CalendarView";
import AppLayout from "@/components/layout/AppLayout";

export default function CalendarPage() {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-heading mb-6">カレンダー</h1>
        <CalendarView />
      </div>
    </AppLayout>
  );
}
