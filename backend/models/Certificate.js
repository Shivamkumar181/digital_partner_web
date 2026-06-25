// const mongoose = require('mongoose');

// const certificateSchema = new mongoose.Schema({
//   contributionId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Contribution',
//     required: true
//   },
//   freelancerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   projectId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Project',
//     required: true
//   },
//   certificateId: {
//     type: String,
//     unique: true,
//     required: true
//   },
//   qrCode: {
//     type: String
//   },
//   pdfUrl: {
//     type: String
//   },
//   issuedAt: {
//     type: Date,
//     default: Date.now
//   },
//   verified: {
//     type: Boolean,
//     default: true
//   }
// });

// module.exports = mongoose.model('Certificate', certificateSchema);

// models/Certificate.js — update your existing model

const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    certificateId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    contributionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contribution",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // NEW: Client branding fields
    companyName: {
      type: String,
      default: "DigitalPartner",
    },
    clientName: {
      type: String,
      default: "",
    },
    contributorName: {
      type: String,
      default: "",
    },
    companyLogo: {
      type: String,
      default: null,
    },
    issuedAt: {
      type: Date,
      default: Date.now,
    },
    pdfUrl: {
      type: String,
      default: null,
    },
    qrCode: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Certificate", certificateSchema);
