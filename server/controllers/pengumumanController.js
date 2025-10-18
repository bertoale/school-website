//IMPORT
import Pengumuman from "../models/pengumuman.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tambahPengumuman = async (req, res) => {
  try {
    console.log("REQ.FILE:", req.file); // Debugging
    console.log("REQ.BODY:", req.body); // Debugging

    if (!req.body) {
      return res.status(400).json({ message: "Judul tidak boleh kosong" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Gambar tidak boleh kosong!" });
    }

    const { judul } = req.body;
    const gambar = req.file.filename;
    const pengumumanBaru = await Pengumuman.create({
      judul,
      gambar,
    });

    res.status(201).json({
      status: "success",
      data: pengumumanBaru,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const tampilPengumuman = async (req, res) => {
  try {
    const pengumuman = await Pengumuman.find().sort({ _id: -1 });
    res.status(200).json({ status: "success", data: pengumuman });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const detailPengumuman = async (req, res) => {
  try {
    const pengumuman = await Pengumuman.findById(req.params.id);
    if (!pengumuman)
      return res.status(404).json({ message: "Pengumuman tidak ditemukan" });
    res.status(200).json({ status: "success", data: pengumuman });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const updatePengumuman = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul } = req.body;
    const pengumuman = await Pengumuman.findById(id);

    if (!pengumuman) {
      return res.status(404).json({ message: "Pengumuman tidak ditemukan" });
    }

    let gambarBaru = pengumuman.gambar; // Default pakai gambar lama
    if (req.file) {
      gambarBaru = req.file.filename;

      // Hapus gambar lama jika ada dan file masih tersedia
      const oldImagePath = path.join(
        __dirname,
        "../uploads",
        pengumuman.gambar
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Update data pengumuman di database
    pengumuman.judul = judul;
    pengumuman.gambar = gambarBaru;
    await pengumuman.save();

    res.json({ message: "Pengumuman berhasil diperbarui", data: pengumuman });
  } catch (error) {
    console.error("Gagal memperbarui pengumuman:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

const deletePengumuman = async (req, res) => {
  try {
    const { id } = req.params;
    const pengumuman = await Pengumuman.findById(id);

    if (!pengumuman) {
      return res.status(404).json({ message: "Pengumuman tidak ditemukan" });
    }

    // Path gambar
    const imagePath = path.join(__dirname, "../uploads", pengumuman.gambar);

    // Hapus file gambar jika ada
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Hapus data pengumuman dari database
    await Pengumuman.findByIdAndDelete(id);

    res.json({ message: "Pengumuman berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus pengumuman:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export {
  tambahPengumuman,
  tampilPengumuman,
  detailPengumuman,
  updatePengumuman,
  deletePengumuman,
};
