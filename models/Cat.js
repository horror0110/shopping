import mongoose from "mongoose";
const { transliterate, slugify } = require("transliteration");

const { Schema } = mongoose;

const CatSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

CatSchema.pre("save", function () {
  // name хөрвүүлэх
  this.slug = slugify(this.description);
});
export default mongoose.models.Cat || mongoose.model("Cat", CatSchema);
