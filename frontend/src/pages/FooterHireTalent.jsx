import React from 'react'
import { Link } from 'react-router-dom'

const steps = [
  { icon: '🔍', title: 'Search Freelancers', desc: 'Use filters like skill, budget, rating, location, and availability to find the perfect match for your project.' },
  { icon: '📄', title: 'Review Profiles', desc: 'Check portfolios, read client reviews, view badges, and compare rates before reaching out.' },
  { icon: '💬', title: 'Message Directly', desc: 'Send a direct message to freelancers you like. Discuss your requirements before committing.' },
  { icon: '📋', title: 'Send a Project Offer', desc: 'Create a custom offer with scope, deadline, and budget. The freelancer accepts and work begins.' },
  { icon: '🔒', title: 'Escrow Payment', desc: 'Fund the project securely through escrow. No payment leaves until you approve the final work.' },
  { icon: '⭐', title: 'Review & Re-hire', desc: 'Leave a review after project completion and easily re-hire the same freelancer for future work.' },
]

const categories = [
  'Web & App Development', 'Graphic Design', 'Content Writing', 'Digital Marketing',
  'Video Editing', 'UI/UX Design', 'Data Entry', 'SEO & SEM',
  'Translation', 'Virtual Assistance', 'Accounting & Finance', 'Legal Services',
]

export default function HireTalent() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gradient-to-br from-indigo-900/40 via-gray-950 to-purple-900/30 border-b border-gray-800 py-16 px-6 text-center">
        <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">For Clients</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
          How to Hire Talent
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base">
          Find verified, skilled freelancers and hire with confidence — backed by escrow protection and transparent reviews.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        <section>
          <h2 className="text-2xl font-bold mb-8 text-center">How Hiring Works</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {steps.map((s, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex gap-4 hover:border-indigo-600/40 transition">
                <span className="text-3xl shrink-0">{s.icon}</span>
                <div>
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-5">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((c, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-gray-900 border border-gray-700 text-sm text-gray-300 hover:border-indigo-500 hover:text-white transition cursor-pointer">
                {c}
              </span>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-700/40 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-4">Why Hire on DigitalPartner?</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>✔ All freelancers are verified with real identity checks</li>
            <li>✔ Transparent ratings and portfolio for every freelancer</li>
            <li>✔ Escrow ensures you only pay for approved work</li>
            <li>✔ Dispute resolution support if issues arise</li>
            <li>✔ Direct communication — no waiting for intermediaries</li>
          </ul>
        </section>

        <div className="text-center">
          <Link to="/signup" className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold hover:opacity-90 transition inline-block">
            Sign Up to Hire
          </Link>
        </div>
      </div>
    </div>
  )
}