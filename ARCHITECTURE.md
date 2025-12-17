# App Architecture & Design Documentation

## 🏗️ Architecture Overview

### Technology Stack
```
┌─────────────────────────────────────┐
│         React Native App            │
├─────────────────────────────────────┤
│  Framework: Expo SDK 54             │
│  Language: TypeScript 5.9           │
│  UI: React Native Components        │
│  Navigation: React Navigation 7     │
│  Storage: AsyncStorage              │
│  Icons: @expo/vector-icons          │
└─────────────────────────────────────┘
```

### App Structure
```
App.tsx (Entry Point)
    │
    └── AppNavigator (Tab Navigation)
            │
            ├── Home Tab
            │   └── HomeScreen.tsx (Dashboard)
            │
            ├── Finance Tab
            │   └── FinanceScreen.tsx (Transactions)
            │
            ├── Activity Tab
            │   └── ActivityScreen.tsx (Activities Log)
            │
            └── Todo Tab
                └── TodoScreen.tsx (Todo List)
```

## 🎨 Design System

### Color Palette

#### Primary Colors
- **Primary Purple**: `#6200EE`
  - Used for: Headers, active tabs, buttons, FAB
  - Represents: Trust, creativity, wisdom

#### Semantic Colors
- **Success Green**: `#4CAF50`
  - Used for: Income, completed items, success states
  
- **Error Red**: `#F44336`
  - Used for: Expenses, negative balance, delete actions
  
- **Warning Orange**: `#FF9800`
  - Used for: Medium priority, warnings
  
- **Info Blue**: `#2196F3`
  - Used for: Information, activity indicators

#### Neutral Colors
- **Background**: `#F5F7FA` (Light gray)
- **Surface**: `#FFFFFF` (White)
- **Text Primary**: `#333333`
- **Text Secondary**: `#666666`
- **Text Disabled**: `#999999`
- **Border**: `#E0E0E0`

### Typography Scale

```
Header Title: 28px, Bold, #FFFFFF
Screen Title: 20px, Bold, #333333
Body Large: 16px, Semi-Bold, #333333
Body Regular: 16px, Regular, #333333
Body Small: 14px, Regular, #666666
Caption: 12px, Regular, #999999
```

### Spacing System

```
xs: 4px
sm: 8px
md: 10px
base: 15px
lg: 20px
xl: 30px
xxl: 40px
```

### Border Radius

```
Small: 10px (inputs, chips)
Medium: 15px (cards, items)
Large: 20px (badges)
XLarge: 25px (modals)
Circle: 30px (FAB, avatar)
```

## 📱 Screen Breakdowns

### 1. Home Screen (Dashboard)
**Purpose**: Overview of all features

**Components**:
- Header with date
- Financial Summary Card
  - Total balance (large number)
  - Income/Expense breakdown
- Today's Activities Card (latest 3)
- Todo Summary Card (stats)

**Data Flow**:
```
LoadTransactions → Calculate Balance
LoadActivities → Filter Today
LoadTodos → Count Pending/Completed
```

### 2. Finance Screen
**Purpose**: Manage income and expenses

**Components**:
- Header with total balance
- Filter buttons (All/Income/Expense)
- Transaction list
- Add income/expense buttons
- Modal for adding transaction

**Features**:
- Add transaction with category
- Filter by type
- Delete on long press
- Real-time balance calculation

**Categories**:
- Income: Gaji, Bonus, Investasi, Hadiah, Lainnya
- Expense: Makanan, Transport, Tagihan, Belanja, Hiburan, Kesehatan, Lainnya

### 3. Activity Screen
**Purpose**: Log daily activities

**Components**:
- Header
- Grouped list by date
- FAB for adding activity
- Modal for adding activity

**Features**:
- Add activity with description
- Group by date (Today, Yesterday, specific dates)
- Toggle completion status
- Delete on long press

**Date Formatting**:
- Today: "Hari Ini"
- Yesterday: "Kemarin"
- Other: "Senin, 17 Desember 2025"

### 4. Todo Screen
**Purpose**: Manage tasks

