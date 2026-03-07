import { Star, Send, CheckCircle, Clock } from "lucide-react";

const requests = [
  { name: "Mike D.", phone: "(602) 555-0142", status: "reviewed", sent: "Jun 10", stars: 5 },
  { name: "Sarah K.", phone: "(480) 555-0234", status: "sent", sent: "Jun 12", stars: null },
  { name: "James T.", phone: "(623) 555-0551", status: "reviewed", sent: "Jun 8", stars: 5 },
  { name: "Linda R.", phone: "(602) 555-0990", status: "pending", sent: "Jun 13", stars: null },
  { name: "Tom W.", phone: "(480) 555-0771", status: "reviewed", sent: "Jun 7", stars: 4 },
];

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Review Requests</h2>
        <p className="text-slate-400 text-sm">Automatically sent after every completed job.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Send, value: "18", label: "Requests sent", color: "text-blue-400", bg: "bg-blue-500/10" },
          { icon: Star, value: "12", label: "Reviews received", color: "text-yellow-400", bg: "bg-yellow-500/10" },
          { icon: CheckCircle, value: "67%", label: "Conversion rate", color: "text-green-400", bg: "bg-green-500/10" },
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
        <div className="p-5 border-b border-white/5">
          <h3 className="font-semibold text-white">Request Log</h3>
        </div>
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
              {requests.map((r, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4 font-medium text-white">{r.name}</td>
                  <td className="px-5 py-4 text-slate-400">{r.phone}</td>
                  <td className="px-5 py-4 text-slate-400">{r.sent}</td>
                  <td className="px-5 py-4">
                    {r.status === "reviewed" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-full">
                        <Star className="w-3 h-3 fill-yellow-400" />
                        {r.stars}★ Review
                      </span>
                    ) : r.status === "sent" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 bg-blue-400/10 px-2.5 py-1 rounded-full">
                        <Send className="w-3 h-3" />
                        Sent
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-400/10 px-2.5 py-1 rounded-full">
                        <Clock className="w-3 h-3" />
                        Pending
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
