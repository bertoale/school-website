//IMPORT
import Ektrakurikuler from "../models/ekstrakurikuler.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tambahEktrakurikuler = async (req, res) => {
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
        .json({ message: "Gambar Ekstrakurikuler tidak boleh kosong!" });
    }

    const { nama, deskripsi } = req.body;
    const gambar = req.file.filename;
    const ekstrakurikulerBaru = await Ektrakurikuler.create({
      nama,
      deskripsi,
      gambar,
    });

    res.status(201).json({
      status: "success",
      data: ekstrakurikulerBaru,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const tampilEktrakurikuler = async (req, res) => {
  try {
    const ekstrakurikuler = await Ektrakurikuler.find().sort({ _id: -1 });
    res.status(200).json({ status: "success", data: ekstrakurikuler });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const detailEktrakurikuler = async (req, res) => {
  try {
    const ekstrakurikuler = await Ektrakurikuler.findById(req.params.id);
    if (!ekstrakurikuler)
      return res
        .status(404)
        .json({ message: "Ektrakurikuler tidak ditemukan" });
    res.status(200).json({ status: "success", data: ekstrakurikuler });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const updateEktrakurikuler = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, deskripsi } = req.body;
    const ekstrakurikuler = await Ektrakurikuler.findById(id);

    if (!ekstrakurikuler) {
      return res
        .status(404)
        .json({ message: "Ektrakurikuler tidak ditemukan" });
    }

    let gambarBaru = ekstrakurikuler.gambar; // Default pakai gambar lama
    if (req.file) {
      gambarBaru = req.file.filename;

      // Hapus gambar lama jika ada dan file masih tersedia
      const oldImagePath = path.join(
        __dirname,
        "../uploads",
        ekstrakurikuler.gambar
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Update data ekstrakurikuler di database
    ekstrakurikuler.nama = nama;
    ekstrakurikuler.deskripsi = deskripsi;
    ekstrakurikuler.gambar = gambarBaru;
    await ekstrakurikuler.save();

    res.json({
      message: "Ektrakurikuler berhasil diperbarui",
      data: ekstrakurikuler,
    });
  } catch (error) {
    console.error("Gagal memperbarui ekstrakurikuler:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

const deleteEktrakurikuler = async (req, res) => {
  try {
    const { id } = req.params;
    const ekstrakurikuler = await Ektrakurikuler.findById(id);

    if (!ekstrakurikuler) {
      return res
        .status(404)
        .json({ message: "Ektrakurikuler tidak ditemukan" });
    }

    // Path gambar
    const imagePath = path.join(
      __dirname,
      "../uploads",
      ekstrakurikuler.gambar
    );

    // Hapus file gambar jika ada
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Hapus data ekstrakurikuler dari database
    await Ektrakurikuler.findByIdAndDelete(id);

    res.json({ message: "Ektrakurikuler berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus ekstrakurikuler:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

export {
  tambahEktrakurikuler,
  tampilEktrakurikuler,
  detailEktrakurikuler,
  updateEktrakurikuler,
  deleteEktrakurikuler,
};
