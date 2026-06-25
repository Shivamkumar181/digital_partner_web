import React from 'react'

const FooterAboutUs = () => {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-20 text-center">

      <h1 className="text-4xl font-bold mb-10">About DigitalPartner</h1>

      <div className="max-w-4xl mx-auto text-gray-400 space-y-6">
        <p>
          DigitalPartner is a modern freelancing platform designed to empower collaboration.
          We believe in fair work distribution and transparent payments.
        </p>

        <p>
          Our mission is to revolutionize freelancing by allowing multiple contributors
          to work together on a single project and get rewarded fairly.
        </p>
      </div>

      {/* FOUNDER */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Founder</h2>

        <div className="flex flex-col items-center">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Shivam Kumar"
            className="w-24 h-24 rounded-full border-2 border-purple-500 mb-4"
          />
          <h3 className="text-xl font-semibold">Shivam Kumar</h3>
          <p className="text-gray-400 text-sm mt-2 max-w-md">
            Visionary founder passionate about building the future of freelancing
            through collaboration and innovation.
          </p>
        </div>
      </div>

    </div>
  )
}

export default FooterAboutUs;