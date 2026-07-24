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
  <h3 className="text-xl font-semibold">Shivam Kumar</h3>
  <p className="text-gray-400 text-sm mt-2 max-w-md">
    Visionary founder passionate about building the future of freelancing
    through collaboration and innovation.
  </p>
  <a
    href="https://www.linkedin.com/in/shivam-kumar-a63914247"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-3 text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
    aria-label="LinkedIn Profile"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="hover:scale-110 transition-transform duration-200"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  </a>
</div>
      </div>

    </div>
  )
}

export default FooterAboutUs;
