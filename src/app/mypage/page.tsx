"use client";

import { useRouter } from "next/navigation";
import { LogOut, Mail, Calendar } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import AppLayout from "@/components/layout/AppLayout";
import AuthGuard from "@/components/auth/AuthGuard";
import Button from "@/components/ui/Button";

export default function MyPage() {
  const { user, signOut } = useAuthStore();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const createdAt = user?.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("ja-JP")
    : "-";

  return (
    <AuthGuard>
      <AppLayout>
        <div className="max-w-md mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-heading mb-6">マイページ</h1>

          <div className="bg-surface rounded-xl p-6 space-y-6">
            {/* アバター */}
            <div className="flex flex-col items-center gap-3">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="アバター"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-muted-blue/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-muted-blue">
                    {user?.email?.charAt(0).toUpperCase() ?? "?"}
                  </span>
                </div>
              )}
              {user?.displayName && (
                <p className="text-lg font-medium text-heading">
                  {user.displayName}
                </p>
              )}
            </div>

            {/* ユーザー情報 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-warm-gray shrink-0" />
                <span className="text-dark-text truncate">{user?.email ?? "-"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar size={16} className="text-warm-gray shrink-0" />
                <span className="text-dark-text">登録日: {createdAt}</span>
              </div>
            </div>

            {/* ログアウト */}
            <Button
              variant="secondary"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleSignOut}
            >
              <LogOut size={16} />
              ログアウト
            </Button>
          </div>
        </div>
      </AppLayout>
    </AuthGuard>
  );
}
