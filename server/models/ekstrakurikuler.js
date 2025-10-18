import mongoose from "mongoose";
const { Schema } = mongoose;
// Membuat schema untuk item
const ekstrakurikulerSchema = new Schema({
  nama: {
    type: String,
    required: [true, "Nama ekstrakurikuler tidak boleh kosong"],
  },
  gambar: {
    type: String,
    required: [false, "Gambar ekstrakurikuler tidak boleh kosong"], // Menyimpan URL gambar atau path file gambar
  },
});

// Export model Item
const Ekstrakurikuler = mongoose.model(
  "Ekstrakurikuler",
  ekstrakurikulerSchema
);
export default Ekstrakurikuler;
