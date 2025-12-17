# Daily Partner App - Setup Guide

## 🚀 Quick Start Guide

### Prerequisites
1. Install Node.js (v18 or higher)
2. Install Expo Go app on your phone:
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/theverivibe/daily-partner-app.git
cd daily-partner-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open Expo Go on your phone and scan the QR code

## 📱 App Features

### 1. Dashboard (Beranda)
- Menampilkan ringkasan keuangan (saldo, pemasukan, pengeluaran)
- Menampilkan aktivitas hari ini
- Menampilkan ringkasan to-do list (selesai vs belum selesai)

### 2. Keuangan
- **Tambah Pemasukan**: Catat semua sumber pendapatan dengan kategori
- **Tambah Pengeluaran**: Catat semua pengeluaran dengan kategori
- **Filter**: Lihat semua transaksi, hanya pemasukan, atau hanya pengeluaran
- **Kategori Pemasukan**: Gaji, Bonus, Investasi, Hadiah, Lainnya
- **Kategori Pengeluaran**: Makanan, Transport, Tagihan, Belanja, Hiburan, Kesehatan, Lainnya
- **Hapus Transaksi**: Long press pada transaksi untuk menghapus

### 3. Aktivitas
- **Catat Aktivitas**: Tambahkan aktivitas yang telah dilakukan
- **Tandai Selesai**: Tap pada aktivitas untuk menandai selesai/belum selesai
- **Kelompok Tanggal**: Aktivitas dikelompokkan berdasarkan tanggal (Hari Ini, Kemarin, dll)
- **Hapus Aktivitas**: Long press pada aktivitas untuk menghapus

### 4. To-Do List
- **Buat To-Do**: Tambahkan tugas yang perlu dikerjakan
- **Prioritas**: Set prioritas rendah, sedang, atau tinggi
- **Filter**: Lihat semua, belum selesai, atau selesai
- **Tandai Selesai**: Tap pada to-do untuk menandai selesai/belum selesai
- **Hapus To-Do**: Long press pada to-do untuk menghapus

## 🎨 Design System

### Colors
- **Primary**: #6200EE (Purple)
- **Success**: #4CAF50 (Green)
- **Error**: #F44336 (Red)
- **Warning**: #FF9800 (Orange)
- **Info**: #2196F3 (Blue)
- **Background**: #F5F7FA (Light Gray)
- **Surface**: #FFFFFF (White)

### Typography
- **Header**: 28px, Bold
- **Title**: 20px, Bold
- **Body**: 16px, Regular
- **Caption**: 14px, Regular
- **Small**: 12px, Regular

## 💾 Data Storage

Data disimpan menggunakan AsyncStorage dan akan persist di device:
- **Transactions**: `@daily_partner_transactions`
- **Activities**: `@daily_partner_activities`
- **Todos**: `@daily_partner_todos`

## 🔧 Development

### Project Structure
```
src/
├── navigation/
│   └── AppNavigator.tsx      # Tab navigation setup
├── screens/
│   ├── HomeScreen.tsx         # Dashboard with summary
│   ├── FinanceScreen.tsx      # Income/expense management
│   ├── ActivityScreen.tsx     # Activity logging
│   └── TodoScreen.tsx         # Todo list management
├── types/
│   └── index.ts               # TypeScript interfaces
└── utils/
    └── storage.ts             # AsyncStorage utilities
```

### Available Scripts
```bash
npm start          # Start Expo dev server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator (Mac only)
npm run web        # Run on web browser
```

## 📸 Screenshots

Coming soon! Test the app using Expo Go to see the beautiful UI.

## 🐛 Troubleshooting

### App won't load on Expo Go
- Ensure your phone and computer are on the same WiFi network
- Try restarting the Expo dev server (`npm start`)
- Clear Expo Go cache in the app settings

### Data not persisting
- Check if AsyncStorage is properly installed
- Try reinstalling the app through Expo Go

### TypeScript errors
```bash
npx tsc --noEmit
```

## 📝 To-Do for Future Enhancements
- [ ] Add date picker for transactions and activities
- [ ] Add charts for financial visualization
- [ ] Add export data feature
- [ ] Add dark mode support
- [ ] Add reminders for todos
- [ ] Add backup to cloud
- [ ] Add multi-language support
- [ ] Add biometric authentication

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License
