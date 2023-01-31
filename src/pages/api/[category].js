// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { dbConnect } from "../../utils/mongoose";
import Product from "../../models/Product";

dbConnect();

export default async function getCategory(req, res) {
  const {
    method,
    query: { category, sort },
  } = req;

  function sortMethods() {
    if (sort === "recent") {
      return { _id: -1 };
    } else {
      if (sort === "-price") {
        return { price: 1 };
      }
    }
    return { price: -1 };
  }

  switch (method) {
    case "GET":
      try {
        let allProducts = [];
        let sorted = sortMethods();

        const noFestivityProducts = await Product.find({
          category: category,
          festivity: { $all: ["no"] },
        }).sort(sorted);

        const festivityProducts = await Product.find({
          category: category,
          festivity: { $nin: "no" },
        }).sort(sorted);

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
}
