import { PublicLayout } from '@/components/layouts/PublicLayout';
import { HeroSection } from '@/components/public/HeroSection';
import { FeaturesSection } from '@/components/public/FeaturesSection';
import { TestimonialsSection } from '@/components/public/TestimonialsSection';
import { CTASection } from '@/components/public/CTASection';

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </PublicLayout>
  );
}
