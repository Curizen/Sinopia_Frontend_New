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

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { en, type TranslationKeys } from './en';
import { de } from './de';

export type Language = 'en' | 'de';
export type { TranslationKeys };

const STORAGE_KEY = 'sinopia_language';

const translations = {
  en,
  de,
} as const;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  
  return typeof current === 'string' ? current : path;
}

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'de') {
    return stored;
  }
  
  return 'en';
}

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps): JSX.Element {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'de') {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const t = (key: string): string => {
    const translation = translations[language];
    return getNestedValue(translation as unknown as Record<string, unknown>, key);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
