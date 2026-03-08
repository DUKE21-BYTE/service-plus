import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Star, Send, CheckCircle, Clock } from "lucide-react";

export default async function ReviewsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const business = await db.business.findFirst({ where: { userId } });
  if (!business) redirect("/onboarding");

  const requests = await db.reviewRequest.findMany({
    where: { businessId: business.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const total = requests.length;
  const reviewed = requests.filter((r) => r.status === "REVIEWED").length;
  const rate = total > 0 ? Math.round((reviewed / total) * 100) : 0;

  const formatDate = (date: Date | null) =>
    date
      ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(date))
      : "—";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Review Requests</h2>
        <p className="text-slate-400 text-sm">Automatically sent after every completed job.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Send, value: String(total), label: "Requests sent", color: "text-blue-400", bg: "bg-blue-500/10" },
          { icon: Star, value: String(reviewed), label: "Reviews received", color: "text-yellow-400", bg: "bg-yellow-500/10" },
          { icon: CheckCircle, value: `${rate}%`, label: "Conversion rate", color: "text-green-400", bg: "bg-green-500/10" },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-5 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${s.bg}`}><s.icon className={`w-5 h-5 ${s.color}`} /></div>
            <div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-sm text-slate-400">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-white/5"><h3 className="font-semibold text-white">Request Log</h3></div>
        {requests.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <p className="text-4xl mb-3">⭐</p>
            <p className="font-medium">No review requests yet</p>
            <p className="text-sm mt-1">They'll appear here once customers are added.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-slate-500 text-left">
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Phone</th>
                  <th className="px-5 py-3 font-medium">Sent</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-4 font-medium text-white">{r.customerName}</td>
                    <td className="px-5 py-4 text-slate-400">{r.customerPhone}</td>
                    <td className="px-5 py-4 text-slate-400">{formatDate(r.sentAt)}</td>
                    <td className="px-5 py-4">
                      {r.status === "REVIEWED" ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-full">
                          <Star className="w-3 h-3 fill-yellow-400" /> Reviewed
                        </span>
                      ) : r.status === "SENT" ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 bg-blue-400/10 px-2.5 py-1 rounded-full">
                          <Send className="w-3 h-3" /> Sent
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-400/10 px-2.5 py-1 rounded-full">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
