import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      photo: [{
        type: String,
        required: true
      }],
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      balance: {
        type: Number,
        required: true
      },
      color: [{
        type: String,
        required: true
      }],
      size: [{
        type: String,
        required: true
      }]

  },
  { timestamps: true }
);
export default mongoose.models.Product || mongoose.model("Product", productSchema);