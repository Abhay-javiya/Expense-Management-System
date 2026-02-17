// 'use client'; // 👈 IMPORTANT: This allows us to use useState

// import { useState } from 'react';
// import Sidebar from '@/app/components/layout/Sidebar';
// import Header from '@/app/components/layout/Header';

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   // 1. State lives here now
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   // 2. Function to toggle state
//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   return (
//     <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800">
      
//       {/* 3. Pass state & toggle function to Sidebar */}
//       <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      
//       {/* 4. Adjust Margin Dynamically based on state */}
//       {/* If collapsed: ml-20 (80px), If expanded: ml-80 (320px) */}
//       <main 
//         className={`flex-1 h-full overflow-y-auto bg-slate-50/50 transition-all duration-300 ease-in-out
//           ${isCollapsed ? 'md:ml-20' : 'md:ml-80'} 
//         `}
//       >
//         <Header />
//         <div className="p-8">
//            {children}
//         </div>
//       </main>
//     </div>
//   );
// }

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/jwt';
import DashboardShell from './DashboardShell';

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const user = verifyToken(token);

    if (user.role !== 'User') {
      redirect('/login');
    }
  } catch {
    redirect('/login');
  }

  return <DashboardShell>{children}</DashboardShell>;
}
