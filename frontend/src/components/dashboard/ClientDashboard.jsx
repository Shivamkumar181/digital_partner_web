import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ClientDashboard = ({ stats }) => {
  const statsCards = [
    {
      title: "Active Projects",
      value: stats?.activeProjects || 0,
      color: "bg-blue-500",
      icon: "📊",
    },
    {
      title: "Total Spent",
      value: `$${stats?.totalSpent || 0}`,
      color: "bg-green-500",
      icon: "💰",
    },
    {
      title: "Contributions Received",
      value: stats?.contributionsReceived || 0,
      color: "bg-purple-500",
      icon: "📝",
    },
    {
      title: "Completed Projects",
      value: stats?.completedProjects || 0,
      color: "bg-yellow-500",
      icon: "✅",
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

      {/* Recent Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-900 rounded-xl border border-gray-800 p-6"
      >
        <h2 className="text-2xl font-bold mb-4">Recent Projects</h2>
        {stats?.recentProjects && stats.recentProjects.length > 0 ? (
          <div className="space-y-4">
            {stats.recentProjects.map((project) => (
              <div
                key={project._id}
                className="border border-gray-800 rounded-lg p-4 hover:border-indigo-500/40 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {project.description?.substring(0, 100)}...
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      project.status === "open"
                        ? "bg-green-500/20 text-green-300"
                        : project.status === "in-progress"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <p className="text-indigo-600 font-semibold">
                    ${project.budget}
                  </p>
                  <Link
                    to={`/projects/${project._id}`}
                    className="text-indigo-600 hover:underline text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-8">
            No projects yet. Create your first project!
          </p>
        )}
      </motion.div>
    </>
  );
};

export default ClientDashboard;
