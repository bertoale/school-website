import express from "express";
import {
  RegisterAdmin,
  LoginAdmin,
  LogoutAdmin,
  getDashboardSummary,
} from "../controllers/adminController.js";
import {
  protectedMiddleware,
  checkRole,
} from "../middleware/authMiddleware.js";
const router = express.Router();

// Rute Admin
router.post("/register", RegisterAdmin);
router.post("/login", LoginAdmin);
router.post("/logout", protectedMiddleware, checkRole("admin"), LogoutAdmin);
router.get(
  "/dashboard-summary",
  protectedMiddleware,
  checkRole("admin"),
  getDashboardSummary
);
export default router;
