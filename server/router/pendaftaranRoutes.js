import express from "express";
import {
  protectedMiddleware,
  checkRole,
} from "../middleware/authMiddleware.js";

import {
  tambahPendaftaran,
  deletePendaftaran,
  detailPendaftaran,
  tampilPendaftaran,
  updatePendaftaran,
  currentUserPendaftaran,
  exportPendaftaranToExcel, // ✅ Tambahkan import
} from "../controllers/pendaftaranController.js";

const router = express.Router();

// 🛡️ Proteksi rute: Hanya user yang sudah login bisa mengakses
router.post("/", protectedMiddleware, tambahPendaftaran); // Tambah pendaftaran
router.get("/", protectedMiddleware, tampilPendaftaran); // Ambil semua pendaftaran

// 🔹 Harus diletakkan sebelum `/:id` agar tidak tertangkap sebagai parameter ID
router.get("/current/user", protectedMiddleware, currentUserPendaftaran); // Ambil pendaftaran user saat ini

// ✅ Route untuk export data ke file Excel
router.get("/export/excel", protectedMiddleware, exportPendaftaranToExcel); // Export Excel

router.get("/:id", detailPendaftaran); // Ambil pendaftaran berdasarkan ID
router.put("/:id", protectedMiddleware, updatePendaftaran); // Update pendaftaran berdasarkan ID
router.delete("/:id", protectedMiddleware, deletePendaftaran); // Hapus pendaftaran berdasarkan ID

export default router;
