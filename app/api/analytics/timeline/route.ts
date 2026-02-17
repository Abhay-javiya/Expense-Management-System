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

    const incomes = await prisma.incomes.findMany({
      where: { UserID: user.userId },
      select: {
        IncomeDate: true,
        Amount: true,
      },
    });

    const expenses = await prisma.expenses.findMany({
      where: { UserID: user.userId },
      select: {
        ExpenseDate: true,
        Amount: true,
      },
    });

    const timeline = [
      ...incomes.map(i => ({
        date: i.IncomeDate,
        amount: i.Amount,
        type: "Income",
      })),
      ...expenses.map(e => ({
        date: e.ExpenseDate,
        amount: e.Amount,
        type: "Expense",
      })),
    ].sort((a, b) => +new Date(b.date) - +new Date(a.date));

    return NextResponse.json({ success: true, data: timeline });
  } catch (error) {
    console.error("Timeline error:", error);
    return NextResponse.json(
      { message: "Failed to fetch timeline" },
      { status: 500 }
    );
  }
}
