import mongoose from "mongoose";

const { Schema } = mongoose;

const CheckoutSchema = new Schema(
  {
    name: {
        type: String,
        required: true
      },
      productName: [{
        type: String,
        required: true
      }],
      phone: {
        type: Number,
        required: true
      },
      address: {
        type: String,
        required: true
      },
     
      color: [{
        type: String,
        
      }],
      size: [{
        type: String,
      }],
      totalPrice:{
        type:String,
        required:true
      }

  },
  { timestamps: true }
);
export default mongoose.models.Checkout || mongoose.model("Checkout", CheckoutSchema);