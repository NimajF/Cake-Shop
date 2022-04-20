import { useState, useEffect, useContext } from "react";
import Layout from "../components/Layout";
import Cart from "../components/Cart";
import { DataContext } from "../store/GlobalState";
import Link from "next/link";
import Cookies from "js-cookie";

export default function CartPage() {
  return (
    <Layout>
      <h1>Carrito de compras</h1>
      <Cart />
    </Layout>
  );
}

// CartPage.getInitialProps = ({ req }) => {
//   const cookies = Cookies.get("cart");
//   return {
//     initialCart: cookies,
//   };
// };
