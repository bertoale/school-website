import Admin from "../models/admin.js";
import Pendaftar from "../models/pendaftar.js";
import Prestasi from "../models/prestasi.js";
import Ekstrakurikuler from "../models/ekstrakurikuler.js";
import Fasilitas from "../models/fasilitas.js";
import Berita from "../models/berita.js";
import Pengumuman from "../models/pengumuman.js";
import Galeri from "../models/galeri.js";

import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";

// ✅ Tambahkan parameter role ke dalam token
const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "6d",
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id, user.role); // kirim role juga

  const cookieOption = {
    maxAge: 6 * 24 * 60 * 60 * 1000, // 6 hari
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("jwt", token, cookieOption);
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      id: user._id,
      username: user.username,
      role: user.role, // kirim role ke frontend juga
    },
  });
};

// **LOGIN ADMIN**
export const LoginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Username dan password wajib diisi");
  }

  const adminData = await Admin.findOne({ username });

  if (adminData && (await adminData.comparePassword(password))) {
    createSendToken(adminData, 200, res);
  } else {
    res.status(400);
    throw new Error("Username atau password salah");
  }
});

// **REGISTER ADMIN**
export const RegisterAdmin = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    const createAdmin = await Admin.create({ username, password });

    createSendToken(createAdmin, 201, res);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Terjadi kesalahan saat pendaftaran admin",
      error: error.message,
    });
  }
});
// **LOGOUT ADMIN**
export const LogoutAdmin = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ status: "success", message: "Logout berhasil" });
};

export const getDashboardSummary = async (req, res) => {
  try {
    const [
      totalPendaftaran,
      totalPrestasi,
      totalEkskul,
      totalFasilitas,
      totalBerita,
      totalPengumuman,
      totalGaleri,
    ] = await Promise.all([
      Pendaftar.countDocuments(),
      Prestasi.countDocuments(),
      Ekstrakurikuler.countDocuments(),
      Fasilitas.countDocuments(),
      Berita.countDocuments(),
      Pengumuman.countDocuments(),
      Galeri.countDocuments(),
    ]);

    res.json({
      totalPendaftaran,
      totalPrestasi,
      totalEkskul,
      totalFasilitas,
      totalBerita,
      totalPengumuman,
      totalGaleri,
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data dashboard", error });
  }
};
