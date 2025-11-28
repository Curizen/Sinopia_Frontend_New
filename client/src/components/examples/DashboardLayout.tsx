import { AuthProvider } from '@/context/AuthContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { ProjectProvider } from '@/context/ProjectContext';
import { OfferProvider } from '@/context/OfferContext';
import { ContractProvider } from '@/context/ContractContext';
import { PaymentProvider } from '@/context/PaymentContext';
import DashboardPage from '@/pages/dashboard/DashboardPage';

export default function DashboardLayoutExample() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ProjectProvider>
          <OfferProvider>
            <ContractProvider>
              <PaymentProvider>
                <DashboardPage />
              </PaymentProvider>
            </ContractProvider>
          </OfferProvider>
        </ProjectProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
