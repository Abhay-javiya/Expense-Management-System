"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import SummaryCards from "@/app/components/dashboard/SummaryCards";
import CashFlowChart from "@/app/components/dashboard/CashFlowChart";
import CategoryLimits from "@/app/components/dashboard/CategoryLimits";
import HistoryTable from "@/app/components/dashboard/HistoryTable";

export default function DashboardPage() {
  const [incomes, setIncomes] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [incomeRes, expenseRes] = await Promise.all([
          axios.get("/api/incomes"),
          axios.get("/api/expenses"),
        ]);
        setIncomes(incomeRes.data.data || []);
        setExpenses(expenseRes.data.data || []);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const formatMoney = (value: number) =>
    `$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const totals = useMemo(() => {
    const totalIncome = incomes.reduce(
      (sum, i) => sum + Number(i.Amount || 0),
      0
    );
    const totalExpense = expenses.reduce(
      (sum, e) => sum + Number(e.Amount || 0),
      0
    );

    const balance = totalIncome - totalExpense;
    return { totalIncome, totalExpense, balance };
  }, [incomes, expenses]);

  const monthBuckets = useMemo(() => {
    const now = new Date();
    const months = Array.from({ length: 6 }).map((_, idx) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - idx), 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      return {
        key,
        label: d.toLocaleString("en-US", { month: "short" }),
      };
    });

    const incomeByMonth: Record<string, number> = {};
    const expenseByMonth: Record<string, number> = {};

    incomes.forEach((i) => {
      const d = new Date(i.IncomeDate);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      incomeByMonth[key] = (incomeByMonth[key] || 0) + Number(i.Amount || 0);
    });

    expenses.forEach((e) => {
      const d = new Date(e.ExpenseDate);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      expenseByMonth[key] = (expenseByMonth[key] || 0) + Number(e.Amount || 0);
    });

    return {
      labels: months.map((m) => m.label),
      incomeSeries: months.map((m) => incomeByMonth[m.key] || 0),
      expenseSeries: months.map((m) => expenseByMonth[m.key] || 0),
      monthKeys: months.map((m) => m.key),
    };
  }, [incomes, expenses]);

  const summaryDelta = useMemo(() => {
    const keys = monthBuckets.monthKeys;
    if (keys.length < 2) return { balance: 0, income: 0, expense: 0 };

    const currentKey = keys[keys.length - 1];
    const prevKey = keys[keys.length - 2];

    const sumByKey = (items: any[], dateKey: string, field: string) =>
      items
        .filter((x) => {
          const d = new Date(x[field]);
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
            2,
            "0"
          )}`;
          return key === dateKey;
        })
        .reduce((sum, x) => sum + Number(x.Amount || 0), 0);

    const incomeNow = sumByKey(incomes, currentKey, "IncomeDate");
    const incomePrev = sumByKey(incomes, prevKey, "IncomeDate");
    const expenseNow = sumByKey(expenses, currentKey, "ExpenseDate");
    const expensePrev = sumByKey(expenses, prevKey, "ExpenseDate");

    const balanceNow = incomeNow - expenseNow;
    const balancePrev = incomePrev - expensePrev;

    const percent = (now: number, prev: number) =>
      prev === 0 ? 0 : ((now - prev) / prev) * 100;

    return {
      balance: percent(balanceNow, balancePrev),
      income: percent(incomeNow, incomePrev),
      expense: percent(expenseNow, expensePrev),
    };
  }, [monthBuckets.monthKeys, incomes, expenses]);

  const categorySpending = useMemo(() => {
    const byCategory: Record<string, number> = {};
    expenses.forEach((e) => {
      const name = e.categories?.CategoryName || "Uncategorized";
      byCategory[name] = (byCategory[name] || 0) + Number(e.Amount || 0);
    });

    const total = Object.values(byCategory).reduce((a, b) => a + b, 0);

    const colors = ["orange", "indigo", "teal"];
    const items = Object.entries(byCategory)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, amount], idx) => ({
        name,
        amount,
        percent: total > 0 ? (amount / total) * 100 : 0,
        color: colors[idx % colors.length] as "orange" | "indigo" | "teal",
      }));

    return { total, items };
  }, [expenses]);

  const history = useMemo(() => {
    const incomeRows = incomes.map((i) => ({
      id: `inc-${i.IncomeID}`,
      title: i.peoples?.PeopleName || i.categories?.CategoryName || "Income",
      subtitle: i.IncomeDetail || i.Description || "Income",
      category: i.categories?.CategoryName || "Income",
      date: i.IncomeDate,
      amount: `+${formatMoney(Number(i.Amount || 0))}`,
      status: "Success" as const,
      icon: "payments",
      theme: "emerald",
    }));

    const expenseRows = expenses.map((e) => ({
      id: `exp-${e.ExpenseID}`,
      title: e.peoples?.PeopleName || e.categories?.CategoryName || "Expense",
      subtitle: e.ExpenseDetail || e.Description || "Expense",
      category: e.categories?.CategoryName || "Expense",
      date: e.ExpenseDate,
      amount: `-${formatMoney(Number(e.Amount || 0))}`,
      status: "Success" as const,
      icon: "credit_card",
      theme: "rose",
    }));

    return ([...incomeRows, ...expenseRows] as any[])
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 8);
  }, [incomes, expenses]);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="h-32 sm:h-40 rounded-3xl bg-slate-200/70"></div>
          <div className="h-32 sm:h-40 rounded-3xl bg-slate-200/70"></div>
          <div className="h-32 sm:h-40 rounded-3xl bg-slate-200/70"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="h-72 sm:h-96 rounded-3xl bg-slate-200/70 lg:col-span-2"></div>
          <div className="h-72 sm:h-96 rounded-3xl bg-slate-200/70"></div>
        </div>

        <div className="h-72 sm:h-96 rounded-3xl bg-slate-200/70"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-1 mb-2">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Financial Overview</h1>
        <p className="text-sm text-slate-500 font-medium">Get a real-time perspective on your cash flow and top spending categories.</p>
      </div>

      {/* Top Stats Cards */}
      <SummaryCards
        totalBalance={totals.balance}
        totalIncome={totals.totalIncome}
        totalExpense={totals.totalExpense}
        balanceDelta={summaryDelta.balance}
        incomeDelta={summaryDelta.income}
        expenseDelta={summaryDelta.expense}
      />

      {/* Middle Section: Chart + Limits */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <CashFlowChart
          labels={monthBuckets.labels}
          incomeSeries={monthBuckets.incomeSeries}
          expenseSeries={monthBuckets.expenseSeries}
        />
        <CategoryLimits
          total={categorySpending.total}
          items={categorySpending.items}
          formatMoney={formatMoney}
        />
      </div>

      {/* Bottom Section: Transactions Table */}
      <HistoryTable transactions={history} />

    </div>
  );
}
