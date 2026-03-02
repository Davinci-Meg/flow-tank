"use client";

import CalendarView from "@/components/calendar/CalendarView";
import { useTranslation } from "@/i18n";
import AppLayout from "@/components/layout/AppLayout";
import AuthGuard from "@/components/auth/AuthGuard";

export default function CalendarPage() {
  const t = useTranslation();
  return (
    <AuthGuard>
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-heading mb-6">{t.calendar.title}</h1>
        <CalendarView />
      </div>
    </AppLayout>
    </AuthGuard>
  );
}
