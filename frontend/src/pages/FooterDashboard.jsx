import React from 'react'

const FooterDashboard = () => {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-6">Dashboard Guide</h1>

      <div className="max-w-4xl mx-auto text-gray-400 space-y-6">
        <p>Your dashboard is your control center.</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>View all your active projects</li>
          <li>Track earnings and payments</li>
          <li>Monitor contribution status</li>
          <li>Access certificates</li>
          <li>Check notifications</li>
        </ul>

        <p>
          Everything you need is available in one place to manage your freelancing journey.
        </p>
      </div>
    </div>
  )
}

export default FooterDashboard