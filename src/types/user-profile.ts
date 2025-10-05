export interface Token {
  token: string;
}

export interface Profile {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  bio: string | null;
  avatarUrl: string | null | undefined;
  createdAt: string; // ISO date string
}

export interface Stats {
  posts: number;
  followers: number;
  following: number;
  likes: number;
}

export interface SocalityData {
  profile: Profile;
  stats: Stats;
}

export interface SocalityResponse {
  success: boolean;
  message: string;
  data: SocalityData;
}
