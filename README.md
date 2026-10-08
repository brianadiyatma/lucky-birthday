# Untuk Istriku, Lucky ♡

Kartu ucapan ulang tahun ke-24 untuk **Lucky Dafa Oktaria**, dari suami untuk istri tercinta dan ibu dari anak-anak mereka. Bernuansa dreamy lavender, dibuka dari amplop dan dibaca lembar demi lembar. HTML, CSS, dan JavaScript statis; tidak memerlukan build, framework, atau backend.

## Pratinjau lokal

Buka `index.html` langsung di browser, atau jalankan dari folder proyek:

```sh
python -m http.server 4173
```

Kemudian buka http://localhost:4173.

## Pasang di GitHub Pages

1. Buat repository GitHub, misalnya `lucky-birthday`.
2. Unggah `index.html`, `styles.css`, `app.js`, `.nojekyll`, dan seluruh folder `assets` ke root repository. File `.gitignore` dan README ini boleh disertakan. Folder `pic`, `.tools`, dan `.preview` tidak dibutuhkan untuk website.
3. Di repository, buka **Settings → Pages**.
4. Pada **Build and deployment**, pilih **Deploy from a branch**, kemudian branch **main** dan **/(root)**, lalu **Save**.
5. Setelah deployment selesai, buka alamat yang diberikan GitHub, biasanya `https://USERNAME.github.io/lucky-birthday/`.

Semua aset menggunakan path relatif sehingga bisa berjalan di subfolder GitHub Pages. `.nojekyll` menandai website statis ini agar tidak diproses oleh Jekyll.

Referensi: [Dokumentasi resmi konfigurasi GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Isi dan interaksi

- Amplop interaktif dengan segel hati, animasi lipatan terbuka, dan surat yang terangkat.
- Lima lembar kartu: ucapan, surat dari suami, kenangan, lilin, dan 24 doa.
- Navigasi berikutnya/kembali dan titik halaman, dengan transisi membalik lembar.
- Foto berdua bergaya polaroid serta album 13 foto yang bisa digeser atau diganti melalui tombol panah.
- Foto dapat diperbesar; navigasi tombol, panah keyboard, swipe HP, dan Escape untuk menutup.
- Surat pribadi dalam bahasa Indonesia, berisi kasih sayang, rasa syukur, dan doa untuk istri serta ibu dari anak-anak.
- Ilustrasi kue dengan lilin 24, tombol tiup, konfeti, dan nyalakan ulang.
- 24 doa untuk Lucky dan keluarga yang dapat dibaca bergantian.
- Bintang dan hati melayang, polaroid bergerak lembut, api lilin berkedip, dan konfeti berbentuk hati.
- Musik lembut berupa melodi sintetis orisinal menggunakan Web Audio; mulai setelah klik dan berhenti saat tab disembunyikan.
- Layout responsif, fokus keyboard, label aksesibilitas, dan dukungan pengaturan reduced motion.

## Personalisasi

- Ubah nama, judul, surat, dan teks halaman di `index.html`.
- Ubah daftar foto, keterangan, serta 24 harapan di `app.js`.
- Ubah warna, ukuran, dan layout di `styles.css`.
- Foto hasil konversi berada di `assets/photos/`. Foto HEIC asli di `pic/` tetap utuh.
- Google Fonts digunakan untuk tipografi; font sistem menjadi cadangan jika tidak tersedia. Foto, CSS, JavaScript, dan musik tidak bergantung pada layanan eksternal.

Jika ingin mengonversi ulang foto HEIC:

```sh
python -m pip install --target .tools pillow-heif
python scripts/prepare_photos.py
```

Konversi menghasilkan WebP dengan sisi terpanjang maksimal 1600 px, orientasi yang sudah diperbaiki, dan tanpa metadata foto asli.

Folder ini belum terhubung ke repository GitHub dan website belum dipublikasikan otomatis.
