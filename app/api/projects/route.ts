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
      ProjectName,
      ProjectStartDate,
      ProjectEndDate,
      ProjectDetail,
      Description,
    } = body;

    if (!ProjectName) {
      return NextResponse.json(
        { message: "ProjectName is required" },
        { status: 400 }
      );
    }

    const project = await prisma.projects.create({
      data: {
        ProjectName,
        ProjectStartDate,
        ProjectEndDate,
        ProjectDetail,
        Description,
        UserID: user.userId,
      },
    });

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error("Project POST error:", error);
    return NextResponse.json(
      { message: "Failed to create project" },
      { status: 500 }
    );
  }
}

// Get ...
export async function GET(req: NextRequest) {
  try {
    const user = getUser(req);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // 🔹 Get by ID
    if (id) {
      const project = await prisma.projects.findFirst({
        where: {
          ProjectID: Number(id),
          UserID: user.userId,
        },
      });

      if (!project) {
        return NextResponse.json(
          { message: "Project not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: project });
    }

    // 🔹 Get all
    const projects = await prisma.projects.findMany({
      where: { UserID: user.userId, IsActive: true },
      orderBy: { Created: "desc" },
    });

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error("Project GET error:", error);
    return NextResponse.json(
      { message: "Failed to fetch projects" },
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
        { message: "ProjectID is required" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updated = await prisma.projects.updateMany({
      where: {
        ProjectID: Number(id),
        UserID: user.userId,
      },
      data: {
        ...body,
        Modified: new Date(),
      },
    });

    if (updated.count === 0) {
      return NextResponse.json(
        { message: "Project not found or not allowed" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Project PUT error:", error);
    return NextResponse.json(
      { message: "Failed to update project" },
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
        { message: "ProjectID is required" },
        { status: 400 }
      );
    }

    const deleted = await prisma.projects.updateMany({
      where: {
        ProjectID: Number(id),
        UserID: user.userId,
      },
      data: {
        IsActive: false,
        Modified: new Date(),
      },
    });

    if (deleted.count === 0) {
      return NextResponse.json(
        { message: "Project not found or not allowed" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Project DELETE error:", error);
    return NextResponse.json(
      { message: "Failed to delete project" },
      { status: 500 }
    );
  }
}
