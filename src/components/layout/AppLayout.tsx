"use client";

import Sidebar from "./Sidebar";
import BottomTabs from "./BottomTabs";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 p-6 pb-20 md:pb-6 overflow-auto">
        {children}
      </main>
      <BottomTabs />
    </div>
  );
}
