"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Timer,
  ListTodo,
  Calendar,
  BarChart3,
  Settings,
  UserCircle,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";

const navItems = [
  { href: "/", label: "ホーム", icon: Timer },
  { href: "/todos", label: "ToDo", icon: ListTodo },
  { href: "/calendar", label: "カレンダー", icon: Calendar },
  { href: "/stats", label: "統計", icon: BarChart3 },
  { href: "/settings", label: "設定", icon: Settings },
  { href: "/mypage", label: "マイページ", icon: UserCircle },
];

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuthStore();

  // ページ遷移時に閉じる
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // メニュー開閉時のスクロール制御
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ハンバーガーボタン */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg bg-white/60 backdrop-blur-sm text-deep-navy shadow-sm transition-colors hover:bg-white/80"
        aria-label="メニューを開く"
      >
        <Menu size={22} />
      </button>

      {/* オーバーレイ + ドロワー */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* 背景オーバーレイ */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px] animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* ドロワー */}
          <aside className="absolute left-0 top-0 h-full w-64 bg-surface/95 backdrop-blur-md shadow-xl animate-slide-in-left">
            {/* ヘッダー */}
            <div className="flex items-center justify-between p-4 border-b border-beige">
              <h1 className="text-heading font-bold text-lg">Flow Tank</h1>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-warm-gray hover:bg-beige transition-colors"
                aria-label="メニューを閉じる"
              >
                <X size={20} />
              </button>
            </div>

            {/* ナビゲーション */}
            <nav className="p-3 space-y-1">
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-muted-blue text-white"
                        : "text-warm-gray hover:bg-beige"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* 下部セクション */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-beige px-3 py-4 space-y-2">
              {/* Buy Me a Coffee */}
              <a
                href="https://buymeacoffee.com/megumu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-dark-text hover:bg-beige transition-colors"
              >
                <span>☕</span>
                <span>Buy me a coffee</span>
              </a>

              {user && (
                <>
                  <p className="px-3 text-xs text-warm-gray truncate">
                    {user.email}
                  </p>
                  <button
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-warm-gray hover:bg-beige transition-colors"
                  >
                    <LogOut size={18} />
                    <span>ログアウト</span>
                  </button>
                </>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
