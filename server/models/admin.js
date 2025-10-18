import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username harus diisi"],
    unique: [true, "username sudah digunakan"],
  },
  password: {
    type: String,
    required: [true, "password harus diisi"],
    minlength: [8, "password minimal 8 karakter"],
  },
  role: {
    type: String,
    default: "admin",
  },
  createdAt: {
    type: Date,
    default: Date.now, // Otomatis menambahkan waktu pembuatan
  },
});

// Middleware pre-save untuk hashing password
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Jika password tidak diubah, lanjutkan
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Panggil next() untuk melanjutkan proses penyimpanan
  } catch (error) {
    next(error); // Jika terjadi kesalahan, kirim ke next untuk ditangani
  }
});

adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
