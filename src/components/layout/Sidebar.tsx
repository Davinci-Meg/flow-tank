"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Timer, ListTodo, Calendar, BarChart3, Settings } from "lucide-react";

const navItems = [
  { href: "/", label: "ホーム", icon: Timer, pro: false },
  { href: "/todos", label: "ToDo", icon: ListTodo, pro: true },
  { href: "/calendar", label: "カレンダー", icon: Calendar, pro: true },
  { href: "/stats", label: "統計", icon: BarChart3, pro: true },
  { href: "/settings", label: "設定", icon: Settings, pro: true },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-60 h-screen bg-surface border-r border-beige shrink-0">
      <div className="p-6">
        <h1 className="text-heading font-bold text-xl">Flow Tank</h1>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ href, label, icon: Icon, pro }) => {
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
              {pro && (
                <span className="ml-auto text-xs bg-muted-blue/20 text-muted-blue rounded px-1">
                  PRO
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
