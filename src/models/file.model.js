import { Schema, model } from "mongoose";

const fileSchema = new Schema(
  {
    // Foydalanuvchi yuklagan faylning asl nomi
    original_name: {
      type: String,
      required: true,
    },

    // Serverda saqlangan nomi
    store_name: {
      type: String,
      required: true,
    },

    // MIME turi
    mime_type: {
      type: String,
      required: true,
    },

    // Fayl hajmi (baytlarda)
    size: {
      type: Number,
      required: true,
    },

    // Faylning serverdagi yo‘li
    path: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const File = model("File", fileSchema);
