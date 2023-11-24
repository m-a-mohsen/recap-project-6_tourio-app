import mongoose from "mongoose";

const { Schema } = mongoose;

const placeSchema = new Schema({
  // joke: { type: String, required: true },
  // test: { type: String, required: true },

  name: { type: String, required: true },
  location: { type: String, required: true },
  // country: { type: String, required: true },
  // imageURL: { type: String, required: true },

  // image: { type: Image, required: true },
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
