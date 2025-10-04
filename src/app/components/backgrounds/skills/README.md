# SkillsBackground Component

A beautiful animated background component that displays floating skills icons from your skills configuration.

## Features

- **Floating Animation**: Icons gently float around the screen with smooth animations
- **Random Distribution**: Icons are randomly positioned across the entire viewport
- **Rotation Effects**: Each icon rotates at different speeds for dynamic movement
- **Glow Effects**: Icons have subtle glow effects using their brand colors
- **Responsive**: Automatically adapts to different screen sizes
- **Performance Optimized**: Uses CSS transforms and React state for smooth animations

## Usage

```tsx
import SkillsBackground from "./components/backgrounds/skills/SkillsBackground";

function MyPage() {
  return (
    <div className="relative">
      <SkillsBackground />
      {/* Your page content goes here */}
      <div className="relative z-10">
        <h1>Your Content</h1>
      </div>
    </div>
  );
}
```

## Customization

The component automatically reads from your `skills.ts` configuration file and displays:

- All technical skills with their brand colors
- Soft skills with a default gray color
- Random selection of 40 icons floating on screen

## Styling

The component uses:

- `fixed inset-0` positioning to cover the entire viewport
- `pointer-events-none` to allow interaction with content above
- `z-0` to stay in the background
- Black background with subtle gradient overlay

## Animation Details

- **Float Speed**: Random speed between 0.1-0.4 for gentle movement
- **Rotation Speed**: Random rotation speed for each icon
- **Opacity**: Random opacity between 0.2-0.5 for subtle presence
- **Size**: Random size between 20-35px for visual variety
