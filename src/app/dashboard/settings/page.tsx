import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { SettingsForm } from "./_components/SettingsForm";

export default async function SettingsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const business = await db.business.findFirst({ where: { userId } });
  if (!business) redirect("/onboarding");

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Settings</h2>
        <p className="text-slate-400 text-sm">Manage your business profile and plan.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Info */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-4">Business Information</h3>
          <SettingsForm business={business} />
        </div>

        {/* Plan */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-4">Your Plan</h3>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-4">
            <div className="text-lg font-bold text-white mb-1 capitalize">
              {business.industry.charAt(0) + business.industry.slice(1).toLowerCase()} — Starter
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-2">
              $297<span className="text-sm text-slate-400 font-normal">/mo</span>
            </div>
            <p className="text-sm text-slate-400">
              Missed call text-back, review requests, booking widget
            </p>
          </div>
          <button className="w-full glass-card border border-white/10 hover:bg-white/5 text-slate-300 font-semibold py-2.5 rounded-xl transition-colors text-sm">
            Upgrade to Growth — $497/mo
          </button>

          {/* Twilio number info */}
          <div className="mt-4 pt-4 border-t border-white/5">
            <h4 className="text-sm font-medium text-slate-400 mb-2">Twilio Number</h4>
            {business.twilioNumber ? (
              <p className="text-white font-medium">{business.twilioNumber}</p>
            ) : (
              <p className="text-slate-500 text-sm">
                No Twilio number assigned yet. Add your Twilio credentials in{" "}
                <code className="text-blue-400">.env.local</code> to activate missed call text-back.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
