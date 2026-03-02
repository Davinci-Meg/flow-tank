import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthState {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;
}

interface AuthActions {
  signInWithEmail: (email: string, password: string) => Promise<boolean>;
  signUpWithEmail: (email: string, password: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  user: null,
  loading: true,
  initialized: false,
  error: null,

  signInWithEmail: async (email, password) => {
    if (!auth) { set({ loading: false, error: "Firebase未設定" }); return false; }
    try {
      set({ loading: true, error: null });
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "サインインに失敗しました";
      set({ error: message });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  signUpWithEmail: async (email, password) => {
    if (!auth) { set({ loading: false, error: "Firebase未設定" }); return false; }
    try {
      set({ loading: true, error: null });
      await createUserWithEmailAndPassword(auth, email, password);
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "サインアップに失敗しました";
      set({ error: message });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  signInWithGoogle: async () => {
    if (!auth) return;
    try {
      set({ error: null });
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Google認証に失敗しました";
      set({ error: message });
    }
  },

  signOut: async () => {
    if (!auth) return;
    try {
      await firebaseSignOut(auth);
    } catch (err: unknown) {
      console.error("サインアウトエラー:", err);
    }
  },

  initialize: () => {
    if (get().initialized) return;
    set({ initialized: true });

    if (!auth) {
      set({ loading: false });
      return;
    }

    onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
  },

  clearError: () => set({ error: null }),
}));
