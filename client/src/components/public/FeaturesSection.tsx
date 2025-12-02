import { Card, CardContent } from '@/components/ui/card';
import { 
  UserCheck, 
  Search, 
  FileCheck, 
  CreditCard, 
  Shield, 
  Zap,
  Target,
  TrendingUp,
  Users,
  Briefcase,
  Clock,
  Award
} from 'lucide-react';

const skillGiverFeatures = [
  { icon: Target, title: 'Share Your Expertise', description: 'Bring your lifelong knowledge into meaningful, flexible projects.' },
  { icon: TrendingUp, title: 'UseCase Based Work', description: 'Get matched to targeted, modular Use Cases tailored to your skills not generic jobs.' },
  { icon: CreditCard, title: 'Fair & Secure Compensation', description: 'Receive transparent pricing and reliable payments based on effort and expertise.' },
];

const skillSearcherFeatures = [
  { icon: Users, title: 'Access Experienced Professionals', description: 'Find senior experts with verified skills, proven track records, and deep industry knowledge.' },
  { icon: Briefcase, title: 'AI Driven Matching', description: 'Receive tailored Use Case recommendations, skill mappings (ESCO), and effort estimations.' },
  { icon: Shield, title: 'Modular Project Delivery', description: 'Break work into clear tasks, milestones, and factory style processes for predictable outcomes.' },
];

const howItWorks = [
  { step: 1, icon: UserCheck, title: 'Create Your Profile, Define Your Expertise or Need', description: 'Create your profile and outline your skills or submit your project as a clear Use Case.' },
  { step: 2, icon: Search, title: 'Get Smart Matched', description: 'AI analyzes requirements and recommends the right experts or Use Cases based on skills and experience.' },
  { step: 3, icon: FileCheck, title: 'Collaborate with Clarity', description: 'Work through structured tasks and milestones, with transparent pricing and secure payment upon delivery.' },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold">For Skill Givers</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Retirees, senior experts, and professionals offering their experience.
            </p>
            <div className="space-y-4">
              {skillGiverFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold">For Skill Searchers</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Companies seeking precise expertise for tasks, processes, or projects.
            </p>
            <div className="space-y-4">
              {skillSearcherFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Getting started with Sinopia is easy. Follow these simple steps to begin your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {howItWorks.map((item, index) => (
            <div key={item.step} className="relative">
              {index < howItWorks.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
              )}
              <Card className="relative hover-elevate">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 relative">
                    <item.icon className="w-7 h-7 text-primary" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex flex-wrap justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span>Fast Matching</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
