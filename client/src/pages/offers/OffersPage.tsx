import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { useOffers } from '@/context/OfferContext';
import { useI18n } from '@/i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';
import { Search, FileText, Check, X } from 'lucide-react';

export default function OffersPage() {
  const { user } = useAuth();
  const { offers, acceptOffer, rejectOffer } = useOffers();
  const { toast } = useToast();
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOffer, setSelectedOffer] = useState<typeof offers[0] | null>(null);
  const [dialogAction, setDialogAction] = useState<'accept' | 'reject' | null>(null);

  const isSkillGiver = user?.role === 'skill_giver';

  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.fromUserName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || offer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const handleAction = () => {
    if (!selectedOffer || !dialogAction) return;

    if (dialogAction === 'accept') {
      acceptOffer(selectedOffer.id);
      toast({
        title: t('offers.offerAccepted'),
        description: t('offers.offerAcceptedDesc'),
      });
    } else {
      rejectOffer(selectedOffer.id);
      toast({
        title: t('offers.offerRejected'),
        description: t('offers.offerRejectedDesc'),
      });
    }

    setSelectedOffer(null);
    setDialogAction(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">{t('offers.pageTitle')}</h1>
          <p className="text-muted-foreground">
            {isSkillGiver ? t('offers.subtitleGiver') : t('offers.subtitleSearcher')}
          </p>
        </div>


        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t('offers.searchOffers')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-offers"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-offer-filter">
              <SelectValue placeholder={t('offers.filterByStatus')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('offers.allStatus')}</SelectItem>
              <SelectItem value="pending">{t('offers.pending')}</SelectItem>
              <SelectItem value="accepted">{t('offers.accepted')}</SelectItem>
              <SelectItem value="rejected">{t('offers.rejected')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredOffers.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">{t('offers.noOffersFound')}</h3>
              <p className="text-muted-foreground">
                {searchQuery || statusFilter !== 'all'
                  ? t('offers.adjustFilters')
                  : t('offers.noOffersToDisplay')}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredOffers.map((offer) => (
              <Card key={offer.id} className="hover-elevate">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-semibold text-lg">{offer.projectTitle}</h3>
                        <Badge variant={getStatusBadgeVariant(offer.status)}>
                          {t(`status.${offer.status}`)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {t('offers.from')}: <span className="font-medium text-foreground">{offer.fromUserName}</span>
                      </p>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {offer.message}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span>{t('offers.sent')}: {formatDate(offer.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{t('offers.offerAmount')}</p>
                        <p className="text-xl font-bold text-primary">
                          {formatCurrency(offer.amount)}
                        </p>
                      </div>
                      {!isSkillGiver && offer.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedOffer(offer);
                              setDialogAction('accept');
                            }}
                            data-testid={`button-accept-offer-${offer.id}`}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            {t('offers.accept')}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedOffer(offer);
                              setDialogAction('reject');
                            }}
                            data-testid={`button-reject-offer-${offer.id}`}
                          >
                            <X className="w-4 h-4 mr-1" />
                            {t('offers.reject')}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={!!dialogAction} onOpenChange={() => setDialogAction(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {dialogAction === 'accept' ? t('offers.acceptOffer') : t('offers.rejectOffer')}
              </DialogTitle>
              <DialogDescription>
                {dialogAction === 'accept'
                  ? t('offers.acceptConfirmDesc')
                  : t('offers.rejectConfirmDesc')}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogAction(null)}>
                {t('common.cancel')}
              </Button>
              <Button
                variant={dialogAction === 'reject' ? 'destructive' : 'default'}
                onClick={handleAction}
                data-testid="button-confirm-action"
              >
                {dialogAction === 'accept' ? t('offers.accept') : t('offers.reject')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
