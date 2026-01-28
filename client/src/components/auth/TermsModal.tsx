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
import { TermsContent } from '@/components/TermsContent';

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
            Sinopia Deutschland GmbH
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 min-h-0 relative">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="h-[55vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent"
            data-testid="terms-scroll-container"
          >
            <TermsContent 
              content={t('terms.content')} 
              className="text-muted-foreground text-sm leading-relaxed"
            />

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
