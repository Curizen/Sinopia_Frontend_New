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
  { icon: Target, title: 'Find Projects', description: 'Access thousands of projects matching your skills and expertise.' },
  { icon: TrendingUp, title: 'Build Portfolio', description: 'Showcase your work and grow your professional reputation.' },
  { icon: CreditCard, title: 'Get Paid Securely', description: 'Receive payments on time with our secure payment system.' },
];

const skillSearcherFeatures = [
  { icon: Users, title: 'Access Top Talent', description: 'Find verified professionals with proven track records.' },
  { icon: Briefcase, title: 'Manage Projects', description: 'Track progress with milestones, stages, and task management.' },
  { icon: Shield, title: 'Quality Guaranteed', description: 'Work with vetted talent and secure contract protection.' },
];

const howItWorks = [
  { step: 1, icon: UserCheck, title: 'Create Your Profile', description: 'Sign up and showcase your skills or post your project requirements.' },
  { step: 2, icon: Search, title: 'Find the Perfect Match', description: 'Browse talent or projects and connect with the right people.' },
  { step: 3, icon: FileCheck, title: 'Collaborate Securely', description: 'Use contracts, milestones, and our secure payment system.' },
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
              Freelancers and professionals looking to showcase their expertise and find exciting projects.
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
              Companies and teams seeking talented professionals for their projects and goals.
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
