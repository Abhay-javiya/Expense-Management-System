type CategoryLimitItem = {
  name: string;
  amount: number;
  percent: number;
  color: "orange" | "indigo" | "teal";
};

type CategoryLimitsProps = {
  total: number;
  items: CategoryLimitItem[];
  formatMoney: (value: number) => string;
};

export default function CategoryLimits({
  total,
  items,
  formatMoney,
}: CategoryLimitsProps) {
  const colorMap: Record<CategoryLimitItem["color"], string> = {
    orange: "bg-orange-400",
    indigo: "bg-indigo-500",
    teal: "bg-teal-400",
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-6">
          Top Expense Categories
        </h3>

        {items.length === 0 ? (
          <div className="text-sm text-slate-500">
            No expense data yet.
          </div>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span className="flex items-center gap-2 text-slate-700">
                    <span
                      className={`w-2 h-2 rounded-full ${colorMap[item.color]}`}
                    ></span>
                    {item.name}
                  </span>
                  <span className="text-slate-800">
                    {formatMoney(item.amount)}{" "}
                    <span className="text-slate-400 font-normal">
                      / {formatMoney(total)}
                    </span>
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div
                    className={`${colorMap[item.color]} h-2.5 rounded-full`}
                    style={{ width: `${Math.min(item.percent, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="w-full mt-6 py-3 rounded-xl border border-indigo-100 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors">
        View All Categories
      </button>
    </div>
  );
}
