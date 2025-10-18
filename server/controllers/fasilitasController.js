//IMPORT
import Fasilitas from "../models/fasilitas.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tambahFasilitas = async (req, res) => {
  try {
    console.log("REQ.FILE:", req.file); // Debugging
    console.log("REQ.BODY:", req.body); // Debugging

    if (!req.body) {
      return res
        .status(400)
        .json({ message: "nama dan deskripsi tidak boleh kosong" });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Gambar fasilitas tidak boleh kosong!" });
    }

    const { nama, deskripsi } = req.body;
    const gambar = req.file.filename;
    const fasilitasBaru = await Fasilitas.create({
      nama,
      deskripsi,
      gambar,
    });

    res.status(201).json({
      status: "success",
      data: fasilitasBaru,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const tampilFasilitas = async (req, res) => {
  try {
    const fasilitas = await Fasilitas.find().sort({ _id: -1 });
    res.status(200).json({ status: "success", data: fasilitas });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const detailFasilitas = async (req, res) => {
  try {
    const fasilitas = await Fasilitas.findById(req.params.id);
    if (!fasilitas)
      return res.status(404).json({ message: "Fasilitas tidak ditemukan" });
    res.status(200).json({ status: "success", data: fasilitas });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const updateFasilitas = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, deskripsi } = req.body;
    const fasilitas = await Fasilitas.findById(id);

    if (!fasilitas) {
      return res.status(404).json({ message: "Fasilitas tidak ditemukan" });
    }

    let gambarBaru = fasilitas.gambar; // Default pakai gambar lama
    if (req.file) {
      gambarBaru = req.file.filename;

      // Hapus gambar lama jika ada dan file masih tersedia
      const oldImagePath = path.join(__dirname, "../uploads", fasilitas.gambar);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Update data fasilitas di database
    fasilitas.nama = nama;
    fasilitas.deskripsi = deskripsi;
    fasilitas.gambar = gambarBaru;
    await fasilitas.save();

    res.json({ message: "Fasilitas berhasil diperbarui", data: fasilitas });
  } catch (error) {
    console.error("Gagal memperbarui fasilitas:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

const deleteFasilitas = async (req, res) => {
  try {
    const { id } = req.params;
    const fasilitas = await Fasilitas.findById(id);

    if (!fasilitas) {
      return res.status(404).json({ message: "Fasilitas tidak ditemukan" });
    }

    // Path gambar
    const imagePath = path.join(__dirname, "../uploads", fasilitas.gambar);

    // Hapus file gambar jika ada
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Hapus data fasilitas dari database
    await Fasilitas.findByIdAndDelete(id);

    res.json({ message: "Fasilitas berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus fasilitas:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export {
  tambahFasilitas,
  tampilFasilitas,
  detailFasilitas,
  updateFasilitas,
  deleteFasilitas,
};
