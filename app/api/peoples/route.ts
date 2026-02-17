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
    const { PeopleName, Email, MobileNo, Description } = body;

    if (!PeopleName || !Email || !MobileNo) {
      return NextResponse.json(
        { message: "PeopleName, Email and MobileNo are required" },
        { status: 400 }
      );
    }

    const people = await prisma.peoples.create({
      data: {
        PeopleName,
        Email,
        MobileNo,
        Description,
        UserID: user.userId,
      },
    });

    return NextResponse.json({ success: true, data: people });
  } catch (error) {
    console.error("People POST error:", error);
    return NextResponse.json(
      { message: "Failed to create people" },
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

    // 🔹 GET BY ID
    if (id) {
      const people = await prisma.peoples.findFirst({
        where: {
          PeopleID: Number(id),
          UserID: user.userId,
        },
      });

      if (!people) {
        return NextResponse.json(
          { message: "People not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: people });
    }

    // 🔹 GET ALL
    const peoples = await prisma.peoples.findMany({
      where: { UserID: user.userId, IsActive: true },
      orderBy: { Created: "desc" },
    });

    return NextResponse.json({ success: true, data: peoples });
  } catch (error) {
    console.error("People GET error:", error);
    return NextResponse.json(
      { message: "Failed to fetch peoples" },
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
        { message: "PeopleID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { PeopleName, Email, MobileNo, Description, IsActive } = body;

    const updated = await prisma.peoples.updateMany({
      where: {
        PeopleID: Number(id),
        UserID: user.userId,
      },
      data: {
        PeopleName,
        Email,
        MobileNo,
        Description,
        IsActive,
        Modified: new Date(),
      },
    });

    if (updated.count === 0) {
      return NextResponse.json(
        { message: "People not found or not allowed" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("People PUT error:", error);
    return NextResponse.json(
      { message: "Failed to update people" },
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
        { message: "PeopleID is required" },
        { status: 400 }
      );
    }

    const deleted = await prisma.peoples.updateMany({
      where: {
        PeopleID: Number(id),
        UserID: user.userId,
      },
      data: {
        IsActive: false,
        Modified: new Date(),
      },
    });

    if (deleted.count === 0) {
      return NextResponse.json(
        { message: "People not found or not allowed" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("People DELETE error:", error);
    return NextResponse.json(
      { message: "Failed to delete people" },
      { status: 500 }
    );
  }
}
