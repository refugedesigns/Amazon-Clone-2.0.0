const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    stripeOrderId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    stripeCustomerId: {
      type: String,
      required: true,
    },
    images: [String],
    amount: {
      type: Number,
      required: true,
    },
    shippingAmount: {
      type: Number,
      required: true,
    },
    shipping: {
      address: {
        city: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        line1: {
          type: String,
          required: true,
        },
        line2: String,
        postalCode: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models["Order"] || mongoose.model("Order", orderSchema);
