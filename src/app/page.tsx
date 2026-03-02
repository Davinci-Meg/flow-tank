"use client";

import { useAuthStore } from "@/stores/auth-store";
import LandingPage from "@/components/landing/LandingPage";
import TimerPage from "@/components/timer/TimerPage";

export default function Home() {
  const { user, initialized } = useAuthStore();

  // 認証初期化前 → LPを即表示（スピナーで待たせない）
  // 初期化後にuserが確定したら、ログイン済みならタイマーに切り替わる
  if (!initialized || !user) {
    return <LandingPage />;
  }

  return <TimerPage />;
}
