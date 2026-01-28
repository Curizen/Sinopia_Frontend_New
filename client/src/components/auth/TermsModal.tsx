import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'wouter';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n';
import { ExternalLink } from 'lucide-react';

interface TermsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScrolledToBottom: () => void;
  hasScrolledToBottom: boolean;
}

export function TermsModal({
  open,
  onOpenChange,
  onScrolledToBottom,
  hasScrolledToBottom,
}: TermsModalProps) {
  const { t } = useI18n();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hasCheckedScroll, setHasCheckedScroll] = useState(false);

  const checkIfScrolledToBottom = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const nearBottom = scrollTop + clientHeight >= scrollHeight - 10;

    if (nearBottom && !hasScrolledToBottom) {
      onScrolledToBottom();
    }
  }, [hasScrolledToBottom, onScrolledToBottom]);

  const handleScroll = useCallback(() => {
    checkIfScrolledToBottom();
  }, [checkIfScrolledToBottom]);

  useEffect(() => {
    if (open && !hasCheckedScroll) {
      const timer = setTimeout(() => {
        checkIfScrolledToBottom();
        setHasCheckedScroll(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open, hasCheckedScroll, checkIfScrolledToBottom]);

  useEffect(() => {
    if (!open) {
      setHasCheckedScroll(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{t('terms.title')}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {t('terms.companyName')}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 min-h-0 relative">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="h-[55vh] overflow-y-auto pr-4 space-y-6 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
            data-testid="terms-scroll-container"
          >
            <p className="text-sm text-muted-foreground">
              {t('terms.lastUpdated')}
            </p>

            <section>
              <h3 className="font-semibold text-lg mb-2">{t('terms.section1Title')}</h3>
              <p className="text-muted-foreground mb-2">{t('terms.section1Text1')}</p>
              <p className="text-muted-foreground mb-2">{t('terms.section1Text2')}</p>
              <p className="text-muted-foreground">{t('terms.section1Text3')}</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">{t('terms.section2Title')}</h3>
              <p className="text-muted-foreground mb-2">{t('terms.section2Text1')}</p>
              <p className="text-muted-foreground mb-2">{t('terms.section2Text2')}</p>
              <p className="text-muted-foreground">{t('terms.section2Text3')}</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">{t('terms.section3Title')}</h3>
              <p className="text-muted-foreground mb-2">{t('terms.section3Text1')}</p>
              <p className="text-muted-foreground mb-2">{t('terms.section3Text2')}</p>
              <p className="text-muted-foreground">{t('terms.section3Text3')}</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">{t('terms.section4Title')}</h3>
              <p className="text-muted-foreground mb-2">{t('terms.section4Text1')}</p>
              <p className="text-muted-foreground mb-2">{t('terms.section4Text2')}</p>
              <p className="text-muted-foreground">{t('terms.section4Text3')}</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">{t('terms.section5Title')}</h3>
              <p className="text-muted-foreground mb-2">{t('terms.section5Text1')}</p>
              <p className="text-muted-foreground mb-2">{t('terms.section5Text2')}</p>
              <p className="text-muted-foreground mb-2">{t('terms.section5Text3')}</p>
              <p className="text-muted-foreground">{t('terms.section5Text4')}</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">{t('terms.section6Title')}</h3>
              <p className="text-muted-foreground mb-2">{t('terms.section6Text1')}</p>
              <p className="text-muted-foreground mb-2">{t('terms.section6Text2')}</p>
              <p className="text-muted-foreground">{t('terms.section6Text3')}</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">{t('terms.section7Title')}</h3>
              <p className="text-muted-foreground mb-2">{t('terms.section7Text1')}</p>
              <p className="text-muted-foreground mb-2">{t('terms.section7Text2')}</p>
              <p className="text-muted-foreground">{t('terms.section7Text3')}</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">{t('terms.section8Title')}</h3>
              <p className="text-muted-foreground mb-2">{t('terms.section8Text1')}</p>
              <p className="text-muted-foreground mb-2">{t('terms.section8Text2')}</p>
              <p className="text-muted-foreground">{t('terms.section8Text3')}</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">{t('terms.section9Title')}</h3>
              <p className="text-muted-foreground mb-2">{t('terms.section9Text1')}</p>
              <p className="text-muted-foreground mb-2">{t('terms.section9Text2')}</p>
              <p className="text-muted-foreground">{t('terms.section9Text3')}</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">{t('terms.section10Title')}</h3>
              <p className="text-muted-foreground mb-2">{t('terms.section10Text1')}</p>
              <p className="text-muted-foreground mb-2">{t('terms.section10Text2')}</p>
              <p className="text-muted-foreground">{t('terms.section10Text3')}</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">{t('terms.section11Title')}</h3>
              <p className="text-muted-foreground mb-2">{t('terms.section11Text1')}</p>
              <p className="text-muted-foreground mb-2">{t('terms.section11Text2')}</p>
              <p className="text-muted-foreground">{t('terms.section11Text3')}</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">{t('terms.section12Title')}</h3>
              <p className="text-muted-foreground mb-2">{t('terms.section12Text1')}</p>
              <p className="text-muted-foreground mb-2">{t('terms.section12Text2')}</p>
              <p className="text-muted-foreground">{t('terms.section12Text3')}</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">{t('terms.section13Title')}</h3>
              <p className="text-muted-foreground mb-2">{t('terms.section13Text1')}</p>
              <p className="text-muted-foreground mb-2">{t('terms.section13Text2')}</p>
              <p className="text-muted-foreground">{t('terms.section13Text3')}</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">{t('terms.section14Title')}</h3>
              <p className="text-muted-foreground mb-2">{t('terms.section14Text1')}</p>
              <p className="text-muted-foreground mb-2">{t('terms.section14Text2')}</p>
              <p className="text-muted-foreground">{t('terms.section14Text3')}</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">{t('terms.section15Title')}</h3>
              <p className="text-muted-foreground mb-2">{t('terms.section15Text1')}</p>
              <p className="text-muted-foreground mb-2">{t('terms.section15Text2')}</p>
              <p className="text-muted-foreground">{t('terms.section15Text3')}</p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">{t('terms.section16Title')}</h3>
              <p className="text-muted-foreground mb-2">{t('terms.section16Text1')}</p>
              <p className="text-muted-foreground mb-2">{t('terms.section16Text2')}</p>
              <p className="text-muted-foreground mb-2">{t('terms.section16Text3')}</p>
              <p className="text-muted-foreground">{t('terms.section16Text4')}</p>
            </section>

            <div className="pt-4 pb-2">
              <Link
                href="/terms"
                className="text-primary hover:underline inline-flex items-center gap-1 text-sm"
                data-testid="link-full-terms"
                onClick={() => onOpenChange(false)}
              >
                {t('terms.openFullTerms')}
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {!hasScrolledToBottom && (
          <p className="text-sm text-muted-foreground text-center py-2">
            {t('terms.scrollToAccept')}
          </p>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="button-terms-close"
          >
            {t('terms.closeButton')}
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            disabled={!hasScrolledToBottom}
            data-testid="button-terms-accept"
          >
            {t('terms.acceptButton')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
