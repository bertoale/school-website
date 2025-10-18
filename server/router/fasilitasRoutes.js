import express from "express";
const router = express.Router();
import upload from "../middleware/upload.js";
import {
  protectedMiddleware,
  checkRole,
} from "../middleware/authMiddleware.js";
import {
  tambahFasilitas,
  deleteFasilitas,
  detailFasilitas,
  tampilFasilitas,
  updateFasilitas,
} from "../controllers/fasilitasController.js";

// CREATE (Tambah Fasilitas dengan Upload Gambar)
router.post(
  "/",
  upload.single("gambar"),
  protectedMiddleware,
  checkRole("admin"),
  tambahFasilitas
);

// READ
router.get("/", tampilFasilitas);
router.get("/:id", detailFasilitas);

// UPDATE (Update Fasilitas dengan Upload Gambar Baru)
router.put(
  "/:id",
  upload.single("gambar"),
  protectedMiddleware,
  checkRole("admin"),
  updateFasilitas
);

// DELETE
router.delete("/:id", protectedMiddleware, checkRole("admin"), deleteFasilitas);

export default router;
