var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    address: {
      city: String,
      state: String,
      country: String,
      pin: Number,
    },
  },
  { timestamps: true }
);

userSchema.index({ country: 1, state: 1 });

module.exports = mongoose.model('User', userSchema);
