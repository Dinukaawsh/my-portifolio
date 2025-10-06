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

### 💬 Interactive Comment & Feedback System

- **Real-time Comments**: Live comment updates using Firebase Firestore
- **Social Authentication**: Google, GitHub and Linkedin login for feedback submission
- **User Profiles**: Display user profile pictures and names with feedback
- **Role-based Feedback**: Users can specify their role (Developer, Designer, etc.)
- **Custom Role Input**: "Other" option with custom role specification
- **Theme-aware UI**: Dropdown and form colors adapt to selected theme
- **Community Engagement**: Visitors can leave comments and submit feedback
- **Rich Display**: Shows user info, role, rating, timestamp, and provider
- **Form Validation**: Proper input validation and error handling

### 🔔 Discord Integration & Analytics

- **Visit Tracking**: Real-time notifications when someone visits your portfolio
- **User Registration**: Notifications when users sign up via Google/GitHub
- **Feedback Notifications**: Instant Discord alerts for new feedback submissions
- **Comment Notifications**: Instant Discord alerts for new comments
- **Session Analytics**: Track new vs returning visitors
- **Rich Discord Embeds**: Beautiful notifications with visitor details and user profiles
- **Performance Monitoring**: Track page visits and user engagement
- **Provider Tracking**: Know which OAuth provider users used

### 🧭 Hiring Flow

- "Hire Me" CTA with external Google Form
- Configurable via `NEXT_PUBLIC_GOOGLE_FORM_URL`

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
- **NextAuth.js** - Social authentication (Google, GitHub)
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

   # NextAuth.js Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-here

   # Google OAuth
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # GitHub OAuth
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret

   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Discord Webhook URL
   NEXT_PUBLIC_DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your_webhook_url

   # Google Form (Hire Me)
   NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.gle/your_form_id
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

## 🚀 Production Deployment

### Environment Variables for Production

Create `.env.production` or set environment variables in your deployment platform:

```bash
# NextAuth.js Configuration
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-nextauth-secret

# Google OAuth (Production)
GOOGLE_CLIENT_ID=your-production-google-client-id
GOOGLE_CLIENT_SECRET=your-production-google-client-secret

# GitHub OAuth (Production)
GITHUB_ID=your-production-github-client-id
GITHUB_SECRET=your-production-github-client-secret

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Discord Webhook URL
NEXT_PUBLIC_DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your_webhook_url

# Google Form (Hire Me)
NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.gle/your_form_id
```

### OAuth Provider Updates for Production

1. **Google OAuth**:

   - Update redirect URI to: `https://yourdomain.com/api/auth/callback/google`
   - Add JavaScript origin: `https://yourdomain.com`

2. **GitHub OAuth**:

   - Update callback URL to: `https://yourdomain.com/api/auth/callback/github`

### Deployment Platforms

#### Vercel (Recommended)

1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

#### Netlify

1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables

#### Other Platforms

- AWS Amplify
- Railway
- Render
- DigitalOcean App Platform

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/  # NextAuth.js authentication routes
│   │   │       └── route.ts    # OAuth provider configuration
│   │   └── cv-webhook/         # Discord webhook for CV tracking
│   │       └── route.ts
│   ├── components/
│   │   ├── backgrounds/        # 3D scenes and animations
│   │   │   ├── 3d-text/       # 3D text components
│   │   │   ├── balls/         # Particle ball animations
│   │   │   ├── dotted-text/   # Dotted text effects
│   │   │   ├── flower/        # Flower animations
│   │   │   ├── focus text/    # Focus text effects
│   │   │   ├── footer_backgound/ # Footer animations
│   │   │   ├── galaxy/        # Galaxy background
│   │   │   ├── globe/         # Globe animations
│   │   │   ├── horse/         # Horse animations
│   │   │   ├── hyperspeed/    # Hyperspeed effects
│   │   │   ├── letter-glich/  # Glitch text effects
│   │   │   ├── line background/ # Line animations
│   │   │   ├── perloader/     # Preloader animations
│   │   │   ├── Pixel_blast/   # Pixel effects
│   │   │   ├── robot/        # Robot animations
│   │   │   ├── rolling gallery/ # Gallery animations
│   │   │   ├── skills/       # Skills background
│   │   │   └── thunderbolt/  # Thunderbolt effects
│   │   ├── common/            # Reusable components
│   │   │   ├── AuthProvider.tsx    # NextAuth.js session provider
│   │   │   ├── ThemeSwitcher.tsx   # Theme switching component
│   │   │   └── VisitTracker.tsx    # Visit tracking component
│   │   ├── content/           # Content data files
│   │   │   ├── about.ts       # About section content
│   │   │   ├── achievements.ts # Achievements data
│   │   │   ├── blog.ts        # Blog posts data
│   │   │   ├── certificates.ts # Certificates data
│   │   │   ├── contact.ts     # Contact information
│   │   │   ├── education.ts   # Education data
│   │   │   ├── experience.ts  # Experience data
│   │   │   ├── projects.ts    # Projects data
│   │   │   ├── references.ts  # References data
│   │   │   └── skills.ts      # Skills data
│   │   ├── icons/             # Custom icon components
│   │   │   ├── projectsicons.tsx # Project icons
│   │   │   └── skillsicons.tsx   # Skills icons
│   │   ├── layouts/           # Layout components
│   │   │   ├── footer/        # Footer component
│   │   │   │   └── Footer.tsx
│   │   │   └── navbar/        # Navigation component
│   │   │       └── Navbar.tsx
│   │   └── pages/             # Portfolio section pages
│   │       ├── about.tsx      # About page component
│   │       ├── achievements.tsx # Achievements page
│   │       ├── blog.tsx       # Blog page
│   │       ├── certificates.tsx # Certificates page
│   │       ├── contact.tsx    # Contact page with auth & feedback
│   │       ├── education.tsx  # Education page
│   │       ├── experience.tsx # Experience page
│   │       ├── projects.tsx   # Projects page
│   │       ├── references.tsx # References page
│   │       └── skills.tsx     # Skills page
│   ├── contexts/              # React contexts
│   │   ├── ThemeContext.tsx   # Theme management context
│   │   └── THEME_SYSTEM_README.md # Theme system documentation
│   ├── hooks/                 # Custom React hooks
│   │   └── useThemeStyles.ts  # Theme-aware styling hook
│   ├── styles/                # Additional styles
│   │   ├── Flower.module.css  # Flower component styles
│   │   └── Horse.module.css   # Horse component styles
│   ├── globals.css            # Global styles and theme variables
│   ├── layout.tsx             # Root layout with providers
│   └── page.tsx               # Home page
├── lib/                       # Utility functions and configurations
    ├── discord.ts             # Discord webhook integration
    ├── firebase.ts            # Firebase configuration
    └── utils.ts               # General utility functions

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

