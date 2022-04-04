import { Schema, model, models } from "mongoose";

const cakeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
});

export default models.Cake || model("Cake", cakeSchema);
