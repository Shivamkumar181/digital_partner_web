const express = require("express");
const Project = require("../models/Project");
const router = express.Router();
const { upload } = require("../utils/cloudinary");
const { protect, checkRole } = require("../middleware/authMiddleware");
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

router
  .route("/")
  .get(getProjects)
  .post(protect, checkRole("client"), createProject);

router
  .route("/:id")
  .get(getProjectById)
  .put(protect, checkRole("client"), updateProject)
  .delete(protect, checkRole("client"), deleteProject);

router.post(
  "/:id/images",
  protect,
  upload.array("images", 5),
  async (req, res) => {
    const urls = req.files.map((f) => ({ url: f.path, publicId: f.filename }));
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $push: { images: { $each: urls } } },
      { new: true },
    );
    res.json(project);
  },
);

router.delete("/:id/images/:publicId", protect, async (req, res) => {
  const { cloudinary } = require("../config/cloudinary");
  await cloudinary.uploader.destroy(req.params.publicId);
  await Project.findByIdAndUpdate(req.params.id, {
    $pull: { images: { publicId: req.params.publicId } },
  });
  res.json({ success: true });
});

module.exports = router;
