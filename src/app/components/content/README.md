# Content Configuration Guide

This folder contains all the content configuration files for your portfolio pages. These files make it easy to update your content without touching the component logic.

## 📁 File Structure

```
content/
├── about.ts          # About page content (personal info, skills, stats)
├── achievements.ts   # Achievements page content (awards, recognition)
├── blog.ts           # Blog page content (blog posts, platforms)
├── certificates.ts   # Certificates page content (certifications, courses)
├── contact.ts        # Contact page content (contact info, form settings)
├── education.ts      # Education page content (institutions, degrees)
├── experience.ts     # Experience page content (work experience, companies)
├── projects.ts       # Projects page content (project portfolio, categories)
├── references.ts     # References page content (testimonials, recommendations)
├── skills.ts         # Skills page content (technical skills, expertise levels)
└── README.md         # This file
```

## 🎯 How to Use

### 1. About Page (`about.ts`)

**Location**: `src/app/components/content/about.ts`

**What to Edit**:

- Personal information (name, title, location, email)
- Professional roles for typing animation
- Technical skills list
- Statistics (experience, projects, etc.)
- Tech stack descriptions
- Career timeline
- Social media links
- Profile images
- Animation timing

**Example**:

```typescript
personal: {
  name: "Your Name",
  title: "Your Title",
  location: "Your Location",
  email: "your.email@example.com",
  // ... other fields
}
```

### 2. Blog Page (`blog.ts`)

**Location**: `src/app/components/content/blog.ts`

**What to Edit**:

- Page header (title, subtitle)
- Blog posts (title, excerpt, URL, tags, dates)
- Platform information
- Call-to-action content
- Animation settings

**Example**:

```typescript
posts: [
  {
    id: 1,
    title: "Your Blog Post Title",
    excerpt: "Your blog post excerpt...",
    url: "https://your-blog-url.com",
    tags: ["Tag1", "Tag2"],
    featured: true,
    // ... other fields
  },
];
```

### 3. Contact Page (`contact.ts`)

**Location**: `src/app/components/content/contact.ts`

**What to Edit**:

- Page header (title, subtitle, indicators)
- Contact information (email, location)
- Form configuration and field settings
- Direct email section content
- Comments section configuration
- Animation settings

**Example**:

```typescript
contactInfo: {
  email: "your.email@example.com",
  location: "Your Location",
  availability: "Available for new opportunities"
}
```

### 4. Education Page (`education.ts`)

**Location**: `src/app/components/content/education.ts`

**What to Edit**:

- Page header (title, subtitle)
- Educational institutions
- Degrees and specializations
- Skills and achievements
- Status configurations
- Animation settings

**Example**:

```typescript
institutions: [
  {
    institution: "Your University",
    degree: "Your Degree",
    specialization: "Your Specialization",
    period: "2020 - 2024",
    status: "Completed",
    // ... other fields
  },
];
```

### 5. Experience Page (`experience.ts`)

**Location**: `src/app/components/content/experience.ts`

**What to Edit**:

- Page header (title, subtitle, indicators)
- Work experience details
- Company information and roles
- Responsibilities and skills
- Experience types and locations
- Animation settings

**Example**:

```typescript
experiences: [
  {
    company: "Your Company",
    title: "Your Role",
    period: "2023 - Present",
    type: "Full-Time",
    location: "Remote",
    // ... other fields
  },
];
```

### 6. Projects Page (`projects.ts`)

**Location**: `src/app/components/content/projects.ts`

**What to Edit**:

- Page header (title, subtitle, indicators)
- Project categories
- Project details (title, description, technologies)
- GitHub and live demo links
- Featured projects
- Animation settings

**Example**:

```typescript
projects: [
  {
    id: 1,
    title: "Your Project",
    description: "Project description...",
    technologies: ["React", "Node.js"],
    github: "https://github.com/your-repo",
    live: "https://your-demo.com",
    category: "Full-Stack",
    featured: true,
  },
];
```

### 7. Skills Page (`skills.ts`)

**Location**: `src/app/components/content/skills.ts`

**What to Edit**:

- Page header (title, subtitle, indicators)
- Skills by category (languages, frameworks, tools)
- Skill levels and colors
- Soft skills list
- Animation and auto-slide settings
- Category names and colors

**Example**:

