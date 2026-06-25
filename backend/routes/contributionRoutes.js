const express = require("express");
const router = express.Router();
const { protect, checkRole } = require("../middleware/authMiddleware");
const { upload } = require("../middleware/uploadMiddleware");
const {
  submitContribution,
  getProjectContributions,
  reviewContribution,
  getFreelancerContributions,
} = require("../controllers/contributionController");

router.post(
  "/",
  protect,
  checkRole("freelancer"),
  upload.array("files", 5),
  submitContribution,
);
router.get("/my-contributions", protect, getFreelancerContributions);
router.get("/project/:projectId", getProjectContributions);
router.put("/:id/review", protect, checkRole("client"), reviewContribution);

module.exports = router;
