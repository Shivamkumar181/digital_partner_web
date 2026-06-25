import React from 'react'

const FooterContact = () => {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-20">

      <h1 className="text-4xl font-bold text-center mb-10">Contact Us</h1>

      <div className="max-w-xl mx-auto">

        <form className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded bg-gray-900 border border-gray-700"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded bg-gray-900 border border-gray-700"
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full p-3 rounded bg-gray-900 border border-gray-700"
          />

          <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
            Send Message
          </button>
        </form>

      </div>
    </div>
  )
}

export default FooterContact;