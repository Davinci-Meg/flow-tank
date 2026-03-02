"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithGithub, loading } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      await signInWithEmail(email, password);
    } else {
      await signUpWithEmail(email, password);
    }
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-heading text-center mb-6">
          Flow Tank
        </h1>

        {/* タブ切替 */}
        <div className="flex mb-6 rounded-lg bg-off-white p-1">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              mode === "login"
                ? "bg-muted-blue text-white"
                : "text-warm-gray hover:text-heading"
            }`}
          >
            ログイン
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              mode === "signup"
                ? "bg-muted-blue text-white"
                : "text-warm-gray hover:text-heading"
            }`}
          >
            新規登録
          </button>
        </div>

        {/* メール/パスワードフォーム */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="メールアドレス"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
          />
          <Input
            label="パスワード"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="6文字以上"
            required
            minLength={6}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "処理中..." : mode === "login" ? "ログイン" : "新規登録"}
          </Button>
        </form>

        {/* OAuth */}
        <div className="mt-6 space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-beige" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-surface px-2 text-warm-gray">または</span>
            </div>
          </div>
          <Button variant="secondary" className="w-full" onClick={signInWithGoogle}>
            Googleでログイン
          </Button>
          <Button variant="secondary" className="w-full" onClick={signInWithGithub}>
            GitHubでログイン
          </Button>
        </div>
      </Card>
    </div>
  );
}
