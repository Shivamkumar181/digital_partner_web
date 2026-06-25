import React from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { getAvatarUrl } from "../../utils/helpers";
import { motion } from "framer-motion";
import { Briefcase, Clock, DollarSign, Users, Zap, IndianRupee } from "lucide-react";

const categoryColors = {
  "web development": {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/30",
  },
  "mobile development": {
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    border: "border-indigo-500/30",
  },
  design: {
    bg: "bg-pink-500/10",
    text: "text-pink-400",
    border: "border-pink-500/30",
  },
  writing: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
  },
  marketing: {
    bg: "bg-green-500/10",
    text: "text-green-400",
    border: "border-green-500/30",
  },
  other: {
    bg: "bg-gray-500/10",
    text: "text-gray-400",
    border: "border-gray-500/30",
  },
};

const statusConfig = {
  open: {
    label: "Open",
    icon: Zap,
    classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
  "in-progress": {
    label: "In Progress",
    icon: Users,
    classes: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  },
  completed: {
    label: "Completed",
    icon: Briefcase,
    classes: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  },
  cancelled: {
    label: "Cancelled",
    icon: Clock,
    classes: "bg-red-500/10 text-red-400 border-red-500/30",
  },
};

// components/chat/ChatRoom.jsx - Make sure socket URL is correct
const getSocket = () => {
  if (!socketInstance || socketInstance.disconnected) {
    socketInstance = io("http://localhost:5000", {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socketInstance;
};

const ProjectCard = ({ project, index }) => {
  const catColor = categoryColors[project.category] || categoryColors["other"];
  const status = statusConfig[project.status] || statusConfig["open"];
  const StatusIcon = status.icon;
  const ownerName = project.clientId?.name || "Anonymous";
  const ownerAvatar = getAvatarUrl(ownerName, project.clientId?.avatar);
  const firstImage = project.images?.[0];
  const firstImageUrl =
    typeof firstImage === "string" ? firstImage : firstImage?.url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link to={`/projects/${project._id}`} className="block h-full">
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 overflow-hidden h-full">
          {/* Glow Effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-purple-600/0 group-hover:from-purple-600/5 group-hover:via-purple-600/5 group-hover:to-purple-600/5 transition-all duration-500"></div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3 z-10">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${status.classes}`}
            >
              <StatusIcon size={12} />
              {status.label}
            </span>
          </div>

          {/* Image Section */}
          {project.images && project.images.length > 0 && firstImageUrl && (
            <div className="relative h-32 overflow-hidden">
              <img
                src={firstImageUrl}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
              {project.images.length > 1 && (
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
                  +{project.images.length - 1}
                </span>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-4">
            {/* Category */}
            <div className="mb-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-xs font-medium ${catColor.bg} ${catColor.text} border ${catColor.border}`}
              >
                <Briefcase size={10} />
                {project.category?.charAt(0).toUpperCase() +
                  project.category?.slice(1)}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-white mb-1 line-clamp-1 group-hover:text-purple-400 transition-colors">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-xs text-gray-500 line-clamp-2 mb-3">
              {project.description}
            </p>

            {/* Skills */}
            {project.skills && project.skills.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {project.skills.slice(0, 2).map((skill, i) => (
                  <span
                    key={i}
                    className="px-1.5 py-0.5 bg-gray-800 text-gray-400 text-xs rounded-md"
                  >
                    {skill}
                  </span>
                ))}
                {project.skills.length > 2 && (
                  <span className="px-1.5 py-0.5 bg-gray-800 text-gray-500 text-xs rounded-md">
                    +{project.skills.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* Budget */}
            <div className="flex items-baseline gap-1 mb-3">
              <DollarSign size={14} className="text-purple-400" />
              <IndianRupee size={14} className="text-purple-400"/>
              <span className="text-lg font-bold text-purple-400">
                ${Number(project.budget).toLocaleString()}
              </span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-800">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src={ownerAvatar}
                    alt={ownerName}
                    className="w-6 h-6 rounded-full object-cover ring-2 ring-gray-800"
                    onError={(e) => {
                      e.target.src = getAvatarUrl(ownerName, null);
                    }}
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full ring-1 ring-gray-900"></div>
                </div>
                <div>
                  <p className="text-xs font-medium text-white leading-none">
                    {ownerName}
                  </p>
                  <p className="text-xs text-gray-500 leading-none mt-0.5">
                    Client
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Clock size={10} />
                <span className="text-xs">
                  {formatDistanceToNow(new Date(project.createdAt))}
                </span>
              </div>
            </div>
          </div>

          {/* Hover Overlay CTA */}
          <div className="absolute inset-x-0 bottom-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 text-center">
              <span className="text-white text-xs font-semibold">
                View Details →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
