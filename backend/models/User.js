const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["client", "freelancer"],
    required: true,
  },
  avatar: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  skills: [
    {
      type: String,
    },
  ],
  portfolio: [
    {
      title: String,
      description: String,
      link: String,
      image: String,
    },
  ],
  bankDetails: {
    accountHolderName: String,
    accountNumber: String,
    bankName: String,
    ifscCode: String,
    upiId: String,
    qrCode: String,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  totalProjects: {
    type: Number,
    default: 0,
  },
  totalEarnings: {
    type: Number,
    default: 0,
  },
  trustScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  savedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  portfolio: [
    { title: String, description: String, link: String, imageUrl: String },
  ],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
