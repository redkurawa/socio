import type { Bookmark } from '@/types/bookmark';
import { create } from 'zustand';

interface BookmarkStore {
  bookmarks: Bookmark[] | null;
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: number) => void;
  clearBookmarks: () => void;
}

export const bookmarkStore = create<BookmarkStore>((set) => ({
  bookmarks: null,

  addBookmark: (bookmark) =>
    set((state) => ({
      bookmarks: state.bookmarks ? [...state.bookmarks, bookmark] : [bookmark],
    })),

  removeBookmark: (id) =>
    set((state) => ({
      bookmarks: state.bookmarks?.filter((b) => b.id !== id) || null,
    })),

  clearBookmarks: () => set({ bookmarks: null }),
}));
