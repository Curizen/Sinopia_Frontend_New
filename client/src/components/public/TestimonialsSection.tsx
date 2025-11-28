import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';

// todo: remove mock functionality
const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Full-Stack Developer',
    type: 'Skill Giver',
    rating: 5,
    quote: 'Sinopia has transformed my freelance career. I found consistent high-quality projects and doubled my income within 6 months.',
    initials: 'SC',
  },
  {
    id: 2,
    name: 'Michael Torres',
    role: 'CTO at TechFlow',
    type: 'Skill Searcher',
    rating: 5,
    quote: 'The quality of talent on Sinopia is exceptional. We built our entire mobile app with a team we found here.',
    initials: 'MT',
  },
  {
    id: 3,
    name: 'Emily Roberts',
    role: 'UX Designer',
    type: 'Skill Giver',
    rating: 5,
    quote: 'The platform is intuitive and the payment system is reliable. I love how Sinopia handles contracts and milestones.',
    initials: 'ER',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Success Stories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from professionals and companies who have achieved their goals with Sinopia.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative hover-elevate">
              <CardContent className="pt-6">
                <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} • {testimonial.type}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
