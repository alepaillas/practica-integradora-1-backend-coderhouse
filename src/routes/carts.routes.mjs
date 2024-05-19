import { Router } from "express";
import cartDao from "../dao/mongoDao/cart.dao.mjs";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const carts = await cartDao.getAll();
    res.status(200).json({ status: "success", payload: carts });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartDao.getById(id);
    if (!cart)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el carrito con el id ${id}`,
      });
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const cart = await cartDao.create();
    res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    console.log(error);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    // Extraemos el Id de los request parameters
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const cart = await cartDao.addProductToCart(cartId, productId);
    if (cart.product == false)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el producto con el id ${productId}`,
      });
    if (cart.cart == false)
      return res.status(404).json({
        status: "Error",
        msg: `No se encontró el carrito con el id ${cartId}`,
      });
    res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    console.log(error);
  }
});

export default router;
