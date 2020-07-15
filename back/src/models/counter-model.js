const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const counterSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  seq: {
    type: Number,
  },
});

const Counter = mongoose.model("Counter", counterSchema);

Counter.getNextSequence = async (name) => {
  let ret = await Counter.findOneAndUpdate(
    { name: name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return ret.seq;
};

module.exports = Counter;
