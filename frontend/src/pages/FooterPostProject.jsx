import React from "react";
import { Link } from "react-router-dom";

const steps = [
  {
    num: "01",
    icon: "📝",
    title: "Describe Your Project",
    desc: "Write a clear title and detailed description of what you need. The more detail you provide, the better proposals you will receive.",
  },
  {
    num: "02",
    icon: "🏷️",
    title: "Set Budget & Timeline",
    desc: "Choose a fixed price or hourly rate. Set your deadline so freelancers know what they are committing to.",
  },
  {
    num: "03",
    icon: "🔖",
    title: "Add Tags & Category",
    desc: "Select the right skill category (e.g., Web Development, Design, Writing). Add tags to match the right talent.",
  },
  {
    num: "04",
    icon: "📢",
    title: "Publish Your Project",
    desc: 'Click "Post Project" and your listing goes live instantly. Qualified freelancers will start applying within hours.',
  },
  {
    num: "05",
    icon: "📨",
    title: "Review Proposals",
    desc: "Browse proposals, check freelancer profiles, badges, and ratings. Shortlist the best candidates.",
  },
  {
    num: "06",
    icon: "🤝",
    title: "Hire & Begin",
    desc: "Accept a proposal, fund escrow, and the project starts. You only pay when you approve the work.",
  },
];

const tips = [
  "Be specific — vague projects attract irrelevant proposals.",
  "Include examples of what you like or reference projects.",
  "Set a realistic budget — underpaying leads to poor quality.",
  "Respond quickly to freelancer questions to get started faster.",
  "Break large projects into milestones for better control.",
];

export default function PostProject() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gradient-to-br from-indigo-900/40 via-gray-950 to-purple-900/30 border-b border-gray-800 py-16 px-6 text-center">
        <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
          For Clients
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
          How to Post a Project
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base">
          Posting a project on DigitalPartner takes less than 5 minutes. Here is
          everything you need to know.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        <section>
          <h2 className="text-2xl font-bold mb-8 text-center">
            Step-by-Step Guide
          </h2>
          <div className="grid gap-5">
            {steps.map((s, i) => (
              <div
                key={i}
                className="flex gap-5 bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-indigo-600/40 transition"
              >
                <div className="text-3xl shrink-0">{s.icon}</div>
                <div>
                  <div className="flex gap-3 items-center mb-1">
                    <span className="text-xs text-indigo-400 font-bold tracking-widest">
                      {s.num}
                    </span>
                    <h3 className="font-bold text-white">{s.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-5">
            ✍️ Tips for Writing a Great Project Post
          </h2>
          <ul className="space-y-3">
            {tips.map((t, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-300">
                <span className="text-indigo-400 shrink-0">→</span> {t}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-700/40 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-3">
            💰 Payment & Escrow for Clients
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            When you accept a proposal, you fund the agreed amount into
            DigitalPartner's secure escrow. The freelancer only receives payment
            after you approve the work. If a project is cancelled before work
            begins, your escrow is fully refunded.
          </p>
          <p className="text-gray-500 text-xs">
            A small platform service fee is added on top of your project budget
            at checkout.
          </p>
        </section>

        <div className="text-center">
          <Link
            to="/signup"
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold hover:opacity-90 transition inline-block mr-4"
          >
            Sign Up & Post Free
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 border border-gray-600 rounded-xl text-sm hover:border-white transition inline-block"
          >
            Log In to Post
          </Link>
        </div>
      </div>
    </div>
  );
}
