import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { getAvatarUrl } from "../utils/helpers";

const Payments = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (user?.role === "client") {
        // Get all approved contributions for client's projects
        const res = await axios.get("/api/payments/pending", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContributions(res.data);
      } else {
        // Freelancer: get their earnings
        const res = await axios.get("/api/payments/my-earnings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContributions(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async (contributionId) => {
    setPayingId(contributionId);
    try {
      await axios.post(
        "/api/payments/pay",
        { contributionId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Payment marked as paid!");
      fetchData();
    } catch (e) {
      toast.error(e.response?.data?.message || "Payment failed");
    } finally {
      setPayingId(null);
    }
  };

  const pending = contributions.filter((c) => c.status === "approved");
  const paid = contributions.filter((c) => c.status === "paid");
  const totalPending = pending.reduce((s, c) => s + (c.amount || 0), 0);
  const totalPaid = paid.reduce((s, c) => s + (c.amount || 0), 0);

  const displayList = activeTab === "pending" ? pending : paid;

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" />
      </div>
    );

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 sm:px-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-1">
          {user?.role === "client" ? "Payments" : "My Earnings"}
        </h1>
        <p className="text-indigo-100 text-sm">
          {user?.role === "client"
            ? "Manage payments for approved contributions"
            : "Track your payment history"}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-2xl p-5 border border-gray-800 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-xl">
              ⏳
            </div>
            <p className="text-sm text-gray-400 font-medium">Pending Payment</p>
          </div>
          <p className="text-3xl font-extrabold text-amber-600">
            ${totalPending.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {pending.length} contribution{pending.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900 rounded-2xl p-5 border border-gray-800 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-xl">
              ✅
            </div>
            <p className="text-sm text-gray-400 font-medium">Total Paid</p>
          </div>
          <p className="text-3xl font-extrabold text-green-600">
            ${totalPaid.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {paid.length} payment{paid.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900 rounded-2xl p-5 border border-gray-800 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-xl">
              💰
            </div>
            <p className="text-sm text-gray-400 font-medium">Total Volume</p>
          </div>
          <p className="text-3xl font-extrabold text-indigo-600">
            ${(totalPending + totalPaid).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {contributions.length} total
          </p>
        </motion.div>
      </div>

      {/* List */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          {["pending", "paid"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3.5 text-sm font-medium transition-all border-b-2 capitalize ${
                activeTab === tab
                  ? "border-indigo-500 text-indigo-300 bg-indigo-500/10"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab === "pending"
                ? `Pending (${pending.length})`
                : `Paid (${paid.length})`}
            </button>
          ))}
        </div>

        <div className="p-4 space-y-3">
          {displayList.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-3">
                {activeTab === "pending" ? "⏳" : "✅"}
              </div>
              <p className="font-medium text-gray-300">
                No {activeTab} payments
              </p>
              <p className="text-sm mt-1">
                {activeTab === "pending"
                  ? "Approve contributions to see them here"
                  : "Payments will appear here after processing"}
              </p>
            </div>
          ) : (
            displayList.map((contribution, i) => (
              <motion.div
                key={contribution._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-gray-800 hover:border-indigo-500/40 hover:bg-gray-800/40 transition-all"
              >
                {/* Freelancer Avatar */}
                <img
                  src={getAvatarUrl(
                    contribution.freelancerId?.name,
                    contribution.freelancerId?.avatar,
                  )}
                  alt={contribution.freelancerId?.name}
                  className="w-11 h-11 rounded-xl object-cover flex-shrink-0 border border-gray-700"
                  onError={(e) => {
                    e.target.src = getAvatarUrl(
                      contribution.freelancerId?.name,
                      null,
                    );
                  }}
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-100 text-sm">
                        {user?.role === "client"
                          ? contribution.freelancerId?.name
                          : contribution.projectId?.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                        {contribution.description}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-lg font-extrabold text-indigo-600">
                        ${contribution.amount}
                      </p>
                      <p className="text-xs text-gray-500">
                        {contribution.updatedAt
                          ? format(new Date(contribution.updatedAt), "MMM d")
                          : ""}
                      </p>
                    </div>
                  </div>

                  {/* Project name for client */}
                  {user?.role === "client" && (
                    <p className="text-xs text-indigo-600 mt-1 font-medium">
                      📁 {contribution.projectId?.title}
                    </p>
                  )}

                  {/* Bank details if available */}
                  {user?.role === "client" &&
                    contribution.status === "approved" &&
                    contribution.freelancerId?.bankDetails
                      ?.accountHolderName && (
                      <div className="mt-2 p-2.5 bg-blue-500/10 rounded-lg border border-blue-500/30 text-xs text-blue-300 space-y-0.5">
                        <p className="font-semibold">💳 Payment Details</p>
                        <p>
                          Bank: {contribution.freelancerId.bankDetails.bankName}
                        </p>
                        <p>
                          Account: ****
                          {contribution.freelancerId.bankDetails.accountNumber?.slice(
                            -4,
                          )}
                        </p>
                        <p>
                          IFSC: {contribution.freelancerId.bankDetails.ifscCode}
                        </p>
                        {contribution.freelancerId.bankDetails.upiId && (
                          <p>
                            UPI: {contribution.freelancerId.bankDetails.upiId}
                          </p>
                        )}
                      </div>
                    )}
                </div>

                {/* Action */}
                <div className="flex-shrink-0">
                  {contribution.status === "approved" &&
                  user?.role === "client" ? (
                    <button
                      onClick={() => handlePay(contribution._id)}
                      disabled={payingId === contribution._id}
                      className="px-4 py-2 bg-green-600 text-white text-xs font-semibold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 whitespace-nowrap"
                    >
                      {payingId === contribution._id ? (
                        <span className="flex items-center gap-1.5">
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        "Mark as Paid"
                      )}
                    </button>
                  ) : (
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        contribution.status === "paid"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {contribution.status === "paid" ? "✓ Paid" : "Approved"}
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
