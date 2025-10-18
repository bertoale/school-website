import express from "express";
const router = express.Router();

import {
  deleteTautan,
  detailTautan,
  tampilTautan,
  updateTautan,
} from "../controllers/tautanController.js";

import {
  protectedMiddleware,
  checkRole,
} from "../middleware/authMiddleware.js";

// CREATE - hanya admin

// READ
router.get("/", tampilTautan);
router.get("/:id", detailTautan);

// UPDATE - hanya admin
router.put("/:id", protectedMiddleware, checkRole("admin"), updateTautan);

// DELETE - hanya admin
router.delete("/:id", protectedMiddleware, checkRole("admin"), deleteTautan);

export default router;
