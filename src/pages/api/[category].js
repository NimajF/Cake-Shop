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
        let allProducts = [];
        const noFestivityProducts = await Product.find({
          category: category,
          festivity: { $all: ["no"] },
        });
        const festivityProducts = await Product.find({
          category: category,
          festivity: { $nin: "no" },
        });

        if (!noFestivityProducts || !festivityProducts) {
          return res.status(404).json({ msg: "Category does not exist" });
        } else {
          allProducts = festivityProducts;
          allProducts.push(...noFestivityProducts);
          return res.status(200).json(allProducts);
        }
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    default:
      return res.status(400).json({ msg: "Method not supported" });
  }
};
