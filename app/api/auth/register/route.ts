// import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
// import { hashPassword } from '@/lib/password';

// export async function POST(req: Request) {
//   const { UserName, EmailAddress, Password, MobileNo } = await req.json();

//   if (!EmailAddress || !Password || !UserName) {
//     return NextResponse.json(
//       { message: 'Required fields missing' },
//       { status: 400 }
//     );
//   }

//   const existingUser = await prisma.users.findUnique({
//     where: { EmailAddress },
//   });

//   if (existingUser) {
//     return NextResponse.json(
//       { message: 'Email already registered' },
//       { status: 409 }
//     );
//   }

//   const hashedPassword = await hashPassword(Password);

//   await prisma.users.create({
//     data: {
//       UserName,
//       EmailAddress,
//       Password: hashedPassword,
//       MobileNo,
//     },
//   });

//   return NextResponse.json({ message: 'User registered successfully' });
// }
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/password';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { UserName, EmailAddress, Password, MobileNo } = body;

    if (!UserName || !EmailAddress || !Password) {
      return NextResponse.json(
        { message: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { EmailAddress },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(Password);

    await prisma.users.create({
      data: {
        UserName,
        EmailAddress,
        Password: hashedPassword,
        MobileNo: MobileNo || '',
        Role: 'User',
      },
    });

    return NextResponse.json(
      { message: 'Registration successful' },
      { status: 201 }
    );
  } catch (error) {
    console.error('REGISTER ERROR:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
