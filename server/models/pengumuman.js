import mongoose from "mongoose";
const { Schema } = mongoose;
// Membuat schema untuk artikel
const pengumumanSchema = new Schema({
  gambar: {
    type: String,
    required: true,
  },
});

// Export model Artikel
const Pengumuman = mongoose.model("Pengumuman", pengumumanSchema);
export default Pengumuman;
