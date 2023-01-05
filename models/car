const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema = new Schema({
  make: { type: String, required: true, maxLength: 20 },
  description: { type: String, required: true, maxLength: 300 },
  team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  price: { type: Number, min: 1000000, max: 100000000 },
  number_in_stock: { type: Number, min: 0, max: 10 }
})

// Virtual for Car URL
CarSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/formula/car/${this.id}`;
});

// Export model
module.exports = mongoose.model("Car", CarSchema);