// import React, { useState, useRef, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../../redux/slices/authSlice";
// import { motion, AnimatePresence } from "framer-motion";
// import { getAvatarUrl } from "../../utils/helpers";
// import axios from "axios";


// const NotificationBell = ({ token }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [open, setOpen] = useState(false);
//   const bellRef = useRef(null);

//   const unread = notifications.filter((n) => !n.read).length;

//   useEffect(() => {
//     const handler = (e) => {
//       if (bellRef.current && !bellRef.current.contains(e.target))
//         setOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   useEffect(() => {
//     if (!token) return;
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 30000);
//     return () => clearInterval(interval);
//   }, [token]);

//   useEffect(() => {
//     const socket = window.socket;
//     if (!socket) return;
//     const handler = (n) => setNotifications((prev) => [n, ...prev]);
//     socket.on("notification", handler);
//     return () => socket.off("notification", handler);
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       const res = await axios.get("/api/notifications", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNotifications(res.data);
//     } catch {}
//   };

//   const markRead = async (id) => {
//     try {
//       await axios.put(
//         `/api/notifications/${id}/read`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
//       );
//     } catch {}
//   };

//   const markAllRead = async () => {
//     try {
//       await axios.put(
//         "/api/notifications/read-all",
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         },
//       );
//       setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//     } catch {}
//   };

//   const typeIcon = {
//     contribution_submitted: "📝",
//     contribution_approved: "✅",
//     contribution_rejected: "❌",
//     payment_received: "💰",
//     message: "💬",
//     certificate_generated: "🎓",
//     project_updated: "📢",
//   };

//   return (
//     <div className="relative" ref={bellRef}>
//       <button
//         onClick={() => setOpen(!open)}
//         className="relative p-2 rounded-full hover:bg-white/10 transition"
//       >
//         <svg
//           className="w-5 h-5 text-gray-300"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeWidth={2}
//             d="M15 17h5l-1.4-1.4A2 2 0 0118 14V11a6 6 0 00-4-5.6V5a2 2 0 10-4 0v.3A6 6 0 006 11v3c0 .5-.2 1-.6 1.4L4 17h5"
//           />
//         </svg>

//         {unread > 0 && (
//           <span className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-red-500 text-xs rounded-full px-1 text-white">
//             {unread}
//           </span>
//         )}
//       </button>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0 }}
//             className="absolute right-0 mt-3 w-80 bg-[#0f0f0f] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
//           >
//             <div className="px-4 py-3 border-b border-gray-800 text-sm font-semibold text-white">
//               Notifications
//             </div>

//             <div className="max-h-80 overflow-y-auto">
//               {notifications.length === 0 ? (
//                 <div className="p-6 text-center text-gray-500">
//                   No notifications
//                 </div>
//               ) : (
//                 notifications.map((n) => (
//                   <div
//                     key={n._id}
//                     className="p-3 border-b border-gray-800 hover:bg-white/5 transition"
//                   >
//                     <p className="text-sm text-white">{n.title}</p>
//                     <p className="text-xs text-gray-400">{n.message}</p>
//                   </div>
//                 ))
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// /* ================= NAVBAR ================= */
// const Navbar = () => {
//   const { user, token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isOpen, setIsOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searching, setSearching] = useState(false);
//   const dropdownRef = useRef(null);
//   const searchRef = useRef(null);

//   useEffect(() => {
//     const handler = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target))
//         setIsOpen(false);
//       if (searchRef.current && !searchRef.current.contains(e.target))
//         setSearchOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   useEffect(() => {
//     if (!token || !searchTerm.trim()) {
//       setSearchResults([]);
//       return;
//     }

//     const timeout = setTimeout(async () => {
//       try {
//         setSearching(true);
//         const res = await axios.get(
//           `/api/users/search?q=${encodeURIComponent(searchTerm.trim())}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           },
//         );
//         setSearchResults(res.data || []);
//         setSearchOpen(true);
//       } catch {
//         setSearchResults([]);
//       } finally {
//         setSearching(false);
//       }
//     }, 300);

//     return () => clearTimeout(timeout);
//   }, [searchTerm, token]);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   const isActive = (path) => location.pathname === path;

//   const navLinks = user
//     ? [
//         { to: "/projects", label: "Projects" },
//         { to: "/dashboard", label: "Dashboard" },
//         { to: "/messages", label: "Messages" },
//         { to: "/payments", label: "Payments" },
//       ]
//     : [{ to: "/projects", label: "Projects" }];

