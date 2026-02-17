import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

function getUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

// POST ...
export async function POST(req: NextRequest) {
  try {
    const user = getUser(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      CategoryName,
      IsExpense,
      IsIncome,
      Description,
      Sequence,
    } = body;

    if (!CategoryName) {
      return NextResponse.json(
        { message: "CategoryName is required" },
        { status: 400 }
      );
    }

    const category = await prisma.categories.create({
      data: {
        CategoryName,
        IsExpense: Boolean(IsExpense),
        IsIncome: Boolean(IsIncome),
        Description,
        Sequence,
        UserID: user.userId,
      },
    });

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error("Category POST error:", error);
    return NextResponse.json(
      { message: "Failed to create category" },
      { status: 500 }
    );
  }
}


// GET ...
export async function GET(req: NextRequest) {
  try {
    const user = getUser(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const category = await prisma.categories.findFirst({
        where: {
          CategoryID: Number(id),
          UserID: user.userId,
        },
      });

      if (!category) {
        return NextResponse.json(
          { message: "Category not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: category });
    }

    const categories = await prisma.categories.findMany({
      where: { UserID: user.userId, IsActive: true },
      orderBy: { Sequence: "asc" },
    });

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error("Category GET error:", error);
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// PUT ...

export async function PUT(req: NextRequest) {
  try {
    const user = getUser(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "CategoryID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updated = await prisma.categories.updateMany({
      where: {
        CategoryID: Number(id),
        UserID: user.userId,
      },
      data: {
        ...body,
        Modified: new Date(),
      },
    });

    if (updated.count === 0) {
      return NextResponse.json(
        { message: "Category not found or not allowed" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Category PUT error:", error);
    return NextResponse.json(
      { message: "Failed to update category" },
      { status: 500 }
    );
  }
}


// DELETE ...
export async function DELETE(req: NextRequest) {
  try {
    const user = getUser(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "CategoryID is required" },
        { status: 400 }
      );
    }

    const deleted = await prisma.categories.updateMany({
      where: {
        CategoryID: Number(id),
        UserID: user.userId,
      },
      data: {
        IsActive: false,
        Modified: new Date(),
      },
    });

    if (deleted.count === 0) {
      return NextResponse.json(
        { message: "Category not found or not allowed" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Category DELETE error:", error);
    return NextResponse.json(
      { message: "Failed to delete category" },
      { status: 500 }
    );
  }
}


