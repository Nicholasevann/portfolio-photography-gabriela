# gabriela.dominiquee — Photography Portfolio

An editorial portfolio and content management system for **Gabriela Dominique** (`gabriela.dominiquee`), showcasing architectural photography, luxury villas, and boutique hospitality spaces.

Built with **Next.js 16**, **React 19**, **TypeScript**, **Once UI**, and **Vercel Blob Storage**.

---

## ✨ Features

### 📸 Architectural Photography Showcase
- **Editorial Project Case Studies**: Detailed visual narratives focusing on spatial geometry, natural illumination, material palettes, and architectural concepts.
- **Adaptive Gallery**: Orientation-aware layout (horizontal / vertical) with category filtering (*Property*, *Architecture*, *Hospitality*, *Atmosphere*, *Details*) and high-resolution lightbox views.
- **Featured Work Grid**: Modern masonry layouts highlighting curated commissions in Bali, Lombok, and beyond.

### 💼 Professional Photographer Profile
- **Comprehensive Experience Timeline**: Detailed timeline of boutique hotel, luxury villa, and hospitality commissions.
- **Structured Disciplines & Direction**: Specializing in spatial geometry, architectural lighting, food & beverage, and color grading.
- **Location & Availability Indicator**: Real-time timezone badge (Bali, WITA) and direct booking/contact links.

### 🛠️ Built-in Admin CMS (`/admin`)
- **Protected Dashboard**: Secure password authentication with session cookies.
- **Project Editor (`/admin/work`)**: Create, edit, reorder, and publish architectural case studies with markdown content support.
- **Gallery Manager (`/admin/gallery`)**: Upload, categorize, and curate photography items with drag-and-drop media support.
- **Profile & About Editor (`/admin/about`)**: Update introduction, work experiences, education, technical skills, and social links.
- **Data Backup & Settings (`/admin/settings`)**: Export and import database backups in JSON format, sync with Vercel Blob, or restore default states.

### ⚡ Performance & SEO
- **Dynamic Open Graph Generation**: Edge-rendered dynamic OG share preview cards via `@vercel/og`.
- **Hybrid Storage Layer**: Zero-setup local filesystem JSON persistence with automatic cloud synchronization via **Vercel Blob**.
- **Smooth Micro-Interactions**: Curated scroll-reveal animations and theme tokens powered by **Once UI**.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Server Actions)
- **Frontend**: [React 19](https://react.dev/), [TypeScript 5.8](https://www.typescriptlang.org/)
- **Design System & UI**: [Once UI](https://once-ui.com/) (`@once-ui-system/core`), Sass / SCSS Modules
- **Storage & Media**: [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) (`@vercel/blob`) with local JSON fallback
- **Content Engine**: `next-mdx-remote`, `gray-matter`
- **Deployment**: [Vercel](https://vercel.com)

---

## 📁 Project Structure

```
├── public/
│   ├── images/              # Static photography assets, covers, avatars
│   └── uploads/             # Local upload directory (development fallback)
├── src/
│   ├── app/
│   │   ├── (main pages)     # Home (/), Work (/work), Gallery (/gallery), About (/about), Blog (/blog)
│   │   ├── admin/           # Admin CMS (Dashboard, Work, Gallery, About, Settings, Login)
│   │   └── api/             # API routes (Admin CRUD, media uploads, auth, OG images, RSS)
│   ├── components/
│   │   ├── about/           # WorkExperienceSection, TableOfContents
│   │   ├── admin/           # Image uploaders, admin navigation, editor components
│   │   ├── common/          # ScrollReveal, UI helper components
│   │   └── gallery/         # Masonry grid, filters, lightbox modal
│   ├── data/
│   │   └── portfolio-data.json # Persistent JSON data store
│   ├── lib/
│   │   ├── data-store.ts    # Hybrid data access layer (Vercel Blob + Local JSON)
│   │   ├── blob-storage.ts  # Media upload and storage management
│   │   └── auth.ts          # Admin session verification
│   ├── resources/
│   │   ├── content.tsx      # Static content definitions and fallback data
│   │   └── once-ui.config.js# Design system theme & style configuration
│   └── types/
│       ├── portfolio.ts     # Data models (Projects, Gallery, Experiences, Skills)
│       └── content.types.ts # Page configuration & Once UI schema types
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.17+` (v20+ recommended)
- **Package Manager**: `npm`, `pnpm`, or `bun`

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/gabriela-dominiquee/portfolio-photography.git
cd portfolio-photography
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Admin Panel Password (default: "password")
ADMIN_PASSWORD=your_secure_admin_password

# Vercel Blob Storage (Optional for production cloud media storage)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_token_here
```

> **Note**: If `BLOB_READ_WRITE_TOKEN` is not provided, the application will seamlessly fall back to local disk storage (`src/data/portfolio-data.json` and `public/uploads/`).

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Content Management

### Admin Panel Access
1. Navigate to `/admin` or `/admin/login`.
2. Enter your `ADMIN_PASSWORD` (set in `.env.local` or defaults to `password`).
3. Manage projects, gallery images, work experience, education, and skills directly from the UI.

### Manual Content Editing
Alternatively, edit static presets in:
- `src/resources/content.tsx` — Static defaults for About, Work, Intro, and Meta information.
- `src/data/portfolio-data.json` — Active structured database containing projects, gallery items, and CV records.

---

## 📦 Build & Deployment

### Production Build
```bash
npm run build
npm run start
```

### Deploying to Vercel
1. Push your repository to GitHub / GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Under **Storage**, create a **Vercel Blob** database and connect it to your project (sets `BLOB_READ_WRITE_TOKEN` automatically).
4. Add the `ADMIN_PASSWORD` environment variable in your Vercel Project Settings.
5. Deploy.

---

## 👤 Author & Credits

**Gabriela Dominique** (`gabriela.dominiquee`)
- **Instagram**: [@gabriela.dominiquee](https://www.instagram.com/gabriela.dominiquee)
- **TikTok**: [@gabriela.dominiquee](https://www.tiktok.com/@gabriela.dominiquee)
- **WhatsApp**: [+62 815-7302-7842](https://wa.me/6281573027842)
- **Role**: Architectural & Hospitality Photographer (Bali, Indonesia)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
