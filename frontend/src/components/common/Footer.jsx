import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* BRAND */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              DigitalPartner
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A next-generation freelancing platform connecting talented
              freelancers and clients worldwide. Collaborate, contribute, and
              earn fairly.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3 mt-5">
              {["🌐", "🐦", "💼", "📸"].map((icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-indigo-600 transition cursor-pointer"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/footer-browse-projects"
                  className="text-gray-400 hover:text-white transition"
                >
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/footer-dashboard"
                  className="text-gray-400 hover:text-white transition"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/footer-messages"
                  className="text-gray-400 hover:text-white transition"
                >
                  Messages
                </Link>
              </li>
              <li>
                <Link
                  to="/footer-about"
                  className="text-gray-400 hover:text-white transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/footer-contact"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* FREELANCERS */}
          <div>
            <h4 className="font-semibold mb-4 text-white">For Freelancers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/how-it-works"
                  className="text-gray-400 hover:text-white transition"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  to="/footer-certificates"
                  className="text-gray-400 hover:text-white transition"
                >
                  Certificates
                </Link>
              </li>
              <li>
                <Link
                  to="/footer-payments"
                  className="text-gray-400 hover:text-white transition"
                >
                  Payments
                </Link>
              </li>
              <li>
                <Link
                  to="/footer-profile"
                  className="text-gray-400 hover:text-white transition"
                >
                  Build Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/footer-earnings"
                  className="text-gray-400 hover:text-white transition"
                >
                  Track Earnings
                </Link>
              </li>
            </ul>
          </div>

          {/* CLIENTS */}
          <div>
            <h4 className="font-semibold mb-4 text-white">For Clients</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/footer-post-project"
                  className="text-gray-400 hover:text-white transition"
                >
                  Post a Project
                </Link>
              </li>
              <li>
                <Link
                  to="/footer-hire"
                  className="text-gray-400 hover:text-white transition"
                >
                  Hire Talent
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-gray-400 hover:text-white transition"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  to="/footer-success-stories"
                  className="text-gray-400 hover:text-white transition"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  to="/footer-pricing"
                  className="text-gray-400 hover:text-white transition"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* TRUST + NEWSLETTER */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-3">
              Subscribe for updates, tips & new opportunities.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-l-lg bg-white/5 border border-gray-700 text-sm focus:outline-none"
              />
              <button className="px-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-r-lg text-sm">
                Join
              </button>
            </div>

            {/* TRUST BADGES */}
            <div className="mt-5 text-sm text-gray-400 space-y-1">
              <p>🔒 Secure Payments</p>
              <p>✔ Verified Freelancers</p>
              <p>🌍 Global Platform</p>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 DigitalPartner. All rights reserved. Shivam Kumar</p>

          <div className="flex gap-4">
            <Link to="/footer-privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link to="/footer-terms" className="hover:text-white transition">
              Terms
            </Link>
            <Link to="/footer-cookies" className="hover:text-white transition">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
