export default function CategoryLimits() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-6">Spending Limits</h3>

        <div className="space-y-6">
          {/* Food */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="flex items-center gap-2 text-slate-700">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span> Food
              </span>
              <span className="text-slate-800">$520 <span className="text-slate-400 font-normal">/ $800</span></span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5">
              <div className="bg-orange-400 h-2.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>

          {/* Shopping */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="flex items-center gap-2 text-slate-700">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Shopping
              </span>
              <span className="text-slate-800">$860 <span className="text-slate-400 font-normal">/ $1000</span></span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5">
              <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          {/* Transport */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="flex items-center gap-2 text-slate-700">
                <span className="w-2 h-2 rounded-full bg-teal-400"></span> Transport
              </span>
              <span className="text-slate-800">$210 <span className="text-slate-400 font-normal">/ $400</span></span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5">
              <div className="bg-teal-400 h-2.5 rounded-full" style={{ width: '50%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full mt-6 py-3 rounded-xl border border-indigo-100 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors">
        Manage Limits
      </button>
    </div>
  );
}