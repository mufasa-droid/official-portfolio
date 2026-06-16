# Complete Setup Guide

## Step-by-Step Installation

### 1. Initial Setup

```bash
# Navigate to project directory
cd portfolio-nextjs

# Install dependencies
npm install

# Start development server
npm run dev
```

The portfolio will be available at `http://localhost:3000`

### 2. Personalize Your Content

#### Update Personal Information
Open `lib/data.ts` and update:

```typescript
export const personalInfo = {
  name: "Your Name",                    // Your full name
  role: "Your Role",                    // Job title
  tagline: "Your value proposition",    // What you do
  location: "Your City, Country",
  email: "your@email.com",
  phone: "+1234567890",
  socials: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
  }
}
```

#### Update Skills
Adjust skill levels based on your proficiency (0-100):

```typescript
export const skills = {
  frontend: [
    { name: "React", level: 95 },      // Adjust levels
    { name: "Next.js", level: 90 },
    // Add or remove skills
  ],
  // ... backend and tools
}
```

#### Add Your Projects

Replace placeholder projects with your actual work:

```typescript
{
  id: "project-1",
  title: "Your Project Name",
  featured: true,  // Set one project as featured
  problem: "Clear problem statement",
  solution: "How you solved it",
  impact: {
    metric: "Quantifiable result",
    detail: "More details about impact"
  },
  tech: ["React", "Node.js", "etc"],
  features: [
    "Key feature 1",
    "Key feature 2",
    // ...
  ],
  image: "https://your-image-url.com/image.jpg",
  liveUrl: "https://your-live-demo.com",
  githubUrl: "https://github.com/you/repo",
}
```

### 3. Add Your Images

#### Option 1: Use Unsplash (Temporary)
Already configured - images will load from Unsplash URLs

#### Option 2: Use Your Own Images (Recommended)
1. Create a `public/images` folder
2. Add your images
3. Update image URLs in `lib/data.ts`:
```typescript
image: "/images/project-1.jpg",
```

#### Option 3: Use a CDN
1. Upload images to Cloudinary/Imgur/etc
2. Update `next.config.js`:
```javascript
images: {
  domains: ['your-cdn-domain.com'],
}
```

### 4. Customize Theme Colors

Edit `app/globals.css` to change colors:

```css
:root {
  --background: 222 47% 4%;      /* Main background */
  --foreground: 210 40% 98%;     /* Text color */
  --primary: 224 71% 60%;        /* Accent color */
  /* ... other colors */
}
```

To generate HSL colors:
- Use [https://hslpicker.com/](https://hslpicker.com/)
- Format: `HUE SATURATION% LIGHTNESS%`

### 5. Update Meta Tags for SEO

Edit `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Your Name - Your Role',
  description: 'Your description',
  keywords: ['Your', 'Keywords'],
  // ... other meta tags
}
```

### 6. Test Your Portfolio

```bash
# Run type checking
npm run type-check

# Build for production
npm run build

# Test production build locally
npm start
```

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

2. **Deploy**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repo
- Click "Deploy"
- Done! ✨

**Custom Domain on Vercel:**
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as shown
4. Wait for SSL certificate (automatic)

### Option 2: Netlify

1. **Build the project**
```bash
npm run build
```

2. **Deploy**
- Go to [netlify.com](https://netlify.com)
- Drag and drop the `.next` folder
- Or connect GitHub repository

**Build Settings for Netlify:**
- Build command: `npm run build`
- Publish directory: `.next`

### Option 3: GitHub Pages

Not recommended for Next.js (use Vercel instead)

### Option 4: Your Own Server

```bash
# Build the project
npm run build

# Copy files to your server
scp -r .next package.json user@yourserver:/path/

# On server
npm install --production
npm start
```

## Performance Optimization

### 1. Image Optimization

Use Next.js Image component (already configured):
```typescript
import Image from 'next/image'

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  quality={85}  // Adjust quality (default: 75)
/>
```

### 2. Code Splitting

Already optimized with Next.js App Router:
- Each section is automatically code-split
- Components load only when needed

### 3. Font Optimization

Fonts are already optimized with `next/font`:
- Automatic font subsetting
- Zero layout shift
- Self-hosted (no external requests)

## Common Customizations

### Add a Blog Section

1. Create `app/blog/page.tsx`
2. Add blog posts in `lib/blog-posts.ts`
3. Add link to navbar in `components/navbar.tsx`

### Add Google Analytics

1. Get tracking ID from Google Analytics
2. Add to `app/layout.tsx`:
```typescript
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`}
  strategy="afterInteractive"
/>
```

### Add Contact Form Backend

Current form is frontend-only. To add backend:

**Option 1: Formspree**
```typescript
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option 2: EmailJS**
```typescript
import emailjs from '@emailjs/browser'
// Configure and send
```

**Option 3: API Route**
Create `app/api/contact/route.ts` with your email service

### Add Dark/Light Mode Toggle

1. Install next-themes: `npm install next-themes`
2. Wrap app in ThemeProvider
3. Add toggle button to navbar

## Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Build errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Try building again
npm run build
```

### TypeScript errors
```bash
# Check for errors
npm run type-check

# If errors persist, check:
# 1. All imports are correct
# 2. Props are properly typed
# 3. No missing dependencies
```

## Next Steps

1. ✅ Set up the portfolio locally
2. ✅ Customize with your information
3. ✅ Add your real projects
4. ✅ Deploy to Vercel
5. ✅ Add custom domain
6. ✅ Share with potential employers!

## Need Help?

- Check the main README.md
- Open an issue on GitHub
- Email: abdulhammedmustapha@gmail.com
