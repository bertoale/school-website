import mongoose from "mongoose";
const { Schema } = mongoose;
// Membuat schema untuk artikel
const galeriSchema = new Schema({
  judul: {
    type: String,
  },
  gambar: {
    type: String,
    required: [true, "Gambar galeri tidak boleh kosong"], // Menyimpan URL gambar atau path file gambar
  },
});

// Export model Artikel
const Galeri = mongoose.model("Galeri", galeriSchema);
export default Galeri;
