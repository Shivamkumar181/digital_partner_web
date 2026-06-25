import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjectById,
  clearCurrentProject,
} from "../redux/slices/projectSlice";
import {
  submitContribution,
  fetchProjectContributions,
  reviewContribution,
} from "../redux/slices/contributionSlice";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow, format } from "date-fns";
import toast from "react-hot-toast";
import axios from "axios";
import ChatRoom from "../components/chat/ChatRoom";
import GenerateCertificate from "../components/client/GenerateCertificate";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Briefcase,
  User,
  Clock,
  FileText,
  MessageCircle,
  X,
  Upload,
  Check,
  XCircle,
  Award,
  CreditCard,
  Lock,
  Unlock,
} from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProject, loading } = useSelector((state) => state.projects);
  const { user, token } = useSelector((state) => state.auth);
  const { contributions } = useSelector((state) => state.contributions);

  const [showContributionForm, setShowContributionForm] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState(null);
  const [contributionData, setContributionData] = useState({
    description: "",
    amount: "",
    files: [],
  });
  const [files, setFiles] = useState([]);
  const [reviewFeedback, setReviewFeedback] = useState({});
  const [reviewRating, setReviewRating] = useState({});
  const [payingId, setPayingId] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
      dispatch(fetchProjectContributions(id));
    }
    return () => {
      dispatch(clearCurrentProject());
    };
  }, [dispatch, id]);

  const handleFileChange = (e) => setFiles(Array.from(e.target.files));

  const handleContributionSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("projectId", id);
    formData.append("description", contributionData.description);
    formData.append("amount", contributionData.amount);
    files.forEach((file) => formData.append("files", file));
    try {
      await dispatch(submitContribution(formData)).unwrap();
      toast.success("Contribution submitted successfully!");
      setShowContributionForm(false);
      setContributionData({ description: "", amount: "", files: [] });
      setFiles([]);
      dispatch(fetchProjectContributions(id));
      dispatch(fetchProjectById(id));
    } catch (error) {
      toast.error(error || "Failed to submit contribution");
    }
  };

  const handleReviewContribution = async (contributionId, status) => {
    try {
      await dispatch(
        reviewContribution({
          id: contributionId,
          status,
          feedback: reviewFeedback[contributionId] || "",
          rating: reviewRating[contributionId] || null,
        }),
      ).unwrap();
      toast.success(`Contribution ${status} successfully!`);
      dispatch(fetchProjectById(id));
      dispatch(fetchProjectContributions(id));
      setReviewFeedback({});
      setReviewRating({});
    } catch (error) {
      toast.error(error || "Failed to review contribution");
    }
  };

  const handleGenerateCertificate = (contribution) => {
    setSelectedContribution(contribution);
    setShowCertificateModal(true);
  };

  const handleMarkPaid = async (contribution) => {
    setPayingId(contribution._id);
    try {
      await axios.post(
        "/api/payments/mark-paid",
        { contributionId: contribution._id, amount: contribution.amount },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success(
        "Payment marked! Files are now unlocked for the freelancer.",
      );
      dispatch(fetchProjectContributions(id));
      dispatch(fetchProjectById(id));
    } catch {
      toast.error("Failed to mark payment. Please try again.");
    } finally {
      setPayingId(null);
    }
  };

  if (loading || !currentProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex justify-center items-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  const isClient =
    user?.role === "client" && currentProject.clientId?._id === user?._id;
  const canContribute =
    user?.role === "freelancer" && currentProject.status === "open";
  const images = currentProject.images || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/projects")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </motion.button>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700 overflow-hidden"
        >
          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="relative h-80 bg-black">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={images[activeImage]?.url}
                  alt={`Project image ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImage(
                        (i) => (i - 1 + images.length) % images.length,
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition backdrop-blur-sm"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() =>
                      setActiveImage((i) => (i + 1) % images.length)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition backdrop-blur-sm"
                  >
                    ›
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === activeImage ? "bg-white w-4" : "bg-white/50"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div className="p-6">
            <div className="flex justify-between items-start mb-4 flex-wrap gap-3">
              <h1 className="text-3xl font-bold text-white">
                {currentProject.title}
              </h1>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  currentProject.status === "open"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : currentProject.status === "in-progress"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : currentProject.status === "completed"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}
              >
                {currentProject.status?.toUpperCase()}
              </span>
            </div>

            <p className="text-gray-400 mb-6 leading-relaxed">
              {currentProject.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={18} className="text-purple-400" />
                  <p className="text-sm text-gray-400">Budget</p>
                </div>
                <p className="text-2xl font-bold text-purple-400">
                  ${currentProject.budget}
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={18} className="text-purple-400" />
                  <p className="text-sm text-gray-400">Deadline</p>
                </div>
                <p className="font-semibold text-white">
                  {currentProject.deadline
                    ? format(new Date(currentProject.deadline), "PPP")
                    : "Not set"}
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <User size={18} className="text-purple-400" />
                  <p className="text-sm text-gray-400">Posted By</p>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src={
                      currentProject.clientId?.avatar ||
                      `https://ui-avatars.com/api/?background=8b5cf6&color=fff&name=${currentProject.clientId?.name || "User"}`
                    }
                    alt={currentProject.clientId?.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="font-semibold text-white">
                    {currentProject.clientId?.name}
                  </span>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase size={18} className="text-purple-400" />
                  <p className="text-sm text-gray-400">Category</p>
                </div>
                <p className="font-semibold text-white">
                  {currentProject.category?.charAt(0).toUpperCase() +
                    currentProject.category?.slice(1)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {currentProject.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-sm border border-purple-500/30"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap">
              {canContribute && !showContributionForm && (
                <button
                  onClick={() => setShowContributionForm(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  <Upload size={18} />
                  Submit Contribution
                </button>
              )}
              <button
                onClick={() => setShowChat(!showChat)}
                className="flex items-center gap-2 bg-gray-800 text-gray-300 px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-all border border-gray-700"
              >
                <MessageCircle size={18} />
                {showChat ? "Hide Chat" : "Open Chat"}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Contribution Form Modal */}
        <AnimatePresence>
          {showContributionForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowContributionForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-gradient-to-br from-gray-900 to-black rounded-2xl max-w-2xl w-full border border-purple-500/30 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                      Submit Contribution
                    </h2>
                    <button
                      onClick={() => setShowContributionForm(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <form
                    onSubmit={handleContributionSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={contributionData.description}
                        onChange={(e) =>
                          setContributionData({
                            ...contributionData,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                        rows="4"
                        required
                        placeholder="Describe your contribution in detail..."
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Amount Requested ($)
                      </label>
                      <input
                        type="number"
                        value={contributionData.amount}
                        onChange={(e) =>
                          setContributionData({
                            ...contributionData,
                            amount: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                        required
                        min="1"
                        max={currentProject.budget}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Supporting Files
                      </label>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        accept=".pdf,.doc,.docx,.jpg,.png"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Upload up to 5 files (PDF, DOC, Images)
                      </p>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                      >
                        Submit Contribution
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowContributionForm(false)}
                        className="flex-1 bg-gray-800 text-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Section */}
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <ChatRoom projectId={id} projectTitle={currentProject.title} />
          </motion.div>
        )}

        {/* Contributions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-700 p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FileText size={24} className="text-purple-400" />
            Contributions
          </h2>

          {contributions && contributions.length > 0 ? (
            <div className="space-y-4">
              {contributions.map((contribution, index) => (
                <motion.div
                  key={contribution._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/30 rounded-xl p-5 border border-gray-700 hover:border-purple-500/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          contribution.freelancerId?.avatar ||
                          `https://ui-avatars.com/api/?background=8b5cf6&color=fff&name=${contribution.freelancerId?.name || "User"}`
                        }
                        alt={contribution.freelancerId?.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-white">
                          {contribution.freelancerId?.name}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock size={10} />
                          {formatDistanceToNow(
                            new Date(contribution.createdAt),
                          )}{" "}
                          ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {contribution.paymentStatus === "paid" && (
                        <span className="px-2 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <CreditCard size={12} />
                          Paid
                        </span>
                      )}
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          contribution.status === "approved"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : contribution.status === "rejected"
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : contribution.status === "paid"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {contribution.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 mt-2 mb-2">
                    {contribution.description}
                  </p>
                  <p className="text-lg font-bold text-purple-400 mb-3">
                    ${contribution.amount}
                  </p>

                  {/* Files */}
                  {contribution.files && contribution.files.length > 0 && (
                    <div className="mt-3 mb-3">
                      <p className="text-sm text-gray-400 mb-2">Attachments:</p>
                      <div className="flex flex-wrap gap-2">
                        {contribution.files.map((file, idx) => {
                          const canDownload =
                            contribution.paymentStatus === "paid";
                          return canDownload ? (
                            <a
                              key={idx}
                              href={file.url}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm bg-purple-500/10 px-3 py-1 rounded-lg transition border border-purple-500/30"
                            >
                              <FileText size={12} />
                              {file.filename}
                            </a>
                          ) : (
                            <span
                              key={idx}
                              className="flex items-center gap-1 text-gray-500 text-sm bg-gray-700/50 px-3 py-1 rounded-lg cursor-not-allowed"
                            >
                              <Lock size={12} />
                              {file.filename}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Feedback */}
                  {contribution.clientFeedback && (
                    <div className="mt-3 bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                      <p className="text-sm font-semibold text-purple-400">
                        Client Feedback:
                      </p>
                      <p className="text-gray-300 text-sm">
                        {contribution.clientFeedback}
                      </p>
                      {contribution.rating && (
                        <p className="text-sm text-amber-400 mt-1">
                          {"⭐".repeat(contribution.rating)}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  {isClient &&
                    contribution.status === "approved" &&
                    contribution.paymentStatus !== "paid" && (
                      <button
                        onClick={() => handleMarkPaid(contribution)}
                        disabled={payingId === contribution._id}
                        className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2"
                      >
                        {payingId === contribution._id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard size={16} />
                            Mark as Paid — Unlock Files
                          </>
                        )}
                      </button>
                    )}

                  {contribution.paymentStatus === "paid" && (
                    <div className="mt-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg text-sm text-center font-medium flex items-center justify-center gap-2">
                      <Unlock size={14} />
                      Payment verified — files unlocked
                    </div>
                  )}

                  {isClient &&
                    contribution.status === "approved" &&
                    !contribution.certificateGenerated && (
                      <button
                        onClick={() => handleGenerateCertificate(contribution)}
                        className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2"
                      >
                        <Award size={16} />
                        Generate Certificate
                      </button>
                    )}

                  {contribution.certificateGenerated && (
                    <div className="mt-3 bg-purple-500/10 border border-purple-500/30 text-purple-400 px-3 py-2 rounded-lg text-sm text-center flex items-center justify-center gap-2">
                      <Check size={14} />
                      Certificate Generated
                    </div>
                  )}

                  {/* Review Form for Client */}
                  {isClient && contribution.status === "pending" && (
                    <div className="mt-4 space-y-3 pt-4 border-t border-gray-700">
                      <textarea
                        placeholder="Add feedback (optional)..."
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
                        rows="2"
                        value={reviewFeedback[contribution._id] || ""}
                        onChange={(e) =>
                          setReviewFeedback({
                            ...reviewFeedback,
                            [contribution._id]: e.target.value,
                          })
                        }
                      />
                      <select
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
                        value={reviewRating[contribution._id] || ""}
                        onChange={(e) =>
                          setReviewRating({
                            ...reviewRating,
                            [contribution._id]: parseInt(e.target.value),
                          })
                        }
                      >
                        <option value="">Select Rating (optional)</option>
                        <option value="5">5 Stars — Excellent</option>
                        <option value="4">4 Stars — Good</option>
                        <option value="3">3 Stars — Average</option>
                        <option value="2">2 Stars — Below Average</option>
                        <option value="1">1 Star — Poor</option>
                      </select>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleReviewContribution(
                              contribution._id,
                              "approved",
                            )
                          }
                          className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 text-sm font-medium transition flex items-center justify-center gap-2"
                        >
                          <Check size={14} />
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleReviewContribution(
                              contribution._id,
                              "rejected",
                            )
                          }
                          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-medium transition flex items-center justify-center gap-2"
                        >
                          <XCircle size={14} />
                          Reject
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400">No contributions yet</p>
              {canContribute && (
                <button
                  onClick={() => setShowContributionForm(true)}
                  className="mt-4 inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  <Upload size={16} />
                  Be the first to contribute
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && selectedContribution && (
        <GenerateCertificate
          contribution={selectedContribution}
          onClose={() => {
            setShowCertificateModal(false);
            setSelectedContribution(null);
          }}
          onGenerated={() => {
            dispatch(fetchProjectContributions(id));
            dispatch(fetchProjectById(id));
          }}
        />
      )}
    </div>
  );
};

export default ProjectDetails;
