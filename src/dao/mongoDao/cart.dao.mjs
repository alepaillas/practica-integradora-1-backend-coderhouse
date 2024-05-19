import { cartModel } from "../models/cart.model.mjs";
import { productModel } from "../models/product.model.mjs";

const getAll = async () => {
  const carts = await cartModel.find();
  return carts;
};

const getById = async (id) => {
  const cart = await cartModel.findById(id);
  return cart;
};

const create = async (data) => {
  const cart = await cartModel.create(data);
  return cart;
};

const deleteOne = async (id) => {
  const cart = await cartModel.deleteOne({ _id: id });
  if (cart.deletedCount === 0) return false;
  return true;
};

const addProductToCart = async (cid, pid) => {
  const product = await productModel.findById(pid);
  if (!product) return { product: false };

  // agregamos el producto al array del carrito con el metodo push de mongoose
  await cartModel.findByIdAndUpdate(cid, { $push: { products: product } });

  const cart = await cartModel.findById(cid);
  if (!cart) return { cart: false };
  return cart;
};

export default {
  getAll,
  getById,
  create,
  deleteOne,
  addProductToCart,
};
