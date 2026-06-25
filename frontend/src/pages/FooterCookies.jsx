import React from 'react'

const types = [
  { name: 'Essential Cookies', desc: 'Required for the platform to function. These handle login sessions, security, and core features. Cannot be disabled.', icon: '🔒' },
  { name: 'Performance Cookies', desc: 'Help us understand how users interact with the platform so we can improve speed and usability.', icon: '📊' },
  { name: 'Preference Cookies', desc: 'Remember your settings like language, theme, and notification preferences.', icon: '⚙️' },
  { name: 'Analytics Cookies', desc: 'Provide aggregate data about platform usage — no personally identifiable information is shared.', icon: '📈' },
]

export default function Cookies() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gradient-to-br from-indigo-900/40 via-gray-950 to-purple-900/30 border-b border-gray-800 py-16 px-6 text-center">
        <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">Legal</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
          Cookie Policy
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base">
          We use cookies to make DigitalPartner work properly and to improve your experience.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, keep you logged in, and understand how you use the site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Types of Cookies We Use</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {types.map((t, i) => (
              <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex gap-4">
                <span className="text-3xl shrink-0">{t.icon}</span>
                <div>
                  <h3 className="font-semibold mb-1">{t.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How to Manage Cookies</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            You can control and delete cookies through your browser settings. Note that disabling non-essential cookies may affect certain features of DigitalPartner such as saved preferences and auto-login.
          </p>
          <p className="text-gray-500 text-sm">Browser guides: Chrome → Settings → Privacy → Cookies. Firefox → Options → Privacy & Security. Safari → Preferences → Privacy.</p>
        </section>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-sm">Cookie questions? Contact <span className="text-indigo-400">support@digitalpartner.com</span></p>
        </div>
      </div>
    </div>
  )
}