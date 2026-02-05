# AsliSini - Digitalisasi UMKM

**AsliSini** adalah platform marketplace lokal yang dirancang khusus untuk memajukan UMKM di tingkat desa. Project ini dikembangkan untuk membantu warga desa mendigitalisasi produk unggulan mereka, mulai dari camilan khas hingga kerajinan tangan.

## 🚀 Fitur Utama

- **Autentikasi Aman**: Menggunakan Next-Auth (Auth.js) dengan proteksi Role-Based Access Control (RBAC).
- **Multi-Vendor System**: Warga bisa mendaftar sebagai penjual (setelah verifikasi admin) dan mengelola toko mereka sendiri.
- **Manajemen Produk**: Upload foto produk langsung ke Cloudinary dengan sistem _Signed Upload_ yang aman.
- **Dashboard Penjual**: Kelola stok, harga, diskon, dan deskripsi produk secara mandiri.
- **User Interface Modern**: Responsif, menggunakan Tailwind CSS, ShadcnUI, dan mendukung Dark Mode.
- **Search Engine**: Pencarian produk cepat menggunakan teknik _Debouncing_ untuk efisiensi server.

## 🔄 Alur Kerja Sistem (Workflow)

1.  **Pengunjung**: Dapat melihat produk dan mencari camilan atau kerajinan.
2.  **Pendaftaran Toko**: User yang ingin berjualan akan diarahkan untuk menghubungi Admin via WhatsApp guna proses verifikasi manual.
3.  **Verifikasi**: Admin mengubah role user menjadi `PENJUAL` di database.
4.  **Kelola Toko**: Penjual dapat mengakses dashboard khusus untuk mengunggah produk mereka.

## 🛠️ Stack Teknologi

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Database**: [PostgreSQL (Neon DB)](https://neon.tech/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Auth.js (Next-Auth)](https://authjs.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **Image Storage**: [Cloudinary](https://cloudinary.com/)
- **Styling**: Tailwind CSS & Lucide React Icons

## 📂 Struktur Folder

```text
├── app/               # Next.js App Router (Halaman & Layout)
├── components/        # Komponen UI (Navbar, Hero, dll)
├── lib/               # Konfigurasi Library (Prisma, Cloudinary, Auth)
├── actions/           # Server Actions untuk Logic Database
├── types/             # Definisi TypeScript Interfaces
├── prisma/            # Skema Database PostgreSQL
└── public/            # Aset Statis (Logo, Gambar)
```

## ⚙️ Instalasi Lokal

1. Clone Repository

   ```Bash

   git clone [https://github.com/ruspianm/aslisini-umkm.git](https://github.com/ruspianm/aslisini-umkm.git)
   cd aslisini-umkm
   ```

2. Install Dependensi

   ```Bash

   npm install
   ```

3. Setting Environment Variables Buat file `.env.local` dan masukkan kredensial berikut:

   ```env
   DATABASE_URL=
   NEXTAUTH_SECRET=

   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
   NEXT_PUBLIC_CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   ```

4. Push Database Schema

   ```Bash

   npx prisma db push
   ```

5. Jalankan Project

   ```Bash

   npm run dev
   ```

## ⚖️ Lisensi

Project ini dilisensikan di bawah **MIT License**. Kamu bebas menggunakan, menyalin, dan memodifikasi project ini untuk keperluan edukasi atau pemberdayaan UMKM lainnya.

---

## ☕ Dukung Project Ini

Jika platform **AsliSini** ini membantu kamu atau kamu ingin mengapresiasi kerja keras saya selama masa KKN ini, kamu bisa traktir saya kopi untuk menemani koding di malam hari:

[![Dukung via Saweria](https://img.shields.io/badge/Saweria-Dukung%20Saya-orange?style=for-the-badge&logo=target)](https://saweria.co/ruspian)

_Dukungan kamu sangat berarti untuk pengembangan fitur-fitur baru di masa depan!_

## 🤝 Kontak & Dukungan

Jika ada kendala dalam penggunaan atau instalasi platform AsliSini, silakan hubungi:

- **Developer:** Ruspian Majid

- **Email:** ruspianntb@gmail.com

- **GitHub:** github.com/ruspian

---

Dibuat dengan 🧡 oleh Ruspian Majid
