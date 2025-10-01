export interface ApiResponse {
  success: boolean;
  message: string;
  data: FeedData;
}

export interface FeedData {
  items: FeedItem[];
  pagination: Pagination;
}

export interface FeedItem {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt: string; // ISO date string
  author: Author;
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
}

export interface Author {
  id: number;
  username: string;
  name: string;
  avatarUrl: string | null;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
