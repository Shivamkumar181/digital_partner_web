import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../redux/slices/projectSlice";
import ProjectCard from "../components/freelancer/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Grid3x3,
  Plus,
  Briefcase,
  Zap,
  Users,
  Clock,
} from "lucide-react";

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({
    category: "",
    status: "open",
    search: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const categories = [
    "All",
    "web development",
    "mobile development",
    "design",
    "writing",
    "marketing",
    "other",
  ];

  const statusOptions = [
    { value: "open", label: "Open", icon: Zap },
    { value: "in-progress", label: "In Progress", icon: Users },
    { value: "completed", label: "Completed", icon: Briefcase },
    { value: "all", label: "All Status", icon: Clock },
  ];

  const filteredProjects =
    user?.role === "client"
      ? projects.filter((project) => project.clientId?._id === user._id)
      : projects;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                {user?.role === "client" ? "My Projects" : "Browse Projects"}
              </h1>
              <p className="text-gray-500 mt-1">
                {user?.role === "client"
                  ? "Manage and track your posted projects"
                  : "Discover opportunities and contribute to amazing projects"}
              </p>
            </div>
            {user?.role === "client" && (
              <Link
                to="/projects/create"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                <Plus size={18} />
                Create Project
              </Link>
            )}
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 p-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <input
                  type="text"
                  name="search"
                  placeholder="Search projects by title, skills, or description..."
                  value={filters.search}
                  onChange={handleFilterChange}
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  showFilters
                    ? "bg-purple-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                <Filter size={18} />
                Filters
              </button>
            </div>

            {/* Expanded Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-700"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat === "All" ? "" : cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        value={filters.status}
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-12 text-center border border-gray-700"
          >
            <Grid3x3 size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No Projects Found
            </h3>
            <p className="text-gray-400 mb-6">
              {user?.role === "client"
                ? "You haven't created any projects yet. Start by creating your first project!"
                : "No projects match your criteria. Try adjusting your filters."}
            </p>
            {user?.role === "client" && (
              <Link
                to="/projects/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <Plus size={18} />
                Create Your First Project
              </Link>
            )}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
        )}

        {/* Stats Section */}
        {filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-gray-700">
              <p className="text-gray-500 text-sm">Total Projects</p>
              <p className="text-2xl font-bold text-white">
                {filteredProjects.length}
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-gray-700">
              <p className="text-gray-500 text-sm">Open Projects</p>
              <p className="text-2xl font-bold text-emerald-400">
                {filteredProjects.filter((p) => p.status === "open").length}
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-gray-700">
              <p className="text-gray-500 text-sm">In Progress</p>
              <p className="text-2xl font-bold text-amber-400">
                {
                  filteredProjects.filter((p) => p.status === "in-progress")
                    .length
                }
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl p-4 border border-gray-700">
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-2xl font-bold text-blue-400">
                {
                  filteredProjects.filter((p) => p.status === "completed")
                    .length
                }
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Projects;
