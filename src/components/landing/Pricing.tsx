"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: 297,
    description: "Perfect for solo operators getting started with automation.",
    features: [
      "Missed call text-back (unlimited)",
      "Automated review requests",
      "Online booking widget",
      "Basic performance dashboard",
      "Email support",
    ],
    highlight: false,
    cta: "Start Free Trial",
  },
  {
    name: "Growth",
    price: 497,
    description: "For established businesses scaling their lead capture.",
    features: [
      "Everything in Starter",
      "Job follow-up sequences",
      "Custom SMS templates",
      "Advanced analytics",
      "Priority support",
      "Monthly strategy call",
    ],
    highlight: true,
    cta: "Start Free Trial",
  },
  {
    name: "Pro",
    price: 797,
    description: "Full automation suite for high-volume operations.",
    features: [
      "Everything in Growth",
      "AI call answering & scheduling",
      "Multi-location support",
      "White-label reports",
      "CRM integrations",
      "Dedicated account manager",
    ],
    highlight: false,
    cta: "Contact Sales",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h2>
          <p className="text-xl text-slate-400">
            No setup fees. No contracts. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-8 ${
                tier.highlight
                  ? "bg-gradient-to-b from-blue-600/20 to-violet-600/10 border-2 border-blue-500/50 glow-blue"
                  : "glass-card"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    <Zap className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{tier.description}</p>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-bold text-white">${tier.price}</span>
                  <span className="text-slate-400 mb-2">/month</span>
                </div>
              </div>

              <Link
                href="/sign-up"
                className={`block w-full text-center font-semibold py-3 rounded-xl mb-6 transition-all duration-200 ${
                  tier.highlight
                    ? "bg-blue-600 hover:bg-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/25"
                    : "glass-card hover:bg-white/5 text-slate-300 hover:text-white"
                }`}
              >
                {tier.cta}
              </Link>

              <ul className="space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
