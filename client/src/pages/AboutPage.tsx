import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Target, Heart, Users, Globe } from 'lucide-react';
import heroImage from '@assets/generated_images/team_collaboration_coworking_hero.png';

// todo: remove mock functionality
const team = [
  { name: 'Alex Rivera', role: 'CEO & Founder', initials: 'AR' },
  { name: 'Jordan Kim', role: 'CTO', initials: 'JK' },
  { name: 'Sam Patel', role: 'Head of Product', initials: 'SP' },
  { name: 'Taylor Chen', role: 'Head of Design', initials: 'TC' },
];

const values = [
  { icon: Target, title: 'Excellence', description: 'We strive for excellence in everything we do, from our platform to our support.' },
  { icon: Heart, title: 'Trust', description: 'Building trust between talent and companies is at the core of our mission.' },
  { icon: Users, title: 'Community', description: 'We foster a supportive community where professionals can thrive and grow.' },
  { icon: Globe, title: 'Accessibility', description: 'We believe talent is everywhere and should have equal opportunities globally.' },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      <div
        className="relative h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">About Sinopia</h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto px-4">
              Connecting talent with opportunity since 2020
            </p>
          </div>
        </div>
      </div>

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-display text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Sinopia was founded with a simple yet powerful vision: to create a marketplace where skilled professionals 
              and forward-thinking companies could connect seamlessly. We saw the gap between talented individuals seeking 
              meaningful work and organizations searching for the right expertise.
            </p>
            <p className="text-muted-foreground mb-4">
              Today, Sinopia serves thousands of professionals and companies worldwide, facilitating successful 
              collaborations across industries. Our platform combines intuitive design with powerful features to make 
              finding work or talent easier than ever.
            </p>
            <p className="text-muted-foreground">
              We believe that when the right talent meets the right opportunity, amazing things happen. That's why 
              we're committed to continuously improving our platform and supporting our community every step of the way.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="hover-elevate">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="hover-elevate">
                <CardContent className="pt-6 text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
