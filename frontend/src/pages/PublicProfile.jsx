import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { getAvatarUrl } from "../utils/helpers";

const PublicProfile = () => {
  const { userId } = useParams();
  const { token, user: currentUser } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`/api/users/profile/${userId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setProfile(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-xl">User not found</p>
      </div>
    );
  }

  const isOwnProfile = currentUser?._id === userId;
  const avatar = getAvatarUrl(profile.name, profile.avatar);

  const tabs = [
    { id: "overview", label: "Overview" },
    ...(profile.role === "freelancer"
      ? [
          { id: "contributions", label: "All Contributions" },
          { id: "certificates", label: "Certificates" },
        ]
      : [{ id: "projects", label: "All Projects" }]),
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 bg-black text-gray-100 p-4 sm:p-6 rounded-2xl">
      {/* Cover + Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-950 rounded-2xl shadow-sm border border-gray-800 overflow-hidden"
      >
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
          {isOwnProfile && (
            <Link
              to="/settings"
              className="absolute top-3 right-3 px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-lg hover:bg-white/30 transition-colors"
            >
              Edit Profile
            </Link>
          )}
        </div>

        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="flex items-end justify-between -mt-14 mb-4">
            <div className="relative">
              <img
                src={avatar}
                alt={profile.name}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-black border-2 border-gray-700 shadow-lg"
                onError={(e) => {
                  e.target.src = getAvatarUrl(profile.name, null);
                }}
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></span>
            </div>
            {!isOwnProfile && (
              <Link
                to={`/messages?user=${profile._id}`}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                💬 Message
              </Link>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-wrap items-start gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
              <p className="text-gray-400 text-sm mt-0.5 capitalize">
                {profile.role} · {profile.email}
              </p>
              {profile.bio && (
                <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                  {profile.bio}
                </p>
              )}
            </div>

            {/* Stats */}
            {profile.role === "freelancer" && (
              <div className="flex gap-4">
                <div className="text-center px-4 py-3 bg-green-900/20 rounded-xl border border-green-800">
                  <p className="text-2xl font-bold text-green-700">
                    ${profile.totalEarnings || 0}
                  </p>
                  <p className="text-xs text-green-600 font-medium">
                    Total Earned
                  </p>
                </div>
                <div className="text-center px-4 py-3 bg-blue-900/20 rounded-xl border border-blue-800">
                  <p className="text-2xl font-bold text-blue-700">
                    {profile.approvedContributions || 0}
                  </p>
                  <p className="text-xs text-blue-600 font-medium">
                    Contributions
                  </p>
                </div>
                <div className="text-center px-4 py-3 bg-purple-900/20 rounded-xl border border-purple-800">
                  <p className="text-2xl font-bold text-purple-700">
                    {profile.certificatesCount || 0}
                  </p>
                  <p className="text-xs text-purple-600 font-medium">
                    Certificates
                  </p>
                </div>
              </div>
            )}
            {profile.role === "client" && (
              <div className="flex gap-4">
                <div className="text-center px-4 py-3 bg-indigo-900/20 rounded-xl border border-indigo-800">
                  <p className="text-2xl font-bold text-indigo-700">
                    {profile.totalProjects || 0}
                  </p>
                  <p className="text-xs text-indigo-600 font-medium">
                    Projects
                  </p>
                </div>
                <div className="text-center px-4 py-3 bg-emerald-900/20 rounded-xl border border-emerald-800">
                  <p className="text-2xl font-bold text-emerald-700">
                    ${profile.totalSpent || 0}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium">
                    Total Spent
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {profile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-indigo-900/30 text-indigo-300 text-xs font-medium rounded-full border border-indigo-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-t border-gray-800 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-300"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <AnimatedTab id="overview" activeTab={activeTab}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-950 rounded-2xl p-5 border border-gray-800 shadow-sm">
            <h3 className="font-semibold text-white mb-3">About</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-500">Role</span>
                <span className="font-medium capitalize">{profile.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Member since</span>
                <span className="font-medium">
                  {profile.createdAt
                    ? format(new Date(profile.createdAt), "MMM yyyy")
                    : "-"}
                </span>
              </div>
              {profile.role === "freelancer" && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Rating</span>
                  <span className="font-medium">
                    {profile.averageRating
                      ? `⭐ ${profile.averageRating.toFixed(1)}`
                      : "No ratings"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {profile.skills && profile.skills.length > 0 && (
            <div className="bg-gray-950 rounded-2xl p-5 border border-gray-800 shadow-sm">
              <h3 className="font-semibold text-white mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-black border border-gray-700 text-gray-200 text-xs rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </AnimatedTab>

      <AnimatedTab id="contributions" activeTab={activeTab}>
        <div className="space-y-3">
          {(profile.recentContributions || []).length === 0 ? (
            <div className="bg-gray-950 rounded-2xl p-10 text-center border border-gray-800">
              <p className="text-gray-400">No contributions yet</p>
            </div>
          ) : (
            profile.recentContributions.map((c) => (
              <Link
                key={c._id}
                to={`/projects/${c.projectId?._id}`}
                className="block bg-gray-950 rounded-2xl p-4 border border-gray-800 shadow-sm hover:border-indigo-500/40 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-white">
                      {c.projectId?.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {c.description?.substring(0, 100)}...
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        c.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : c.status === "paid"
                            ? "bg-blue-100 text-blue-700"
                            : c.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {c.status}
                    </span>
                    <span className="text-indigo-600 font-bold text-sm">
                      ${c.amount}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </AnimatedTab>

      <AnimatedTab id="certificates" activeTab={activeTab}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(profile.certificates || []).length === 0 ? (
            <div className="col-span-2 bg-gray-950 rounded-2xl p-10 text-center border border-gray-800">
              <p className="text-gray-400">No certificates yet</p>
            </div>
          ) : (
            profile.certificates.map((cert, i) => (
              <div
                key={cert._id}
                className="bg-gray-950 rounded-2xl border border-gray-800 shadow-sm overflow-hidden"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                  <p className="text-xs opacity-75">
                    Certificate of Contribution
                  </p>
                  <p className="font-bold text-sm mt-0.5">
                    {cert.projectId?.title}
                  </p>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500">
                    Issued{" "}
                    {cert.issuedAt
                      ? format(new Date(cert.issuedAt), "PPP")
                      : "-"}
                  </p>
                  <p className="font-mono text-xs text-indigo-600 mt-1">
                    {cert.certificateId}
                  </p>
                  <Link
                    to={`/verify-certificate/${cert.certificateId}`}
                    className="mt-2 block text-xs text-center py-1.5 bg-indigo-900/30 text-indigo-300 rounded-lg hover:bg-indigo-900/50 transition-colors font-medium"
                  >
                    View Certificate →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </AnimatedTab>

      <AnimatedTab id="projects" activeTab={activeTab}>
        <div className="space-y-3">
          {(profile.recentProjects || []).length === 0 ? (
            <div className="bg-gray-950 rounded-2xl p-10 text-center border border-gray-800">
              <p className="text-gray-400">No projects posted yet</p>
            </div>
          ) : (
            profile.recentProjects.map((p) => (
              <Link
                key={p._id}
                to={`/projects/${p._id}`}
                className="block bg-gray-950 rounded-2xl p-4 border border-gray-800 shadow-sm hover:border-indigo-500/40 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-white">{p.title}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {p.description?.substring(0, 100)}...
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.status === "open"
                          ? "bg-green-100 text-green-700"
                          : p.status === "in-progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {p.status}
                    </span>
                    <span className="text-indigo-600 font-bold text-sm">
                      ${p.budget}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </AnimatedTab>
    </div>
  );
};

const AnimatedTab = ({ id, activeTab, children }) => {
  if (activeTab !== id) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default PublicProfile;
