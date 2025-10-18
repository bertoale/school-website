import mongoose from "mongoose";
import dotenv from "dotenv";
// import bcrypt from "bcryptjs";
import Tautan from "./models/tautan.js";
import Admin from "./models/admin.js"; // pastikan file admin.js sesuai path

dotenv.config(); // Pastikan file .env berisi DATABASE

const seedData = async () => {
  try {
    // 🔗 Koneksi ke MongoDB
    await mongoose.connect(process.env.DATABASE);
    console.log("✅ MongoDB connected...");

    // =============================
    // 🌱 SEED DATA TAUTAN
    // =============================
    await Tautan.deleteMany();
    const tautanData = {
      tautan: "/", // ganti sesuai kebutuhan
    };
    const tautan = await Tautan.create(tautanData);
    console.log("✅ Data tautan berhasil ditambahkan:", tautan);

    // =============================
    // 🌱 SEED DATA ADMIN
    // =============================
    await Admin.deleteMany(); // opsional: kosongkan dulu

    const adminData = {
      username: "admin",
      password: "password123", // akan otomatis di-hash oleh middleware pre-save
      role: "admin",
    };

    const admin = await Admin.create(adminData);
    console.log("✅ Data admin berhasil ditambahkan:", {
      username: admin.username,
      role: admin.role,
    });

    // 🚪 Tutup koneksi
    await mongoose.connection.close();
    console.log("✅ Koneksi MongoDB ditutup.");
  } catch (error) {
    console.error("❌ Gagal seed data:", error.message);
    process.exit(1);
  }
};

seedData();
