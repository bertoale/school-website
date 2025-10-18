import Tautan from "../models/tautan.js";

const tampilTautan = async (req, res) => {
  try {
    const posts = await Tautan.find().sort({ tahun: -1 });

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

const detailTautan = async (req, res) => {
  try {
    const post = await Tautan.findById(req.params.id);
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

const updateTautan = async (req, res) => {
  try {
    const updateTautan = await Tautan.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json({
      status: "Success",
      data: updateTautan,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteTautan = async (req, res) => {
  try {
    const deleteTautan = await Tautan.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: "Success",
      data: deleteTautan,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export { tampilTautan, detailTautan, updateTautan, deleteTautan };
