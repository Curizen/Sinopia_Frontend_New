import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { useOffers } from '@/context/OfferContext';
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
import { formatCurrency, formatDate, getStatusLabel } from '@/lib/utils/formatters';
import { Search, FileText, Check, X } from 'lucide-react';

export default function OffersPage() {
  const { user } = useAuth();
  const { offers, acceptOffer, rejectOffer } = useOffers();
  const { toast } = useToast();
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
        title: 'Offer accepted!',
        description: 'The contract will be created shortly.',
      });
    } else {
      rejectOffer(selectedOffer.id);
      toast({
        title: 'Offer rejected',
        description: 'The offer has been declined.',
      });
    }

    setSelectedOffer(null);
    setDialogAction(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">Offers</h1>
          <p className="text-muted-foreground">
            {isSkillGiver ? 'View offers you have sent' : 'Review and manage incoming offers'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search offers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-offers"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-offer-filter">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredOffers.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">No offers found</h3>
              <p className="text-muted-foreground">
                {searchQuery || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'No offers to display at the moment'}
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
                          {getStatusLabel(offer.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        From: <span className="font-medium text-foreground">{offer.fromUserName}</span>
                      </p>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {offer.message}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span>Sent: {formatDate(offer.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Offer Amount</p>
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
                            Accept
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
                            Reject
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
                {dialogAction === 'accept' ? 'Accept Offer' : 'Reject Offer'}
              </DialogTitle>
              <DialogDescription>
                {dialogAction === 'accept'
                  ? 'Are you sure you want to accept this offer? A contract will be created.'
                  : 'Are you sure you want to reject this offer? This action cannot be undone.'}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogAction(null)}>
                Cancel
              </Button>
              <Button
                variant={dialogAction === 'reject' ? 'destructive' : 'default'}
                onClick={handleAction}
                data-testid="button-confirm-action"
              >
                {dialogAction === 'accept' ? 'Accept' : 'Reject'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
