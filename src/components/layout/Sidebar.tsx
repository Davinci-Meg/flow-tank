"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Timer, ListTodo, Calendar, BarChart3, Settings, UserCircle, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";

const navItems = [
  { href: "/", label: "ホーム", icon: Timer },
  { href: "/todos", label: "ToDo", icon: ListTodo },
  { href: "/calendar", label: "カレンダー", icon: Calendar },
  { href: "/stats", label: "統計", icon: BarChart3 },
  { href: "/settings", label: "設定", icon: Settings },
  { href: "/mypage", label: "マイページ", icon: UserCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuthStore();

  return (
    <aside className="hidden md:flex flex-col w-60 h-screen bg-surface border-r border-beige shrink-0">
      <div className="p-6">
        <h1 className="text-heading font-bold text-xl">Flow Tank</h1>
      </div>

      <nav className="flex-1 px-3 space-y-1">
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

      {/* ユーザーセクション */}
      {user && (
        <div className="border-t border-beige px-3 py-4 space-y-2">
          <p className="px-3 text-xs text-warm-gray truncate">
            {user.email}
          </p>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-warm-gray hover:bg-beige transition-colors"
          >
            <LogOut size={18} />
            <span>ログアウト</span>
          </button>
        </div>
      )}
    </aside>
  );
}
