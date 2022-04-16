import Layout from "../components/Layout";
import Link from "next/link";

export default function Cart({ products }) {
  const clientSide = typeof window !== "undefined";
  const cart = clientSide && JSON.parse(window.localStorage.getItem("pr"));
  console.log(cart);
  return <Layout>ASD</Layout>;
}
