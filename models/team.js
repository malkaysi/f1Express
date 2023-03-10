const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: { type: String, required: true, maxLength: 20 },
  description: { type: String, required: true, maxLength: 300 },
})

// Virtual for Car URL
TeamSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/team/${this.id}`;
});


// Export model
module.exports = mongoose.model("Team", TeamSchema);