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

    const avg = await prisma.expenses.aggregate({
      _avg: { Amount: true },
      where: { UserID: user.userId },
    });

    const avgAmount = Number(avg._avg.Amount || 0);

    const anomalies = await prisma.expenses.findMany({
      where: {
        UserID: user.userId,
        Amount: { gt: avgAmount * 2 },
      },
      orderBy: { ExpenseDate: "desc" },
    });

    return NextResponse.json({
      success: true,
      averageExpense: avgAmount,
      anomalies,
    });
  } catch (error) {
    console.error("Anomaly detection error:", error);
    return NextResponse.json(
      { message: "Failed to detect anomalies" },
      { status: 500 }
    );
  }
}
