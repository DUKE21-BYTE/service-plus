import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";

const bookings = [
  { customer: "James T.", service: "AC Tune-Up", date: "Jun 14, 9:00 AM", status: "confirmed" },
  { customer: "Amy L.", service: "Furnace Repair", date: "Jun 15, 2:00 PM", status: "pending" },
  { customer: "Rick S.", service: "Duct Cleaning", date: "Jun 16, 10:00 AM", status: "confirmed" },
  { customer: "Dana M.", service: "AC Installation", date: "Jun 18, 8:00 AM", status: "confirmed" },
  { customer: "Paul K.", service: "Emergency Repair", date: "Jun 13, 3:30 PM", status: "completed" },
];

export default function BookingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Online Bookings</h2>
        <p className="text-slate-400 text-sm">Customers booking jobs directly from your website — 24/7.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Calendar, value: "11", label: "New bookings this month", color: "text-green-400", bg: "bg-green-500/10" },
          { icon: CheckCircle, value: "9", label: "Confirmed", color: "text-blue-400", bg: "bg-blue-500/10" },
          { icon: Clock, value: "2", label: "Pending confirmation", color: "text-yellow-400", bg: "bg-yellow-500/10" },
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

      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-white/5">
          <h3 className="font-semibold text-white">Upcoming Bookings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-slate-500 text-left">
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Date & Time</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4 font-medium text-white">{b.customer}</td>
                  <td className="px-5 py-4 text-slate-400">{b.service}</td>
                  <td className="px-5 py-4 text-slate-400">{b.date}</td>
                  <td className="px-5 py-4">
                    {b.status === "confirmed" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full">
                        <CheckCircle className="w-3 h-3" /> Confirmed
                      </span>
                    ) : b.status === "pending" ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-full">
                        <Clock className="w-3 h-3" /> Pending
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-400/10 px-2.5 py-1 rounded-full">
                        <XCircle className="w-3 h-3" /> Completed
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