//   return (
//     <nav className="bg-black/90 backdrop-blur-lg border-b border-gray-800 sticky top-0  z-50 ">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex justify-between items-center h-20">
//           {/* LOGO */}
//           <Link to="/" className="flex items-center gap-3">
//             <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
//               DigitalPartner
//             </h1>
//           </Link>

//           {/* NAV LINKS */}
//           <div className="hidden md:flex gap-2">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.to}
//                 to={link.to}
//                 className={`px-4 py-2 rounded-lg text-sm transition ${
//                   isActive(link.to)
//                     ? "bg-indigo-600 text-white"
//                     : "text-gray-400 hover:text-white hover:bg-white/10"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* RIGHT */}
//           <div className="hidden md:flex items-center gap-3">
//             {user && token && (
//               <div className="relative" ref={searchRef}>
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   onFocus={() => setSearchOpen(true)}
//                   placeholder="Search freelancers/clients..."
//                   className="w-64 px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500"
//                 />
//                 {searchOpen && searchTerm.trim() && (
//                   <div className="absolute top-12 left-0 w-80 bg-[#0f0f0f] border border-gray-800 rounded-xl shadow-2xl max-h-80 overflow-y-auto z-50">
//                     {searching ? (
//                       <p className="p-3 text-sm text-gray-400">Searching...</p>
//                     ) : searchResults.length === 0 ? (
//                       <p className="p-3 text-sm text-gray-400">
//                         No users found
//                       </p>
//                     ) : (
//                       searchResults.map((u) => (
//                         <Link
//                           key={u._id}
//                           to={`/profile/${u._id}`}
//                           onClick={() => {
//                             setSearchOpen(false);
//                             setSearchTerm("");
//                           }}
//                           className="flex items-center gap-3 p-3 border-b border-gray-800 hover:bg-white/5 transition"
//                         >
//                           <img
//                             src={getAvatarUrl(u.name, u.avatar)}
//                             alt={u.name}
//                             className="w-9 h-9 rounded-full object-cover"
//                           />
//                           <div>
//                             <p className="text-sm text-white font-medium">
//                               {u.name}
//                             </p>
//                             <p className="text-xs text-gray-400 capitalize">
//                               {u.role}
//                             </p>
//                           </div>
//                         </Link>
//                       ))
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}

//             {user && token && <NotificationBell token={token} />}

//             {user ? (
//               <div className="relative" ref={dropdownRef}>
//                 <button
//                   onClick={() => setIsOpen(!isOpen)}
//                   className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/10 transition"
//                 >
//                   <img
//                     src={getAvatarUrl(user.name, user.avatar)}
//                     className="w-8 h-8 rounded-full"
//                   />
//                   <span className="text-sm text-white">{user.name}</span>
//                 </button>

//                 <AnimatePresence>
//                   {isOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0 }}
//                       className="absolute right-0 mt-3 w-52 bg-[#0f0f0f] border border-gray-800 rounded-xl shadow-xl"
//                     >
//                       <Link
//                         to="/settings"
//                         className="block px-4 py-2 hover:bg-white/10 text-gray-300"
//                       >
//                         Settings
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10"
//                       >
//                         Logout
//                       </button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ) : (
//               <>
//                 <Link to="/login" className="text-gray-400 hover:text-white">
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 transition"
//                 >
//                   Sign Up
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import { getAvatarUrl } from "../../utils/helpers";
import axios from "axios";

