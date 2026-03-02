"use client";

import StatsCharts from "@/components/stats/StatsCharts";
import AppLayout from "@/components/layout/AppLayout";
import AuthGuard from "@/components/auth/AuthGuard";

export default function StatsPage() {
  return (
    <AuthGuard>
    <AppLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-heading mb-6">統計</h1>
        <StatsCharts />
      </div>
    </AppLayout>
    </AuthGuard>
  );
}
