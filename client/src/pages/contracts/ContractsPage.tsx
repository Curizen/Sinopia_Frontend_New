import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { useContracts } from '@/context/ContractContext';
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
import { formatCurrency, formatDate, getStatusLabel } from '@/lib/utils/formatters';
import { Search, Handshake, FileSignature, Calendar, DollarSign } from 'lucide-react';

export default function ContractsPage() {
  const { user } = useAuth();
  const { contracts, signContract } = useContracts();
  const { toast } = useToast();
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedContract, setSelectedContract] = useState<typeof contracts[0] | null>(null);

  const isSkillGiver = user?.role === 'skill_giver';

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'signed':
        return 'default';
      case 'sent':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const handleSign = () => {
    if (!selectedContract) return;

    signContract(selectedContract.id);
    toast({
      title: 'Contract signed!',
      description: 'The contract is now active.',
    });
    setSelectedContract(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">{t('contracts.pageTitle')}</h1>
          <p className="text-muted-foreground">
            {t('contracts.pageSubtitle')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search contracts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-contracts"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-contract-filter">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="signed">Signed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredContracts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Handshake className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-2">No contracts found</h3>
              <p className="text-muted-foreground">
                {searchQuery || statusFilter !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'No contracts to display at the moment'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredContracts.map((contract) => (
              <Card key={contract.id} className="hover-elevate">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-semibold text-lg">{contract.projectTitle}</h3>
                        <Badge variant={getStatusBadgeVariant(contract.status)}>
                          {getStatusLabel(contract.status)}
                        </Badge>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2 text-sm mb-4">
                        <p className="text-muted-foreground">
                          Client: <span className="font-medium text-foreground">{contract.clientName}</span>
                        </p>
                        <p className="text-muted-foreground">
                          Freelancer: <span className="font-medium text-foreground">{contract.freelancerName}</span>
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {formatCurrency(contract.amount)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(contract.startDate)} - {formatDate(contract.endDate)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {contract.status === 'sent' && isSkillGiver && (
                        <Button
                          onClick={() => setSelectedContract(contract)}
                          data-testid={`button-sign-contract-${contract.id}`}
                        >
                          <FileSignature className="w-4 h-4 mr-2" />
                          Sign Contract
                        </Button>
                      )}
                      <Button variant="outline" data-testid={`button-view-contract-${contract.id}`}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={!!selectedContract} onOpenChange={() => setSelectedContract(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign Contract</DialogTitle>
              <DialogDescription>
                You are about to sign the contract for "{selectedContract?.projectTitle}". 
                This will make the contract legally binding.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <span className="text-sm text-muted-foreground">Contract Value</span>
                <span className="font-bold text-lg">{formatCurrency(selectedContract?.amount || 0)}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <span className="text-sm text-muted-foreground">Duration</span>
                <span className="font-medium">
                  {selectedContract && `${formatDate(selectedContract.startDate)} - ${formatDate(selectedContract.endDate)}`}
                </span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedContract(null)}>
                Cancel
              </Button>
              <Button onClick={handleSign} data-testid="button-confirm-sign">
                <FileSignature className="w-4 h-4 mr-2" />
                Sign Contract
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
