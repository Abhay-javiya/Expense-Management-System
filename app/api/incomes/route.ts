import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

/* =========================
   Helper: get user from token
========================= */
function getUserFromRequest(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) return null;

  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}

/* =========================
   CREATE INCOME (POST)
========================= */
export async function POST(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const income = await prisma.incomes.create({
      data: {
        IncomeDate: new Date(body.IncomeDate),
        CategoryID: body.CategoryID ?? null,
        SubCategoryID: body.SubCategoryID ?? null,
        PeopleID: body.PeopleID,
        ProjectID: body.ProjectID ?? null,
        Amount: body.Amount,
        IncomeDetail: body.IncomeDetail,
        AttachmentPath: body.AttachmentPath,
        Description: body.Description,
        UserID: user.userId,
      },
    });

    return NextResponse.json({ success: true, data: income });
  } catch (error) {
    console.error("Income POST error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create income" },
      { status: 500 }
    );
  }
}

/* =========================
   READ INCOMES (GET)
========================= */
export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const income = await prisma.incomes.findFirst({
        where: {
          IncomeID: Number(id),
          UserID: user.userId,
        },
        include: {
          categories: true,
          sub_categories: true,
          peoples: true,
          projects: true,
        },
      });

      return NextResponse.json({ success: true, data: income });
    }

    const incomes = await prisma.incomes.findMany({
      where: { UserID: user.userId },
      orderBy: { IncomeDate: "desc" },
      include: {
        categories: true,
        sub_categories: true,
        peoples: true,
        projects: true,
      },
    });

    return NextResponse.json({ success: true, data: incomes });
  } catch (error) {
    console.error("Income GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch incomes" },
      { status: 500 }
    );
  }
}

/* =========================
   UPDATE INCOME (PUT)
========================= */
export async function PUT(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Income ID required" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const income = await prisma.incomes.updateMany({
      where: {
        IncomeID: Number(id),
        UserID: user.userId,
      },
      data: {
        IncomeDate: new Date(body.IncomeDate),
        CategoryID: body.CategoryID ?? null,
        SubCategoryID: body.SubCategoryID ?? null,
        PeopleID: body.PeopleID,
        ProjectID: body.ProjectID ?? null,
        Amount: body.Amount,
        IncomeDetail: body.IncomeDetail,
        AttachmentPath: body.AttachmentPath,
        Description: body.Description,
        Modified: new Date(),
      },
    });

    return NextResponse.json({ success: true, data: income });
  } catch (error) {
    console.error("Income PUT error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update income" },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE INCOME (DELETE)
========================= */
export async function DELETE(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Income ID required" },
        { status: 400 }
      );
    }

    await prisma.incomes.deleteMany({
      where: {
        IncomeID: Number(id),
        UserID: user.userId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Income DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete income" },
      { status: 500 }
    );
  }
}
