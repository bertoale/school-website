import mongoose, { Schema } from "mongoose"; // Pastikan Schema diambil dari mongoose

// Skema untuk alamat
const alamatSchema = new mongoose.Schema({
  alamat: { type: String, required: false },
  telepon: { type: String, required: false },
  tinggalDengan: { type: String, required: false },
  jarak: { type: String, required: false },
});

const kesehatanSchema = new mongoose.Schema({
  golonganDarah: { type: String, required: false },
  penyakit: { type: String, required: false },
  kelainanJasmani: { type: String, required: false },
  tinggiBadan: { type: String, required: false },
  beratBadan: { type: String, required: false },
  hobby: { type: String, required: false },
});

const pendidikanSchema = new mongoose.Schema({
  tamatan: { type: String, required: false },
  ijazah: { type: String, required: false },
  lamaBelajar: { type: String, required: false },
  pindahanSekolah: { type: String, required: false },
  alasan: { type: String, required: false },
  diterimaKelas: { type: String, required: false },
  diterimaProgram: { type: String, required: false },
  diterimaTanggal: { type: String, required: false },
});

const ayahSchema = new mongoose.Schema({
  nama: { type: String, required: false },
  TTL: { type: String, required: false },
  agama: { type: String, required: false },
  kewarganegaraan: { type: String, required: false },
  pendidikan: { type: String, required: false },
  pekerjaan: { type: String, required: false },
  penghasilanBulanan: { type: String, required: false },
  alamat: { type: String, required: false },
  telepon: { type: String, required: false },
  status: { type: String, required: false },
});

const ibuSchema = new mongoose.Schema({
  nama: { type: String, required: false },
  TTL: { type: String, required: false },
  agama: { type: String, required: false },
  kewarganegaraan: { type: String, required: false },
  pendidikan: { type: String, required: false },
  pekerjaan: { type: String, required: false },
  penghasilanBulanan: { type: String, required: false },
  alamat: { type: String, required: false },
  telepon: { type: String, required: false },
  status: { type: String, required: false },
});

const waliSchema = new mongoose.Schema({
  nama: { type: String, required: false },
  TTL: { type: String, required: false },
  agama: { type: String, required: false },
  kewarganegaraan: { type: String, required: false },
  pendidikan: { type: String, required: false },
  pekerjaan: { type: String, required: false },
  penghasilanBulanan: { type: String, required: false },
  alamat: { type: String, required: false },
  telepon: { type: String, required: false },
});

const penanggungSchema = new mongoose.Schema({
  nama: { type: String, required: false },
  TTL: { type: String, required: false },
  agama: { type: String, required: false },
  kewarganegaraan: { type: String, required: false },
  pendidikan: { type: String, required: false },
  pekerjaan: { type: String, required: false },
  penghasilanBulanan: { type: String, required: false },
  alamat: { type: String, required: false },
  telepon: { type: String, required: false },
  hubungan: { type: String, required: false },
});
// Skema untuk pengguna
const pendaftaranSchema = new mongoose.Schema({
  pendaftar: { type: Schema.Types.ObjectId, ref: "Pendaftar", required: true },
  kelengkapan: { type: String, default: "False" },
  nisn: { type: String, required: false },
  nis: { type: String, required: false },
  nama: { type: String, required: false },
  panggilan: { type: String, required: false },
  jenisKelamin: { type: String, required: false },
  TTL: { type: String, required: false },
  agama: { type: String, required: false },
  kewarganegaraan: { type: String, required: false },
  anakKe: { type: String, required: false },
  saudaraKandung: { type: String, required: false },
  saudaraTiri: { type: String, required: false },
  saudaraAngkat: { type: String, required: false }, /////
  status: { type: String, required: false },
  bahasa: { type: String, required: false },
  alamat: { type: alamatSchema, required: false },
  kesehatan: { type: kesehatanSchema, required: false },
  pendidikan: { type: pendidikanSchema, required: false },
  ayah: { type: ayahSchema, required: false },
  ibu: { type: ibuSchema, required: false },
  wali: { type: waliSchema, required: false },
  penanggung: { type: penanggungSchema, required: false },
});

const Pendaftaran = mongoose.model("Pendaftaran", pendaftaranSchema);
export default Pendaftaran;
