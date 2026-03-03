"use client";

import { useAuthStore } from "@/stores/auth-store";
import LandingPage from "@/components/landing/LandingPage";
import TimerPage from "@/components/timer/TimerPage";

export default function Home() {
  const { user, initialized, loading } = useAuthStore();

  // Firebase認証状態の確定を待つ（LPフラッシュ防止）
  if (!initialized || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-off-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted-blue border-t-transparent" />
      </div>
    );
  }

  // 未ログイン → LP、ログイン済み → タイマー
  if (!user) {
    return <LandingPage />;
  }

  return <TimerPage />;
}
