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
  Globe,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useTranslation } from "@/i18n";
import { useLocaleStore } from "@/stores/locale-store";
import type { Locale } from "@/i18n/types";

const navItems = [
  { href: "/", key: "home" as const, icon: Timer },
  { href: "/todos", key: "todos" as const, icon: ListTodo },
  { href: "/calendar", key: "calendar" as const, icon: Calendar },
  { href: "/stats", key: "stats" as const, icon: BarChart3 },
  { href: "/settings", key: "settings" as const, icon: Settings },
  { href: "/mypage", key: "mypage" as const, icon: UserCircle },
];

const LANGUAGES: { code: Locale; label: string }[] = [
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "ko", label: "한국어" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
];

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuthStore();
  const t = useTranslation();
  const { locale, setLocale } = useLocaleStore();

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
        aria-label={t.nav.openMenu}
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
              <h1 className="text-heading font-bold text-lg">{t.common.appName}</h1>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-warm-gray hover:bg-beige transition-colors"
                aria-label={t.nav.closeMenu}
              >
                <X size={20} />
              </button>
            </div>

            {/* ナビゲーション */}
            <nav className="p-3 space-y-1">
              {navItems.map(({ href, key, icon: Icon }) => {
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
                    <span>{t.nav[key]}</span>
                  </Link>
                );
              })}
            </nav>

            {/* 言語セレクター */}
            <div className="px-3 py-2">
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-warm-gray shrink-0" />
                <select
                  value={locale}
                  onChange={(e) => setLocale(e.target.value as Locale)}
                  className="w-full bg-off-white rounded-lg px-3 py-2 text-sm text-dark-text focus:outline-none focus:ring-2 focus:ring-muted-blue"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.label}</option>
                  ))}
                </select>
              </div>
            </div>

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
                <span>{t.common.buyMeCoffee}</span>
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
                    <span>{t.common.logout}</span>
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
