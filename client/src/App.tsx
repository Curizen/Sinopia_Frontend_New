import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/i18n";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { PendingRegistrationProvider } from "@/context/PendingRegistrationContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { ProjectProvider } from "@/context/ProjectContext";
import { OfferProvider } from "@/context/OfferContext";
import { ContractProvider } from "@/context/ContractContext";
import { PaymentProvider } from "@/context/PaymentContext";

import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";
import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import OTPVerificationPage from "@/pages/auth/OTPVerificationPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import VerifyOtpPage from "@/pages/auth/VerifyOtpPage";
import CVUploadPage from "@/pages/auth/CVUploadPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import ProjectsPage from "@/pages/projects/ProjectsPage";
import ProjectDetailPage from "@/pages/projects/ProjectDetailPage";
import AddProjectPage from "@/pages/projects/AddProjectPage";
import OffersPage from "@/pages/offers/OffersPage";
import ContractsPage from "@/pages/contracts/ContractsPage";
import PaymentsPage from "@/pages/payments/PaymentsPage";
import NotificationsPage from "@/pages/notifications/NotificationsPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import NotFound from "@/pages/not-found";

function PrivateRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/sign-in" />;
  }

  return <Component />;
}

function PublicOnlyRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/privacy" component={PrivacyPage} />
      
      <Route path="/sign-in">
        <PublicOnlyRoute component={SignInPage} />
      </Route>
      <Route path="/sign-up">
        <PublicOnlyRoute component={SignUpPage} />
      </Route>
      <Route path="/forgot-password">
        <PublicOnlyRoute component={ForgotPasswordPage} />
      </Route>
      <Route path="/otp-verification">
        <PublicOnlyRoute component={OTPVerificationPage} />
      </Route>
      <Route path="/reset-password">
        <PublicOnlyRoute component={ResetPasswordPage} />
      </Route>
      <Route path="/verify-otp">
        <PublicOnlyRoute component={VerifyOtpPage} />
      </Route>
      <Route path="/sign-up/cv">
        <PublicOnlyRoute component={CVUploadPage} />
      </Route>

      <Route path="/dashboard">
        <PrivateRoute component={DashboardPage} />
      </Route>
      <Route path="/projects">
        <PrivateRoute component={ProjectsPage} />
      </Route>
      <Route path="/projects/new">
        <PrivateRoute component={AddProjectPage} />
      </Route>
      <Route path="/projects/:id">
        <PrivateRoute component={ProjectDetailPage} />
      </Route>
      <Route path="/offers">
        <PrivateRoute component={OffersPage} />
      </Route>
      <Route path="/contracts">
        <PrivateRoute component={ContractsPage} />
      </Route>
      <Route path="/payments">
        <PrivateRoute component={PaymentsPage} />
      </Route>
      <Route path="/notifications">
        <PrivateRoute component={NotificationsPage} />
      </Route>
      <Route path="/profile">
        <PrivateRoute component={ProfilePage} />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <I18nProvider>
          <AuthProvider>
            <PendingRegistrationProvider>
              <NotificationProvider>
              <ProjectProvider>
                <OfferProvider>
                  <ContractProvider>
                    <PaymentProvider>
                      <Toaster />
                      <Router />
                    </PaymentProvider>
                  </ContractProvider>
                </OfferProvider>
              </ProjectProvider>
              </NotificationProvider>
            </PendingRegistrationProvider>
          </AuthProvider>
        </I18nProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