### Setting Up Authentication & Backend Services

1. **Firebase Setup**:

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use existing one
   - Go to Project Settings → General → Your Apps
   - Add a web app and copy the config values
   - Enable Firestore Database in your project
   - Create collections: `comments` and `feedback`

2. **Google OAuth Setup**:

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create/select your project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   - Add authorized JavaScript origin: `http://localhost:3000`

3. **GitHub OAuth Setup**:

   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Create new OAuth App
   - Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

4. **Discord Webhook Setup**:

   - Go to your Discord server
   - Server Settings → Integrations → Webhooks
   - Create a new webhook
   - Copy the webhook URL to your `.env.local` file

5. **Environment Variables**:
   - Copy the example variables above
   - Replace placeholder values with your actual credentials
   - Generate NEXTAUTH_SECRET: `openssl rand -base64 32`
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

- **Email**: dinukaaw.sh@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/dinuka-wickramarathna-88468b214/
- **GitHub**: https://github.com/Dinukaawsh
- **X (Twitter)**: https://x.com/DinukaAshan14
- **Medium**: https://medium.com/@dinukaaw.sh
- **Facebook**: https://web.facebook.com/dinuka.wickramarathna
- **WhatsApp**: https://wa.me/94767326845

## 🔧 Advanced Features Setup

### Social Authentication System

The portfolio includes a complete social authentication system:

- **Google OAuth**: Users can sign in with their Google account
- **GitHub OAuth**: Users can sign in with their GitHub account
- **NextAuth.js Integration**: Secure authentication handling
- **User Profiles**: Display profile pictures and names
- **Session Management**: Persistent login sessions

### Feedback System

A sophisticated feedback system where authenticated users can:

- Submit detailed feedback with ratings
- Specify their role (Developer, Designer, Product Manager, etc.)
- Add custom roles when "Other" is selected
- View all feedback with user profiles
- See provider information (Google/GitHub)

### Comment System

The portfolio includes a fully functional comment system where visitors can:

- Leave comments on your contact page (no authentication required)
- See real-time updates of all comments
- Engage with your portfolio content
- View comment timestamps and user information

### Discord Notifications

Get instant notifications when:

- Someone visits your portfolio
- New users register via Google/GitHub
- New feedback is submitted
- New comments are posted
- Track visitor analytics and engagement

### Firebase Integration

- **Firestore Database**: Stores all comments, feedback, and user data
- **Real-time Updates**: Instant synchronization across devices
- **Scalable Backend**: Handles traffic and data efficiently
- **Security Rules**: Proper access control for data

### Theme System

- **5 Beautiful Themes**: Dark, Light, Water, Sunset, Forest
- **Theme-aware Components**: All UI elements adapt to selected theme
- **Smooth Transitions**: Seamless theme switching
- **Persistent Settings**: Theme choice saved across sessions

---

⭐ **Star this repository if you found it helpful!**

### Comment System

The portfolio includes a fully functional comment system where visitors can:

- Leave comments on your contact page (no authentication required)
- See real-time updates of all comments
- Engage with your portfolio content
- View comment timestamps and user information

### Discord Notifications

Get instant notifications when:

- Someone visits your portfolio
- New users register via Google/GitHub
- New feedback is submitted
- New comments are posted
- Track visitor analytics and engagement

### Firebase Integration

- **Firestore Database**: Stores all comments, feedback, and user data
- **Real-time Updates**: Instant synchronization across devices
- **Scalable Backend**: Handles traffic and data efficiently
- **Security Rules**: Proper access control for data

### Theme System

- **5 Beautiful Themes**: Dark, Light, Water, Sunset, Forest
- **Theme-aware Components**: All UI elements adapt to selected theme
- **Smooth Transitions**: Seamless theme switching
- **Persistent Settings**: Theme choice saved across sessions

---

⭐ **Star this repository if you found it helpful!**
