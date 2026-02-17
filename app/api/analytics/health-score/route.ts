import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

function getUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  return verifyToken(token);
}


export async function GET(req: NextRequest) {
  try {
    const user = getUser(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const month = Number(searchParams.get("month"));
    const year = Number(searchParams.get("year"));

    if (!month || !year) {
      return NextResponse.json(
        { message: "Month and Year required" },
        { status: 400 }
      );
    }

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const totalIncome = await prisma.incomes.aggregate({
      _sum: { Amount: true },
      where: {
        UserID: user.userId,
        IncomeDate: { gte: start, lte: end },
      },
    });

    const totalExpense = await prisma.expenses.aggregate({
      _sum: { Amount: true },
      where: {
        UserID: user.userId,
        ExpenseDate: { gte: start, lte: end },
      },
    });

    const income = Number(totalIncome._sum.Amount || 0);
    const expense = Number(totalExpense._sum.Amount || 0);

    let score = 100;
    let status: "Good" | "Warning" | "Critical" = "Good";

    if (income > 0) {
      const ratio = expense / income;
      score = Math.max(0, Math.round(100 - ratio * 100));

      if (ratio > 0.9) status = "Critical";
      else if (ratio > 0.7) status = "Warning";
    }

    return NextResponse.json({
      success: true,
      data: { income, expense, score, status },
    });
  } catch (error) {
    console.error("Health score error:", error);
    return NextResponse.json(
      { message: "Failed to calculate health score" },
      { status: 500 }
    );
  }
}
