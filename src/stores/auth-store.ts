import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase";

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
}

interface AuthActions {
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  user: null,
  loading: true,
  initialized: false,

  signInWithEmail: async (email: string, password: string) => {
    const supabase = getSupabase();
    if (!supabase) { set({ loading: false }); return; }
    try {
      set({ loading: true });
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) console.error("サインインエラー:", error.message);
    } catch (err) {
      console.error("サインインエラー:", err);
    } finally {
      set({ loading: false });
    }
  },

  signUpWithEmail: async (email: string, password: string) => {
    const supabase = getSupabase();
    if (!supabase) { set({ loading: false }); return; }
    try {
      set({ loading: true });
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) console.error("サインアップエラー:", error.message);
    } catch (err) {
      console.error("サインアップエラー:", err);
    } finally {
      set({ loading: false });
    }
  },

  signInWithGoogle: async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/` },
      });
      if (error) console.error("Google認証エラー:", error.message);
    } catch (err) {
      console.error("Google認証エラー:", err);
    }
  },

  signInWithGithub: async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo: `${window.location.origin}/` },
      });
      if (error) console.error("GitHub認証エラー:", error.message);
    } catch (err) {
      console.error("GitHub認証エラー:", err);
    }
  },

  signOut: async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    try {
      const { error } = await supabase.auth.signOut();
      if (error) console.error("サインアウトエラー:", error.message);
    } catch (err) {
      console.error("サインアウトエラー:", err);
    }
  },

  initialize: () => {
    if (get().initialized) return;
    set({ initialized: true });

    const supabase = getSupabase();
    if (!supabase) {
      set({ loading: false });
      return;
    }

    try {
      supabase.auth.getSession().then(({ data: { session } }) => {
        set({ user: session?.user ?? null, loading: false });
      });

      supabase.auth.onAuthStateChange((_event, session) => {
        set({ user: session?.user ?? null, loading: false });
      });
    } catch (err) {
      console.error("認証初期化エラー:", err);
      set({ loading: false });
    }
  },
}));
