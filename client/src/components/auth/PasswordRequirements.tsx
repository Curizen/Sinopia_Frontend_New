import { Check, X } from 'lucide-react';
import { useI18n } from '@/i18n';

interface PasswordValidation {
  minLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export function validatePassword(password: string): PasswordValidation {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>+]/.test(password),
  };
}

export function isPasswordValid(password: string): boolean {
  const validation = validatePassword(password);
  return validation.minLength && validation.hasUppercase && validation.hasNumber && validation.hasSpecialChar;
}

interface PasswordRequirementsProps {
  password: string;
}

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const { t } = useI18n();
  const validation = validatePassword(password);

  const requirements = [
    { key: 'minLength', label: t('auth.passwordValidation.minLength'), met: validation.minLength },
    { key: 'hasUppercase', label: t('auth.passwordValidation.uppercase'), met: validation.hasUppercase },
    { key: 'hasNumber', label: t('auth.passwordValidation.number'), met: validation.hasNumber },
    { key: 'hasSpecialChar', label: t('auth.passwordValidation.specialChar'), met: validation.hasSpecialChar },
  ];

  return (
    <div className="space-y-1 mt-2" data-testid="password-requirements">
      {requirements.map((req) => (
        <div
          key={req.key}
          className={`flex items-center gap-2 text-xs ${
            req.met ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
          }`}
          data-testid={`password-req-${req.key}`}
        >
          {req.met ? (
            <Check className="w-3 h-3" />
          ) : (
            <X className="w-3 h-3" />
          )}
          <span>{req.label}</span>
        </div>
      ))}
    </div>
  );
}
