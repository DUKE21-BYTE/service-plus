"use client";

import { useActionState } from "react";
import { saveBusinessSettings } from "../actions";
import type { Business } from "@prisma/client";

const initialState = { error: "", success: false };

export function SettingsForm({ business }: { business: Business }) {
  const [state, formAction, isPending] = useActionState(saveBusinessSettings as any, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1.5">Business Name</label>
        <input
          name="name"
          type="text"
          defaultValue={business.name}
          required
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1.5">Phone Number</label>
        <input
          name="phone"
          type="tel"
          defaultValue={business.phone}
          required
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-1.5">Website</label>
        <input
          name="website"
          type="url"
          defaultValue={business.website || ""}
          placeholder="https://"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>

      {state?.error && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="text-green-400 text-sm bg-green-400/10 border border-green-400/20 rounded-xl px-3 py-2">
          ✓ Changes saved successfully
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
