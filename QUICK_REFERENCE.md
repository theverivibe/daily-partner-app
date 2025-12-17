# Daily Partner App - Quick Reference

## 🚀 Quick Commands

```bash
# Start development server
npm start

# Clear cache and restart
npm start -- --clear

# Type check
npx tsc --noEmit

# Install new dependency
npm install <package-name>
```

## 📱 Testing on Device

### Android (Expo Go)
1. Open Expo Go app
2. Tap "Scan QR code"
3. Scan from terminal

### iOS (Expo Go)
1. Open Camera app
2. Point at QR code
3. Tap notification

## 🎯 Key Files

| File | Purpose |
|------|---------|
| `App.tsx` | Entry point |
| `src/navigation/AppNavigator.tsx` | Navigation setup |
| `src/screens/HomeScreen.tsx` | Dashboard |
| `src/screens/FinanceScreen.tsx` | Finance management |
| `src/screens/ActivityScreen.tsx` | Activity logging |
| `src/screens/TodoScreen.tsx` | Todo list |
| `src/types/index.ts` | TypeScript types |
| `src/utils/storage.ts` | Storage utilities |

## 🎨 Design Tokens

### Colors
```typescript
PRIMARY = '#6200EE'    // Purple
SUCCESS = '#4CAF50'    // Green
ERROR = '#F44336'      // Red
WARNING = '#FF9800'    // Orange
INFO = '#2196F3'       // Blue
BACKGROUND = '#F5F7FA' // Light gray
SURFACE = '#FFFFFF'    // White
```

### Spacing
```typescript
xs: 4, sm: 8, md: 10, base: 15, lg: 20, xl: 30, xxl: 40
```

### Border Radius
```typescript
Small: 10, Medium: 15, Large: 20, XLarge: 25, Circle: 30
```

## 🔧 Common Tasks

### Add a new screen
1. Create `src/screens/NewScreen.tsx`
2. Add to `src/types/index.ts` (if using typed navigation)
3. Add route in `src/navigation/AppNavigator.tsx`

### Add a new data type
1. Define interface in `src/types/index.ts`
2. Add storage functions in `src/utils/storage.ts`
3. Use in screen component

### Modify colors/styling
1. Update StyleSheet in respective screen file
2. Keep consistent with design system

## 📦 Dependencies

### Core
- `expo` - Expo SDK
- `react` - React library
- `react-native` - React Native

### Navigation
- `@react-navigation/native` - Navigation core
- `@react-navigation/bottom-tabs` - Tab navigation
- `react-native-screens` - Native screens
- `react-native-safe-area-context` - Safe area

### UI & Storage
- `@expo/vector-icons` - Icons
- `@react-native-async-storage/async-storage` - Storage
- `expo-status-bar` - Status bar

### Dev
- `typescript` - Type checking
- `@types/react` - React types

## 🐛 Common Issues

### Issue: Metro bundler error
**Solution**: `npm start -- --clear`

### Issue: TypeScript errors
**Solution**: `npx tsc --noEmit` to see all errors

### Issue: AsyncStorage not working
**Solution**: Check if package is properly installed

### Issue: Navigation not working
**Solution**: Ensure NavigationContainer wraps all navigators

### Issue: Icons not showing
**Solution**: Check icon name at https://icons.expo.fyi/

## 📝 Code Snippets

### Load data on screen focus
```typescript
useFocusEffect(
  useCallback(() => {
    loadData();
  }, [])
);
```

### Save data to storage
```typescript
const handleSave = async () => {
  const updated = [...items, newItem];
  await saveItems(updated);
  setItems(updated);
};
```

### Delete with confirmation
```typescript
Alert.alert('Title', 'Message', [
  { text: 'Cancel', style: 'cancel' },
  { text: 'Delete', style: 'destructive', onPress: handleDelete }
]);
```

### Format currency
```typescript
`Rp ${amount.toLocaleString('id-ID')}`
```

### Format date
```typescript
new Date(dateString).toLocaleDateString('id-ID', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
```

## 🎓 Learning Resources

- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## 📞 Support

- Issues: [GitHub Issues](https://github.com/theverivibe/daily-partner-app/issues)
- Expo Help: [Expo Forums](https://forums.expo.dev/)
- React Native: [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)

## 🎉 Pro Tips

1. **Use TypeScript**: Catch errors before runtime
2. **Test on Real Device**: Expo Go provides real device testing
3. **Keep Components Small**: Easier to maintain and test
4. **Use Consistent Naming**: Follow existing patterns
5. **Comment Complex Logic**: Help future developers (including yourself!)
6. **Check Console**: Use `console.log()` for debugging
7. **Hot Reload**: Save files to see changes instantly
8. **Read Error Messages**: They usually tell you what's wrong

---

**Happy Coding! 🚀**
