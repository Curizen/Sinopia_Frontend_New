/**
 * Sinopia Internationalization (i18n) System
 * 
 * This module provides multi-language support for the Sinopia application.
 * 
 * USAGE:
 * 
 * 1. Import the hook in your component:
 *    import { useI18n } from '@/i18n';
 * 
 * 2. Use the t() function to get translated strings:
 *    const { t, language, setLanguage } = useI18n();
 *    return <h1>{t('home.heroTitle')}</h1>;
 * 
 * 3. Change language:
 *    setLanguage('de'); // Switch to German
 *    setLanguage('en'); // Switch to English
 * 
 * ADDING NEW TRANSLATIONS:
 * 
 * 1. Add the key to both en.ts and de.ts with the same path
 * 2. Use dot notation for nested keys: 'section.key'
 * 
 * ADDING A NEW LANGUAGE:
 * 
 * 1. Create a new file (e.g., fr.ts) with the same structure as en.ts
 * 2. Import it in this file and add to the translations object
 * 3. Update the Language type to include the new language code
 */

export { I18nProvider, useI18n, type Language } from './I18nContext';
export { en, type TranslationKeys } from './en';
export { de } from './de';
