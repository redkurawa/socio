// untuk /api/users/{username}

interface UserCounts {
  post: number;
  followers: number;
  following: number;
  likes: number;
}

// Interface utama untuk objek User
export interface userProfile {
  id: number;
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  email: string;
  phone: string;
  counts: UserCounts; // Menggunakan interface yang sudah kita definisikan
  isFollowing: boolean;
  isMe: boolean;
}
