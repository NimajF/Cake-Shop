// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbConnect } from "../../utils/mongoose";
import Product from "../../models/Product";

dbConnect();

export default async (req, res) => {
  const {
    method,
    query: { category },
  } = req;

  switch (method) {
    case "GET":
      try {
        const categoryProducts = await Product.find({ category: category });
        if (!categoryProducts)
          return res.status(404).json({ msg: "Category does not exist" });
        return res.status(200).json(categoryProducts);
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    default:
      return res.status(400).json({ msg: "Method not supported" });
  }
};
