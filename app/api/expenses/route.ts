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
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    const {
      ExpenseDate,
      PeopleID,
      CategoryID,
      SubCategoryID,
      ProjectID,
      Amount,
      ExpenseDetail,
      AttachmentPath,
      Description,
    } = body;

    // 🔴 NOW PEOPLE IS REQUIRED
    if (!ExpenseDate || !PeopleID || !Amount) {
      return NextResponse.json(
        { message: "ExpenseDate, People and Amount are required" },
        { status: 400 }
      );
    }

    /* Validate People belongs to user */
    const people = await prisma.peoples.findFirst({
      where: { PeopleID, UserID: user.userId, IsActive: true },
    });

    if (!people)
      return NextResponse.json({ message: "Invalid People" }, { status: 400 });

    /* Optional FK validations */
    if (CategoryID) {
      const category = await prisma.categories.findFirst({
        where: { CategoryID, UserID: user.userId },
      });
      if (!category)
        return NextResponse.json({ message: "Invalid Category" }, { status: 400 });
    }

    if (SubCategoryID) {
      const sub = await prisma.sub_categories.findFirst({
        where: { SubCategoryID, UserID: user.userId },
      });
      if (!sub)
        return NextResponse.json({ message: "Invalid SubCategory" }, { status: 400 });
    }

    if (ProjectID) {
      const project = await prisma.projects.findFirst({
        where: { ProjectID, UserID: user.userId },
      });
      if (!project)
        return NextResponse.json({ message: "Invalid Project" }, { status: 400 });
    }

    const expense = await prisma.expenses.create({
      data: {
        ExpenseDate: new Date(ExpenseDate),
        PeopleID,
        CategoryID: CategoryID ?? null,
        SubCategoryID: SubCategoryID ?? null,
        ProjectID: ProjectID ?? null,
        Amount: Number(Amount),
        ExpenseDetail,
        AttachmentPath,
        Description,
        UserID: user.userId,
      },
    });

    return NextResponse.json({ success: true, data: expense });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to create expense" }, { status: 500 });
  }
}

// GET (All + By ID)
export async function GET(req: NextRequest) {
  try {
    const user = getUser(req);
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    /* ================= GET BY ID ================= */
    if (id) {
      const expense = await prisma.expenses.findFirst({
        where: {
          ExpenseID: Number(id),
          UserID: user.userId,
        },
        include: {
          peoples: true,
          categories: true,
          sub_categories: true,
          projects: true,
        },
      });

      if (!expense)
        return NextResponse.json(
          { message: "Expense not found" },
          { status: 404 }
        );

      return NextResponse.json({ success: true, data: expense });
    }

    /* ================= GET ALL ================= */
    const expenses = await prisma.expenses.findMany({
      where: { UserID: user.userId },
      orderBy: { ExpenseDate: "desc" },
      include: {
        peoples: true,
        categories: true,
        sub_categories: true,
        projects: true,
      },
    });

    return NextResponse.json({ success: true, data: expenses });

  } catch (error) {
    console.error("Expense GET error:", error);
    return NextResponse.json(
      { message: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
}


// PUT ...
export async function PUT(req: NextRequest) {
  try {
    const user = getUser(req);
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ message: "ExpenseID required" }, { status: 400 });

    const body = await req.json();

    const updated = await prisma.expenses.updateMany({
      where: {
        ExpenseID: Number(id),
        UserID: user.userId,
      },
      data: {
        ExpenseDate: new Date(body.ExpenseDate),
        Amount: Number(body.Amount),

        CategoryID: body.CategoryID ? Number(body.CategoryID) : null,
        SubCategoryID: body.SubCategoryID ? Number(body.SubCategoryID) : null,
        ProjectID: body.ProjectID ? Number(body.ProjectID) : null,

        ExpenseDetail: body.ExpenseDetail || null,
        Description: body.Description || null,
        Modified: new Date(),
      },
    });

    if (updated.count === 0)
      return NextResponse.json(
        { message: "Expense not found or not allowed" },
        { status: 404 }
      );

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json(
      { message: "Failed to update expense" },
      { status: 500 }
    );
  }
}


// DELETE ...
// export async function DELETE(req: NextRequest) {
//   try {
//     const user = getUser(req);
//     if (!user) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");

//     if (!id) {
//       return NextResponse.json(
//         { message: "ExpenseID is required" },
//         { status: 400 },
//       );
//     }

//     const deleted = await prisma.expenses.updateMany({
//       where: {
//         ExpenseID: Number(id),
//         UserID: user.userId,
//       },
//       data: {
//         IsAnomaly: false,
//         Modified: new Date(),
//       },
//     });

//     if (deleted.count === 0) {
//       return NextResponse.json(
//         { message: "Expense not found or not allowed" },
//         { status: 404 },
//       );
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Expense DELETE error:", error);
//     return NextResponse.json(
//       { message: "Failed to delete expense" },
//       { status: 500 },
//     );
//   }
// }


export async function DELETE(req: NextRequest) {
  try {
    const user = getUser(req);
    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json(
        { message: "ExpenseID is required" },
        { status: 400 }
      );

    const deleted = await prisma.expenses.deleteMany({
      where: {
        ExpenseID: Number(id),
        UserID: user.userId,
      },
    });

    if (deleted.count === 0)
      return NextResponse.json(
        { message: "Expense not found or not allowed" },
        { status: 404 }
      );

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Expense DELETE error:", error);
    return NextResponse.json(
      { message: "Failed to delete expense" },
      { status: 500 }
    );
  }
}
