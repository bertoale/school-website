// models/Artikel.js
import mongoose from "mongoose";
const { Schema } = mongoose;
// Membuat schema untuk artikel
const beritaSchema = new Schema({
  judul: {
    type: String,
    required: [true, "Judul tidak boleh kosong"],
  },
  deskripsi: {
    type: String,
    required: [true, "Deskripsi tidak boleh kosong"],
  },
  gambar: {
    type: [String],
    required: false,
  },
  tanggal: {
    type: Date,
  },
});

// Export model Artikel
const Berita = mongoose.model("Berita", beritaSchema);
export default Berita;
