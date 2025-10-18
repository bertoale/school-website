import express from "express";
const router = express.Router();
import {
  tambahPrestasi,
  deletePrestasi,
  detailPrestasi,
  tampilPrestasi,
  updatePrestasi,
} from "../controllers/prestasiController.js";
import {
  protectedMiddleware,
  checkRole,
} from "../middleware/authMiddleware.js";
//CREATE
router.post("/", protectedMiddleware, checkRole("admin"), tambahPrestasi);

//READ
router.get("/", tampilPrestasi);
router.get("/:id", detailPrestasi);

//UPDATE
router.put("/:id", protectedMiddleware, checkRole("admin"), updatePrestasi);
//DELETE
router.delete("/:id", protectedMiddleware, checkRole("admin"), deletePrestasi);

export default router;
