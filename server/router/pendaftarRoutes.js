import express from "express";
import {
  RegisterPendaftar,
  LoginPendaftar,
  LogoutPendaftar,
  currentUser,
  checkEmail,
  deletePendaftar,
} from "../controllers/pendaftarController.js";
import {
  protectedMiddleware,
  checkRole,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Rute Pendaftar
router.post("/register", RegisterPendaftar);
router.post("/login", LoginPendaftar);
router.post("/logout", LogoutPendaftar);
router.get("/getPendaftar", protectedMiddleware, currentUser);
router.post("/check-email", checkEmail); // frontend akan memanggil ini
router.delete("/:id", protectedMiddleware, deletePendaftar);
export default router;
