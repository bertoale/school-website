import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import tautanRouter from "./router/tautanRoutes.js";
import pendaftarRouter from "./router/pendaftarRoutes.js";
import adminRouter from "./router/adminRoutes.js";
import fasilitasRouter from "./router/fasilitasRoutes.js";
import ekstrakurikulerRouter from "./router/ekstrakurikulerRoutes.js";
import galeriRouter from "./router/galeriRoutes.js";
import beritaRouter from "./router/beritaRoutes.js";
import pengumumanRouter from "./router/pengumumanRoutes.js";
import prestasiRouter from "./router/prestasiRoutes.js";
import pendaftaranRouter from "./router/pendaftaranRoutes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

// Inisialisasi Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware lainnya
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Ganti sesuai alamat frontend kamu
    credentials: true, // ✅ Harus ada agar cookie bisa dikirim
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Endpoint utama
app.get("/", (req, res) => {
  res.send("Hello DUNIA");
});

// Parent router untuk API
app.use("/api/pendaftarAuth", pendaftarRouter);
app.use("/api/adminAuth", adminRouter);
app.use("/api/fasilitas", fasilitasRouter);
app.use("/api/ekstrakurikuler", ekstrakurikulerRouter);
app.use("/api/galeri", galeriRouter);
app.use("/api/berita", beritaRouter);
app.use("/api/pengumuman", pengumumanRouter);
app.use("/api/prestasi", prestasiRouter);
app.use("/api/pendaftaran", pendaftaranRouter);
app.use("/api/pendaftar", pendaftarRouter);
app.use("/api/tautan", tautanRouter);

// Middleware untuk menangani rute yang tidak ditemukan
app.use(notFound);

// Middleware untuk menangani semua error
app.use(errorHandler);

// Koneksi ke MongoDB dengan error handling
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => {
    console.log("✅ Database KONEK");
  })
  .catch((error) => {
    console.error("❌ Gagal konek ke database:", error.message);
    process.exit(1); // Keluar dari proses jika koneksi gagal
  });

// Menjalankan server
app.listen(PORT, () => {
  console.log(`🚀 Aplikasi berjalan di ${process.env.PORT}`);
});
