import { dbConnect } from "../../../../utils/mongoose";
import Product from "../../../../models/Product";

dbConnect();

export default async function getEditProduct(req, res) {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const foundProduct = await Product.findById(id);
        if (!foundProduct)
          return res.status(404).json({ msg: "Product not found" });
        return res.status(200).json(foundProduct);
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    case "PUT":
      try {
        const updatedProduct = await Product.findByIdAndUpdate(id, body, {
          new: true,
        });
        if (!updatedProduct)
          return res.status(404).json({ msg: "Product not found" });
        return res.status(204).json();
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    case "DELETE":
      try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct)
          return res.status(404).json({ msg: "Product not found" });
        return res.status(204).json();
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    // try {
    //   await Product.findByIdAndDelete(id);
    //   res.json({ msg: "Product deleted" });
    // } catch (err) {
    //   return res.status(500).json({ err: err.message });
    // }
    // try {
    //   const deletedProduct = await Product.findByIdAndDelete(id);
    //   if (!deletedProduct)
    //     return res.status(404).json({ msg: "Product not found" });
    //   return res.status(204).json();
    // } catch (err) {
    //   return res.status(400).json({ msg: err.message });
    // }

    default:
      return res.status(400).json({ msg: "Method not supported" });
  }
}
