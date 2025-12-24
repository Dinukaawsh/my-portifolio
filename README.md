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
- **Publications**: Research papers and formal articles (optional)
- **Contact**: Multiple contact options including WhatsApp, contact form modal, and interactive comment system

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
- **User Registration**: Notifications when users sign up via Google/GitHub/LinkedIn
- **Feedback Notifications**: Instant Discord alerts for new feedback submissions
- **Comment Notifications**: Instant Discord alerts for new comments
- **Contact Form Notifications**: Instant Discord alerts for contact form submissions with full details
- **Session Analytics**: Track new vs returning visitors
- **Rich Discord Embeds**: Beautiful notifications with visitor details and user profiles
- **Performance Monitoring**: Track page visits and user engagement
- **Provider Tracking**: Know which OAuth provider users used

### 🧭 Contact & Hiring Flow

- **Hire Me Button**: CTA with external Google Form integration
- **Contact Me Button**: Opens a beautiful modal form for direct inquiries
- **WhatsApp Integration**: "Let's Talk" button that opens direct WhatsApp chat
- **Contact Form Modal**: Professional form with name, email, subject, and message fields
- **Email Notifications**: Receive contact form submissions via email
- **Configurable Options**: All contact methods configurable via environment variables

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
- **NextAuth.js** - Social authentication (Google, GitHub, LinkedIn)
- **Firebase** - Backend services integration (Firestore, Authentication)
- **Discord Webhooks** - Real-time notifications and analytics

### Development Tools

- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Turbopack** - Fast development builds

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (20.9.0+ recommended)
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

   # LinkedIn OAuth
   LINKEDIN_CLIENT_ID=your-linkedin-client-id
   LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret

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

   # WhatsApp Contact
   NEXT_PUBLIC_WHATSAPP_NUMBER=94767326845

   # Contact Form Email (optional, for email notifications)
   CONTACT_EMAIL=your-email@example.com
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

# LinkedIn OAuth (Production)
LINKEDIN_CLIENT_ID=your-production-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-production-linkedin-client-secret

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

# WhatsApp Contact
NEXT_PUBLIC_WHATSAPP_NUMBER=94767326845

# Contact Form Email (optional, for email notifications)
CONTACT_EMAIL=your-email@example.com
```

### OAuth Provider Updates for Production

1. **Google OAuth**:

   - Update redirect URI to: `https://yourdomain.com/api/auth/callback/google`
   - Add JavaScript origin: `https://yourdomain.com`

2. **GitHub OAuth**:

   - Update callback URL to: `https://yourdomain.com/api/auth/callback/github`