```typescript
skills: {
  languages: [
    { name: "JavaScript", level: 95, color: "#F7DF1E" },
    { name: "Python", level: 85, color: "#3776AB" }
  ],
  softSkills: ["Teamwork", "Problem Solving", "Leadership"]
}
```

### 8. Certificates Page (`certificates.ts`)

**Location**: `src/app/components/content/certificates.ts`

**What to Edit**:

- Page header (title, subtitle, indicators)
- Certificate categories and filtering
- Certificate details (title, issuer, dates, skills)
- Credential URLs and verification links
- Featured certificates
- Animation settings

**Example**:

```typescript
certificates: [
  {
    id: 1,
    title: "Your Certificate",
    issuer: "Issuing Organization",
    category: "Web Development",
    issueDate: "2024-01-15",
    skills: ["React", "Next.js"],
    featured: true,
  },
];
```

### 9. Achievements Page (`achievements.ts`)

**Location**: `src/app/components/content/achievements.ts`

**What to Edit**:

- Page header (title, subtitle, indicators)
- Achievement categories and types
- Achievement details (title, issuer, description, impact)
- Skills demonstrated and tags
- Featured achievements
- Animation settings

**Example**:

```typescript
achievements: [
  {
    id: 1,
    title: "Your Achievement",
    issuer: "Awarding Organization",
    category: "Academic",
    description: "Achievement description...",
    skills: ["Problem Solving", "Innovation"],
    featured: true,
  },
];
```

### 10. References Page (`references.ts`)

**Location**: `src/app/components/content/references.ts`

**What to Edit**:

- Page header (title, subtitle, indicators)
- Reference categories and relationships
- Reference details (name, company, testimonial)
- Contact information and permissions
- Strengths and ratings
- Animation settings

**Example**:

```typescript
references: [
  {
    id: 1,
    name: "Reference Name",
    title: "Job Title",
    company: "Company Name",
    testimonial: "Testimonial text...",
    strengths: ["Leadership", "Communication"],
    rating: 5,
  },
];
```

## 🚀 Quick Start Guide

### Adding New Content

1. **Open the appropriate content file** (e.g., `about.ts` for personal info)
2. **Find the section** you want to edit
3. **Update the values** (text, URLs, numbers, etc.)
4. **Save the file** - changes appear automatically

### Adding New Blog Posts

1. **Open `blog.ts`**
2. **Add a new post** to the `posts` array:

```typescript
{
  id: 7, // Increment the ID
  title: "Your New Blog Post",
  excerpt: "Brief description...",
  platform: "Medium",
  url: "https://your-url.com",
  readTime: "5 min read",
  publishDate: "2024-01-20",
  tags: ["Tag1", "Tag2"],
  featured: false
}
```

### Adding New Education

1. **Open `education.ts`**
2. **Add a new institution** to the `institutions` array:

```typescript
{
  id: 3, // Increment the ID
  institution: "New Institution",
  degree: "New Degree",
  specialization: "New Specialization",
  period: "2020 - 2024",
  status: "Completed",
  // ... other fields
}
```

### Adding New Experience

1. **Open `experience.ts`**
2. **Add a new experience** to the `experiences` array:

```typescript
{
  id: 2, // Increment the ID
  company: "New Company",
  title: "New Role",
  period: "2024 - Present",
  type: "Full-Time",
  location: "Remote",
  // ... other fields
}
```

### Adding New Projects

1. **Open `projects.ts`**
2. **Add a new project** to the `projects` array:

```typescript
{
  id: 7, // Increment the ID
  title: "New Project",
  description: "Project description...",
  technologies: ["React", "Node.js"],
  github: "https://github.com/your-repo",
  live: "https://your-demo.com",
  category: "Full-Stack",
  featured: false
}
```

### Adding New Skills

1. **Open `skills.ts`**
2. **Add a new skill** to the appropriate category:

```typescript
// Add to languages array
{ name: "Rust", level: 75, color: "#DEA584" }

// Add to softSkills array
"Project Management"
```

### Adding New Certificates

1. **Open `certificates.ts`**
2. **Add a new certificate** to the `certificates` array:

```typescript
{
  id: 7, // Increment the ID
  title: "Your New Certificate",
  issuer: "Issuing Organization",
  category: "Web Development",
  issueDate: "2024-01-20",
  skills: ["React", "TypeScript"],
  featured: false
}
```

