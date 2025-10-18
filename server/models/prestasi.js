import mongoose from "mongoose";
const { Schema } = mongoose;
const prestasiSchema = new Schema({
  perlombaan: {
    type: String,
    required: [true, "Nama perlombaan tidak boleh kosong"],
  },
  peringkat: {
    type: String,
    required: [true, "Peringkat perlombaan tidak boleh kosong"],
  },
  tingkat: {
    type: String,
    required: [true, "Tingkat perlombaan  tidak boleh kosong"],
  },
  tahun: {
    type: String,
    required: [true, "Tahun perlombaan tidak boleh kosong"],
  },
});

// Export model Perlombaan
const Prestasi = mongoose.model("Prestasi", prestasiSchema);
export default Prestasi;
