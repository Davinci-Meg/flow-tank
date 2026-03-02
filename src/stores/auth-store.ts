import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

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

  signInWithEmail: async (email, password) => {
    if (!auth) { set({ loading: false }); return; }
    try {
      set({ loading: true });
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("サインインエラー:", err);
    } finally {
      set({ loading: false });
    }
  },

  signUpWithEmail: async (email, password) => {
    if (!auth) { set({ loading: false }); return; }
    try {
      set({ loading: true });
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("サインアップエラー:", err);
    } finally {
      set({ loading: false });
    }
  },

  signInWithGoogle: async () => {
    if (!auth) return;
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      console.error("Google認証エラー:", err);
    }
  },

  signInWithGithub: async () => {
    if (!auth) return;
    try {
      await signInWithPopup(auth, new GithubAuthProvider());
    } catch (err) {
      console.error("GitHub認証エラー:", err);
    }
  },

  signOut: async () => {
    if (!auth) return;
    try {
      await firebaseSignOut(auth);
    } catch (err) {
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
}));
