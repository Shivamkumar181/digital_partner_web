import React from "react";
import { Link } from "react-router-dom";

const stories = [
  {
    name: "Priya S.",
    role: "UI/UX Designer, Pune",
    earned: "₹3.2L in 6 months",
    quote:
      "I left my agency job and now earn more freelancing from home. DigitalPartner gave me my first 5 clients within a month.",
    avatar: "👩‍💻",
    tags: ["Figma", "Mobile Design", "Branding"],
  },
  {
    name: "Rahul M.",
    role: "Full Stack Developer, Bangalore",
    earned: "₹8L in 1 year",
    quote:
      "The escrow system meant I never had to chase a payment. Every project, every rupee — always on time.",
    avatar: "👨‍💻",
    tags: ["React", "Node.js", "AWS"],
  },
  {
    name: "Ananya K.",
    role: "Content Writer, Delhi",
    earned: "₹1.8L in 3 months",
    quote:
      "As a fresh graduate, I had no contacts. DigitalPartner helped me build a client base from zero — with real reviews.",
    avatar: "✍️",
    tags: ["SEO Writing", "Blogs", "Copywriting"],
  },
  {
    name: "Vikram T.",
    role: "Video Editor, Mumbai",
    earned: "₹4.5L in 8 months",
    quote:
      "My badge as a Top Rated freelancer doubled my enquiries. Clients trust verified profiles much more.",
    avatar: "🎬",
    tags: ["Premiere Pro", "After Effects", "YouTube"],
  },
];

export default function SuccessStories() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gradient-to-br from-indigo-900/40 via-gray-950 to-purple-900/30 border-b border-gray-800 py-16 px-6 text-center">
        <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Real Stories
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
          Freelancers Winning on DigitalPartner
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base">
          These are real people who built real income on this platform. Your
          story could be next.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        <div className="grid md:grid-cols-2 gap-6">
          {stories.map((s, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-indigo-600/40 transition"
            >
              <div className="flex gap-4 items-center mb-4">
                <div className="text-4xl">{s.avatar}</div>
                <div>
                  <p className="font-bold text-white">{s.name}</p>
                  <p className="text-gray-500 text-sm">{s.role}</p>
                </div>
              </div>
              <p className="text-indigo-400 font-semibold text-sm mb-3">
                💰 {s.earned}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 italic">
                "{s.quote}"
              </p>
              <div className="flex gap-2 flex-wrap">
                {s.tags.map((t, j) => (
                  <span
                    key={j}
                    className="text-xs px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-700/40 text-indigo-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <section className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-700/40 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Ready to write your own success story?
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Join DigitalPartner for free. Build your profile. Start earning.
          </p>
          <Link
            to="/signup"
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold hover:opacity-90 transition inline-block"
          >
            Create Free Account
          </Link>
        </section>
      </div>
    </div>
  );
}
