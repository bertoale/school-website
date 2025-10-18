import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Pendaftaran from "./pendaftaran.js"; // Import model Pendaftaran

const pendaftarSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email harus diisi"],
    unique: [true, "email sudah digunakan"],
  },
  password: {
    type: String,
    required: [true, "password harus diisi"],
    minlength: [8, "password minimal 8 karakter"],
  },
  role: {
    type: String,
    default: "pendaftar",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// Middleware pre-save untuk hashing password
pendaftarSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Middleware post-save untuk otomatis membuat dokumen Pendaftaran
pendaftarSchema.post("save", async function (doc, next) {
  try {
    await Pendaftaran.create({
      pendaftar: doc._id,
      nama: "",
      panggilan: "",
      jenisKelamin: "",
      TTL: "",
      agama: "",
      kewarganegaraan: "",
      anakKe: "",
      saudaraKandung: "",
      saudaraTiri: "",
      status: "",
      bahasa: "",
      alamat: {
        alamat: "",
        telepon: "",
        tinggalDengan: "",
        jarak: "",
      },
      kesehatan: {
        golonganDarah: "",
        penyakit: "",
        kelainanJasmani: "",
        tinggiBadan: "",
        beratBadan: "",
        hobby: "",
      },
      pendidikan: {
        tamatan: "",
        ijazah: "",
        lamaBelajar: "",
        pindahanSekolah: "",
        alasan: "",
        diterimaKelas: "",
        diterimaProgram: "",
        diterimaTanggal: "",
      },
      ayah: {
        nama: "",
        TTL: "",
        agama: "",
        pendidikan: "",
        pekerjaan: "",
        penghasilanBulanan: "",
        alamatTelepon: "",
        status: "",
      },
      ibu: {
        nama: "",
        TTL: "",
        agama: "",
        pendidikan: "",
        pekerjaan: "",
        penghasilanBulanan: "",
        alamatTelepon: "",
        status: "",
      },
      wali: {
        nama: "",
        TTL: "",
        agama: "",
        pendidikan: "",
        pekerjaan: "",
        penghasilanBulanan: "",
        alamatTelepon: "",
      },
      penanggung: {
        nama: "",
        TTL: "",
        agama: "",
        pendidikan: "",
        pekerjaan: "",
        penghasilanBulanan: "",
        alamatTelepon: "",
        hubungan: "",
      },
    });
    console.log("Pendaftaran otomatis dibuat untuk pendaftar:", doc._id);
    next();
  } catch (error) {
    console.error("Gagal membuat pendaftaran otomatis:", error);
    next(error);
  }
});

pendaftarSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Pendaftar = mongoose.model("Pendaftar", pendaftarSchema);
export default Pendaftar;
