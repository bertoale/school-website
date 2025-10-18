import Prestasi from "../models/prestasi.js";

const tambahPrestasi = async (req, res) => {
  const post = req.body;
  try {
    await Prestasi.create(post);
    res.status(200).json({ message: "Prestasi Berhasil Ditambahkan" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const tampilPrestasi = async (req, res) => {
  try {
    const posts = await Prestasi.find().sort({ tahun: -1 });

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

const detailPrestasi = async (req, res) => {
  try {
    const post = await Prestasi.findById(req.params.id);
    return res.status(200).json({
      status: "Success",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      Message: error.Message,
    });
  }
};

const updatePrestasi = async (req, res) => {
  try {
    const updatePrestasi = await Prestasi.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json({
      status: "Success",
      data: updatePrestasi,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deletePrestasi = async (req, res) => {
  try {
    const deletePrestasi = await Prestasi.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: "Success",
      data: deletePrestasi,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export {
  tambahPrestasi,
  tampilPrestasi,
  detailPrestasi,
  updatePrestasi,
  deletePrestasi,
};
