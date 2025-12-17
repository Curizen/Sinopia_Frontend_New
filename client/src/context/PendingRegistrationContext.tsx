import { createContext, useContext, useState, type ReactNode } from 'react';
import type { UserRole } from '@/lib/utils/constants';

type SignupStage = 'otp_pending' | 'cv_upload_required' | 'completed';

interface PendingRegistration {
  email: string;
  password: string;
  role: UserRole;
  otp: string;
  timestamp: number;
  stage: SignupStage;
  otpVerified: boolean;
  cvFile?: File | null;
}

interface PendingRegistrationContextType {
  pendingData: PendingRegistration | null;
  setPendingData: (data: PendingRegistration | null) => void;
  clearPendingData: () => void;
  generateOtp: () => string;
  resendOtp: () => string | null;
  setOtpVerified: () => void;
  setStage: (stage: SignupStage) => void;
  setOtpVerifiedAndStage: (stage: SignupStage) => void;
  setCvFile: (file: File) => void;
}

const PendingRegistrationContext = createContext<PendingRegistrationContextType | undefined>(undefined);

export function PendingRegistrationProvider({ children }: { children: ReactNode }) {
  const [pendingData, setPendingDataState] = useState<PendingRegistration | null>(null);

  // DEV ONLY: Mock OTP = 123456 (no backend/email)
  const generateOtp = () => {
    return '123456';
  };

  const setPendingData = (data: PendingRegistration | null) => {
    setPendingDataState(data);
  };

  const clearPendingData = () => {
    setPendingDataState(null);
  };

  // DEV ONLY: Mock OTP = 123456 (no backend/email)
  const resendOtp = () => {
    if (!pendingData) return null;
    const newOtp = '123456';
    setPendingDataState({
      ...pendingData,
      otp: newOtp,
      timestamp: Date.now(),
    });
    return newOtp;
  };

  const setOtpVerified = () => {
    if (!pendingData) return;
    setPendingDataState({
      ...pendingData,
      otpVerified: true,
    });
  };

  const setStage = (stage: SignupStage) => {
    if (!pendingData) return;
    setPendingDataState({
      ...pendingData,
      stage,
    });
  };

  const setOtpVerifiedAndStage = (stage: SignupStage) => {
    if (!pendingData) return;
    setPendingDataState({
      ...pendingData,
      otpVerified: true,
      stage,
    });
  };

  const setCvFile = (file: File) => {
    if (!pendingData) return;
    setPendingDataState({
      ...pendingData,
      cvFile: file,
    });
  };

  return (
    <PendingRegistrationContext.Provider
      value={{
        pendingData,
        setPendingData,
        clearPendingData,
        generateOtp,
        resendOtp,
        setOtpVerified,
        setStage,
        setOtpVerifiedAndStage,
        setCvFile,
      }}
    >
      {children}
    </PendingRegistrationContext.Provider>
  );
}

export function usePendingRegistration() {
  const context = useContext(PendingRegistrationContext);
  if (context === undefined) {
    throw new Error('usePendingRegistration must be used within a PendingRegistrationProvider');
  }
  return context;
}
