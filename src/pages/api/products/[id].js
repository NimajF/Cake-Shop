import { dbConnect } from "../../../utils/mongoose";
import Product from "../../../models/Product";

dbConnect();

export default async (req, res) => {
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
    case "DELETE":
      try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct)
          return res.status(404).json({ msg: "Product not found" });
        return res.status(204).json();
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }

    default:
      return res.status(400).json({ msg: "Method not supported" });
  }
};
