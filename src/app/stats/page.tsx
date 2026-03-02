"use client";

import StatsCharts from "@/components/stats/StatsCharts";
import { useTranslation } from "@/i18n";
import AppLayout from "@/components/layout/AppLayout";
import AuthGuard from "@/components/auth/AuthGuard";

export default function StatsPage() {
  const t = useTranslation();
  return (
    <AuthGuard>
    <AppLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-heading mb-6">{t.stats.title}</h1>
        <StatsCharts />
      </div>
    </AppLayout>
    </AuthGuard>
  );
}
