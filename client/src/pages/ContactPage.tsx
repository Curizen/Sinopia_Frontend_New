import { useState } from 'react';
import { Link } from 'wouter';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { useI18n } from '@/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const { toast } = useToast();
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!privacyAccepted) {
      toast({
        title: t('common.error'),
        description: t('privacy.agreeError'),
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: t('common.success'),
          description: t('contact.successMessage'),
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setPrivacyAccepted(false);
      } else {
        toast({
          title: t('common.error'),
          description: t('contact.errorMessage'),
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: t('common.error'),
        description: t('contact.errorMessage'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      <div className="bg-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">{t('contact.title')}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t('contact.sendButton')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t('contact.nameLabel')}</Label>
                        <Input
                          id="name"
                          placeholder={t('contact.namePlaceholder')}
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          required
                          data-testid="input-contact-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('contact.emailLabel')}</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t('contact.emailPlaceholder')}
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          required
                          data-testid="input-contact-email"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t('contact.subjectLabel')}</Label>
                      <Input
                        id="subject"
                        placeholder={t('contact.subjectPlaceholder')}
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        required
                        data-testid="input-contact-subject"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{t('contact.messageLabel')}</Label>
                      <Textarea
                        id="message"
                        placeholder={t('contact.messagePlaceholder')}
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        required
                        data-testid="input-contact-message"
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="privacy-checkbox-contact"
                        checked={privacyAccepted}
                        onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
                        data-testid="checkbox-privacy-contact"
                      />
                      <Label
                        htmlFor="privacy-checkbox-contact"
                        className="text-sm leading-relaxed cursor-pointer"
                      >
                        {t('privacy.agreeLabel').split(t('privacy.title')).map((part, i, arr) =>
                          i < arr.length - 1 ? (
                            <span key={i}>
                              {part}
                              <Link href="/privacy" className="text-primary hover:underline" data-testid="link-privacy-contact" target="_blank">
                                {t('privacy.title')}
                              </Link>
                            </span>
                          ) : (
                            <span key={i}>{part}</span>
                          )
                        )}
                      </Label>
                    </div>

                    <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting || !privacyAccepted} data-testid="button-contact-submit">
                      {isSubmitting ? t('common.loading') : t('contact.sendButton')}
                      <Send className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('contact.info.email')}</h3>
                      <p className="text-sm text-muted-foreground">info@sinopia.eu</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('contact.info.office')}</h3>
                      <p className="text-sm text-muted-foreground">
                        Sinopia Deutschland GmbH
                        <br />
                        Deckerstr. 39
                        <br />
                        70372 Stuttgart
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
