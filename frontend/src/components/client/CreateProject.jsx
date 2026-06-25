// components/client/CreateProject.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../redux/slices/projectSlice";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  Calendar,
  DollarSign,
  Tag,
  FileText,
  Briefcase,
  X,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import axios from "axios";

const CreateProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    currency: "USD",
    category: "web development",
    skills: "",
    deadline: "",
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const categories = [
    "web development",
    "mobile development",
    "design",
    "writing",
    "marketing",
    "other",
  ];

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index]);
    const newPreviews = [...imagePreviews];
    const newImages = [...images];
    newPreviews.splice(index, 1);
    newImages.splice(index, 1);
    setImagePreviews(newPreviews);
    setImages(newImages);
  };

  const uploadImagesToCloudinary = async () => {
    if (images.length === 0) return [];

    const uploadedImages = [];
    const token = localStorage.getItem("token");

    for (const image of images) {
      const formData = new FormData();
      formData.append("avatar", image); // Using 'avatar' field name as per your existing route

      try {
        const response = await axios.post(
          "/api/users/upload-project-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        uploadedImages.push({
          url: response.data.url,
          publicId:
            response.data.publicId || `project_${Date.now()}_${Math.random()}`,
        });
      } catch (error) {
        console.error("Image upload error:", error);
        toast.error(`Failed to upload ${image.name}`);
        throw error;
      }
    }

    return uploadedImages;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.budget ||
      !formData.deadline
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      let uploadedImages = [];
      if (images.length > 0) {
        setUploadingImages(true);
        uploadedImages = await uploadImagesToCloudinary();
        setUploadingImages(false);
      }

      const projectData = {
        ...formData,
        budget: parseFloat(formData.budget),
        skills: formData.skills
          ? formData.skills.split(",").map((s) => s.trim())
          : [],
        images: uploadedImages,
      };

      const result = await dispatch(createProject(projectData)).unwrap();
      toast.success("Project created successfully!");
      navigate(`/projects/${result._id}`);
    } catch (error) {
      console.error("Create project error:", error);
      toast.error(
        error.message || "Failed to create project. Please try again.",
      );
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  const getCurrencySymbol = () => {
    const currency = currencies.find((c) => c.code === formData.currency);
    return currency ? currency.symbol : "$";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto px-4"
      >
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-2">
              Create New Project
            </h1>
            <p className="text-gray-400">
              Post a project and get contributions from talented freelancers
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Title */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
                <FileText size={18} />
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter project title"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
                <FileText size={18} />
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                placeholder="Describe your project in detail..."
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                required
              />
            </div>

            {/* Budget and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
                  <DollarSign size={18} />
                  Budget *
                </label>
                <div className="flex gap-2">
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-1/3 px-3 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
                  >
                    {currencies.map((curr) => (
                      <option
                        key={curr.code}
                        value={curr.code}
                        className="bg-gray-900"
                      >
                        {curr.code}
                      </option>
                    ))}
                  </select>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      {getCurrencySymbol()}
                    </span>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="Enter budget amount"
                      className="w-full pl-8 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                      required
                      min="1"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
                  <Tag size={18} />
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-gray-900">
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
                <Briefcase size={18} />
                Required Skills (comma separated)
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate skills with commas
              </p>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
                <Calendar size={18} />
                Deadline *
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* Images Upload */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2 flex items-center gap-2">
                <ImageIcon size={18} />
                Project Images (Max 5)
              </label>
              <div
                className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center hover:border-purple-500 transition cursor-pointer"
                onClick={() => document.getElementById("image-upload").click()}
              >
                <Upload className="mx-auto text-gray-500 mb-2" size={32} />
                <p className="text-gray-400">Click to upload images</p>
                <p className="text-gray-500 text-sm mt-1">
                  PNG, JPG, JPEG up to 5MB each
                </p>
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading || uploadingImages}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading || uploadingImages ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    {uploadingImages
                      ? "Uploading Images..."
                      : "Creating Project..."}
                  </span>
                ) : (
                  "Create Project"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/projects")}
                className="flex-1 bg-gray-700 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateProject;
