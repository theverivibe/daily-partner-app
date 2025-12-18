# Daily Partner App 📱

Aplikasi mobile React Native untuk membantu mengatur aktivitas keseharian Anda. Daily Partner adalah aplikasi partner pribadi yang membantu Anda mengelola keuangan, mencatat aktivitas harian, dan mengorganisir to-do list.

## ✨ Fitur

- **Dashboard / Beranda**: Ringkasan cepat dari keuangan, aktivitas hari ini, dan to-do list
- **Manajemen Keuangan**: 
  - Catat pemasukan dan pengeluaran
  - Lihat saldo total secara real-time
  - Kategorisasi transaksi
  - Riwayat transaksi lengkap
- **Log Aktivitas**: 
  - Catat aktivitas yang telah dilakukan
  - Tandai aktivitas sebagai selesai
  - Kelompokkan berdasarkan tanggal
- **To-Do List**: 
  - Buat daftar tugas yang akan dikerjakan
  - Set prioritas (rendah, sedang, tinggi)
  - Filter berdasarkan status
  - Tandai tugas sebagai selesai

## 🚀 Teknologi

- **React Native** - Framework mobile
- **Expo** - Platform untuk development dan deployment
- **TypeScript** - Type safety
- **React Navigation** - Navigasi antar halaman
- **AsyncStorage** - Penyimpanan data lokal
- **Expo Vector Icons** - Icon set

## 📋 Prasyarat

Sebelum memulai, pastikan Anda sudah menginstall:

- [Node.js](https://nodejs.org/) (versi 18 atau lebih baru)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/client) di smartphone Anda (untuk testing)

## 🔧 Instalasi

1. Clone repository ini:
```bash
git clone https://github.com/theverivibe/daily-partner-app.git
cd daily-partner-app
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan aplikasi:
```bash
npm start
```

4. Scan QR code yang muncul dengan:
   - **iOS**: Kamera bawaan iPhone
   - **Android**: Aplikasi Expo Go

## 📱 Cara Testing dengan Expo Go

1. Install aplikasi **Expo Go** di smartphone Anda:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Pastikan smartphone dan komputer terhubung ke jaringan WiFi yang sama

3. Jalankan `npm start` di terminal

4. Scan QR code:
   - **Android**: Buka Expo Go > Tap "Scan QR Code"
   - **iOS**: Buka Camera > Arahkan ke QR code

5. Aplikasi akan diload di smartphone Anda

## 📂 Struktur Project

```
daily-partner-app/
├── src/
│   ├── navigation/          # Konfigurasi navigasi
│   │   └── AppNavigator.tsx
│   ├── screens/             # Halaman aplikasi
│   │   ├── HomeScreen.tsx
│   │   ├── FinanceScreen.tsx
│   │   ├── ActivityScreen.tsx
│   │   └── TodoScreen.tsx
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   └── utils/               # Utility functions
│       └── storage.ts
├── assets/                  # Assets (images, fonts)
├── App.tsx                  # Entry point aplikasi
├── app.json                 # Konfigurasi Expo
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript config
```

## 🎨 Design

Aplikasi ini menggunakan desain modern dengan:
- **Warna utama**: Purple (#6200EE) - Elegant dan profesional
- **UI/UX**: Clean, minimalis, dan mudah digunakan
- **Icons**: Material Community Icons
- **Typography**: System fonts dengan hierarchy yang jelas
- **Cards**: Rounded corners dengan shadow yang subtle

## 💾 Penyimpanan Data

Data disimpan secara lokal di device menggunakan AsyncStorage. Data akan tetap tersimpan meskipun aplikasi ditutup.

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan buat pull request atau buka issue untuk suggestion dan bug reports.

## 📝 Lisensi

MIT License

## 👨‍💻 Author

Created with ❤️ by [theverivibe](https://github.com/theverivibe)

## 📞 Support

Jika Anda menemukan masalah atau memiliki pertanyaan, silakan buka issue di repository ini.

---

**Happy Coding!** 🎉
