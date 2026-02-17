import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/password";
import { signToken } from "@/lib/jwt";

export async function POST(req: Request) {
  const { EmailAddress, Password } = await req.json();

  const user = await prisma.users.findUnique({
    where: { EmailAddress },
  });


  if (!user) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 },
    );
  }

  const isValid = await comparePassword(Password, user.Password);

  if (!isValid) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 },
    );
  }

  const token = signToken({
    userId: user.UserID,
    email: user.EmailAddress,
    role: user.Role,
  });

  const response = NextResponse.json({
    message: "Login successful",
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  

  return response;
}
