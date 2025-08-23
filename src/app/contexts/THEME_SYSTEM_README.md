# Theme System Documentation

## Overview

The portfolio now includes a robust theme system that persists across page navigation and prevents theme overlapping issues. The system supports 5 themes: Dark, Light, Water, Sunset, and Forest.

## Features

- ✅ **Persistent Themes**: Themes are saved to localStorage and persist across page navigation
- ✅ **No Theme Overlapping**: Previous theme classes are completely removed before applying new ones
- ✅ **Global State Management**: Uses React Context for consistent theme state across the app
- ✅ **Automatic Application**: Themes are automatically applied on route changes
- ✅ **No Flash**: Prevents theme flashing on page load with inline script

## Architecture

### 1. ThemeContext (`src/app/contexts/ThemeContext.tsx`)

- Manages global theme state
- Handles theme application logic
- Listens for route changes to reapply themes
- Saves themes to localStorage

### 2. ThemeProvider (`src/app/layout.tsx`)

- Wraps the entire application
- Ensures theme context is available everywhere

### 3. ThemeSwitcher (`src/app/components/common/ThemeSwitcher.tsx`)

- UI component for switching themes
- Uses the theme context for state management

### 4. CSS Variables (`src/app/globals.css`)

- CSS custom properties for each theme
- Theme-specific gradient utilities
- Smooth transitions between themes

## Usage

### Basic Theme Switching

```tsx
import { useTheme } from "../contexts/ThemeContext";

function MyComponent() {
  const { currentTheme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme("light")}>Switch to Light Theme</button>
  );
}
```

### Using Theme-Aware Styles

```tsx
import { useThemeStyles } from "../hooks/useThemeStyles";

function MyCard() {
  const { getCardGradient, getBorderColor } = useThemeStyles();

  return (
    <div
      className={`p-6 rounded-xl border ${getCardGradient()} ${getBorderColor()}`}
    >
      Card Content
    </div>
  );
}
```

### Adding New Themes

1. **Update Theme Type** in `ThemeContext.tsx`:

```tsx
export type Theme =
  | "dark"
  | "light"
  | "water"
  | "sunset"
  | "forest"
  | "new-theme";
```

2. **Add Theme Data** in `ThemeSwitcher.tsx`:

```tsx
const themes = [
  // ... existing themes
  {
    key: "new-theme",
    name: "New Theme",
    icon: "🌟",
    gradient: "from-purple-900 via-pink-600 to-purple-900",
  },
];
```

3. **Add CSS Variables** in `globals.css`:

```css
.theme-new-theme {
  --bg-primary: #581c87;
  --bg-secondary: #be185d;
  --text-primary: #f3e8ff;
  --text-secondary: #fce7f3;
  --accent-primary: #a855f7;
  --accent-secondary: #ec4899;
}
```

4. **Add Navbar Styles** in `globals.css`:

```css
.theme-navbar-new-theme {
  background: linear-gradient(
    to right,
    rgba(88, 28, 135, 0.95),
    rgba(190, 24, 93, 0.95),
    rgba(88, 28, 135, 0.95)
  ) !important;
  border-bottom-color: rgba(168, 85, 247, 0.3) !important;
}
```

5. **Update Theme Logic** in `ThemeContext.tsx`:

```tsx
// In updatePageThemes function
case "new-theme":
  element.classList.add('from-purple-900/80', 'via-pink-600/40', 'to-purple-900/80');
  break;
```

## How It Works

### Theme Application Process

1. **Cleanup**: Remove all existing theme-related classes from the DOM
2. **Body Theme**: Apply the new theme class to the document body
3. **Element Updates**: Find and update specific elements that need gradient backgrounds
4. **Persistence**: Save the theme selection to localStorage

### Route Change Handling

- Uses Next.js `usePathname` hook to detect route changes
- Automatically reapplies the current theme after navigation
- Includes a small delay to ensure DOM is ready

### CSS Class Management

- Uses regex patterns to remove all theme-related classes
- Applies new classes systematically to prevent conflicts
- Maintains smooth transitions between themes

## Troubleshooting

### Theme Not Persisting

- Check if `ThemeProvider` wraps your app in `layout.tsx`
- Verify localStorage is working in your browser
- Check console for any JavaScript errors

### Theme Overlapping

- Ensure the cleanup process is working (check DOM classes)
- Verify that old theme classes are being removed
- Check if multiple theme applications are happening

### Styling Issues

- Verify CSS variables are properly defined
- Check if theme classes are being applied to the body
- Ensure gradient utilities are working correctly

## Performance Considerations

- Theme switching is optimized with minimal DOM queries
- CSS transitions are hardware-accelerated
- Theme context only re-renders when necessary
- localStorage operations are minimal and efficient

## Browser Support

- Modern browsers with CSS custom properties support
- localStorage support required
- CSS Grid and Flexbox for layout
- CSS transitions for smooth animations
