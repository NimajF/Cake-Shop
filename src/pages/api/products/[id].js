import { dbConnect } from "../../../utils/mongoose";
import Product from "../../../models/Product";
import { getSession } from "next-auth/react";

dbConnect();

export default async function getProduct(req, res) {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const foundProduct = await Product.find({ link: id });
        if (!foundProduct)
          return res.status(404).json({ msg: "Product not found" });
        return res.status(200).json(foundProduct);
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
  }
}
