"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marcus T.",
    role: "Owner, Arctic Air HVAC",
    location: "Phoenix, AZ",
    rating: 5,
    text: "I was missing 8-10 calls a week. With ServicePulse, every one of those people gets a text back in under a minute. Recovered at least $4,000 in jobs last month alone.",
  },
  {
    name: "Danny R.",
    role: "Owner, RapidFlow Plumbing",
    location: "Dallas, TX",
    rating: 5,
    text: "The review automation is insane. We went from 14 Google reviews to 87 in 6 weeks. Now we rank #1 for 'emergency plumber' in our area.",
  },
  {
    name: "Chris B.",
    role: "Owner, SkyShield Roofing",
    location: "Nashville, TN",
    rating: 5,
    text: "My guys are on roofs all day — they can't answer phones. ServicePulse does it for them. Booking widget alone has added 3 new jobs a week.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real results from{" "}
            <span className="gradient-text">real contractors</span>
          </h2>
          <p className="text-xl text-slate-400">
            Not agencies. Not SaaS founders. Actual HVAC, plumbing, and roofing business owners.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <div className="font-semibold text-white">{t.name}</div>
                <div className="text-sm text-slate-400">{t.role}</div>
                <div className="text-xs text-slate-500">{t.location}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
