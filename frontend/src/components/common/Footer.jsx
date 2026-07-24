import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
          {/* BRAND */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              DigitalPartner
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A next-generation freelancing platform connecting talented
              freelancers and clients worldwide. Collaborate, contribute, and
              earn fairly.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/projects"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/messages"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Messages
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* FREELANCERS */}
          <div>
            <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wider">
              For Freelancers
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/how-it-works"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  to="/certificates"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Certificates
                </Link>
              </li>
              <li>
                <Link
                  to="/payments"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Payments
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Build Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/earnings"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Track Earnings
                </Link>
              </li>
            </ul>
          </div>

          {/* CLIENTS */}
          <div>
            <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wider">
              For Clients
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/post-project"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Post a Project
                </Link>
              </li>
              <li>
                <Link
                  to="/hire"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Hire Talent
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  to="/success-stories"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* TRUST + NEWSLETTER */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wider">
              Stay Updated
            </h4>
            <p className="text-gray-400 text-sm mb-3">
              Subscribe for updates, tips & new opportunities.
            </p>

            {/* TRUST BADGES */}
            <div className="mt-5 text-sm text-gray-400 space-y-2">
              <p className="flex items-center gap-2">
                <span className="text-indigo-400 text-xs">◆</span>
                Secure Payments
              </p>
              <p className="flex items-center gap-2">
                <span className="text-indigo-400 text-xs">◆</span>
                Verified Freelancers
              </p>
              <p className="flex items-center gap-2">
                <span className="text-indigo-400 text-xs">◆</span>
                Global Platform
              </p>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p className="text-center md:text-left">
            © 2026 DigitalPartner. All rights reserved. Shivam Kumar
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-200">
              Terms
            </Link>
            <Link to="/cookies" className="hover:text-white transition-colors duration-200">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
