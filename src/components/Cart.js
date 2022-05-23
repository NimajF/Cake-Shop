import { useState, useEffect, useContext } from "react";
import { DataContext } from "../store/GlobalState";
import Link from "next/link";
import Cookies from "js-cookie";
import { AiOutlineWhatsApp } from "react-icons/ai";
import styles from "../styles/Cart.module.css";

export default function Cart() {
  const { cart, selectQuantity } = useContext(DataContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const cartObj = Object.values(cart);
  const ifCartEmpty = cartObj.length === 0;

  const handleSelectQuantity = (e, productId) => {
    selectQuantity(e.target.value, productId);
  };

  const cartProducts = cartObj.map((product) => (
    <div key={product._id} className={styles.cartProduct}>
      <h2>{product.title}</h2>
      <span>$ {product.currentPrice}</span>
      <Link href={`/product/${product._id}`}>
        <a>Ver producto</a>
      </Link>
      <label htmlFor="cantiodad">Cantidad</label>
      <select
        name="cantidad"
        value={product.quantity}
        onChange={(e) => handleSelectQuantity(e, product._id)}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        {product.quantity > 10 && (
          <option value={`${product.quantity}`}>{product.quantity}</option>
        )}
      </select>
    </div>
  ));

  useEffect(() => {
    let price = 0;
    for (let product of cartObj) {
      price += product.currentPrice;
    }
    setTotalPrice(price);
  }, [cart]);

  return (
    <div className={styles.cartContainer}>
      {ifCartEmpty ? (
        <h1>Su carrito esta vacio</h1>
      ) : (
        <div className={styles.cart}>
          {cartProducts}
          <span>
            <h4>Total: {totalPrice}</h4>
            <button>
              Comprar
              <AiOutlineWhatsApp />
            </button>
          </span>
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
