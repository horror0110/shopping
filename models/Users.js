import mongoose from "mongoose";

const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    email: {
      type:String,
      required: true,
      unique:true,
      match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },

  },
  { timestamps: true }
);
export default mongoose.models.Users || mongoose.model("Users", usersSchema);