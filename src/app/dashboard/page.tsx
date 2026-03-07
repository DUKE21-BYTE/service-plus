import { Phone, Star, Calendar, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

const stats = [
  {
    label: "Missed Calls Recovered",
    value: "24",
    change: "+12%",
    up: true,
    icon: Phone,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    label: "Reviews Collected",
    value: "18",
    change: "+34%",
    up: true,
    icon: Star,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    label: "New Bookings",
    value: "11",
    change: "+8%",
    up: true,
    icon: Calendar,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    label: "Est. Revenue Recovered",
    value: "$8,400",
    change: "+21%",
    up: true,
    icon: TrendingUp,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
];

const recentActivity = [
  { type: "call", message: "Missed call from (602) 555-0142 — text-back sent", time: "2 min ago" },
  { type: "review", message: "New 5★ Google review from Mike D.", time: "18 min ago" },
  { type: "booking", message: "New booking: AC Tune-Up on Jun 14 @ 9am", time: "1 hr ago" },
  { type: "call", message: "Missed call from (602) 555-0871 — text-back sent", time: "2 hr ago" },
  { type: "review", message: "Review request sent to Sarah K.", time: "3 hr ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Overview</h2>
        <p className="text-slate-400 text-sm">Last 30 days performance</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-medium ${
                  stat.up ? "text-green-400" : "text-red-400"
                }`}
              >
                {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {stat.change}
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
        <div className="space-y-3">
          {recentActivity.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    item.type === "call"
                      ? "bg-blue-400"
                      : item.type === "review"
                      ? "bg-yellow-400"
                      : "bg-green-400"
                  }`}
                />
                <span className="text-sm text-slate-300">{item.message}</span>
              </div>
              <span className="text-xs text-slate-500 flex-shrink-0 ml-4">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
