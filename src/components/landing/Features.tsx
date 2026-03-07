"use client";

import { motion } from "framer-motion";
import { Phone, Star, Calendar, Bot, FileText, Repeat } from "lucide-react";

const features = [
  {
    icon: Phone,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    title: "Missed Call Text-Back",
    description:
      "Every missed call gets an automatic SMS within 60 seconds. Stop losing $1,200 jobs because you couldn't pick up.",
    badge: "Most Popular",
  },
  {
    icon: Star,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    title: "Automated Review Requests",
    description:
      "After every job, customers get a friendly text asking for a Google review. Build 5-star reputation on autopilot.",
    badge: null,
  },
  {
    icon: Calendar,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    title: "Online Booking Widget",
    description:
      "Let customers book jobs directly from your website 24/7. No more phone tag. Wakes you up with a new booking.",
    badge: null,
  },
  {
    icon: Bot,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    title: "AI Call Answering",
    description:
      "An AI answers your phone when you're on-site, qualifies the lead, and schedules the appointment for you.",
    badge: "Pro Only",
  },
  {
    icon: Repeat,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    title: "Job Follow-Up Sequences",
    description:
      "Automatically re-engage past customers for seasonal service reminders, tune-ups, and maintenance calls.",
    badge: null,
  },
  {
    icon: FileText,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    title: "Monthly Performance Reports",
    description:
      "Clear dashboard showing missed calls recovered, reviews collected, bookings made, and revenue attributed.",
    badge: null,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything you need to{" "}
            <span className="gradient-text">never lose a lead again</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Six automation tools working 24/7 so you can focus on the job — not the phone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className={`glass-card rounded-2xl p-6 border ${feature.border} hover:scale-[1.02] transition-transform duration-200 relative`}
            >
              {feature.badge && (
                <span className="absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {feature.badge}
                </span>
              )}
              <div className={`inline-flex p-3 rounded-xl ${feature.bg} mb-4`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
