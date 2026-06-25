import React from 'react'

const FooterMessages = () => {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-6">Messaging System</h1>

      <div className="max-w-4xl mx-auto text-gray-400 space-y-6">
        <p>
          Communicate with clients and freelancers in real-time.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Instant messaging with team members</li>
          <li>Share updates and files</li>
          <li>Get notified instantly</li>
          <li>Track conversation history</li>
        </ul>

        <p>
          Clear communication ensures better collaboration and faster results.
        </p>
      </div>
    </div>
  )
}

export default FooterMessages;