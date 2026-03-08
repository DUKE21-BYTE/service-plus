import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Calendar, CheckCircle, Clock, XCircle } from "lucide-react";

export default async function BookingPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const business = await db.business.findFirst({ where: { userId } });
  if (!business) redirect("/onboarding");

  const bookings = await db.booking.findMany({
    where: { businessId: business.id },
    orderBy: { scheduledAt: "asc" },
    take: 50,
  });

  const confirmed = bookings.filter((b) => b.status === "CONFIRMED").length;
  const pending = bookings.filter((b) => b.status === "PENDING").length;

  const formatDateTime = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short", day: "numeric",
      hour: "numeric", minute: "2-digit",
    }).format(new Date(date));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Online Bookings</h2>
        <p className="text-slate-400 text-sm">Customers booking jobs directly — 24/7.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Calendar, value: String(bookings.length), label: "Total bookings", color: "text-green-400", bg: "bg-green-500/10" },
          { icon: CheckCircle, value: String(confirmed), label: "Confirmed", color: "text-blue-400", bg: "bg-blue-500/10" },
          { icon: Clock, value: String(pending), label: "Pending confirmation", color: "text-yellow-400", bg: "bg-yellow-500/10" },
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
        <div className="p-5 border-b border-white/5"><h3 className="font-semibold text-white">Bookings</h3></div>
        {bookings.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <p className="text-4xl mb-3">📅</p>
            <p className="font-medium">No bookings yet</p>
            <p className="text-sm mt-1">Once you embed the booking widget, jobs will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5 text-slate-500 text-left">
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Service</th>
                  <th className="px-5 py-3 font-medium">Scheduled</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-4 font-medium text-white">{b.customerName}</td>
                    <td className="px-5 py-4 text-slate-400">{b.serviceType}</td>
                    <td className="px-5 py-4 text-slate-400">{formatDateTime(b.scheduledAt)}</td>
                    <td className="px-5 py-4">
                      {b.status === "CONFIRMED" ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" /> Confirmed
                        </span>
                      ) : b.status === "PENDING" ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-full">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      ) : b.status === "COMPLETED" ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-400/10 px-2.5 py-1 rounded-full">
                          <XCircle className="w-3 h-3" /> Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-400 bg-red-400/10 px-2.5 py-1 rounded-full">
                          <XCircle className="w-3 h-3" /> Cancelled
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
