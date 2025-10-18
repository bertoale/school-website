import Pendaftar from "../models/pendaftar.js";
import Pendaftaran from "../models/pendaftaran.js";
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
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 hari
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
      email: user.email,
      role: user.role, // kirim role ke frontend juga
    },
  });
};

// **REGISTER PENDAFTAR**
// export const RegisterPendaftar = asyncHandler(async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const createPendaftar = await Pendaftar.create({ email, password });
//     createSendToken(createPendaftar, 201, res);
//   } catch (error) {
//     res.status(400).json({ status: "fail", message: error.message });
//   }
// });

export const RegisterPendaftar = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const createPendaftar = await Pendaftar.create({ email, password });
    createSendToken(createPendaftar, 201, res);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({
        status: "fail",
        message: "Email sudah terdaftar, silakan gunakan email lain.",
      });
    }

    res.status(400).json({
      status: "fail",
      message: error.message || "Registrasi gagal.",
    });
  }
});

// **LOGIN PENDAFTAR**
export const LoginPendaftar = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Email dan password wajib diisi");
  }
  const userData = await Pendaftar.findOne({ email });
  if (userData && (await userData.comparePassword(password))) {
    createSendToken(userData, 200, res);
  } else {
    res.status(400);
    throw new Error("Email atau password salah");
  }
});

// **LOGOUT PENDAFTAR**
export const LogoutPendaftar = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Hanya secure jika di production
    sameSite: "strict",
    expires: new Date(0), // Hapus segera
  });

  res.status(200).json({ status: "success", message: "Logout berhasil" });
};

export const currentUser = asyncHandler(async (req, res) => {
  const pendaftar = await Pendaftar.findById(req.pendaftar.id).select(
    "-password"
  );
  if (pendaftar) {
    res.status(200).json({
      pendaftar,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

export const checkEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("email wajib diisi");
  }

  const existingUser = await Pendaftar.findOne({ email: email }); // email field menyimpan email

  res.status(200).json({ exists: !!existingUser });
});

export const deletePendaftar = async (req, res) => {
  const { id } = req.params;

  try {
    // Hapus pendaftaran yang terkait
    await Pendaftaran.deleteOne({ pendaftar: id });

    // Hapus akun pendaftar
    const hasil = await Pendaftar.findByIdAndDelete(id);

    if (!hasil) {
      return res.status(404).json({ message: "Pendaftar tidak ditemukan" });
    }

    res
      .status(200)
      .json({ message: "Pendaftar dan pendaftarannya berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat menghapus pendaftar" });
  }
};
