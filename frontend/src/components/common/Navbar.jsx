import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import { getAvatarUrl } from "../../utils/helpers";
import axios from "axios";


const NotificationBell = ({ token }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const bellRef = useRef(null);

  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!token) return;
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [token]);

  useEffect(() => {
    const socket = window.socket;
    if (!socket) return;
    const handler = (n) => setNotifications((prev) => [n, ...prev]);
    socket.on("notification", handler);
    return () => socket.off("notification", handler);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
    } catch {}
  };

  const markRead = async (id) => {
    try {
      await axios.put(
        `/api/notifications/${id}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
      );
    } catch {}
  };

  const markAllRead = async () => {
    try {
      await axios.put(
        "/api/notifications/read-all",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch {}
  };

  const typeIcon = {
    contribution_submitted: "📝",
    contribution_approved: "✅",
    contribution_rejected: "❌",
    payment_received: "💰",
    message: "💬",
    certificate_generated: "🎓",
    project_updated: "📢",
  };

  return (
    <div className="relative" ref={bellRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-white/10 transition"
      >
        <svg
          className="w-5 h-5 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeWidth={2}
            d="M15 17h5l-1.4-1.4A2 2 0 0118 14V11a6 6 0 00-4-5.6V5a2 2 0 10-4 0v.3A6 6 0 006 11v3c0 .5-.2 1-.6 1.4L4 17h5"
          />
        </svg>

        {unread > 0 && (
          <span className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-red-500 text-xs rounded-full px-1 text-white">
            {unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 mt-3 w-80 bg-[#0f0f0f] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-gray-800 text-sm font-semibold text-white">
              Notifications
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No notifications
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n._id}
                    className="p-3 border-b border-gray-800 hover:bg-white/5 transition"
                  >
                    <p className="text-sm text-white">{n.title}</p>
                    <p className="text-xs text-gray-400">{n.message}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ================= NAVBAR ================= */
const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!token || !searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setSearching(true);
        const res = await axios.get(
          `/api/users/search?q=${encodeURIComponent(searchTerm.trim())}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setSearchResults(res.data || []);
        setSearchOpen(true);
      } catch {
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = user
    ? [
        { to: "/projects", label: "Projects" },
        { to: "/dashboard", label: "Dashboard" },
        { to: "/messages", label: "Messages" },
        { to: "/payments", label: "Payments" },
      ]
    : [{ to: "/projects", label: "Projects" }];

  return (
    <nav className="bg-black/90 backdrop-blur-lg border-b border-gray-800 sticky top-0  z-50 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              DigitalPartner
            </h1>
          </Link>

          {/* NAV LINKS */}
          <div className="hidden md:flex gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  isActive(link.to)
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-3">
            {user && token && (
              <div className="relative" ref={searchRef}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setSearchOpen(true)}
                  placeholder="Search freelancers/clients..."
                  className="w-64 px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                />
                {searchOpen && searchTerm.trim() && (
                  <div className="absolute top-12 left-0 w-80 bg-[#0f0f0f] border border-gray-800 rounded-xl shadow-2xl max-h-80 overflow-y-auto z-50">
                    {searching ? (
                      <p className="p-3 text-sm text-gray-400">Searching...</p>
                    ) : searchResults.length === 0 ? (
                      <p className="p-3 text-sm text-gray-400">
                        No users found
                      </p>
                    ) : (
                      searchResults.map((u) => (
                        <Link
                          key={u._id}
                          to={`/profile/${u._id}`}
                          onClick={() => {
                            setSearchOpen(false);
                            setSearchTerm("");
                          }}
                          className="flex items-center gap-3 p-3 border-b border-gray-800 hover:bg-white/5 transition"
                        >
                          <img
                            src={getAvatarUrl(u.name, u.avatar)}
                            alt={u.name}
                            className="w-9 h-9 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm text-white font-medium">
                              {u.name}
                            </p>
                            <p className="text-xs text-gray-400 capitalize">
                              {u.role}
                            </p>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {user && token && <NotificationBell token={token} />}

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10 transition"
                >
                  <img
                    src={getAvatarUrl(user.name, user.avatar)}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-white">{user.name}</span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute right-0 mt-3 w-52 bg-[#0f0f0f] border border-gray-800 rounded-xl shadow-xl"
                    >
                      <Link
                        to="/settings"
                        className="block px-4 py-2 hover:bg-white/10 text-gray-300"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-400 hover:text-white">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
