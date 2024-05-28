"use client";

// components
import NavbarComponent from "@/lib/components/dashboard/NavbarComponent";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full max-w-full h-screen max-h-screen flex flex-col">
        <NavbarComponent />
        
        <div className="flex-1 bg-red-500">
          {children}
        </div>
    </main>
  );
}