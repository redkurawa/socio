export interface Comment {
  id: number;
  text: string;
  createdAt: string; // ISO date string
  author: Author;
}

import type { Author, Pagination } from './feed';

export interface CommentsResponse {
  success: boolean;
  message: string;
  data: {
    comments: Comment[];
    pagination: Pagination;
  };
}
