# Socio - Social Media Web Application

A modern social media web application built with React, TypeScript, and Tailwind CSS. Similar to Twitter/X, Socio allows users to create posts, interact with other users, and share content.

## 🚀 Features

- **Authentication**: User login and registration system
- **Timeline**: Home feed showing posts from followed users
- **Posts**: Create, edit, and delete posts with images support
- **Interactions**: Like, save/bookmark, and share posts
- **Profile**: View and edit user profiles
- **Search**: Search for other users
- **Responsive**: Works on desktop and mobile devices
- **Real-time Updates**: Auto-refresh timeline with React Query

## 🛠️ Tech Stack

- **Build Tool**: Vite
- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Forms**: React Hook Form + Zod
- **UI Components**: Radix UI
- **Icons**: Lucide React

## 📋 Prerequisites

Before running the project, make sure you have:

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

## 🏃‍♂️ Cara Menjalankan

### 1. Clone Repository

```bash
git clone https://github.com/redkurawa/socio.git
cd socio
```

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 3. Konfigurasi Environment Variables

Pastikan file `.env` sudah ada di root directory dengan konfigurasi berikut:

```env
VITE_BASE_API_URL=https://social-media-be-400174736012.asia-southeast2.run.app/api/
```

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser untuk melihat aplikasi.

## 📦 Build untuk Production

### Build Project

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🚀 Deploy

### Deploy ke Vercel (Recommended)

1. Push kode ke GitHub repository
2. Buka [Vercel](https://vercel.com) dan login
3. Klik "Add New Project"
4. Import repository Anda
5. Tambahkan environment variable:
   - `VITE_BASE_API_URL` = `https://social-media-be-400174736012.asia-southeast2.run.app/api/`
6. Klik "Deploy"

### Deploy ke Netlify

1. Push kode ke GitHub repository
2. Buka [Netlify](https://netlify.com) dan login
3. Klik "Add new site" → "Import an existing project"
4. Pilih repository Anda
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Tambahkan environment variable `VITE_BASE_API_URL`
7. Klik "Deploy"

### Deploy ke Render

1. Push kode ke GitHub repository
2. Buka [Render](https://render.com) dan login
3. Klik "New" → "Web Service"
4. Connect repository Anda
5. Configure:
   - Build command: `npm run build`
   - Start command: `npm run preview`
6. Tambahkan environment variable `VITE_BASE_API_URL`
7. Klik "Create Web Service"

## 📝 Struktur Project

```
socio/
├── public/                     # Static assets
│   ├── icons/                  # Icon files
│   └── images/                 # Image files
├── src/
│   ├── assets/                # Asset files (fonts, etc)
│   ├── components/
│   │   ├── layouts/           # Layout components
│   │   │   ├── author-post.tsx
│   │   │   ├── dropdown-user.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── header.tsx
│   │   │   ├── like-dialog.tsx
│   │   │   ├── like-post.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── save-page.tsx
│   │   │   ├── search-users.tsx
│   │   │   └── user-avatar.tsx
│   │   ├── pages/             # Page components
│   │   │   ├── add-post2.tsx
│   │   │   ├── edit-profile.tsx
│   │   │   ├── homepage.tsx
│   │   │   ├── login2.tsx
│   │   │   ├── post-detail.tsx
│   │   │   ├── profile.tsx
│   │   │   ├── register.tsx
│   │   │   ├── timeline3.tsx
│   │   │   └── user-search.tsx
│   │   └── ui/               # UI components (shadcn-like)
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── logo.tsx
│   │       ├── popover.tsx
│   │       ├── sheet.tsx
│   │       ├── sonner.tsx
│   │       ├── tabs.tsx
│   │       └── textarea.tsx
│   ├── lib/                   # Utilities
│   │   └── utils.ts
│   ├── schema/               # Zod validation schemas
│   │   ├── add-post-schema.ts
│   │   ├── edit-profile-schema.ts
│   │   ├── login-schema.ts
│   │   ├── post-schema.ts
│   │   └── register-schema.ts
│   ├── services/             # API services
│   │   ├── api.ts
│   │   └── service.ts
│   ├── store/                # Zustand stores
│   │   ├── bookmark.ts
│   │   └── user.ts
│   ├── types/                # TypeScript types
│   │   ├── bookmark.ts
│   │   ├── comment.ts
│   │   ├── feed.ts
│   │   ├── like.ts
│   │   ├── pagination.ts
│   │   ├── post-detail.ts
│   │   ├── profile.ts
│   │   ├── user-auth.ts
│   │   ├── user-dropdown.ts
│   │   ├── user-like.ts
│   │   ├── user-profile.ts
│   │   └── user-search.ts
│   ├── utils/                # Helper functions
│   │   └── capitalize.ts
│   ├── App.tsx               # Main App component
│   ├── index.css             # Global styles
│   └── main.tsx              # Entry point
├── .env                      # Environment variables
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── index.html
```

## 🎨 Kustomisasi

### Mengubah API URL

Edit file `.env`:

```env
VITE_BASE_API_URL=https://your-api-url.com/api/
```

### Menambah Halaman Baru

1. Buat komponen di `src/components/pages/`
2. Tambah route di `src/App.tsx`

### Mengubah Styling

- Global styles: `src/index.css`
- Tailwind config: `tailwind.config.ts`

## 🤝 Kontribusi

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add some amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buka Pull Request

## 📄 Lisensi

Distributed under the MIT License.

## 📧 Kontak

Jika ada pertanyaan, silakan hubungi melalui GitHub Issues.

---

Dibuat dengan ❤️ menggunakan React, TypeScript, dan Tailwind CSS
