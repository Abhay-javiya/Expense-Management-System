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

    const data = await prisma.expenses.groupBy({
      by: ["CategoryID"],
      where: { UserID: user.userId },
      _sum: { Amount: true },
      orderBy: {
        _sum: { Amount: "desc" },
      },
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Behavior insights error:", error);
    return NextResponse.json(
      { message: "Failed to fetch insights" },
      { status: 500 }
    );
  }
}
