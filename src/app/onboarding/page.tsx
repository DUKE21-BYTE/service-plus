"use client";

import { useActionState } from "react";
import { completeOnboarding } from "./actions";
import { Zap, Building2, Phone, Globe, ChevronRight } from "lucide-react";

const industries = [
  { value: "HVAC", label: "HVAC / Air Conditioning" },
  { value: "PLUMBING", label: "Plumbing" },
  { value: "ROOFING", label: "Roofing" },
  { value: "ELECTRICAL", label: "Electrical" },
  { value: "LANDSCAPING", label: "Landscaping" },
  { value: "OTHER", label: "Other Home Service" },
];

const initialState = { error: "" };

export default function OnboardingPage() {
  const [state, formAction, isPending] = useActionState(completeOnboarding as any, initialState);

  return (
    <div className="min-h-screen animated-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">ServicePulse</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Set up your business</h1>
          <p className="text-slate-400">Takes 60 seconds. You'll be up and running immediately.</p>
        </div>

        {/* Form card */}
        <div className="glass-card rounded-2xl p-8">
          <form action={formAction} className="space-y-5">
            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Building2 className="w-4 h-4 inline mr-1.5 text-blue-400" />
                Business Name
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                required
                placeholder="Johnson HVAC Services"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Phone className="w-4 h-4 inline mr-1.5 text-blue-400" />
                Business Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+1 (602) 555-0100"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all"
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                required
                defaultValue="HVAC"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/60 transition-all appearance-none"
              >
                {industries.map((i) => (
                  <option key={i.value} value={i.value} className="bg-slate-900">
                    {i.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Website (optional) */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Globe className="w-4 h-4 inline mr-1.5 text-blue-400" />
                Website <span className="text-slate-500 font-normal">(optional)</span>
              </label>
              <input
                id="website"
                name="website"
                type="url"
                placeholder="https://johnsonhvac.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all"
              />
            </div>

            {/* Error */}
            {state?.error && (
              <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                {state.error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              {isPending ? (
                "Setting up your account..."
              ) : (
                <>
                  Launch my dashboard
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          You can update these details anytime in Settings.
        </p>
      </div>
    </div>
  );
}
