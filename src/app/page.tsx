"use client";

import { useAuthStore } from "@/stores/auth-store";
import LandingPage from "@/components/landing/LandingPage";
import TimerPage from "@/components/timer/TimerPage";

export default function Home() {
  const { user, initialized, loading } = useAuthStore();

  // 初期化中はローディング表示
  if (!initialized || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
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
