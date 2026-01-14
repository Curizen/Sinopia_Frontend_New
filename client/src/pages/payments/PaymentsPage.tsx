import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { usePayments } from '@/context/PaymentContext';
import { useI18n } from '@/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency, formatDate } from '@/lib/utils/formatters';
import { Search, CreditCard, DollarSign, TrendingUp, Clock } from 'lucide-react';

export default function PaymentsPage() {
  const { user } = useAuth();
  const { invoices, payments } = usePayments();
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const isSkillGiver = user?.role === 'skill_giver';

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0);
  const totalOverdue = invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'default';
      case 'pending':
        return 'outline';
      case 'overdue':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-display font-bold">
            {isSkillGiver ? t('payments.titleGiver') : t('payments.titleSearcher')}
          </h1>
          <p className="text-muted-foreground">
            {isSkillGiver ? t('payments.subtitleGiver') : t('payments.subtitleSearcher')}
          </p>
        </div>


        <div className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {isSkillGiver ? t('payments.totalEarned') : t('payments.totalPaid')}
                  </p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('payments.pending')}</p>
                  <p className="text-2xl font-bold text-yellow-600">{formatCurrency(totalPending)}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t('payments.overdue')}</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(totalOverdue)}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="invoices">
          <TabsList>
            <TabsTrigger value="invoices" data-testid="tab-invoices">{t('payments.invoices')}</TabsTrigger>
            <TabsTrigger value="payments" data-testid="tab-payments">{t('payments.paymentHistory')}</TabsTrigger>
          </TabsList>

          <TabsContent value="invoices" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={t('payments.searchInvoices')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-invoices"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-invoice-filter">
                  <SelectValue placeholder={t('payments.filterByStatus')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('payments.allStatus')}</SelectItem>
                  <SelectItem value="pending">{t('payments.pending')}</SelectItem>
                  <SelectItem value="paid">{t('payments.paid')}</SelectItem>
                  <SelectItem value="overdue">{t('payments.overdue')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredInvoices.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{t('payments.noInvoicesFound')}</h3>
                  <p className="text-muted-foreground">
                    {searchQuery || statusFilter !== 'all'
                      ? t('payments.adjustFilters')
                      : t('payments.noInvoicesToDisplay')}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredInvoices.map((invoice) => (
                  <Card key={invoice.id} className="hover-elevate">
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{invoice.projectTitle}</h3>
                            <Badge variant={getStatusBadgeVariant(invoice.status)}>
                              {t(`status.${invoice.status}`)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {t('payments.due')}: {formatDate(invoice.dueDate)}
                            {invoice.paidDate && ` • ${t('payments.paidOn')}: ${formatDate(invoice.paidDate)}`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">{formatCurrency(invoice.amount)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            {payments.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <DollarSign className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{t('payments.noPayments')}</h3>
                  <p className="text-muted-foreground">
                    {t('payments.paymentHistoryWillAppear')}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>{t('payments.recentPayments')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {payments.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border"
                      >
                        <div>
                          <h4 className="font-medium">{payment.projectTitle}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(payment.date)} • {payment.method}
                          </p>
                        </div>
                        <p className="font-bold text-green-600">
                          +{formatCurrency(payment.amount)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
