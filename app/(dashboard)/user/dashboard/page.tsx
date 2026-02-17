import SummaryCards from '@/app/components/dashboard/SummaryCards';
import CashFlowChart from '@/app/components/dashboard/CashFlowChart';
import CategoryLimits from '@/app/components/dashboard/CategoryLimits';
import HistoryTable from '@/app/components/dashboard/HistoryTable';

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Stats Cards */}
      <SummaryCards />

      {/* Middle Section: Chart + Limits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <CashFlowChart />
        <CategoryLimits />
      </div>

      {/* Bottom Section: Transactions Table */}
      <HistoryTable />

    </div>
  );
}
