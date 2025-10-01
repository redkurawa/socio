// Interface untuk objek Pengguna (User) individual
export interface User {
  id: number;
  username: string;
  name: string;
  avatarUrl: string | null; // Bisa berupa string URL atau null
  isFollowedByMe: boolean;
}

// Interface untuk objek Paginasi
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Interface untuk objek Data yang berisi daftar pengguna dan paginasi
export interface Data {
  users: User[];
  pagination: Pagination;
}

// Interface utama untuk respons API secara keseluruhan
export interface ApiResponse {
  success: boolean;
  message: string;
  data: Data;
}

// Contoh penggunaan (opsional):
/*
const response: ApiResponse = {
  "success": true,
  "message": "OK",
  "data": {
    "users": [
      {
        "id": 7,
        "username": "HenryRivardo",
        "name": "Henry",
        "avatarUrl": null,
        "isFollowedByMe": false
      },
      // ... pengguna lain
    ],
    "pagination": {
      "page": 1,
      "limit": 2,
      "total": 18,
      "totalPages": 9
    }
  }
};
*/
