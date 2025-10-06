// import type { Token } from '@/types/user';
// user.ts
import type { AuthData } from '@/types/user-auth';
import { create } from 'zustand';

interface AuthStore {
  authData: AuthData | null;
  addAuthData: (authData: AuthData) => void;
  clearAuthData: () => void; // fungsi baru untuk logout
}

export const authStore = create<AuthStore>((set) => ({
  authData: null,
  addAuthData: (authData) => set({ authData }),
  clearAuthData: () => set({ authData: null }),
}));