**Components**:
- Header with stats
- Filter buttons (All/Pending/Completed)
- Todo list with priority badges
- FAB for adding todo
- Modal for adding todo

**Features**:
- Add todo with priority
- Priority levels: Low (Green), Medium (Orange), High (Red)
- Filter by status
- Toggle completion
- Delete on long press

## 💾 Data Models

### Transaction
```typescript
{
  id: string           // Timestamp-based unique ID
  type: 'income' | 'expense'
  amount: number       // In Rupiah
  category: string     // Category name
  description: string  // Optional notes
  date: string        // ISO date format YYYY-MM-DD
}
```

### Activity
```typescript
{
  id: string           // Timestamp-based unique ID
  title: string        // Activity name
  description: string  // Optional details
  date: string        // ISO date format YYYY-MM-DD
  completed: boolean   // Completion status
}
```

### Todo
```typescript
{
  id: string                    // Timestamp-based unique ID
  title: string                 // Task title
  description: string           // Optional details
  completed: boolean            // Completion status
  priority: 'low' | 'medium' | 'high'
  dueDate?: string             // Optional, ISO date format
  createdAt: string            // ISO datetime
}
```

## 🔄 Data Persistence

### AsyncStorage Keys
- `@daily_partner_transactions` - Array of Transaction objects
- `@daily_partner_activities` - Array of Activity objects
- `@daily_partner_todos` - Array of Todo objects

### Storage Pattern
```
Load on Screen Focus → Render → User Action → Update State → Save to Storage
```

### Data Operations
```typescript
// Load
const data = await loadTransactions()

// Save
await saveTransactions(updatedData)

// Always save entire array (no delta updates)
```

## 🎯 User Interactions

### Gestures
- **Tap**: Select, toggle status, navigate
- **Long Press**: Delete item (with confirmation)
- **Scroll**: Navigate through lists
- **Modal Dismiss**: Tap outside or close button

### Feedback
- **Visual**: Color changes, checkmarks, strikethrough
- **Alerts**: Confirmation dialogs for destructive actions
- **Validation**: Empty field alerts

## 🚀 Performance Considerations

### Optimization Techniques
1. **useFocusEffect**: Reload data only when screen is focused
2. **Callback Dependencies**: Minimize re-renders
3. **Filtered Lists**: Client-side filtering for instant results
4. **No Images**: Using vector icons for fast rendering

### Bundle Size
- Minimal dependencies
- No heavy libraries
- Tree-shaking enabled via TypeScript

## 🔮 Future Enhancement Ideas

### Phase 2 Features
- [ ] Date picker for custom dates
- [ ] Search functionality
- [ ] Categories management
- [ ] Monthly reports

### Phase 3 Features
- [ ] Charts and visualizations
- [ ] Export to CSV/PDF
- [ ] Cloud backup
- [ ] Multi-currency support

### Phase 4 Features
- [ ] Recurring transactions
- [ ] Budget planning
- [ ] Notifications/Reminders
- [ ] Dark mode

## 🎨 UI/UX Principles

### Design Philosophy
1. **Simplicity**: Clean interface, no clutter
2. **Clarity**: Clear labels, intuitive icons
3. **Consistency**: Same patterns across screens
4. **Feedback**: Visual confirmation for all actions
5. **Accessibility**: Good contrast, readable fonts

### Indonesian Language
- All UI text in Bahasa Indonesia
- Date formatting: Indonesian locale
- Currency: Rupiah (Rp)

## 📐 Layout Principles

### Header Pattern
```
┌────────────────────────────────┐
│  Title (28px, Bold)            │
│  Subtitle/Date (14px)          │
│  [Optional Stats Card]         │
└────────────────────────────────┘
```

### Card Pattern
```
┌────────────────────────────────┐
│  🎯 Title (Icon + Text)        │
│  ────────────────────────       │
│  Content...                    │
└────────────────────────────────┘
```

### List Item Pattern
```
┌────────────────────────────────┐
│  ✓  Title              Badge   │
│     Description                │
│     Meta info (date, etc)      │
└────────────────────────────────┘
```

This architecture provides a solid foundation for a maintainable, scalable daily partner application!