// ─── Notification Bell Component ──────────────────────────────────────────────
const NotificationBell = ({ token }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const bellRef = useRef(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

    const handleNewNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    };

    socket.on("notification", handleNewNotification);
    return () => socket.off("notification", handleNewNotification);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(response.data);
    } catch (error) {
      // Silently fail
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `/api/notifications/${id}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      // Silently fail
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(
        "/api/notifications/read-all",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (error) {
      // Silently fail
    }
  };

  const getIconForType = (type) => {
    const icons = {
      contribution_submitted: "📝",
      contribution_approved: "✅",
      contribution_rejected: "❌",
      payment_received: "💰",
      message: "💬",
      certificate_generated: "🎓",
      project_updated: "📢",
    };
    return icons[type] || "🔔";
  };

  return (
    <div className="relative" ref={bellRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-800 transition-colors duration-200"
        aria-label="Notifications"
      >
        <svg
          className="w-5 h-5 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-md">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-gray-900 rounded-2xl shadow-xl border border-gray-700 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gray-800/50">
              <h3 className="font-semibold text-gray-200 text-sm">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Notification List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-gray-700">
              {notifications.length === 0 ? (
                <div className="py-10 text-center">
                  <div className="text-3xl mb-2">🔔</div>
                  <p className="text-sm text-gray-400">No notifications yet</p>
                  <p className="text-xs text-gray-500 mt-1">
                    We'll notify you when something happens
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <Link
                    key={notification._id}
                    to={notification.link || "#"}
                    onClick={() => {
                      markAsRead(notification._id);
                      setIsOpen(false);
                    }}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-800 transition-colors ${
                      !notification.read ? "bg-indigo-900/30" : ""
                    }`}
                  >
                    <span className="text-xl flex-shrink-0 mt-0.5">
                      {getIconForType(notification.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-semibold truncate ${
                          !notification.read ? "text-indigo-300" : "text-gray-300"
                        }`}
                      >
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                        {notification.message}
                      </p>
                      {notification.time && (
                        <p className="text-[10px] text-gray-500 mt-1">
                          {new Date(notification.time).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-indigo-400 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </Link>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Navbar Component ────────────────────────────────────────────────────
const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  const isActiveRoute = (path) => location.pathname === path;

  const getNavLinks = () => {
    if (user) {
      return [
        { to: "/projects", label: "Browse Projects" },
        { to: "/dashboard", label: "Dashboard" },
        { to: "/messages", label: "Messages" },
        { to: "/certificates", label: "Certificates" },
        { to: "/payments", label: "Payments" },
      ];
    }
    return [{ to: "/projects", label: "Browse Projects" }];
  };

  const navLinks = getNavLinks();

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent hidden sm:block">
              DigitalPartner
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActiveRoute(link.to)
                    ? "bg-indigo-900/30 text-indigo-300"
                    : "text-gray-300 hover:text-indigo-300 hover:bg-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Notification Bell */}
            {user && token && <NotificationBell token={token} />}

            {/* User Profile Dropdown */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-gray-900 transition-all duration-200 border border-transparent hover:border-gray-700 group"
                >
                  <div className="relative">
                    <img
                      src={getAvatarUrl(user.name, user.avatar)}
                      alt={user.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/30 group-hover:ring-indigo-400/50 transition-all duration-200"
                      onError={(e) => {
                        e.target.src = getAvatarUrl(user.name, null);
                      }}
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-semibold text-gray-200 leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400 capitalize leading-none mt-0.5">
                      {user.role}
                    </p>
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-2xl shadow-xl border border-gray-700 py-2 overflow-hidden"
                    >
                      {/* Profile Header */}
                      <div className="px-4 py-3 border-b border-gray-700">
                        <div className="flex items-center space-x-3">
                          <img
                            src={getAvatarUrl(user.name, user.avatar)}
                            alt={user.name}
                            className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/30"
                            onError={(e) => {
                              e.target.src = getAvatarUrl(user.name, null);
                            }}
                          />
                          <div>
                            <p className="font-semibold text-gray-200 text-sm">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-400 truncate max-w-[140px]">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Dropdown Items */}
                      <Link
                        to={`/profile/${user._id}`}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <span className="text-base">👤</span>
                        <span>View Profile</span>
                      </Link>

                      <Link
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <span className="text-base">⚙️</span>
                        <span>Settings</span>
                      </Link>

                      <div className="border-t border-gray-700 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-900/20 transition-colors"
                        >
                          <span className="text-base">🚪</span>
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Login / Sign Up for non-authenticated users */
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-indigo-300 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {user && token && <NotificationBell token={token} />}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:bg-gray-900 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-800 bg-black overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {/* User Info in Mobile Menu */}
              {user && (
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-900 to-indigo-900/20 rounded-xl mb-3">
                  <img
                    src={getAvatarUrl(user.name, user.avatar)}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/30"
                    onError={(e) => {
                      e.target.src = getAvatarUrl(user.name, null);
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-200 text-sm">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {user.role}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActiveRoute(link.to)
                      ? "bg-indigo-900/30 text-indigo-300"
                      : "text-gray-300 hover:bg-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    to={`/profile/${user._id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-900 transition-colors"
                  >
                    👤 Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-900 transition-colors"
                  >
                    ⚙️ Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-900/20 transition-colors"
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <div className="pt-2 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-2.5 rounded-xl border border-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-900 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

