import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main dashboard content area */}
      <main className="pl-64 min-h-screen flex flex-col">
        <div className="flex-1 p-8 md:p-10 max-w-7xl w-full mx-auto space-y-8 animate-in fade-in-30 slide-in-from-bottom-3 duration-300">
          {children}
        </div>
      </main>
    </div>
  );
}
