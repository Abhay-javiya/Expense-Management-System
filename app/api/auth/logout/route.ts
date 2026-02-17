// import { NextResponse } from 'next/server';

// export async function POST() {
//   const response = NextResponse.json({ message: 'Logged out' });

//   response.cookies.set('token', '', {
//     expires: new Date(0),
//     path: '/',
//   });

//   return response;
// }
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });

  // 🔥 Remove JWT cookie
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0, // 👈 expires immediately
  });

  return response;
}
