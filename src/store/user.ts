// import type { Token } from '@/types/user';
// user.ts
import type { AuthData } from '@/types/user-auth';
import { create } from 'zustand';

interface AuthStore {
  authData: AuthData | null;
  addAuthData: (authData: AuthData) => void;
}

export const socioStore = create<AuthStore>((set) => ({
  authData: null,
  addAuthData: (authData) => set({ authData }),
}));
