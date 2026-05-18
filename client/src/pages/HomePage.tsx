import { PublicLayout } from '@/components/layouts/PublicLayout';
import { HeroSection } from '@/components/public/HeroSection';
import { FeaturesSection } from '@/components/public/FeaturesSection';
import { CTASection } from '@/components/public/CTASection';
import { ChatWidget } from '@/components/ChatWidget';

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <ChatWidget />
    </PublicLayout>
  );
}
