"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Timer, ListTodo, Calendar, BarChart3, Settings } from "lucide-react";

const tabItems = [
  { href: "/", label: "ホーム", icon: Timer },
  { href: "/todos", label: "ToDo", icon: ListTodo },
  { href: "/calendar", label: "カレンダー", icon: Calendar },
  { href: "/stats", label: "統計", icon: BarChart3 },
  { href: "/settings", label: "設定", icon: Settings },
];

export default function BottomTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex md:hidden fixed bottom-0 left-0 w-full h-16 bg-surface border-t border-beige z-40">
      {tabItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors ${
              isActive ? "text-muted-blue" : "text-warm-gray"
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
