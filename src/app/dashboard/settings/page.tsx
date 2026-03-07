export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Settings</h2>
        <p className="text-slate-400 text-sm">Manage your business profile and integrations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Info */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-4">Business Information</h3>
          <div className="space-y-4">
            {[
              { label: "Business Name", placeholder: "Johnson HVAC Services" },
              { label: "Phone Number", placeholder: "+1 (602) 555-0100" },
              { label: "Website", placeholder: "https://johnsonhvac.com" },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">
                  {field.label}
                </label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
            ))}
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
              Save Changes
            </button>
          </div>
        </div>

        {/* Plan */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-4">Your Plan</h3>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-4">
            <div className="text-lg font-bold text-white mb-1">Starter Plan</div>
            <div className="text-3xl font-bold text-blue-400 mb-2">$297<span className="text-sm text-slate-400 font-normal">/mo</span></div>
            <p className="text-sm text-slate-400">Missed call text-back, review requests, booking widget</p>
          </div>
          <button className="w-full glass-card border border-white/10 hover:bg-white/5 text-slate-300 font-semibold py-2.5 rounded-xl transition-colors text-sm">
            Upgrade to Growth — $497/mo
          </button>
        </div>
      </div>
    </div>
  );
}
