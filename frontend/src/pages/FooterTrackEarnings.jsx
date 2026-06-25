import React from "react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: "📊",
    title: "Earnings Dashboard",
    desc: "View total earnings, pending payments, and monthly breakdowns from your personal dashboard in real-time.",
  },
  {
    icon: "📅",
    title: "Monthly Reports",
    desc: "Download PDF reports of all your completed transactions — useful for tax filings and financial planning.",
  },
  {
    icon: "🔔",
    title: "Payment Alerts",
    desc: "Get instant notifications via email and app when a payment is released, pending, or processed.",
  },
  {
    icon: "💳",
    title: "Withdrawal History",
    desc: "See a complete log of every withdrawal including date, amount, and bank account used.",
  },
  {
    icon: "📈",
    title: "Growth Insights",
    desc: "Track your earning trends over time. See which skills and project types earn you the most.",
  },
  {
    icon: "🧾",
    title: "Auto-Generated Invoices",
    desc: "Every completed project generates a professional invoice you can share with clients or keep for records.",
  },
];

const earningTips = [
  "Set competitive rates based on your skill level and market demand.",
  "Offer project packages (Basic / Standard / Premium) to attract more budgets.",
  "Deliver early when possible — clients who get fast delivery leave better reviews.",
  "Build repeat clients by offering discounts on their second project.",
  "Update your profile monthly with new portfolio samples to stay relevant.",
];

export default function TrackEarnings() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gradient-to-br from-indigo-900/40 via-gray-950 to-purple-900/30 border-b border-gray-800 py-16 px-6 text-center">
        <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Earnings Center
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
          Track Every Rupee You Earn
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base">
          DigitalPartner gives you complete visibility into your earnings —
          past, present, and future.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        <section>
          <h2 className="text-2xl font-bold mb-8 text-center">
            Earnings Tools Available to You
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex gap-4 hover:border-indigo-600/40 transition"
              >
                <span className="text-3xl shrink-0">{f.icon}</span>
                <div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            Tips to Maximize Your Income
          </h2>
          <ul className="space-y-3">
            {earningTips.map((tip, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-300">
                <span className="text-green-400 mt-0.5 shrink-0">✔</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-700/40 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-3">How Withdrawals Work</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Once a project is marked complete by the client, funds are released
            from escrow and transferred to your registered bank account.
            Withdrawals are processed within 1–3 business days. You can track
            every withdrawal in the Earnings tab of your dashboard.
          </p>
          <p className="text-gray-500 text-xs">
            Minimum withdrawal: ₹500 / $10 USD. No withdrawal fee on standard
            bank transfers.
          </p>
        </section>

        <div className="text-center">
          <Link
            to="/signup"
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold hover:opacity-90 transition inline-block"
          >
            Start Earning on DigitalPartner
          </Link>
        </div>
      </div>
    </div>
  );
}
