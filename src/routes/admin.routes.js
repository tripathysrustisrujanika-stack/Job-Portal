const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

const authorize = require("../middleware/role.middleware");

const {
  dashboardStats,
  getUsers,
  deleteUser,
  getJobs,
  deleteJob,
} = require("../controllers/admin.controller");

// Debug: confirm imports are functions
/* istanbul ignore next */
try {
  // eslint-disable-next-line no-console
  console.debug("admin.routes imports:", {
    protectType: typeof protect,
    authorizeType: typeof authorize,
    dashboardStatsType: typeof dashboardStats,
    getUsersType: typeof getUsers,
  });
} catch (e) {}

router.get("/dashboard", protect, authorize("admin"), dashboardStats);

router.get("/users", protect, authorize("admin"), getUsers);

router.delete("/users/:id", protect, authorize("admin"), deleteUser);

router.get("/jobs", protect, authorize("admin"), getJobs);

router.delete("/jobs/:id", protect, authorize("admin"), deleteJob);

module.exports = router;
