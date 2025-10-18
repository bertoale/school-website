import express from "express";
const router = express.Router();
import upload from "../middleware/upload.js";
import {
  protectedMiddleware,
  checkRole,
} from "../middleware/authMiddleware.js";
import {
  tambahBerita,
  deleteBerita,
  detailBerita,
  tampilBerita,
  updateBerita,
} from "../controllers/beritaController.js";

//CREATE
router.post(
  "/",
  upload.array("gambar", 20),
  protectedMiddleware,
  checkRole("admin"),
  tambahBerita
);

//READ
router.get("/", tampilBerita);
router.get("/:id", detailBerita);

//UPDATE
router.put(
  "/:id",
  upload.array("gambar", 20),
  protectedMiddleware,
  checkRole("admin"),
  updateBerita
);

//DELETE
router.delete("/:id", protectedMiddleware, checkRole("admin"), deleteBerita);

export default router;
