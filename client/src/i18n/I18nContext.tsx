import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { en } from './en';
import { de } from './de';

export type Language = 'en' | 'de';

const STORAGE_KEY = 'sinopia_language';

const translations = {
  en,
  de,
} as const;

type TranslationValue = string | Record<string, unknown>;

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
  if (typeof window === 'undefined') return 'de';
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'de') {
    return stored;
  }
  
  return 'de';
}

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
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
