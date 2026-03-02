"use client";

import HamburgerMenu from "./HamburgerMenu";

interface AppLayoutProps {
  children: React.ReactNode;
  /** ホーム画面のように全画面を使うページではtrueにする */
  fullBleed?: boolean;
}

export default function AppLayout({ children, fullBleed }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <HamburgerMenu />
      <main className={fullBleed ? "min-h-screen" : "min-h-screen pt-14"}>
        {children}
      </main>
    </div>
  );
}
