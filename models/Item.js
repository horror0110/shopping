import mongoose from "mongoose";

const { Schema } = mongoose;

const productItem = new Schema(
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
        
      }],
      size: [{
        type: String,

      }]

  },
  { timestamps: true }
);
export default mongoose.models.Item || mongoose.model("Item", productItem);