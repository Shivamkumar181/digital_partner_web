import React, { useState } from "react";
import { Link } from "react-router-dom";

const steps = [
  {
    num: "01",
    title: "Create Your Account",
    desc: "Sign up in under 2 minutes. Choose whether you are a freelancer looking for work or a client looking to hire.",
    icon: "👤",
  },
  {
    num: "02",
    title: "Complete Your Profile",
    desc: "Add your skills, portfolio, experience, and a professional photo. A complete profile gets 5x more responses.",
    icon: "📋",
  },
  {
    num: "03",
    title: "Browse or Post Projects",
    desc: "Freelancers browse open projects and send proposals. Clients post their project and receive proposals within hours.",
    icon: "🔍",
  },
  {
    num: "04",
    title: "Connect & Agree",
    desc: "Chat directly, discuss scope, timeline, and budget. Once agreed, the project begins with a clear milestone plan.",
    icon: "🤝",
  },
  {
    num: "05",
    title: "Work & Deliver",
    desc: "Freelancers complete work and submit for review. Clients review deliverables and request revisions if needed.",
    icon: "💼",
  },
  {
    num: "06",
    title: "Get Paid",
    desc: "Once the client approves, payment is released directly to the freelancer's bank account — no delays, no middlemen.",
    icon: "💸",
  },
];

const tabs = ["For Freelancers", "For Clients"];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-900/40 via-gray-950 to-purple-900/30 border-b border-gray-800 py-16 px-6 text-center">
        <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Platform Guide
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
          How DigitalPartner Works
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
          Everything you need to know about using the platform — from signing up
          to getting paid.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Tab Toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-gray-900 border border-gray-700 rounded-full p-1">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === i
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="grid gap-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className="flex gap-6 items-start bg-gray-900/60 border border-gray-800 rounded-2xl p-6 hover:border-indigo-600/50 transition"
            >
              <div className="text-3xl w-12 shrink-0 text-center">{s.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold text-indigo-400 tracking-widest">
                    {s.num}
                  </span>
                  <h3 className="text-lg font-bold text-white">{s.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-700/40 rounded-2xl py-12 px-6">
          <h2 className="text-2xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-gray-400 mb-6 text-sm">
            Join thousands of freelancers and clients already on DigitalPartner.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/signup"
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-sm hover:opacity-90 transition"
            >
              Create Free Account
            </Link>
            <Link
              to="/post-project"
              className="px-6 py-3 border border-gray-600 rounded-xl text-sm hover:border-white transition"
            >
              Post a Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
