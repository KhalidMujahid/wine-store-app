const { model, Schema } = require("mongoose");

const ItemSchema = new Schema(
  {
    item_name: String,
    item_image: String,
    item_price: String,
    item_cat: String,
  },
  { timestamps: true }
);

module.exports = model("Item", ItemSchema);
