import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FreelancerDashboard = ({ stats }) => {
  const statsCards = [
    {
      title: "Total Earnings",
      value: `$${stats?.totalEarnings || 0}`,
      color: "bg-green-500",
      icon: "💰",
    },
    {
      title: "Approved Contributions",
      value: stats?.approvedContributions || 0,
      color: "bg-blue-500",
      icon: "✓",
    },
    {
      title: "Pending Reviews",
      value: stats?.pendingContributions || 0,
      color: "bg-yellow-500",
      icon: "⏳",
    },
    {
      title: "Certificates Earned",
      value: stats?.certificatesCount || 0,
      color: "bg-purple-500",
      icon: "📜",
    },
  ];

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900 rounded-xl border border-gray-800 p-6"
          >
            <div
              className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
            >
              <span className="text-white text-xl">{stat.icon}</span>
            </div>
            <p className="text-gray-400 text-sm">{stat.title}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Contributions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-900 rounded-xl border border-gray-800 p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Recent Contributions</h2>
        {stats?.recentContributions && stats.recentContributions.length > 0 ? (
          <div className="space-y-4">
            {stats.recentContributions.map((contribution) => (
              <div
                key={contribution._id}
                className="border border-gray-800 rounded-lg p-4 hover:border-indigo-500/40 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {contribution.projectId?.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {contribution.description?.substring(0, 100)}...
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      contribution.status === "approved"
                        ? "bg-green-500/20 text-green-300"
                        : contribution.status === "paid"
                          ? "bg-blue-500/20 text-blue-300"
                          : contribution.status === "rejected"
                            ? "bg-red-500/20 text-red-300"
                            : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {contribution.status}
                  </span>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <p className="text-indigo-600 font-semibold">
                    ${contribution.amount}
                  </p>
                  <Link
                    to={`/projects/${contribution.projectId?._id}`}
                    className="text-indigo-600 hover:underline text-sm"
                  >
                    View Project →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-8">
            No contributions yet. Start contributing to projects!
          </p>
        )}
      </motion.div>

      {/* Skills Section */}
      {stats?.skills && stats.skills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-900 rounded-xl border border-gray-800 p-6"
        >
          <h2 className="text-2xl font-bold mb-4">Your Skills</h2>
          <div className="flex flex-wrap gap-2">
            {stats.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default FreelancerDashboard;
