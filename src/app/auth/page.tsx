"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { useTranslation } from "@/i18n";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    loading,
    error,
    clearError,
    user,
  } = useAuthStore();
  const router = useRouter();
  const t = useTranslation();

  // ログイン済みならホームへ
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;
    if (mode === "login") {
      success = await signInWithEmail(email, password);
    } else {
      success = await signUpWithEmail(email, password);
    }
    if (success) {
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-heading text-center mb-6">
          Flow Tank
        </h1>

        {/* エラー表示 */}
        {error && (
          <div
            className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 cursor-pointer"
            onClick={clearError}
          >
            {error}
          </div>
        )}

        {/* タブ切替 */}
        <div className="flex mb-6 rounded-lg bg-off-white p-1">
          <button
            onClick={() => { setMode("login"); clearError(); }}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              mode === "login"
                ? "bg-muted-blue text-white"
                : "text-warm-gray hover:text-heading"
            }`}
          >
            {t.auth.loginTab}
          </button>
          <button
            onClick={() => { setMode("signup"); clearError(); }}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              mode === "signup"
                ? "bg-muted-blue text-white"
                : "text-warm-gray hover:text-heading"
            }`}
          >
            {t.auth.signupTab}
          </button>
        </div>

        {/* メール/パスワードフォーム */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t.auth.emailLabel}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
          />
          <Input
            label={t.auth.passwordLabel}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.auth.passwordPlaceholder}
            required
            minLength={6}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t.common.loading : mode === "login" ? t.auth.loginButton : t.auth.signupButton}
          </Button>
        </form>

        {/* OAuth */}
        <div className="mt-6 space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-beige" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-surface px-2 text-warm-gray">{t.common.or}</span>
            </div>
          </div>
          <Button variant="secondary" className="w-full" onClick={signInWithGoogle} disabled={loading}>
            {t.auth.googleLogin}
          </Button>
        </div>
      </Card>
    </div>
  );
}
