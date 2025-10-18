import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Berita from "../models/berita.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tambahBerita = async (req, res) => {
  try {
    console.log("REQ.FILES:", req.files); // Debugging multiple files
    console.log("REQ.BODY:", req.body); // Debugging form data

    if (!req.body.judul || !req.body.deskripsi) {
      return res
        .status(400)
        .json({ message: "Judul dan deskripsi tidak boleh kosong" });
    }

    // if (!req.files || req.files.length === 0) {
    //   return res
    //     .status(400)
    //     .json({ message: "Gambar berita tidak boleh kosong!" });
    // }

    const { judul, deskripsi, tanggal } = req.body;
    const gambar = req.files.map((file) => file.filename); // Simpan semua gambar dalam array

    const beritaBaru = await Berita.create({
      judul,
      deskripsi,
      tanggal,
      gambar,
    });

    res.status(201).json({
      status: "success",
      data: beritaBaru,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const tampilBerita = async (req, res) => {
  try {
    const berita = await Berita.find().sort({ tanggal: -1 }); // Urutkan dari terbaru ke lama
    res.status(200).json({ status: "success", data: berita });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const detailBerita = async (req, res) => {
  try {
    const berita = await Berita.findById(req.params.id);
    if (!berita)
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    res.status(200).json({ status: "success", data: berita });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const updateBerita = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, deskripsi, tanggal } = req.body;
    const berita = await Berita.findById(id);

    if (!berita) {
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    }

    let gambarBaru = berita.gambar; // Gunakan gambar lama jika tidak diupdate
    if (req.files && req.files.length > 0) {
      // Hapus gambar lama jika ada
      if (berita.gambar && berita.gambar.length > 0) {
        berita.gambar.forEach((img) => {
          const filePath = path.join(__dirname, "../uploads", img);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      }
      // Simpan gambar baru
      gambarBaru = req.files.map((file) => file.filename);
    }

    // Update berita dengan data baru
    berita.judul = judul;
    berita.deskripsi = deskripsi;
    berita.gambar = gambarBaru;
    berita.tanggal = new Date(tanggal); // simpan saat update

    await berita.save();

    res.json({ message: "Berita berhasil diperbarui", data: berita });
  } catch (error) {
    res.status(500).json({ message: "Error updating berita", error });
  }
};

const deleteBerita = async (req, res) => {
  try {
    const { id } = req.params;
    const berita = await Berita.findById(id);

    if (!berita) {
      return res.status(404).json({ message: "Berita tidak ditemukan" });
    }

    // Hapus semua gambar terkait
    if (berita.gambar && berita.gambar.length > 0) {
      berita.gambar.forEach((img) => {
        const filePath = path.join(__dirname, "../uploads", img);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    // Hapus berita dari database
    await Berita.findByIdAndDelete(id);

    return res.status(200).json({
      status: "success",
      message: "Berita berhasil dihapus",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { tambahBerita, tampilBerita, detailBerita, updateBerita, deleteBerita };
