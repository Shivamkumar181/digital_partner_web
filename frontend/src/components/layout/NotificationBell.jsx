import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const NotificationBell = () => {
  const { token } = useSelector((s) => s.auth);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
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
    await axios.put(
      `/api/notifications/${id}/read`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllRead = async () => {
    await axios.put(
      "/api/notifications/read-all",
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
      >
        <svg
          className="w-6 h-6 text-gray-600"
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
        {unread > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <p className="font-bold text-gray-800">Notifications</p>
            {unread > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-indigo-600 hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-500 py-8 text-sm">
                No notifications
              </p>
            ) : (
              notifications.map((n) => (
                <Link
                  key={n._id}
                  to={n.link || "#"}
                  onClick={() => {
                    markRead(n._id);
                    setOpen(false);
                  }}
                  className={`block px-4 py-3 hover:bg-gray-50 border-b border-gray-50 ${!n.read ? "bg-indigo-50" : ""}`}
                >
                  <p
                    className={`text-sm font-semibold ${!n.read ? "text-indigo-800" : "text-gray-800"}`}
                  >
                    {n.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default NotificationBell;
