import mongoose from "mongoose";

const cartCollection = "carts";

const cartsSchema = new mongoose.Schema({
  products: {
    type: Array,
    default: [],
    require: true,
  },
});

// Moodelo utilizado para manejar la base de datos
export const cartModel = mongoose.model(cartCollection, cartsSchema);