### Adding New Achievements

1. **Open `achievements.ts`**
2. **Add a new achievement** to the `achievements` array:

```typescript
{
  id: 7, // Increment the ID
  title: "Your New Achievement",
  issuer: "Awarding Organization",
  category: "Professional",
  description: "Achievement description...",
  skills: ["Leadership", "Innovation"],
  featured: false
}
```

### Adding New References

1. **Open `references.ts`**
2. **Add a new reference** to the `references` array:

```typescript
{
  id: 7, // Increment the ID
  name: "New Reference Name",
  title: "Job Title",
  company: "Company Name",
  testimonial: "Testimonial text...",
  strengths: ["Communication", "Problem Solving"],
  rating: 5
}
```

## ⚠️ Important Notes

### Do's ✅

- Edit content in `.ts` files only
- Keep the data structure intact
- Use valid URLs and file paths
- Test changes in your browser

### Don'ts ❌

- Don't edit `.tsx` component files for content
- Don't change property names
- Don't remove required fields
- Don't use invalid file paths

## 🔧 Advanced Customization

### Animation Settings

Each content file includes animation configurations:

```typescript
animation: {
  typingSpeed: 80,        // Typing animation speed
  rotationInterval: 4000,  // Rotation intervals
  transitionDuration: 700, // Transition durations
  // ... other settings
}
```

### Status Configurations

Education page includes status styling:

```typescript
statusConfig: {
  completed: {
    label: "Completed",
    color: "bg-blue-500/20 text-blue-300 border-blue-500/30"
  },
  // ... other statuses
}
```

### Helper Functions

Each content file exports helper functions:

```typescript
// Blog helpers
getFeaturedPosts();
getPostsByPlatform("Medium");
getPostsByTag("React");

// Contact helpers
getContactSteps();
getFormFields();
getParticleConfig(0);

// Education helpers
getInstitutionById(1);
getInstitutionsByStatus("Completed");
getAllSkills();

// Experience helpers
getExperienceById(1);
getExperiencesByType("Full-Time");
getAllSkills();

// Projects helpers
getProjectById(1);
getProjectsByCategory("Frontend");
getFeaturedProjects();
getAllTechnologies();

// Skills helpers
getCategoryName("languages");
getSkillsByCategory("frontendFrameworks");
getTotalSkillsCount();

// Certificates helpers
getCertificateById(1);
getCertificatesByCategory("Web Development");
getFeaturedCertificates();
getExpiringCertificates(90);

// Achievements helpers
getAchievementById(1);
getAchievementsByCategory("Academic");
getFeaturedAchievements();
getRecentAchievements(365);

// References helpers
getReferenceById(1);
getReferencesByCategory("Professional");
getFeaturedReferences();
getAverageRating();
```

## 🎨 Styling

### Colors

- Use Tailwind CSS color classes
- Format: `bg-color-500/20` (with opacity)
- Examples: `bg-blue-500`, `bg-green-400/30`

### Icons

- **Emojis**: Use directly in strings (🎓, 🔬, ⭐)
- **SVG**: Use path data for social media icons
- **Lucide**: Use icon names for stats (TrendingUp, Target, etc.)

## 📱 Responsive Content

Content automatically adapts to different screen sizes. No additional configuration needed.

## 🔄 Auto-Refresh

Changes to content files automatically reflect in your portfolio without restarting the development server.

## 🆘 Need Help?

### Common Issues

1. **Content not updating**: Check file path and import statements
2. **TypeScript errors**: Ensure data structure matches the interface
3. **Missing content**: Verify all required fields are present

### Getting Support

- Check the component's import statement matches the content file path
- Ensure all required fields are filled in the content file
- Verify file paths and URLs are correct

## 📈 Benefits

- ✅ **Easy Updates**: Change content without touching code
- ✅ **Centralized Management**: All content in one place
- ✅ **Type Safety**: TypeScript prevents errors
- ✅ **Version Control**: Easy to track content changes
- ✅ **Maintainable**: Clear separation of concerns
- ✅ **Professional**: Easy for non-developers to update

## 🎯 Next Steps

1. **Customize your content** using these files
2. **Add new blog posts** as you write them
3. **Update your skills** as you learn new technologies
4. **Modify your timeline** as your career progresses

Your portfolio is now much more maintainable and professional! 🎉
