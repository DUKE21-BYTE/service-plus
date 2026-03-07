"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Connect your business phone",
    description:
      "We provision a local number that forwards to yours. Takes 5 minutes. Your existing number stays the same.",
  },
  {
    number: "02",
    title: "Automations go live instantly",
    description:
      "Missed call text-back, review requests, and booking widget activate immediately. No technical setup.",
  },
  {
    number: "03",
    title: "Watch leads convert on autopilot",
    description:
      "Your dashboard shows every recovered call, review collected, and booking made — in real time.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Up and running in{" "}
            <span className="gradient-text">under 15 minutes</span>
          </h2>
          <p className="text-xl text-slate-400">No IT. No contractors. No tech knowledge required.</p>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-blue-500/50 via-violet-500/50 to-green-500/50 hidden md:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start ml-0 md:ml-4"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-blue-500/20">
                  {step.number}
                </div>
                <div className="glass-card rounded-2xl p-6 flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
