import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import io from "socket.io-client";
import { getAvatarUrl } from "../utils/helpers";


let socketInstance = null;
const getSocket = () => {
  if (!socketInstance || socketInstance.disconnected) {
    socketInstance = io("https://digital-partner.onrender.com", {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socketInstance;
};

const Messages = () => {
  const location = useLocation();
  const { user, token } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [roomId, setRoomId] = useState("");
  const [receiver, setReceiver] = useState(null);
  const [loading, setLoading] = useState(true);
  const endRef = useRef(null);
  const socketRef = useRef(null);

  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const receiverId = query.get("user");

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!token || !receiverId || !user?._id) return;

    const init = async () => {
      setLoading(true);
      try {
        const [profileRes, dmRes] = await Promise.all([
          axios.get(`/api/users/profile/${receiverId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.post(
            "/api/chat/direct",
            { receiverId },
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          ),
        ]);

        setReceiver(profileRes.data);
        setRoomId(dmRes.data.roomId);
        setMessages(dmRes.data.messages || []);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [token, receiverId, user?._id]);

  useEffect(() => {
    if (!roomId || !user?._id) return;

    const socket = getSocket();
    socketRef.current = socket;
    socket.emit("userOnline", user._id);
    socket.emit("joinDirect", { roomId, userId: user._id });

    const onReceive = (msg) => {
      setMessages((prev) => {
        const exists = prev.some(
          (m) => m._id?.toString() === msg._id?.toString(),
        );
        return exists ? prev : [...prev, msg];
      });
    };

    socket.on("receiveDirectMessage", onReceive);
    return () => {
      socket.off("receiveDirectMessage", onReceive);
    };
  }, [roomId, user?._id]);

  const sendMessage = (e) => {
    e.preventDefault();
    const message = text.trim();
    if (!message || !socketRef.current || !receiverId || !roomId) return;

    socketRef.current.emit("sendDirectMessage", {
      roomId,
      senderId: user._id,
      receiverId,
      message,
      senderName: user.name,
      senderAvatar: user.avatar || null,
    });
    setText("");
  };

  if (!receiverId) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-gray-400">
        Open chat from a user profile.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-800 bg-black flex items-center gap-3">
          <img
            src={getAvatarUrl(receiver?.name, receiver?.avatar)}
            alt={receiver?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-white font-semibold">
              {receiver?.name || "Chat"}
            </p>
            <p className="text-xs text-gray-400 capitalize">{receiver?.role}</p>
          </div>
        </div>

        <div className="h-[60vh] overflow-y-auto p-4 space-y-3 bg-black">
          {loading ? (
            <p className="text-gray-500 text-sm">Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No messages yet. Start chatting.
            </p>
          ) : (
            messages.map((m, i) => {
              const mine =
                (m.senderId?._id || m.senderId)?.toString() ===
                user?._id?.toString();
              return (
                <div
                  key={m._id || i}
                  className={`flex ${mine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${mine ? "bg-indigo-600 text-white" : "bg-gray-900 text-gray-100 border border-gray-700"}`}
                  >
                    {m.message}
                  </div>
                </div>
              );
            })
          )}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={sendMessage}
          className="p-3 border-t border-gray-800 bg-gray-950 flex gap-2"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-xl bg-black border border-gray-700 text-gray-100 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
