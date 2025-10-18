import express from "express";
const router = express.Router();
import upload from "../middleware/upload.js";
import {
  protectedMiddleware,
  checkRole,
} from "../middleware/authMiddleware.js";
import {
  tambahPengumuman,
  deletePengumuman,
  detailPengumuman,
  tampilPengumuman,
  updatePengumuman,
} from "../controllers/pengumumanController.js";

// CREATE (Tambah Pengumuman dengan Upload Gambar)
router.post(
  "/",
  upload.single("gambar"),
  protectedMiddleware,
  checkRole("admin"),
  tambahPengumuman
);

// READ
router.get("/", tampilPengumuman);
router.get("/:id", detailPengumuman);

// UPDATE (Update Pengumuman dengan Upload Gambar Baru)
router.put(
  "/:id",
  upload.single("gambar"),
  protectedMiddleware,
  checkRole("admin"),
  updatePengumuman
);

// DELETE
router.delete(
  "/:id",
  protectedMiddleware,
  checkRole("admin"),
  deletePengumuman
);

export default router;
