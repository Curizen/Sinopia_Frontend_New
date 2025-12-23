import { UnderDevelopment } from '@/components/common/UnderDevelopment';

export default function UnderDevelopmentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <UnderDevelopment showBackButton={true} />
    </div>
  );
}
