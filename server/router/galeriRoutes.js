import express from "express";
const router = express.Router();
import upload from "../middleware/upload.js";
import {
  protectedMiddleware,
  checkRole,
} from "../middleware/authMiddleware.js";
import {
  tambahGaleri,
  deleteGaleri,
  detailGaleri,
  tampilGaleri,
  updateGaleri,
} from "../controllers/galeriController.js";

// CREATE (Tambah Galeri dengan Upload Gambar)
router.post(
  "/",
  upload.single("gambar"),
  protectedMiddleware,
  checkRole("admin"),
  tambahGaleri
);

// READ
router.get("/", tampilGaleri);
router.get("/:id", detailGaleri);

// UPDATE (Update Galeri dengan Upload Gambar Baru)
router.put(
  "/:id",
  upload.single("gambar"),
  protectedMiddleware,
  checkRole("admin"),
  updateGaleri
);

// DELETE
router.delete("/:id", protectedMiddleware, checkRole("admin"), deleteGaleri);

export default router;
