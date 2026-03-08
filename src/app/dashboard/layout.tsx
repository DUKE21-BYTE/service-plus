export const dynamic = "force-dynamic";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import {
  LayoutDashboard,
  Phone,
  Star,
  Calendar,
  FileText,
  Settings,
  Zap,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Missed Calls", href: "/dashboard/missed-calls", icon: Phone },
  { label: "Reviews", href: "/dashboard/reviews", icon: Star },
  { label: "Bookings", href: "/dashboard/booking", icon: Calendar },
  { label: "Reports", href: "/dashboard/reports", icon: FileText },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // Check if user has a business set up
  const business = await db.business.findFirst({ where: { userId } });
  if (!business) redirect("/onboarding");

  return (
    <div className="flex h-screen bg-[#020817]">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col glass-card border-r border-white/5">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="gradient-text">ServicePulse</span>
          </Link>
        </div>

        {/* Business name badge */}
        <div className="px-4 pt-4 pb-2">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-3 py-2">
            <p className="text-xs text-slate-500 mb-0.5">Active business</p>
            <p className="text-sm font-semibold text-white truncate">{business.name}</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150 text-sm font-medium group"
            >
              <Icon className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
              {label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-white/5 flex items-center gap-3">
          <UserButton />
          <span className="text-sm text-slate-400 truncate">My Account</span>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 flex items-center justify-between px-6 glass-card border-b border-white/5 flex-shrink-0">
          <h1 className="text-lg font-semibold text-white">{business.name}</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1 rounded-full font-medium">
              ● Live
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
