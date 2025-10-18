import express from "express";
const router = express.Router();
import upload from "../middleware/upload.js";
import {
  protectedMiddleware,
  checkRole,
} from "../middleware/authMiddleware.js";
import {
  tambahEktrakurikuler,
  deleteEktrakurikuler, // Pastikan ini sama dengan yang diekspor
  detailEktrakurikuler,
  tampilEktrakurikuler,
  updateEktrakurikuler,
} from "../controllers/ekstrakurikulerController.js";

//CREATE
router.post(
  "/",
  upload.single("gambar"),
  protectedMiddleware,
  checkRole("admin"),
  tambahEktrakurikuler
);

//READ
router.get("/", tampilEktrakurikuler);
router.get("/:id", detailEktrakurikuler);

//UPDATE
router.put(
  "/:id",
  upload.single("gambar"),
  protectedMiddleware,
  checkRole("admin"),
  updateEktrakurikuler
);

//DELETE
router.delete(
  "/:id",
  protectedMiddleware,
  checkRole("admin"),
  deleteEktrakurikuler
);

export default router;
