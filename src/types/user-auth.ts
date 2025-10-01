// types/auth.ts

export interface AuthUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

export interface AuthData {
  token: string;
  user: AuthUser;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: AuthData;
}
