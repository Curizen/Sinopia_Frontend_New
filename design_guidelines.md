# Sinopia Platform Design Guidelines

## Design Approach

**Hybrid Strategy**: Utility-focused dashboard (inspired by Linear, Asana) + Experience-driven marketing pages (inspired by Upwork, Fiverr, Toptal)

## Brand Foundation

Colors (already specified):
- Primary: `#cb410b` - CTAs, active states, emphasis
- Secondary: `#932319` - hover states, depth
- Accent: `#d05423` - highlights, badges
- Background: `#f7f7f7` - page backgrounds
- Text: `#1f2933` - primary text
- Additional grays: `#52606d`, `#7b8794`, `#9aa5b1` for hierarchy

## Typography System

**Font Stack**: 
- Primary: Inter (Google Fonts) - UI, body text
- Display: Manrope (Google Fonts) - headings, hero sections

**Scale**:
- Hero: text-5xl to text-7xl (48-72px), font-bold
- H1: text-4xl (36px), font-semibold
- H2: text-3xl (30px), font-semibold  
- H3: text-2xl (24px), font-medium
- Body: text-base (16px), font-normal
- Small: text-sm (14px), font-normal
- Tiny: text-xs (12px) - captions, metadata

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Tight spacing: p-2, p-4, gap-2
- Standard: p-6, p-8, gap-4, gap-6
- Generous: p-12, p-16, p-20, gap-8
- Section spacing: py-16, py-20, py-24

**Container Strategy**:
- Public pages: max-w-7xl mx-auto
- Dashboard: full-width with max-w-screen-2xl
- Content: max-w-4xl for text-heavy areas
- Forms: max-w-md to max-w-2xl depending on complexity

## Public Pages Design

### Homepage Structure
1. **Hero Section** (90vh): 
   - Large hero image (marketplace/collaboration theme - diverse professionals working)
   - Blurred background overlay with centered content
   - Large headline (text-6xl) + subtitle (text-xl)
   - Dual CTA buttons (Sign Up / Browse Talent) with backdrop-blur
   - Floating trust indicators: "10K+ Projects Completed" badges

2. **Value Proposition** (2-column):
   - Left: For Skill Givers section
   - Right: For Skill Searchers section
   - Icon + headline + 3 bullet points each

3. **How It Works** (3-column grid):
   - Step cards with numbers, icons, title, description
   - Connecting lines between steps (desktop only)

4. **Featured Skills** (masonry grid):
   - Skill category cards with images
   - Hover effect: slight lift, shadow

5. **Success Stories** (carousel/3-column):
   - Profile image + quote + name + role
   - Star ratings for completed projects

6. **CTA Section** (centered):
   - Bold headline + description
   - Primary CTA button
   - Background: subtle gradient using brand colors

7. **Footer** (4-column):
   - Logo + tagline
   - Quick links (About, Terms, Privacy)
   - For Skill Givers / For Companies sections
   - Social icons + newsletter signup

### About/Contact Pages
- Hero image banner (40vh) with overlay
- Single column content (max-w-4xl)
- Contact: 2-column (form left, info + map placeholder right)

## Dashboard Layout

### Structure
**Sidebar** (fixed, w-64):
- Logo at top (p-6)
- Navigation items: icon + label, hover state with bg-accent/10
- Active state: bg-primary text-white
- User profile card at bottom
- Collapsible on mobile (hamburger menu)

**Top Bar** (sticky):
- Page title (text-2xl, font-semibold)
- Search bar (middle, max-w-md)
- Right: notifications bell (badge for count) + user avatar dropdown

**Main Content Area**:
- Container: p-6 to p-8
- White cards on gray background
- Consistent card pattern: shadow-sm, rounded-lg, p-6

## Component Library

### Cards
- Base: bg-white, rounded-lg, shadow-sm, p-6, border border-gray-200
- Hover: shadow-md transition
- Header: flex justify-between, mb-4
- Status badges: inline-flex, px-3, py-1, rounded-full, text-sm

**Project Card**:
- Title (font-semibold, text-lg)
- Status badge (top-right)
- 2-column info grid (budget, timeline)
- Progress bar for stages
- Action buttons (flex gap-2)

**Profile Cards**:
- Avatar (large, rounded-full, 120px)
- Name + role (text-center)
- Stats row (projects, rating, response time)
- Skills tags (flex-wrap, gap-2)

### Forms
- Labels: text-sm, font-medium, mb-2
- Inputs: w-full, px-4, py-3, rounded-lg, border-2, focus:border-primary
- Error states: border-red-500, text-red-600 helper text
- File upload: dashed border, dropzone styling
- Multi-step forms: progress indicator at top

### Tables
- Responsive: horizontal scroll on mobile
- Header: bg-gray-50, font-semibold, text-sm, uppercase
- Rows: hover:bg-gray-50, border-b
- Actions column: flex gap-2, icon buttons

### Buttons
- Primary: bg-primary, text-white, hover:bg-secondary, px-6, py-3, rounded-lg, font-medium
- Secondary: border-2 border-primary, text-primary, hover:bg-primary hover:text-white
- Ghost: text-primary, hover:bg-primary/10
- Icon buttons: p-2, rounded-lg, hover:bg-gray-100
- Sizes: sm (px-4 py-2 text-sm), md (px-6 py-3), lg (px-8 py-4 text-lg)

### Modals
- Backdrop: bg-black/50
- Content: max-w-lg to max-w-2xl, bg-white, rounded-xl, p-8
- Header: flex justify-between, border-b, pb-4, mb-6
- Footer: flex justify-end, gap-3, border-t, pt-6, mt-6

## Interactions & States

**Minimal Animations**:
- Page transitions: fade-in only
- Hover: transform scale(1.02) for cards
- Button press: transform scale(0.98)
- Loading: simple spinner, no elaborate animations

**Status Colors**:
- Pending: bg-yellow-100, text-yellow-800
- Accepted/Active: bg-green-100, text-green-800
- Rejected: bg-red-100, text-red-800
- Draft: bg-gray-100, text-gray-800
- Completed: bg-blue-100, text-blue-800

## Images

**Hero Image**: High-quality photo of diverse professionals collaborating (coworking space, modern office, or remote work setup). Professional, bright, energetic feel. 1920x1080px minimum.

**About Page**: Team photo or company culture image (40vh banner)

**Feature Icons**: Use Heroicons (outline style for consistency)

**Profile Avatars**: Circular, 40px to 120px depending on context

**Placeholder Images**: Use Unsplash API for project/skill category visuals during development

## Accessibility
- WCAG AA contrast ratios (already met with color palette)
- Keyboard navigation: visible focus rings (ring-2 ring-primary)
- Screen reader labels on icon-only buttons
- Form validation with clear error messages
- Skip-to-content link for keyboard users