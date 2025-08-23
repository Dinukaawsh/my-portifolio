# 🚀 Dinuka Wickramarathna - Portfolio Website

A modern, interactive portfolio website built with Next.js 15, featuring stunning 3D animations, smooth transitions, and a dynamic theme system.

## ✨ Features

### 🎨 Interactive Preloader

- Animated typing effect for the developer's name
- Real-time clock display
- Floating particle animations
- 3D text rendering with Three.js
- Animated horse background element

### 🌈 Dynamic Theme System

- **5 Beautiful Themes**: Dark, Light, Water, Sunset, and Forest
- Real-time theme switching
- Smooth color transitions
- Context-based theme management
- Responsive design for all themes

### 🎭 Smooth Animations

- Framer Motion for page transitions
- GSAP for advanced animations
- React Spring for physics-based animations
- Intersection Observer for scroll-triggered effects
- Particle.js for background effects

### 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS 4 for styling
- Adaptive layouts for all screen sizes
- Touch-friendly interactions

### 🎯 Portfolio Sections

- **About**: Personal introduction and background
- **Skills**: Technical skills with interactive displays
- **Projects**: Showcase of development work
- **Education**: Academic background
- **Experience**: Professional work history
- **Certificates**: Professional certifications
- **Achievements**: Notable accomplishments
- **References**: Professional references
- **Blog**: Articles and thoughts
- **Contact**: Contact information and form with interactive comment system

### 💬 Interactive Comment System

- **Real-time Comments**: Live comment updates using Firebase Firestore
- **Community Engagement**: Visitors can leave comments and interact
- **Moderation Ready**: Built-in comment management system
- **Rich Comment Display**: Shows name, timestamp, and message content
- **Form Validation**: Proper input validation and error handling

### 🔔 Discord Integration & Analytics

- **Visit Tracking**: Real-time notifications when someone visits your portfolio
- **Comment Notifications**: Instant Discord alerts for new comments
- **Session Analytics**: Track new vs returning visitors
- **Rich Discord Embeds**: Beautiful notifications with visitor details
- **Performance Monitoring**: Track page visits and user engagement

### 🎨 3D & Visual Effects

- Three.js integration for 3D scenes
- Custom 3D text rendering
- Interactive background elements
- Smooth camera movements
- WebGL-powered graphics

## 🛠️ Technologies Used

### Frontend Framework

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development

### Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Lucide React** - Beautiful icon library
- **React Icons** - Comprehensive icon collection

### Animation Libraries

- **Framer Motion** - Production-ready motion library
- **GSAP** - Professional-grade animations
- **React Spring** - Spring-physics based animations
- **Anime.js** - Lightweight animation library

### 3D Graphics

- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber

### State Management & Utilities

- **React Context API** - Theme and state management
- **React Intersection Observer** - Scroll-based animations
- **Firebase** - Backend services integration (Firestore, Authentication)
- **Discord Webhooks** - Real-time notifications and analytics

### Development Tools

- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Turbopack** - Fast development builds

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env.local file with the following variables:

   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Discord Webhook URL
   NEXT_PUBLIC_DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your_webhook_url
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── backgrounds/     # 3D scenes and animations
│   │   ├── common/          # Reusable components
│   │   ├── content/         # Content components
│   │   ├── icons/           # Custom icons
│   │   ├── layouts/         # Layout components
│   │   └── pages/           # Portfolio section pages
│   ├── contexts/            # React contexts (Theme)
│   ├── hooks/               # Custom React hooks
│   ├── styles/              # Additional styles
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── lib/                     # Utility functions
└── types/                   # TypeScript type definitions
```

## 🎨 Customization

### Adding New Themes

1. Update the `Theme` type in `ThemeContext.tsx`
2. Add theme-specific CSS classes
3. Implement theme switching logic

### Adding New Sections

1. Create a new component in `components/pages/`
2. Add it to the `sections` array in `page.tsx`
3. Update navigation if needed

### Setting Up Firebase & Discord

1. **Firebase Setup**:

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing one
   - Go to Project Settings → General → Your Apps
   - Add a web app and copy the config values
   - Enable Firestore Database in your project

2. **Discord Webhook Setup**:

   - Go to your Discord server
   - Server Settings → Integrations → Webhooks
   - Create a new webhook
   - Copy the webhook URL to your `.env.local` file

3. **Environment Variables**:
   - Copy the example variables above
   - Replace placeholder values with your actual credentials
   - Restart your development server after adding the file

## 🔧 Configuration

### Next.js Configuration

- **Turbopack**: Enabled for faster development builds
- **Image Domains**: Configured for external image sources
- **TypeScript**: Strict mode enabled

### Tailwind CSS

- **Version 4**: Latest features and improvements
- **Custom Colors**: Theme-specific color palettes
- **Responsive Design**: Mobile-first approach

## 📱 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile**: iOS 14+, Android 10+
- **Features**: ES2020, CSS Grid, Flexbox, WebGL

## 🚀 Performance Features

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js built-in optimization
- **Lazy Loading**: Components load on demand
- **Bundle Analysis**: Built-in performance monitoring
- **Real-time Analytics**: Live visitor and engagement tracking
- **Optimized 3D Rendering**: Efficient WebGL performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dinuka Wickramarathna**

- Full Stack Developer
- Passionate about modern web technologies
- Creator of interactive digital experiences

## 🙏 Acknowledgments

- **Three.js Community** for 3D graphics inspiration
- **Framer Motion Team** for amazing animation library
- **Tailwind CSS Team** for the utility-first approach
- **Next.js Team** for the amazing React framework

## 📞 Contact

- **Portfolio**: [Your Portfolio URL]
- **LinkedIn**: [Your LinkedIn]
- **GitHub**: [Your GitHub]
- **Email**: [Your Email]

## 🔧 Advanced Features Setup

### Comment System

The portfolio includes a fully functional comment system where visitors can:

- Leave comments on your contact page
- See real-time updates of all comments
- Engage with your portfolio content

### Discord Notifications

Get instant notifications when:

- Someone visits your portfolio
- New comments are posted
- Track visitor analytics and engagement

### Firebase Integration

- **Firestore Database**: Stores all comments and user data
- **Real-time Updates**: Instant synchronization across devices
- **Scalable Backend**: Handles traffic and data efficiently

---

⭐ **Star this repository if you found it helpful!**
