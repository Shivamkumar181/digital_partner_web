import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { QrCode, CheckCircle, XCircle } from "lucide-react";

const GenerateCertificate = ({ contribution, onClose, onGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [error, setError] = useState(null);
  const [companyName, setCompanyName] = useState("Digital Partner");
  const [clientName, setClientName] = useState("");
  const [contributorName, setContributorName] = useState(
    contribution?.freelancerId?.name || "",
  );
  const [companyLogo, setCompanyLogo] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("logo", file);
    setUploadingLogo(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("/api/certificates/upload-logo", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setCompanyLogo(res.data.url);
      toast.success("Logo uploaded");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to upload logo");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/certificates/generate",
        {
          contributionId: contribution._id,
          companyName,
          clientName,
          contributorName,
          companyLogo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      setGenerated(response.data);
      toast.success("Certificate generated successfully!");

      if (onGenerated) {
        onGenerated(response.data);
      }
    } catch (err) {
      console.error("Certificate generation error:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to generate certificate";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-950 border border-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {!generated && !error ? (
            <>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <QrCode size={40} className="text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Generate Certificate
                </h3>
                <p className="text-gray-300">
                  Generate an official certificate for{" "}
                  {contribution.freelancerId?.name}'s contribution
                </p>
              </div>

              <div className="bg-black border border-gray-800 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-300 font-medium mb-2">
                  Contribution Details:
                </p>
                <p className="text-gray-100 text-sm mb-2">
                  {contribution.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-400">Amount:</span>
                  <span className="text-indigo-600 font-bold">
                    ${contribution.amount}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-400">Freelancer:</span>
                  <span className="text-gray-100 font-medium">
                    {contribution.freelancerId?.name}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Company name"
                  className="w-full px-3 py-2 rounded-lg bg-black border border-gray-700 text-gray-100"
                />
                <input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Client name"
                  className="w-full px-3 py-2 rounded-lg bg-black border border-gray-700 text-gray-100"
                />
                <input
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  placeholder="Contributor name"
                  className="w-full px-3 py-2 rounded-lg bg-black border border-gray-700 text-gray-100"
                />
                <div className="text-sm text-gray-300">
                  Add company logo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="w-full mt-1 text-xs text-gray-300"
                  />
                  {uploadingLogo && (
                    <p className="text-xs text-indigo-400 mt-1">
                      Uploading logo...
                    </p>
                  )}
                  {companyLogo && (
                    <p className="text-xs text-emerald-400 mt-1">Logo added</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Generating...
                    </span>
                  ) : (
                    "Generate Certificate"
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-800 text-gray-100 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : error ? (
            <>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle size={40} className="text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-red-600">
                  Generation Failed
                </h3>
                <p className="text-gray-300">{error}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleGenerate}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-800 text-gray-100 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Certificate Generated!
                </h3>
                <p className="text-gray-600">
                  Certificate has been successfully generated
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-4 mb-6 text-white">
                <p className="text-sm opacity-90 mb-1">Certificate ID</p>
                <p className="font-mono text-sm font-bold">
                  {generated.certificateId}
                </p>
                <div className="mt-3 pt-3 border-t border-white border-opacity-30">
                  <p className="text-sm opacity-90 mb-1">Issued to</p>
                  <p className="font-semibold">
                    {generated.freelancerName ||
                      contribution.freelancerId?.name}
                  </p>
                  <p className="text-sm mt-2 opacity-90">Project</p>
                  <p className="text-sm">
                    {generated.projectTitle || contribution.projectId?.title}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    window.open(
                      `/verify-certificate/${generated.certificateId}`,
                      "_blank",
                    )
                  }
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  View Certificate
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GenerateCertificate;
