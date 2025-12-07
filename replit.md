# Sinopia - Skill Marketplace Platform

## Overview
Sinopia is a comprehensive skill marketplace platform that connects talented professionals (Skill Givers) with companies seeking expertise (Skill Searchers). The platform enables users to find projects, manage offers, sign contracts, handle payments, and build professional profiles.

## Current State
**Phase:** Frontend Prototype Complete

The frontend is fully implemented with:
- Complete routing system with public and private routes
- Authentication flow (sign-in, sign-up, forgot password, OTP verification, reset password)
- Dashboard with project overview, stats, and quick actions
- Project management (list, detail, create)
- Offers management with accept/reject functionality
- Contracts management with signing capability
- Payments/Invoices tracking
- Notifications system
- Profile management for both Skill Givers and Skill Searchers

## Project Architecture

### Frontend Structure
```
client/src/
├── components/
│   ├── layouts/          # PublicLayout, DashboardLayout
│   ├── public/           # HeroSection, FeaturesSection, etc.
│   ├── ui/               # Shadcn UI components
│   └── examples/         # Component examples for development
├── context/              # React Context providers
│   ├── AuthContext.tsx
│   ├── NotificationContext.tsx
│   ├── ProjectContext.tsx
│   ├── OfferContext.tsx
│   ├── ContractContext.tsx
│   └── PaymentContext.tsx
├── pages/
│   ├── auth/             # SignIn, SignUp, ForgotPassword, etc.
│   ├── dashboard/        # Dashboard page
│   ├── projects/         # Projects list, detail, add
│   ├── offers/           # Offers management
│   ├── contracts/        # Contracts management
│   ├── payments/         # Payments/Invoices
│   ├── notifications/    # Notifications center
│   └── profile/          # User profile
├── types/                # TypeScript interfaces
├── lib/utils/            # Utility functions (formatters, validation, constants)
└── App.tsx               # Main app with routing
```

### Key Features

1. **Dual User Types:**
   - Skill Giver: Freelancers/professionals seeking projects
   - Skill Searcher: Companies posting projects and hiring talent

2. **Authentication:**
   - Email/password login
   - Registration with role selection
   - Password reset with OTP verification

3. **Project Management:**
   - Project creation with skills, budget, deadline
   - Stage-based progress tracking
   - Task management within stages

4. **Offers & Contracts:**
   - Offer submission and review
   - Contract generation and e-signing
   - Status tracking (pending, accepted, rejected, signed)

5. **Payments:**
   - Invoice management
   - Payment history
   - Status tracking (pending, paid, overdue)

## Design System

### Brand Colors
- Primary: `#cb410b` (Sinopia orange)
- Secondary: `#932319` (Deep red)
- Accent: `#d05423` (Orange accent)
- Background: `#f7f7f7` (Light gray)
- Text: `#1f2933` (Dark gray)

### Typography
- Display: Manrope (headings)
- Body: Inter (UI text)

### Components
- Using Shadcn UI component library
- Custom layouts for public pages and dashboard
- Responsive design for mobile and desktop

## User Preferences
- Clean, professional aesthetic
- Utility-focused dashboard design
- Experience-driven public pages
- Minimal animations for performance

## Internationalization (i18n)

The app supports multiple languages with a minimal i18n system.

### Supported Languages
- English (en) - Default
- German (de)

### Translation Files Location
```
client/src/i18n/
├── index.tsx    # I18nProvider, useI18n hook, and core logic
├── en.ts        # English translations
└── de.ts        # German translations
```

### How to Use Translations
```tsx
import { useI18n } from '@/i18n';

function MyComponent() {
  const { t, language, setLanguage } = useI18n();
  
  return (
    <div>
      <h1>{t('home.heroTitle')}</h1>
      <button onClick={() => setLanguage('de')}>Switch to German</button>
    </div>
  );
}
```

### How to Add a New Translation Key
1. Add the key to `client/src/i18n/en.ts`
2. Add the same key with German translation to `client/src/i18n/de.ts`
3. Use the key with `t('section.key')` in your component

### How to Add a New Language
1. Create a new file (e.g., `fr.ts`) with the same structure as `en.ts`
2. Import and add it to the `translations` object in `index.tsx`
3. Update the `Language` type: `export type Language = 'en' | 'de' | 'fr';`
4. Add the new language option to the language switcher in `PublicLayout.tsx`

### Language Persistence
The selected language is stored in `localStorage` under the key `sinopia_language`.
On app load, the language is restored from localStorage, defaulting to English.

## Recent Changes
- December 2024: Added German language support with i18n system
- November 2024: Initial frontend prototype completed
- Implemented all core pages and components
- Added mock data for development testing
- Set up context providers for state management

## Next Steps (Backend Development)
1. Set up database schema for users, projects, offers, contracts, payments
2. Implement authentication API with JWT tokens
3. Create RESTful API endpoints for all entities
4. Connect frontend to real API (replace mock data)
5. Add file upload for CVs and documents
6. Implement real-time notifications with WebSockets
