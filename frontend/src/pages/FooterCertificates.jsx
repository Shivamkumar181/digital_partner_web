import React from 'react'
import { Link } from 'react-router-dom'

const certs = [
  { title: 'Top Rated Freelancer', desc: 'Awarded to freelancers who consistently deliver 5-star work and maintain a high job success score.', icon: '⭐', color: 'from-yellow-500/20 to-orange-500/10 border-yellow-600/30' },
  { title: 'Verified Professional', desc: 'Granted after identity verification, skill assessment, and portfolio review by our team.', icon: '✅', color: 'from-green-500/20 to-emerald-500/10 border-green-600/30' },
  { title: 'Rising Talent', desc: 'For new freelancers who show exceptional quality early on. Great for building client trust fast.', icon: '🚀', color: 'from-indigo-500/20 to-blue-500/10 border-indigo-600/30' },
  { title: 'Expert Badge', desc: 'Skill-specific badge earned by passing DigitalPartner\'s competency tests in your niche.', icon: '🏅', color: 'from-purple-500/20 to-pink-500/10 border-purple-600/30' },
]

const howToEarn = [
  'Complete your profile 100% including portfolio and skills.',
  'Pass the relevant skill assessment test for your category.',
  'Complete at least 3 projects with 4.5+ star ratings.',
  'Maintain on-time delivery and positive client feedback.',
  'Badges are reviewed and updated every 30 days.',
]

export default function Certificates() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gradient-to-br from-indigo-900/40 via-gray-950 to-purple-900/30 border-b border-gray-800 py-16 px-6 text-center">
        <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">Badges & Certificates</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
          Earn Credentials That Get You Hired
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base">
          DigitalPartner badges show clients you are verified, skilled, and trustworthy — helping you win more projects.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        <section>
          <h2 className="text-2xl font-bold mb-8 text-center">Available Badges</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {certs.map((c, i) => (
              <div key={i} className={`bg-gradient-to-br ${c.color} border rounded-2xl p-6 hover:scale-[1.01] transition`}>
                <div className="text-4xl mb-3">{c.icon}</div>
                <h3 className="text-lg font-bold mb-2">{c.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">How to Earn a Badge</h2>
          <ol className="space-y-3">
            {howToEarn.map((step, i) => (
              <li key={i} className="flex gap-4 items-start text-sm text-gray-300">
                <span className="w-7 h-7 rounded-full bg-indigo-600/20 border border-indigo-600/40 flex items-center justify-center text-indigo-400 font-bold shrink-0 mt-0.5">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="text-center bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-700/40 rounded-2xl py-10 px-6">
          <h2 className="text-xl font-bold mb-3">Start building your reputation today</h2>
          <p className="text-gray-400 text-sm mb-6">Create your account, complete your profile, and start earning badges that clients trust.</p>
          <Link to="/signup" className="px-7 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-sm hover:opacity-90 transition inline-block">
            Sign Up Free
          </Link>
        </section>
      </div>
    </div>
  )
}