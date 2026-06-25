import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { getMe } from "../redux/slices/authSlice";
import { getAvatarUrl } from "../utils/helpers";

const Settings = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    skills: user?.skills?.join(", ") || "",
  });

  const [bankData, setBankData] = useState({
    accountHolderName: user?.bankDetails?.accountHolderName || "",
    accountNumber: user?.bankDetails?.accountNumber || "",
    bankName: user?.bankDetails?.bankName || "",
    ifscCode: user?.bankDetails?.ifscCode || "",
    upiId: user?.bankDetails?.upiId || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Update form if user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        bio: user.bio || "",
        skills: user.skills?.join(", ") || "",
      });
      setBankData({
        accountHolderName: user.bankDetails?.accountHolderName || "",
        accountNumber: user.bankDetails?.accountNumber || "",
        bankName: user.bankDetails?.bankName || "",
        ifscCode: user.bankDetails?.ifscCode || "",
        upiId: user.bankDetails?.upiId || "",
      });
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB");
      return;
    }
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    setLoading(true);
    try {
      await axios.put("/api/users/avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      await dispatch(getMe());
      toast.success("Profile picture updated!");
      setAvatarFile(null);
      setAvatarPreview(null);
    } catch (e) {
      toast.error(e.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        "/api/users/profile",
        {
          name: profileData.name,
          bio: profileData.bio,
          skills: profileData.skills,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      await dispatch(getMe());
      toast.success("Profile updated!");
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBankUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put("/api/payments/bank-details", bankData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await dispatch(getMe());
      toast.success("Bank details saved!");
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await axios.put(
        "/api/users/change-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Password changed!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const currentAvatar = avatarPreview || getAvatarUrl(user?.name, user?.avatar);

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "bank", label: "Bank Details", icon: "💳" },
    { id: "security", label: "Security", icon: "🔒" },
  ];

  const InputField = ({ label, ...props }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}
      </label>
      <input
        className="w-full px-4 py-2.5 border border-gray-700 bg-black text-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
        {...props}
      />
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6 bg-black text-gray-100 p-4 sm:p-6 rounded-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-indigo-100 text-sm mt-1">
            Manage your account and preferences
          </p>
        </div>

        {/* Profile preview card */}
        <div className="bg-gray-950 rounded-2xl border border-gray-800 shadow-sm p-5 mb-6 flex items-center gap-4">
          <div className="relative">
            <img
              src={currentAvatar}
              alt={user?.name}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-indigo-900/40 border border-gray-700"
              onError={(e) => {
                e.target.src = getAvatarUrl(user?.name, null);
              }}
            />
            <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-700 transition-colors">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <div className="flex-1">
            <p className="font-bold text-white text-lg">
              {profileData.name || user?.name}
            </p>
            <p className="text-gray-400 text-sm capitalize">
              {user?.role} · {user?.email}
            </p>
          </div>
          {avatarFile && (
            <button
              onClick={handleAvatarUpload}
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Save Photo"}
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-gray-950 rounded-2xl border border-gray-800 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium transition-all border-b-2 ${
                  activeTab === tab.id
                    ? "border-indigo-500 text-indigo-300 bg-indigo-900/30"
                    : "border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-900"
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleProfileUpdate}
                className="space-y-5"
              >
                <InputField
                  label="Full Name"
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Bio
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    rows={3}
                    placeholder="Tell clients about yourself and your expertise..."
                    className="w-full px-4 py-2.5 border border-gray-700 bg-black text-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {profileData.bio.length}/300 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Skills
                  </label>
                  <input
                    type="text"
                    value={profileData.skills}
                    onChange={(e) =>
                      setProfileData({ ...profileData, skills: e.target.value })
                    }
                    placeholder="React, Node.js, Python, Figma..."
                    className="w-full px-4 py-2.5 border border-gray-700 bg-black text-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate with commas
                  </p>
                  {profileData.skills && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {profileData.skills.split(",").map(
                        (s, i) =>
                          s.trim() && (
                            <span
                              key={i}
                              className="px-2.5 py-1 bg-indigo-900/40 text-indigo-300 text-xs rounded-full border border-indigo-700"
                            >
                              {s.trim()}
                            </span>
                          ),
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Profile"}
                </button>
              </motion.form>
            )}

            {/* Bank Tab */}
            {activeTab === "bank" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-start gap-3 p-4 bg-blue-950/40 rounded-xl border border-blue-900 mb-5">
                  <span className="text-blue-500 text-lg">ℹ️</span>
                  <div>
                    <p className="text-sm font-semibold text-blue-300">
                      Secure Payment Info
                    </p>
                    <p className="text-xs text-blue-400 mt-0.5">
                      Your bank details are encrypted and only shared with
                      clients when you choose to.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleBankUpdate} className="space-y-4">
                  <InputField
                    label="Account Holder Name"
                    type="text"
                    value={bankData.accountHolderName}
                    onChange={(e) =>
                      setBankData({
                        ...bankData,
                        accountHolderName: e.target.value,
                      })
                    }
                    required
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Bank Name"
                      type="text"
                      value={bankData.bankName}
                      onChange={(e) =>
                        setBankData({ ...bankData, bankName: e.target.value })
                      }
                      required
                    />
                    <InputField
                      label="IFSC Code"
                      type="text"
                      value={bankData.ifscCode}
                      onChange={(e) =>
                        setBankData({ ...bankData, ifscCode: e.target.value })
                      }
                      required
                    />
                  </div>
                  <InputField
                    label="Account Number"
                    type="text"
                    value={bankData.accountNumber}
                    onChange={(e) =>
                      setBankData({
                        ...bankData,
                        accountNumber: e.target.value,
                      })
                    }
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      UPI ID{" "}
                      <span className="text-gray-500 font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={bankData.upiId}
                      onChange={(e) =>
                        setBankData({ ...bankData, upiId: e.target.value })
                      }
                      placeholder="yourname@upi"
                      className="w-full px-4 py-2.5 border border-gray-700 bg-black text-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Bank Details"}
                  </button>
                </form>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-5"
              >
                <div className="p-4 bg-yellow-950/40 rounded-xl border border-yellow-900">
                  <p className="text-sm font-semibold text-yellow-300 mb-2">
                    🔒 Security Tips
                  </p>
                  <ul className="text-xs text-yellow-400 space-y-1 list-disc list-inside">
                    <li>Use a strong, unique password with 8+ characters</li>
                    <li>Never share your password with anyone</li>
                    <li>Log out from shared devices</li>
                  </ul>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <h3 className="font-semibold text-white">Change Password</h3>
                  <InputField
                    label="Current Password"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    required
                  />
                  <InputField
                    label="New Password"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    required
                  />
                  <InputField
                    label="Confirm New Password"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
