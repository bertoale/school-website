//IMPORT
import Galeri from "../models/galeri.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tambahGaleri = async (req, res) => {
  try {
    console.log("REQ.FILE:", req.file); // Debugging
    console.log("REQ.BODY:", req.body); // Debugging

    const { judul } = req.body;

    // if (!judul || judul.trim() === "") {
    //   return res.status(400).json({ message: "Judul tidak boleh  kosong" });
    // }

    if (!req.file) {
      return res.status(400).json({ message: "Gambar tidak boleh kosong!" });
    }

    const gambar = req.file.filename;
    const galeriBaru = await Galeri.create({
      judul,
      gambar,
    });

    res.status(201).json({
      status: "success",
      data: galeriBaru,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const tampilGaleri = async (req, res) => {
  try {
    const galeri = await Galeri.find().sort({ _id: -1 });
    res.status(200).json({ status: "success", data: galeri });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const detailGaleri = async (req, res) => {
  try {
    const galeri = await Galeri.findById(req.params.id);
    if (!galeri)
      return res.status(404).json({ message: "Galeri tidak ditemukan" });
    res.status(200).json({ status: "success", data: galeri });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const updateGaleri = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul } = req.body;
    const galeri = await Galeri.findById(id);

    if (!galeri) {
      return res.status(404).json({ message: "Galeri tidak ditemukan" });
    }

    let gambarBaru = galeri.gambar; // Default pakai gambar lama
    if (req.file) {
      gambarBaru = req.file.filename;

      // Hapus gambar lama jika ada dan file masih tersedia
      const oldImagePath = path.join(__dirname, "../uploads", galeri.gambar);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Update data galeri di database
    galeri.judul = judul;
    galeri.gambar = gambarBaru;
    await galeri.save();

    res.json({ message: "Galeri berhasil diperbarui", data: galeri });
  } catch (error) {
    console.error("Gagal memperbarui galeri:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

const deleteGaleri = async (req, res) => {
  try {
    const { id } = req.params;
    const galeri = await Galeri.findById(id);

    if (!galeri) {
      return res.status(404).json({ message: "Galeri tidak ditemukan" });
    }

    // Path gambar
    const imagePath = path.join(__dirname, "../uploads", galeri.gambar);

    // Hapus file gambar jika ada
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Hapus data galeri dari database
    await Galeri.findByIdAndDelete(id);

    res.json({ message: "Galeri berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus galeri:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export { tambahGaleri, tampilGaleri, detailGaleri, updateGaleri, deleteGaleri };
