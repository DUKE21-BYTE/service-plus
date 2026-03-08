import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Phone, MessageSquare, Clock, CheckCircle } from "lucide-react";

export default async function MissedCallsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const business = await db.business.findFirst({ where: { userId } });
  if (!business) redirect("/onboarding");

  const calls = await db.callEvent.findMany({
    where: { businessId: business.id },
    orderBy: { occurredAt: "desc" },
    take: 50,
  });

  const total = calls.length;
  const texted = calls.filter((c) => c.textSent).length;

  const formatTime = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short", day: "numeric",
      hour: "numeric", minute: "2-digit",
    }).format(new Date(date));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Missed Call Text-Back</h2>
        <p className="text-slate-400 text-sm">Every missed call gets an automatic SMS within 60 seconds.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Phone, value: String(total), label: "Missed calls total", color: "text-blue-400", bg: "bg-blue-500/10" },
          { icon: MessageSquare, value: String(texted), label: "Texts sent", color: "text-green-400", bg: "bg-green-500/10" },
          { icon: Clock, value: "< 60s", label: "Avg response time", color: "text-violet-400", bg: "bg-violet-500/10" },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-5 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${s.bg}`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-sm text-slate-400">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-semibold text-white">Call Log</h3>
          <span className="text-xs text-slate-400">Last 50 events</span>
        </div>
        {calls.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <p className="text-4xl mb-3">📞</p>
            <p className="font-medium">No calls yet</p>
            <p className="text-sm mt-1">Calls routed through your Twilio number will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-slate-500 text-left">
                  <th className="px-5 py-3 font-medium">Caller</th>
                  <th className="px-5 py-3 font-medium">Time</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {calls.map((call) => (
                  <tr key={call.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-4 font-medium text-white">{call.callerPhone}</td>
                    <td className="px-5 py-4 text-slate-400">{formatTime(call.occurredAt)}</td>
                    <td className="px-5 py-4">
                      {call.textSent ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" /> Text Sent
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-400/10 px-2.5 py-1 rounded-full">
                          <Phone className="w-3 h-3" /> {call.callStatus}
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
