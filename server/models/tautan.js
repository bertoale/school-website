import mongoose from "mongoose";

const tautanSchema = new mongoose.Schema({
  tautan: {
    type: String,
  },
});

const Tautan = mongoose.model("Tautan", tautanSchema);
export default Tautan;
