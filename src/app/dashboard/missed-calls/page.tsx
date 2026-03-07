import { Phone, MessageSquare, Clock, CheckCircle } from "lucide-react";

const calls = [
  { phone: "(602) 555-0142", time: "Today, 2:14 PM", status: "texted", duration: "—" },
  { phone: "(602) 555-0871", time: "Today, 10:32 AM", status: "texted", duration: "—" },
  { phone: "(480) 555-0234", time: "Yesterday, 4:55 PM", status: "texted", duration: "—" },
  { phone: "(602) 555-0990", time: "Yesterday, 1:20 PM", status: "answered", duration: "4:12" },
  { phone: "(623) 555-0551", time: "Jun 12, 9:08 AM", status: "texted", duration: "—" },
];

export default function MissedCallsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Missed Call Text-Back</h2>
        <p className="text-slate-400 text-sm">
          Every missed call gets an automatic SMS within 60 seconds.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Phone, value: "24", label: "Missed calls this month", color: "text-blue-400", bg: "bg-blue-500/10" },
          { icon: MessageSquare, value: "24", label: "Texts sent", color: "text-green-400", bg: "bg-green-500/10" },
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

      {/* Call log table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-semibold text-white">Call Log</h3>
          <span className="text-xs text-slate-400">Last 30 days</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-slate-500 text-left">
                <th className="px-5 py-3 font-medium">Caller</th>
                <th className="px-5 py-3 font-medium">Time</th>
                <th className="px-5 py-3 font-medium">Duration</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {calls.map((call, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4 font-medium text-white">{call.phone}</td>
                  <td className="px-5 py-4 text-slate-400">{call.time}</td>
                  <td className="px-5 py-4 text-slate-400">{call.duration}</td>
                  <td className="px-5 py-4">
                    {call.status === "texted" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        Text Sent
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 bg-blue-400/10 px-2.5 py-1 rounded-full">
                        <Phone className="w-3 h-3" />
                        Answered
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
