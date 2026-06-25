import React from "react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: "✅",
    title: "Client Approves Work",
    desc: "Once you submit your deliverable and the client marks it as complete, payment is automatically triggered.",
  },
  {
    icon: "🏦",
    title: "Funds Released Instantly",
    desc: "Payment is released from the secured escrow directly into your linked bank account or wallet — no waiting period.",
  },
  {
    icon: "💵",
    title: "You Receive Full Amount",
    desc: "DigitalPartner charges a small platform fee from the client side. You keep what was agreed — no hidden deductions.",
  },
];

const faqs = [
  {
    q: "How long does it take to receive payment?",
    a: "Payments are processed within 1–3 business days after client approval, depending on your bank.",
  },
  {
    q: "What payment methods are supported?",
    a: "We support direct bank transfers, UPI, PayPal, and major debit/credit cards.",
  },
  {
    q: "Is there a minimum withdrawal amount?",
    a: "The minimum withdrawal is ₹500 or $10 USD, depending on your region.",
  },
  {
    q: "Are payments secured?",
    a: "Yes. All payments go through encrypted escrow. The client pays upfront and funds are held safely until you deliver.",
  },
  {
    q: "What if the client doesn't pay?",
    a: "Since clients pay into escrow before work begins, your earnings are always protected from the start.",
  },
];

export default function Payments() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-900/40 via-gray-950 to-purple-900/30 border-b border-gray-800 py-16 px-6 text-center">
        <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Freelancer Payments
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
          Get Paid Directly to Your Account
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base">
          No middlemen. No delays. Once your work is approved, your money goes
          straight to your bank.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* Payment Flow */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-center">
            How Payment Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center hover:border-indigo-600/50 transition"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Direct Bank */}
        <section className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-700/40 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">
            🏦 Direct Bank Account Payments
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            DigitalPartner sends your earnings directly to your registered bank
            account. There are no wallet locks, no forced holding periods, and
            no surprise fees deducted from your side.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>✔ Supports all major Indian banks (NEFT/IMPS/UPI)</li>
            <li>✔ International wire transfer for global freelancers</li>
            <li>✔ PayPal supported in 50+ countries</li>
            <li>✔ Automatic tax invoice generated per transaction</li>
          </ul>
        </section>

        {/* Escrow Protection */}
        <section>
          <h2 className="text-2xl font-bold mb-4">🔒 Escrow Protection</h2>
          <p className="text-gray-400 leading-relaxed">
            Before any project begins, the client deposits the agreed amount
            into DigitalPartner's secure escrow system. This guarantees you will
            be paid for work you complete — no chasing clients, no unpaid
            invoices.
          </p>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5"
              >
                <p className="font-semibold text-white mb-1">Q: {f.q}</p>
                <p className="text-gray-400 text-sm">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link
            to="/signup"
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold hover:opacity-90 transition inline-block"
          >
            Start Earning Today
          </Link>
        </div>
      </div>
    </div>
  );
}
