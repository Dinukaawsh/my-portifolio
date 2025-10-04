# 🚀 Production Deployment Guide

## 1. Environment Variables Setup

Create a `.env.local` file with the following variables:

```env
# NextAuth.js Configuration
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-nextauth-secret-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Discord Webhook (Optional)
NEXT_PUBLIC_DISCORD_WEBHOOK_URL=your-discord-webhook-url
```

## 2. OAuth Provider Configuration

### Google OAuth Setup:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create/select your project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `https://yourdomain.com/api/auth/callback/google`
6. Add authorized JavaScript origins:
   - `https://yourdomain.com`

### GitHub OAuth Setup:

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth App
3. Set Authorization callback URL:
   - `https://yourdomain.com/api/auth/callback/github`

## 3. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > General
4. Copy your Firebase config
5. Update Firestore security rules for production

## 4. NextAuth Secret Generation

Generate a secure secret:

```bash
openssl rand -base64 32
```

## 5. Production Build Test

Test your production build locally:

```bash
npm run build
npm start
```

## 6. Deployment Platforms

### Vercel (Recommended):

1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify:

1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables

### AWS/GCP/Azure:

1. Set up serverless functions
2. Configure environment variables
3. Set up custom domain

## 7. Domain Configuration

1. Purchase domain
2. Configure DNS:
   - A record pointing to your hosting provider
   - CNAME for www subdomain
3. Set up SSL certificate (usually automatic)

## 8. Security Checklist

- [ ] Environment variables secured
- [ ] OAuth redirects configured
- [ ] Firebase rules updated
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] Rate limiting implemented

## 9. Monitoring Setup

- [ ] Error tracking (Sentry)
- [ ] Analytics (Google Analytics)
- [ ] Performance monitoring
- [ ] Uptime monitoring

## 10. Post-Deployment Testing

- [ ] Test all OAuth logins
- [ ] Test feedback submission
- [ ] Test comment submission
- [ ] Test theme switching
- [ ] Test mobile responsiveness
- [ ] Test Discord notifications
