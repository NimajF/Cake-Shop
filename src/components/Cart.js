import { useState, useEffect, useContext } from "react";
import { DataContext } from "../store/GlobalState";
import Link from "next/link";
import Cookies from "js-cookie";
import { AiOutlineWhatsApp } from "react-icons/ai";
import styles from "../styles/Cart.module.css";

export default function Cart() {
  const { cart } = useContext(DataContext);
  const ifCartEmpty = cart.length === 0;

  const cartProducts = cart.map((product) => (
    <div key={product._id} className={styles.cartProduct}>
      <h2>{product.title}</h2>
      <span>$ {product.price}</span>
      <Link href={`/product/${product._id}`}>
        <a>Ver producto</a>
      </Link>
    </div>
  ));

  return (
    <div className={styles.cartContainer}>
      {ifCartEmpty ? (
        <h1>Su carrito esta vacio</h1>
      ) : (
        <div className={styles.cart}>
          {cartProducts}
          <button>
            Comprar
            <AiOutlineWhatsApp />
          </button>
        </div>
      )}
    </div>
  );
}

// CartPage.getInitialProps = ({ req }) => {
//   const cookies = Cookies.get("cart");
//   return {
//     initialCart: cookies,
//   };
// };
