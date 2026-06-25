import React from "react";

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect your name, email address, phone number, bank account details (for payments), profile information, and activity data on the platform. We also collect device and usage information to improve platform performance.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "Your data is used to create and manage your account, process payments and withdrawals, verify your identity, send important platform notifications, and improve our services. We do not sell your personal data to third parties.",
  },
  {
    title: "3. Payment Data",
    content:
      "Bank account details and payment information are stored using industry-standard encryption. Payment processing is handled by certified third-party payment gateways. DigitalPartner never stores raw card numbers.",
  },
  {
    title: "4. Data Sharing",
    content:
      "We share necessary data only with our payment processors, identity verification partners, and legal authorities when required by law. Freelancer profiles (excluding private contact info) are visible to clients on the platform.",
  },
  {
    title: "5. Cookies",
    content:
      "We use cookies to maintain your login session, remember preferences, and analyse platform usage. You can control cookie preferences through your browser settings. Disabling cookies may affect platform functionality.",
  },
  {
    title: "6. Data Security",
    content:
      "We use SSL encryption, secure servers, and regular security audits to protect your data. While we take all reasonable steps, no system is 100% immune to breaches. We will notify you promptly of any data incident affecting your account.",
  },
  {
    title: "7. Your Rights",
    content:
      "You have the right to access, update, or delete your personal data at any time through your account settings. You may also request a full copy of your data or ask us to restrict its processing by contacting our support team.",
  },
  {
    title: "8. Data Retention",
    content:
      "We retain your account data for as long as your account is active or as required by law. When you delete your account, we remove personally identifiable data within 30 days, except where we are required to retain records for legal or financial compliance.",
  },
  {
    title: "9. Children's Privacy",
    content:
      "DigitalPartner is not intended for users under the age of 18. We do not knowingly collect data from minors. If we discover that a minor has created an account, it will be deleted immediately.",
  },
  {
    title: "10. Policy Updates",
    content:
      "This Privacy Policy may be updated from time to time. We will notify you via email of any material changes. Continued use of the platform after changes constitutes your agreement to the updated policy.",
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gradient-to-br from-indigo-900/40 via-gray-950 to-purple-900/30 border-b border-gray-800 py-16 px-6 text-center">
        <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Legal
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base">
          Last updated: March 2026. Your privacy matters. Here is exactly how we
          handle your data.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="space-y-8">
          {sections.map((s, i) => (
            <div key={i} className="border-b border-gray-800 pb-8">
              <h2 className="text-lg font-bold text-white mb-3">{s.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                {s.content}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-sm">
            Questions about privacy? Contact{" "}
            <span className="text-indigo-400">privacy@digitalpartner.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
