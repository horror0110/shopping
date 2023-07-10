import mongoose from "mongoose";

const { Schema } = mongoose;

const BasketSchema = new Schema(
  {
    email:{
      type:String,
      required: true
    },
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
export default mongoose.models.Basket || mongoose.model("Basket", BasketSchema);