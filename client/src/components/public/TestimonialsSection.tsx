import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useI18n } from '@/i18n';
import { Star, Quote } from 'lucide-react';

function getInitials(name: string): string {
  const words = name.split(' ');
  if (words.length >= 2) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

export function TestimonialsSection() {
  const { t, language } = useI18n();

  const testimonials = useMemo(() => {
    const person1Name = t('home.testimonials.mock.person1Name');
    const person2Name = t('home.testimonials.mock.person2Name');
    const person3Name = t('home.testimonials.mock.person3Name');

    return [
      {
        id: 1,
        name: person1Name,
        role: t('home.testimonials.mock.person1Role'),
        type: t('home.testimonials.mock.person1Type'),
        rating: 5,
        quote: t('home.testimonials.mock.person1Quote'),
        initials: getInitials(person1Name),
      },
      {
        id: 2,
        name: person2Name,
        role: t('home.testimonials.mock.person2Role'),
        type: t('home.testimonials.mock.person2Type'),
        rating: 5,
        quote: t('home.testimonials.mock.person2Quote'),
        initials: getInitials(person2Name),
      },
      {
        id: 3,
        name: person3Name,
        role: t('home.testimonials.mock.person3Role'),
        type: t('home.testimonials.mock.person3Type'),
        rating: 5,
        quote: t('home.testimonials.mock.person3Quote'),
        initials: getInitials(person3Name),
      },
    ];
  }, [language, t]);
  
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            {t('home.testimonials.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('home.testimonials.subtitle')}
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
