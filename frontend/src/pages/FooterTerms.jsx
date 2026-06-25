import React from "react";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By creating an account or using any part of the DigitalPartner platform, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.",
  },
  {
    title: "2. Eligibility",
    content:
      "You must be at least 18 years of age to use DigitalPartner. By registering, you confirm that you are legally allowed to enter into contracts in your country of residence.",
  },
  {
    title: "3. Account Responsibility",
    content:
      "You are responsible for keeping your login credentials secure. You must not share your account with others. Any activity performed under your account is your responsibility.",
  },
  {
    title: "4. Freelancer Obligations",
    content:
      "Freelancers must deliver work as described in their accepted proposals. Misrepresentation of skills, plagiarism, or submitting third-party work without disclosure is strictly prohibited and may result in account suspension.",
  },
  {
    title: "5. Client Obligations",
    content:
      "Clients must fund the agreed project amount into escrow before work begins. Clients must provide timely feedback and approvals. Unfair or fraudulent rejection of completed work is a violation of these terms.",
  },
  {
    title: "6. Payments & Escrow",
    content:
      "All payments are processed through DigitalPartner's secure escrow. Funds are held until the client approves the work, at which point they are released to the freelancer's registered bank account. DigitalPartner is not responsible for delays caused by banking institutions.",
  },
  {
    title: "7. Platform Fees",
    content:
      "DigitalPartner charges a service fee to clients on each transaction. Freelancers do not pay any commission on earnings. Detailed fee structures are available on the Pricing page.",
  },
  {
    title: "8. Dispute Resolution",
    content:
      "In the event of a dispute between a client and freelancer, DigitalPartner will review evidence from both parties and make a fair determination. Our decision in disputes involving escrow funds is final.",
  },
  {
    title: "9. Prohibited Activities",
    content:
      "Users may not use DigitalPartner for illegal activities, to circumvent escrow by making off-platform payments, to post offensive or discriminatory content, or to engage in spam or fraudulent behaviour.",
  },
  {
    title: "10. Termination",
    content:
      "DigitalPartner reserves the right to suspend or permanently ban accounts that violate these terms. Users may close their account at any time, subject to resolution of any active projects or outstanding payments.",
  },
  {
    title: "11. Limitation of Liability",
    content:
      "DigitalPartner is a marketplace and is not liable for the quality of work delivered by freelancers. We are not responsible for losses arising from delays, disputes, or circumstances beyond our control.",
  },
  {
    title: "12. Changes to Terms",
    content:
      "DigitalPartner may update these terms at any time. Users will be notified of significant changes via email. Continued use of the platform after changes constitutes acceptance of the new terms.",
  },
];

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="bg-gradient-to-br from-indigo-900/40 via-gray-950 to-purple-900/30 border-b border-gray-800 py-16 px-6 text-center">
        <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Legal
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
          Terms & Conditions
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-base">
          Last updated: March 2026. Please read these terms carefully before
          using DigitalPartner.
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
            For questions about these terms, contact us at{" "}
            <span className="text-indigo-400">legal@digitalpartner.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
