import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

function getUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

// Post ...
export async function POST(req: NextRequest) {
  try {
    const user = getUser(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      CategoryID,
      SubCategoryName,
      IsExpense,
      IsIncome,
      Description,
      Sequence,
    } = body;

    if (!CategoryID || !SubCategoryName) {
      return NextResponse.json(
        { message: "CategoryID and SubCategoryName are required" },
        { status: 400 },
      );
    }

    // 🔐 Validate parent category (prevents FK error)
    const categoryExists = await prisma.categories.findFirst({
      where: {
        CategoryID,
        UserID: user.userId,
      },
    });

    if (!categoryExists) {
      return NextResponse.json(
        { message: "Invalid CategoryID" },
        { status: 400 },
      );
    }

    const subCategory = await prisma.sub_categories.create({
      data: {
        CategoryID,
        SubCategoryName,
        IsExpense: Boolean(IsExpense),
        IsIncome: Boolean(IsIncome),
        Description,
        Sequence,
        UserID: user.userId,
      },
    });

    return NextResponse.json({ success: true, data: subCategory });
  } catch (error) {
    console.error("SubCategory POST error:", error);
    return NextResponse.json(
      { message: "Failed to create sub-category" },
      { status: 500 },
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
    const categoryId = searchParams.get("categoryId");

    // 🔹 Get by ID
    // if (id) {
    //   const subCategory = await prisma.sub_categories.findFirst({
    //     where: {
    //       SubCategoryID: Number(id),
    //       UserID: user.userId,
    //     },
    //   });

    //   if (!subCategory) {
    //     return NextResponse.json(
    //       { message: "Sub-category not found" },
    //       { status: 404 },
    //     );
    //   }

    //   return NextResponse.json({ success: true, data: subCategory });
    // }

    if (id) {
      const subCategory = await prisma.sub_categories.findFirst({
        where: {
          SubCategoryID: Number(id),
          UserID: user.userId,
        },
        include: {
          categories: true, //join category
        },
      });

      if (!subCategory) {
        return NextResponse.json(
          { message: "Sub-category not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({ success: true, data: subCategory });
    }

    // 🔹 Get by CategoryID (for dropdowns)
    if (categoryId) {
      const list = await prisma.sub_categories.findMany({
        where: {
          CategoryID: Number(categoryId),
          UserID: user.userId,
          IsActive: true,
        },
        orderBy: { Sequence: "asc" },
      });

      return NextResponse.json({ success: true, data: list });
    }

    // 🔹 Get all
    // const subCategories = await prisma.sub_categories.findMany({
    //   where: { UserID: user.userId, IsActive: true },
    //   orderBy: { Created: "desc" },
    // });

    const subCategories = await prisma.sub_categories.findMany({
      where: { UserID: user.userId, IsActive: true },
      include: {
        categories: true, //join category table
      },
      orderBy: { Created: "desc" },
    });

    return NextResponse.json({ success: true, data: subCategories });
  } catch (error) {
    console.error("SubCategory GET error:", error);
    return NextResponse.json(
      { message: "Failed to fetch sub-categories" },
      { status: 500 },
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
        { message: "SubCategoryID is required" },
        { status: 400 },
      );
    }

    const body = await req.json();

    const updated = await prisma.sub_categories.updateMany({
      where: {
        SubCategoryID: Number(id),
        UserID: user.userId,
      },
      data: {
        ...body,
        Modified: new Date(),
      },
    });

    if (updated.count === 0) {
      return NextResponse.json(
        { message: "Sub-category not found or not allowed" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SubCategory PUT error:", error);
    return NextResponse.json(
      { message: "Failed to update sub-category" },
      { status: 500 },
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
        { message: "SubCategoryID is required" },
        { status: 400 },
      );
    }

    const deleted = await prisma.sub_categories.updateMany({
      where: {
        SubCategoryID: Number(id),
        UserID: user.userId,
      },
      data: {
        IsActive: false,
        Modified: new Date(),
      },
    });

    if (deleted.count === 0) {
      return NextResponse.json(
        { message: "Sub-category not found or not allowed" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SubCategory DELETE error:", error);
    return NextResponse.json(
      { message: "Failed to delete sub-category" },
      { status: 500 },
    );
  }
}
