import type { Pagination } from './pagination';

export type ApiResponse = {
  success: boolean;
  message: string;
  data: {
    posts: Bookmark[];
    pagination: Pagination;
  };
};

export type Bookmark = {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt: string; // ISO date string
};
