import { dbConnect } from "../../../utils/mongoose";
import Product from "../../../models/Product";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const products = await Product.find();
        return res.status(200).json(products);
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }

    case "POST":
      try {
        const newProduct = new Product(body);
        const savedProduct = await newProduct.save();
        return res.status(201).json(savedProduct);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    // console.log(body);
    // return res.json("Baking Cake");

    default:
      return res.status(400).json({ msg: "Method not supported" });
  }
}
