import React from 'react'
import { Link } from 'react-router-dom'

const tips = [
  { icon: '🖼️', title: 'Professional Photo', desc: 'A clear headshot makes clients 60% more likely to send you a message. Use a well-lit, friendly photo.' },
  { icon: '✍️', title: 'Compelling Bio', desc: 'Write 3–5 sentences explaining who you are, what you do best, and the value you bring to clients.' },
  { icon: '🛠️', title: 'List Your Skills', desc: 'Add specific skills like "React.js", "Logo Design", or "SEO Writing" — not generic ones like "Coding".' },
  { icon: '📁', title: 'Upload Portfolio Samples', desc: 'Show at least 3–5 real work samples. If you are new, create mock projects to demonstrate your ability.' },
  { icon: '💰', title: 'Set Your Rate', desc: 'Research market rates for your skill. Start competitive, then raise your rate as you get reviews.' },
  { icon: '🏆', title: 'Pass Skill Tests', desc: 'DigitalPartner skill assessments show verified competency and boost your profile in search results.' },
]

const sections = [
  { label: 'Basic Info', items: ['Full name', 'Profile photo', 'Tagline (e.g. "Full Stack Developer | 5 yrs exp")'] },
  { label: 'Skills & Expertise', items: ['Primary skill category', 'Sub-skills (up to 10)', 'Years of experience'] },
  { label: 'Portfolio', items: ['Project title', 'Description', 'Link or uploaded file/image'] },
  { label: 'Education & Certifications', items: ['Degree or course', 'Institution', 'Year of completion'] },
  { label: 'Languages', items: ['Language spoken', 'Proficiency level'] },
]

export default function BuildProfile() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gradient-to-br from-indigo-900/40 via-gray-950 to-purple-900/30 border-b border-gray-800 py-16 px-6 text-center">
        <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">Freelancer Guide</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
          Build a Profile That Wins
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base">
          Your profile is your resume, portfolio, and first impression — all in one. Here is how to make it stand out.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        <section>
          <h2 className="text-2xl font-bold mb-8 text-center">Profile Optimization Tips</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {tips.map((t, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex gap-4 hover:border-indigo-600/40 transition">
                <span className="text-3xl shrink-0">{t.icon}</span>
                <div>
                  <h3 className="font-semibold text-white mb-1">{t.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">What to Fill In</h2>
          <div className="space-y-4">
            {sections.map((s, i) => (
              <div key={i} className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
                <h3 className="font-bold text-indigo-400 mb-3">{s.label}</h3>
                <ul className="space-y-1">
                  {s.items.map((item, j) => (
                    <li key={j} className="text-gray-400 text-sm flex gap-2">
                      <span className="text-indigo-500">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-700/40 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold mb-3">Your profile is your business card — make it count</h2>
          <p className="text-gray-400 text-sm mb-6">Complete profiles receive 5x more project invitations from clients.</p>
          <Link to="/signup" className="px-7 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold text-sm hover:opacity-90 transition inline-block">
            Create Your Profile
          </Link>
        </section>
      </div>
    </div>
  )
}