3. **LinkedIn (OpenID Connect)**:

   - Enable OpenID Connect on LinkedIn Developer Portal
   - Add redirect URI: `https://yourdomain.com/api/auth/callback/linkedin`
   - Recommended scopes: `openid profile email`

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
│   ├── api/                         # API routes
│   │   ├── auth/
│   │   │   └── [...nextauth]/       # NextAuth.js authentication routes
│   │   │       └── route.ts         # OAuth provider configuration
│   │   └── cv-webhook/              # Discord webhook for CV tracking
│   │       └── route.ts
│   ├── components/
│   │   ├── backgrounds/             # 3D scenes and animations
│   │   │   ├── 3d-text/
│   │   │   │   ├── 3DScene.tsx
│   │   │   │   └── 3DText.tsx
│   │   │   ├── balls/
│   │   │   │   └── balls.tsx
│   │   │   ├── dotted-text/
│   │   │   │   └── dottedtext.tsx
│   │   │   ├── flower/
│   │   │   │   └── Flower.tsx
│   │   │   ├── focus text/
│   │   │   │   └── text.tsx
│   │   │   ├── footer_backgound/
│   │   │   │   └── footer_background.tsx
│   │   │   ├── galaxy/
│   │   │   │   └── galaxy.tsx
│   │   │   ├── globe/
│   │   │   │   └── GlobeBackground.tsx
│   │   │   ├── horse/
│   │   │   │   └── Horse.tsx
│   │   │   ├── hyperspeed/
│   │   │   │   └── hyperspeed.tsx
│   │   │   ├── letter-glich/
│   │   │   │   └── glich.tsx
│   │   │   ├── line background/
│   │   │   │   └── line-backgroung.tsx
│   │   │   ├── perloader/
│   │   │   │   └── preloader.tsx
│   │   │   ├── Pixel_blast/
│   │   │   │   └── pixel.tsx
│   │   │   ├── robot/
│   │   │   │   ├── card.tsx
│   │   │   │   ├── splite.tsx
│   │   │   │   └── spotlight.tsx
│   │   │   ├── rolling gallery/
│   │   │   │   └── gallery.tsx
│   │   │   ├── skills/
│   │   │   │   ├── README.md
│   │   │   │   └── SkillsBackground.tsx
│   │   │   └── thunderbolt/
│   │   │       └── thunderbolt.tsx
│   │   ├── common/                 # Reusable components
│   │   │   ├── AuthProvider.tsx
│   │   │   ├── ThemeSwitcher.tsx
│   │   │   └── VisitTracker.tsx
│   │   ├── content/                # Content data files
│   │   │   ├── about.ts
│   │   │   ├── achievements.ts
│   │   │   ├── blog.ts
│   │   │   ├── certificates.ts
│   │   │   ├── contact.ts
│   │   │   ├── education.ts
│   │   │   ├── experience.ts
│   │   │   ├── projects.ts
│   │   │   ├── references.ts       # (optional, future)
│   │   │   ├── publications.ts     # (optional, future)
│   │   │   └── skills.ts
│   │   ├── icons/
│   │   │   ├── projectsicons.tsx
│   │   │   └── skillsicons.tsx
│   │   ├── layouts/
│   │   │   ├── footer/
│   │   │   │   └── Footer.tsx
│   │   │   └── navbar/
│   │   │       └── Navbar.tsx
│   │   └── pages/                  # Portfolio section pages
│   │       ├── about/
│   │       │   └── about.tsx
│   │       ├── achivements/
│   │       │   └── achievements.tsx
│   │       ├── blogs/
│   │       │   └── blog.tsx
│   │       ├── certificates/
│   │       │   └── certificates.tsx
│   │       ├── contacts/
│   │       │   └── contact.tsx
│   │       ├── data/
│   │       │   ├── about/
│   │       │   │   ├── components/
│   │       │   │   │   ├── AnimatedJets.tsx
│   │       │   │   │   ├── AnimatedStats.tsx
│   │       │   │   │   ├── FloatingParticles.tsx
│   │       │   │   │   ├── MainProfileCard.tsx
│   │       │   │   │   ├── PerformanceMonitor.tsx
│   │       │   │   │   └── ProfileSkeleton.tsx
│   │       │   │   └── hooks/
│   │       │   │       └── useServiceWorker.ts
│   │       │   └── contact/
│   │       │       └── components/
│   │       │           ├── CommentsForm.tsx
│   │       │           ├── CommentsList.tsx
│   │       │           ├── FeedbackForm.tsx
│   │       │           ├── FeedbackList.tsx
│   │       │           └── HireMeSection.tsx
│   │       ├── education/
│   │       │   └── education.tsx
│   │       ├── experience/
│   │       │   └── experience.tsx
│   │       ├── projects/
│   │       │   └── projects.tsx
│   │       ├── references/         # (optional, future)
│   │       │   └── references.tsx
│   │       ├── publications/       # (optional, future)
│   │       │   └── publications.tsx
│   │       └── skills/
│   │           └── skills.tsx
│   ├── contexts/
│   │   ├── THEME_SYSTEM_README.md
│   │   └── ThemeContext.tsx
│   ├── favicon.ico
│   ├── globals.css                # Global styles and theme variables
│   ├── hooks/
│   │   └── useThemeStyles.ts
│   ├── layout.tsx                 # Root layout with providers
│   ├── not-found.tsx              # Custom 404 page
│   ├── page.tsx                   # Home page
│   └── privacy/
│       └── page.tsx               # Privacy page
├── lib/                            # Utility functions and configurations
│   ├── discord.ts                  # Discord webhook integration
│   ├── firebase.ts                 # Firebase configuration
│   └── utils.ts                    # General utility functions

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
4. (Optional) Publications: when you add it, create `components/pages/publications/publications.tsx` and include its data in `components/content` if needed

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

4. **LinkedIn (OpenID Connect) Setup**:

   - Go to LinkedIn Developer Portal → Your App → Products → Add "Sign In with LinkedIn using OpenID Connect"
   - Copy Client ID and Client Secret into `.env.local`
   - Add redirect URI: `http://localhost:3000/api/auth/callback/linkedin`
   - Set scopes: `openid profile email`

5. **Discord Webhook Setup**:

   - Go to your Discord server
   - Server Settings → Integrations → Webhooks
   - Create a new webhook
   - Copy the webhook URL to your `.env.local` file

6. **Environment Variables**:
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

### Component References

- CodePen: https://codepen.io/
- 21st.dev: https://21st.dev/
- ReactBits: https://reactbits.dev/

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
- **LinkedIn OIDC**: Users can sign in with their LinkedIn account
- **NextAuth.js Integration**: Secure authentication handling
- **User Profiles**: Display profile pictures and names
- **Session Management**: Persistent login sessions

### Feedback System

A sophisticated feedback system where authenticated users can:

- Submit detailed feedback with ratings
- Specify their role (Developer, Designer, Product Manager, etc.)
- Add custom roles when "Other" is selected
- View all feedback with user profiles
- See provider information (Google/GitHub/LinkedIn)

### Comment System

The portfolio includes a fully functional comment system where visitors can:

- Leave comments on your contact page (no authentication required)
- See real-time updates of all comments
- Engage with your portfolio content
- View comment timestamps and user information

### Discord Notifications

Get instant notifications when:

- Someone visits your portfolio
- New users register via Google/GitHub/LinkedIn
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
- New users register via Google/GitHub/LinkedIn
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
