export interface Token {
  token: string;
}

// {
//   "success": true,
//   "message": "OK",
//   "data": {
//     "profile": {
//       "id": 15,
//       "name": "abc",
//       "username": "sirup abc",
//       "email": "abc@abc.com",
//       "phone": "081234567890",
//       "bio": null,
//       "avatarUrl": null,
//       "createdAt": "2025-09-30T04:34:14.476Z"
//     },
//     "stats": {
//       "posts": 0,
//       "followers": 0,
//       "following": 0,
//       "likes": 0
//     }
//   }
// }

export interface Profile {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  bio: string | null;
  avatarUrl: string | null;
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
