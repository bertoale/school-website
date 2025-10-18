import mongoose from "mongoose";
const { Schema } = mongoose;
// Membuat schema untuk item
const fasilitasSchema = new Schema({
  nama: {
    type: String,
    required: [true, "Nama fasilitas tidak boleh kosong"],
  },

  gambar: {
    type: String,
    required: [true, "Gambar fasilitas tidak boleh kosong"], // Menyimpan URL gambar atau path file gambar
  },
});

// Export model Item
const Fasilitas = mongoose.model("Fasilitas", fasilitasSchema);
export default Fasilitas;
