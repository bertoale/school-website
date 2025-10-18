import Pendaftaran from "../models/pendaftaran.js";

import asyncHandler from "../middleware/asyncHandler.js";
import ExcelJS from "exceljs";

const tambahPendaftaran = async (req, res) => {
  const post = req.body;
  try {
    await Pendaftaran.create(post);
    res.status(200).json({ message: "Pendaftaran Berhasil Ditambahkan" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const tampilPendaftaran = async (req, res) => {
  try {
    const posts = await Pendaftaran.find().sort({ _id: -1 });

    return res.status(200).json({
      status: "Success",
      data: posts,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      Message: error.Message,
    });
  }
};

const detailPendaftaran = async (req, res) => {
  try {
    const pendaftaran = await Pendaftaran.findById(req.params.id);
    if (!pendaftaran)
      return res.status(404).json({ message: "pendaftaran tidak ditemukan" });
    res.status(200).json({ status: "success", data: pendaftaran });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

const updatePendaftaran = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params; // ID utama pendaftaran
    const updateData = req.body; // Data baru dari request

    // 🔹 Pastikan pendaftaran dengan ID ini ada
    const existingPendaftaran = await Pendaftaran.findById(id);
    if (!existingPendaftaran) {
      return res.status(404).json({ message: "Pendaftaran tidak ditemukan" });
    }

    // 🔹 Update utama (nama, TTL, agama, dsb.)
    let updateQuery = {};
    Object.keys(updateData).forEach((key) => {
      if (typeof updateData[key] === "object" && updateData[key] !== null) {
        // Jika objek (subdokumen), update secara spesifik agar _id tetap
        Object.keys(updateData[key]).forEach((subKey) => {
          updateQuery[`${key}.${subKey}`] = updateData[key][subKey];
        });
      } else {
        // Jika bukan objek (field utama), langsung update
        updateQuery[key] = updateData[key];
      }
    });

    // 🔹 Update data
    const updatedPendaftaran = await Pendaftaran.findByIdAndUpdate(
      id,
      { $set: updateQuery },
      { new: true, runValidators: true }
    );

    // 🔹 Respon jika berhasil
    res.status(200).json({
      message: "Pendaftaran berhasil diperbarui",
      data: updatedPendaftaran,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deletePendaftaran = async (req, res) => {
  try {
    const deletePendaftaran = await Pendaftaran.findByIdAndDelete(
      req.params.id
    );
    return res.status(200).json({
      status: "Success",
      data: deletePendaftaran,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const currentUserPendaftaran = asyncHandler(async (req, res) => {
  if (!req.pendaftar || !req.pendaftar._id) {
    return res.status(400).json({
      message: "Data pendaftar tidak ditemukan di request.",
    });
  }

  const pendaftaran = await Pendaftaran.find({ pendaftar: req.pendaftar._id });

  return res.status(200).json({
    data: pendaftaran,
    message: "berhasil",
  });
});

const exportPendaftaranToExcel = async (req, res) => {
  try {
    const pendaftarans = await Pendaftaran.find().lean();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data Pendaftaran");

    // 🔹 Header kolom
    worksheet.columns = [
      { header: "No", key: "no", width: 5 },
      { header: "NISN", key: "nisn", width: 20 },
      { header: "NIS", key: "nis", width: 20 },
      { header: "Nama Lengkap", key: "nama", width: 30 },
      { header: "Nama Panggilan", key: "panggilan", width: 20 },
      { header: "Jenis Kelamin", key: "jenisKelamin", width: 15 },
      { header: "Tempat, Tanggal Lahir", key: "TTL", width: 25 },
      { header: "Agama", key: "agama", width: 15 },
      { header: "Kewarganegaraan", key: "kewarganegaraan", width: 20 },
      { header: "Anak ke berapa", key: "anakKe", width: 10 },
      { header: "Jumlah saudara kandung", key: "saudaraKandung", width: 15 },
      { header: "Jumlah saudara tiri", key: "saudaraTiri", width: 15 },
      { header: "Jumlah saudara angkat", key: "saudaraAngkat", width: 15 },
      {
        header: "Anak: yatim/piatu/yatip piatu/lengkap",
        key: "status",
        width: 15,
      },
      { header: "Bahasa sehari-hari", key: "bahasa", width: 20 },

      // Alamat
      { header: "Alamat", key: "alamat", width: 40 },
      { header: "Nomor telepon", key: "telepon", width: 20 },
      { header: "Tinggal dengan", key: "tinggalDengan", width: 20 },
      { header: "Jarak ke sekolah", key: "jarak", width: 15 },

      // Kesehatan
      { header: "Golongan darah", key: "golonganDarah", width: 15 },
      { header: "Penyakit", key: "penyakit", width: 20 },
      { header: "Kelainan jasmani", key: "kelainanJasmani", width: 20 },
      { header: "Tinggi badan", key: "tinggiBadan", width: 15 },
      { header: "Berat badan", key: "beratBadan", width: 15 },
      { header: "Hobby", key: "hobby", width: 20 },

      // Pendidikan
      { header: "Lulusan dari SMP", key: "tamatan", width: 20 },
      { header: "Tanggal & no STTB", key: "ijazah", width: 20 },
      { header: "Lama belajar", key: "lamaBelajar", width: 20 },
      { header: "Pindahan dari sekolah", key: "pindahanSekolah", width: 20 },
      { header: "Alasan pindah", key: "alasan", width: 20 },
      { header: "Diterima di kelas", key: "diterimaKelas", width: 20 },
      { header: "Program", key: "diterimaProgram", width: 20 },
      { header: "Tanggal Diterima", key: "diterimaTanggal", width: 20 },

      // ayah
      { header: "Nama Ayah", key: "ayah_nama", width: 25 },
      { header: "Tempat, tanggal lahir Ayah", key: "ayah_TTL", width: 25 },
      { header: "Agama Ayah", key: "ayah_agama", width: 15 },
      { header: "Warganegara Ayah", key: "ayah_kewarganegaraan", width: 20 },
      { header: "Pendidikan Ayah", key: "ayah_pendidikan", width: 20 },
      { header: "Pekerjaan Ayah", key: "ayah_pekerjaan", width: 20 },
      { header: "Penghasilan Ayah", key: "ayah_penghasilan", width: 20 },
      { header: "Alamat Ayah", key: "ayah_alamat", width: 25 },
      { header: "Telp Ayah", key: "ayah_telepon", width: 25 },
      {
        header: "Ayah masih hidup/meninggal dunia",
        key: "ayah_status",
        width: 15,
      },

      // Ibu
      { header: "Nama Ibu", key: "ibu_nama", width: 25 },
      { header: "TTL Ibu", key: "ibu_TTL", width: 25 },
      { header: "Agama Ibu", key: "ibu_agama", width: 15 },
      { header: "Warganegara Ibu", key: "ibu_kewarganegaraan", width: 20 },
      { header: "Pendidikan Ibu", key: "ibu_pendidikan", width: 20 },
      { header: "Pekerjaan Ibu", key: "ibu_pekerjaan", width: 20 },
      { header: "Penghasilan Ibu", key: "ibu_penghasilan", width: 20 },
      { header: "Alamat Ibu", key: "ibu_alamat", width: 25 },
      { header: "Telp Ibu", key: "ibu_telepon", width: 25 },
      {
        header: "Ibu masih hidup/meninggal dunia",
        key: "ibu_status",
        width: 15,
      },

      // Wali
      { header: "Nama Wali", key: "wali_nama", width: 25 },
      { header: "TTL Wali", key: "wali_TTL", width: 25 },
      { header: "Agama Wali", key: "wali_agama", width: 15 },
      { header: "Warganegara Wali", key: "wali_kewarganegaraan", width: 20 },
      { header: "Pendidikan Wali", key: "wali_pendidikan", width: 20 },
      { header: "Alamat Wali", key: "wali_alamat", width: 25 },
      { header: "Telp Wali", key: "wali_telepon", width: 25 },
      { header: "Alamat/Telp Wali", key: "wali_alamatTelepon", width: 25 },

      // Penanggung
      { header: "Nama Penanggung", key: "penanggung_nama", width: 25 },
      { header: "TTL Penanggung", key: "penanggung_TTL", width: 25 },
      { header: "Agama Penanggung", key: "penanggung_agama", width: 15 },
      {
        header: "Warganegara Penanggung",
        key: "penanggung_kewarganegaraan",
        width: 20,
      },
      {
        header: "Pendidikan Penanggung",
        key: "penanggung_pendidikan",
        width: 20,
      },
      {
        header: "Pekerjaan Penanggung",
        key: "penanggung_pekerjaan",
        width: 20,
      },
      {
        header: "Penghasilan Penanggung",
        key: "penanggung_penghasilan",
        width: 20,
      },
      { header: "Alamat Penanggung", key: "penanggung_alamat", width: 25 },
      { header: "Telp Penanggung", key: "penanggung_telepon", width: 25 },
      { header: "Hubungan Penanggung", key: "penanggung_hubungan", width: 15 },
    ];

    // 🔹 Tambahkan data ke worksheet
    pendaftarans.forEach((data, index) => {
      worksheet.addRow({
        no: index + 1,
        nisn: data.nisn || "",
        nis: data.nis || "",
        nama: data.nama || "",
        panggilan: data.panggilan || "",
        jenisKelamin: data.jenisKelamin || "",
        TTL: data.TTL || "",
        agama: data.agama || "",
        kewarganegaraan: data.kewarganegaraan || "",
        anakKe: data.anakKe || "",
        saudaraKandung: data.saudaraKandung || "",
        saudaraTiri: data.saudaraTiri || "",
        saudaraAngkat: data.saudaraAngkat || "",
        status: data.status || "",
        bahasa: data.bahasa || "",

        alamat: data.alamat?.alamat || "",
        telepon: data.alamat?.telepon || "",
        tinggalDengan: data.alamat?.tinggalDengan || "",
        jarak: data.alamat?.jarak || "",

        golonganDarah: data.kesehatan?.golonganDarah || "",
        penyakit: data.kesehatan?.penyakit || "",
        kelainanJasmani: data.kesehatan?.kelainanJasmani || "",
        tinggiBadan: data.kesehatan?.tinggiBadan || "",
        beratBadan: data.kesehatan?.beratBadan || "",
        hobby: data.kesehatan?.hobby || "",

        tamatan: data.pendidikan?.tamatan || "",
        ijazah: data.pendidikan?.ijazah || "",
        lamaBelajar: data.pendidikan?.lamaBelajar || "",
        pindahanSekolah: data.pendidikan?.pindahanSekolah || "",
        alasan: data.pendidikan?.alasan || "",
        diterimaKelas: data.pendidikan?.diterimaKelas || "",
        diterimaProgram: data.pendidikan?.diterimaProgram || "",
        diterimaTanggal: data.pendidikan?.diterimaTanggal || "",

        ayah_nama: data.ayah?.nama || "",
        ayah_TTL: data.ayah?.TTL || "",
        ayah_agama: data.ayah?.agama || "",
        ayah_kewarganegaraan: data.ayah?.kewarganegaraan || "",
        ayah_pendidikan: data.ayah?.pendidikan || "",
        ayah_pekerjaan: data.ayah?.pekerjaan || "",
        ayah_penghasilan: data.ayah?.penghasilanBulanan || "",
        ayah_alamat: data.ayah?.alamat || "",
        ayah_telepon: data.ayah?.telepon || "",
        ayah_status: data.ayah?.status || "",

        ibu_nama: data.ibu?.nama || "",
        ibu_TTL: data.ibu?.TTL || "",
        ibu_agama: data.ibu?.agama || "",
        ibu_kewarganegaraan: data.ibu?.kewarganegaraan || "",
        ibu_pendidikan: data.ibu?.pendidikan || "",
        ibu_pekerjaan: data.ibu?.pekerjaan || "",
        ibu_alamat: data.ibu?.alamat || "",
        ibu_telepon: data.ibu?.telepon || "",
        ibu_status: data.ibu?.status || "",

        wali_nama: data.wali?.nama || "",
        wali_TTL: data.wali?.TTL || "",
        wali_agama: data.wali?.agama || "",
        wali_kewarganegaraan: data.wali?.kewarganegaraan || "",
        wali_pendidikan: data.wali?.pendidikan || "",
        wali_pekerjaan: data.wali?.pekerjaan || "",
        wali_penghasilan: data.wali?.penghasilanBulanan || "",
        wali_alamat: data.wali?.alamat || "",
        wali_telepon: data.wali?.telepon || "",

        penanggung_nama: data.penanggung?.nama || "",
        penanggung_TTL: data.penanggung?.TTL || "",
        penanggung_agama: data.penanggung?.agama || "",
        penanggung_kewarganegaraan: data.penanggung?.kewarganegaraan || "",
        penanggung_pendidikan: data.penanggung?.pendidikan || "",
        penanggung_pekerjaan: data.penanggung?.pekerjaan || "",
        penanggung_penghasilan: data.penanggung?.penghasilanBulanan || "",
        penanggung_alamat: data.penanggung?.alamat || "",
        penanggung_telepon: data.penanggung?.telepon || "",
        penanggung_hubungan: data.penanggung?.hubungan || "",
      });
    });

    // 🔹 Response sebagai file Excel
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=pendaftaran.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: "Gagal export: " + error.message });
  }
};

export {
  tambahPendaftaran,
  tampilPendaftaran,
  detailPendaftaran,
  updatePendaftaran,
  deletePendaftaran,
  currentUserPendaftaran,
  exportPendaftaranToExcel,
};
