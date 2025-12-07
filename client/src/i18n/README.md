# Sinopia Internationalization (i18n)

This directory contains the internationalization setup for the Sinopia application.

## Structure

```
client/src/i18n/
├── index.tsx      # I18nProvider context and useI18n hook
├── en.ts          # English translations
├── de.ts          # German translations
└── README.md      # This documentation
```

## Usage

### Accessing Translations

Use the `useI18n` hook in any component:

```tsx
import { useI18n } from '@/i18n';

function MyComponent() {
  const { t, language, setLanguage } = useI18n();
  
  return (
    <div>
      <h1>{t('nav.home')}</h1>
      <p>Current language: {language}</p>
      <button onClick={() => setLanguage('de')}>Switch to German</button>
    </div>
  );
}
```

### Translation Function

The `t()` function accepts dot-notation keys:

```tsx
t('common.save')        // "Save" or "Speichern"
t('auth.signInTitle')   // "Welcome Back" or "Willkommen zurück"
t('dashboard.welcome')  // "Welcome back" or "Willkommen zurück"
```

## Adding a New Translation Key

1. **Add to English translations** (`en.ts`):
   ```ts
   export const en = {
     mySection: {
       myNewKey: "My English text",
     },
   };
   ```

2. **Add to German translations** (`de.ts`):
   ```ts
   export const de = {
     mySection: {
       myNewKey: "Mein deutscher Text",
     },
   };
   ```

3. **Use in your component**:
   ```tsx
   const { t } = useI18n();
   return <p>{t('mySection.myNewKey')}</p>;
   ```

## Adding a New Language

1. **Create a new translation file** (e.g., `fr.ts` for French):
   ```ts
   export const fr = {
     common: {
       appName: "Sinopia",
       loading: "Chargement...",
       // ... copy structure from en.ts and translate
     },
   };
   ```

2. **Update the Language type** in `index.tsx`:
   ```ts
   export type Language = 'en' | 'de' | 'fr';
   ```

3. **Import and add to translations object** in `index.tsx`:
   ```ts
   import { fr } from './fr';
   
   const translations = {
     en,
     de,
     fr,
   };
   ```

4. **Update the language switcher** components to include the new language option.

## Language Persistence

The selected language is stored in `localStorage` under the key `sinopia_language`. 
On app initialization, the language is read from storage. If no value exists, it defaults to English (`en`).

## Translation Key Structure

Keys are organized by page/section:

- `common` - Shared strings (save, cancel, loading, etc.)
- `nav` - Navigation labels
- `home` - Homepage content
- `auth` - Authentication pages
- `dashboard` - Dashboard content
- `projects` - Projects page
- `offers` - Offers page
- `contracts` - Contracts page
- `payments` - Payments page
- `profile` - Profile page
- `footer` - Footer content
- `about` - About page
- `contact` - Contact page
