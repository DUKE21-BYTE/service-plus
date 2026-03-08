import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Phone, Star, Calendar, TrendingUp, ArrowUp } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const business = await db.business.findFirst({
    where: { userId },
    include: {
      callEvents: { orderBy: { occurredAt: "desc" }, take: 5 },
      reviewRequests: { orderBy: { createdAt: "desc" }, take: 5 },
      bookings: { orderBy: { createdAt: "desc" }, take: 5 },
    },
  });

  if (!business) redirect("/onboarding");

  // Compute stats
  const totalMissed = await db.callEvent.count({
    where: { businessId: business.id, callStatus: "MISSED" },
  });
  const textsSent = await db.callEvent.count({
    where: { businessId: business.id, textSent: true },
  });
  const reviews = await db.reviewRequest.count({
    where: { businessId: business.id, status: { in: ["REVIEWED"] } },
  });
  const bookings = await db.booking.count({
    where: { businessId: business.id },
  });

  const stats = [
    { label: "Missed Calls Recovered", value: String(textsSent), icon: Phone, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Reviews Collected", value: String(reviews), icon: Star, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { label: "New Bookings", value: String(bookings), icon: Calendar, color: "text-green-400", bg: "bg-green-500/10" },
    { label: "Est. Revenue Saved", value: `$${textsSent * 350}`, icon: TrendingUp, color: "text-violet-400", bg: "bg-violet-500/10" },
  ];

  // Merge recent activity
  const recentActivity = [
    ...business.callEvents.map((e) => ({
      type: "call" as const,
      message: `Missed call from ${e.callerPhone}${e.textSent ? " — text-back sent ✓" : ""}`,
      time: e.occurredAt,
    })),
    ...business.reviewRequests.map((r) => ({
      type: "review" as const,
      message: `Review request sent to ${r.customerName}`,
      time: r.createdAt,
    })),
    ...business.bookings.map((b) => ({
      type: "booking" as const,
      message: `New booking: ${b.serviceType} — ${b.customerName}`,
      time: b.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 8);

  const timeAgo = (date: Date) => {
    const secs = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (secs < 60) return `${secs}s ago`;
    if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
    if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
    return `${Math.floor(secs / 86400)}d ago`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Overview</h2>
        <p className="text-slate-400 text-sm">All-time performance</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="flex items-center gap-1 text-xs font-medium text-green-400">
                <ArrowUp className="w-3 h-3" />
                Live
              </span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        {recentActivity.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            <p className="text-4xl mb-3">📡</p>
            <p className="font-medium">Waiting for activity...</p>
            <p className="text-sm mt-1">Calls, reviews, and bookings will appear here in real time.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    item.type === "call" ? "bg-blue-400" : item.type === "review" ? "bg-yellow-400" : "bg-green-400"
                  }`} />
                  <span className="text-sm text-slate-300">{item.message}</span>
                </div>
                <span className="text-xs text-slate-500 flex-shrink-0 ml-4">{timeAgo(item.time)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
