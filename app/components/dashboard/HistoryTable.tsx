type TransactionRow = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  amount: string;
  status: "Success" | "Pending";
  icon: string;
  theme: string;
};

type HistoryTableProps = {
  transactions: TransactionRow[];
};

export default function HistoryTable({ transactions }: HistoryTableProps) {

  const getThemeClasses = (theme: string) => {
    const map: Record<string, string> = {
      orange: "bg-orange-50 text-orange-600 group-hover:bg-orange-100 group-hover:shadow-orange-200",
      emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 group-hover:shadow-emerald-200",
      indigo: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 group-hover:shadow-indigo-200",
      violet: "bg-violet-50 text-violet-600 group-hover:bg-violet-100 group-hover:shadow-violet-200",
      rose: "bg-rose-50 text-rose-600 group-hover:bg-rose-100 group-hover:shadow-rose-200",
    };

    return map[theme] || map.indigo;
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-slate-50 flex justify-between items-center bg-gradient-to-r from-white to-slate-50/50">
        <div className="flex items-center gap-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-800">
            Recent Transactions
          </h3>
          <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {transactions.length}
          </span>
        </div>
        <div className="flex gap-2">
          <button className="hidden sm:flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-50">
            <span className="material-symbols-rounded text-sm">filter_list</span>
            Filter
          </button>
          <button className="flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors px-2 sm:px-3 py-1.5 rounded-lg">
            <span className="material-symbols-rounded text-sm">download</span>
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px] sm:min-w-0">
          <thead>
            <tr className="border-b border-slate-50 text-slate-400 text-[10px] sm:text-xs uppercase tracking-wider bg-slate-50/30">
              <th className="p-4 sm:p-5 font-semibold pl-6">Transaction</th>
              <th className="p-4 sm:p-5 font-semibold hidden md:table-cell">Category</th>
              <th className="p-4 sm:p-5 font-semibold hidden sm:table-cell">Date</th>
              <th className="p-4 sm:p-5 font-semibold text-right">Amount</th>
              <th className="p-4 sm:p-5 font-semibold text-center pr-6">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {transactions.map((item) => (
              <tr
                key={item.id}
                className="group hover:bg-indigo-50/30 transition-all duration-300 ease-in-out cursor-pointer"
              >
                {/* 1. Transaction Name & Icon */}
                <td className="p-4 sm:p-5 pl-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md ${getThemeClasses(item.theme)}`}
                    >
                      <span className="material-symbols-rounded text-lg sm:text-xl">
                        {item.icon}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm sm:text-base text-slate-700 group-hover:text-indigo-900 transition-colors truncate">
                        {item.title}
                      </p>
                      <p className="text-[10px] sm:text-xs text-slate-400 font-medium truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4 sm:p-5 hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-indigo-400 transition-colors"></span>
                    <span className="text-sm font-medium text-slate-500">
                      {item.category}
                    </span>
                  </div>
                </td>

                <td className="p-4 sm:p-5 text-sm font-medium text-slate-500 hidden sm:table-cell">
                  {new Date(item.date).toLocaleDateString()}
                </td>

                <td className="p-4 sm:p-5 text-right">
                  <span
                    className={`font-bold text-sm sm:text-base ${item.amount.includes("+") ? "text-emerald-600" : "text-slate-800"}`}
                  >
                    {item.amount}
                  </span>
                </td>

                <td className="p-4 sm:p-5 text-center pr-6">
                  {item.status === "Success" ? (
                    <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-emerald-100">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500"></span>
                      Success
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-amber-100">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      Pending
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="p-4 border-t border-slate-50 bg-slate-50/30 flex justify-center">
        <button className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors flex items-center gap-1">
          View All Transactions
          <span className="material-symbols-rounded text-base">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
