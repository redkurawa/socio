// PostData.ts
import type { Author, FeedItem } from './feed';

export interface PostData {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt: string; // ISO date string
  author: Author;
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
}

// ApiResponse.ts
// import type { AuthUser } from './user-auth';

export interface ApiResponse {
  success: boolean;
  message: string;
  data: FeedItem;
}
