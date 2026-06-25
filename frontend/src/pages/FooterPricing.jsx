import React from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    desc: "Perfect for getting started as a freelancer or posting your first project.",
    features: [
      "Post up to 2 projects/month",
      "Apply to 10 projects/month",
      "Basic profile listing",
      "Standard support",
      "Escrow payment protection",
    ],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    desc: "For active freelancers and clients who want more reach and faster results.",
    features: [
      "Unlimited project posts",
      "Unlimited proposals",
      "Featured profile in search",
      "Priority support",
      "Verified badge eligibility",
      "Analytics dashboard",
      "Custom portfolio URL",
    ],
    cta: "Start Pro Plan",
    highlight: true,
  },
  {
    name: "Business",
    price: "₹1,499",
    period: "/month",
    desc: "For agencies, studios, and businesses with high-volume hiring needs.",
    features: [
      "Everything in Pro",
      "Team accounts (up to 5 users)",
      "Dedicated account manager",
      "Bulk project posting",
      "Advanced analytics & reports",
      "API access",
      "Invoice management",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const feeInfo = [
  {
    label: "Client Service Fee",
    value: "5% added on top of project budget at checkout",
  },
  {
    label: "Freelancer Platform Fee",
    value: "Zero — you keep 100% of what you agreed",
  },
  {
    label: "Withdrawal Fee",
    value: "Free for bank transfers. PayPal: 2% (capped at ₹200)",
  },
  {
    label: "Escrow Fee",
    value: "Included in the client service fee — no extra charge",
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gradient-to-br from-indigo-900/40 via-gray-950 to-purple-900/30 border-b border-gray-800 py-16 px-6 text-center">
        <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Pricing
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base">
          No hidden fees. No surprises. Choose the plan that fits your needs —
          upgrade or cancel anytime.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 flex flex-col border transition ${
                p.highlight
                  ? "bg-gradient-to-b from-indigo-900/60 to-purple-900/40 border-indigo-500 shadow-lg shadow-indigo-900/30"
                  : "bg-gray-900 border-gray-800"
              }`}
            >
              {p.highlight && (
                <span className="text-xs font-bold bg-indigo-500 text-white px-3 py-1 rounded-full self-start mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold mb-1">{p.name}</h3>
              <div className="mb-3">
                <span className="text-3xl font-extrabold">{p.price}</span>
                <span className="text-gray-400 text-sm">{p.period}</span>
              </div>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                {p.desc}
              </p>
              <ul className="space-y-2 flex-1 mb-6">
                {p.features.map((f, j) => (
                  <li key={j} className="flex gap-2 text-sm text-gray-300">
                    <span className="text-green-400 shrink-0">✔</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className={`block text-center py-2.5 rounded-xl text-sm font-semibold transition ${
                  p.highlight
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90"
                    : "border border-gray-600 hover:border-white"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Fee Breakdown */}
        <section className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Platform Fee Breakdown</h2>
          <div className="space-y-3">
            {feeInfo.map((f, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-gray-800 pb-3"
              >
                <span className="text-sm font-semibold text-white">
                  {f.label}
                </span>
                <span className="text-sm text-gray-400">{f.value}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">
            Questions about pricing? We are happy to help.
          </p>
          <Link
            to="/contact"
            className="px-7 py-3 border border-gray-600 rounded-xl text-sm hover:border-white transition inline-block"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
