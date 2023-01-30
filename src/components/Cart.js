import { useState, useEffect, useContext, memo } from "react";
import { DataContext } from "../store/GlobalState";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import styles from "../styles/Cart.module.css";

const useTotalPrice = () => {
  const { cart } = useContext(DataContext);
  return Object.values(cart).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

function Cart() {
  const { auth, cart, removeFromCart, selectQuantity, isCartEmpty, resetCart } =
    useContext(DataContext);
  const totalPrice = useTotalPrice();
  // const [totalPrice, setTotalPrice] = useState(0);
  const cartObj = Object.values(cart);
  const ifCartEmpty = cartObj.length === 0;

  const handleSelectQuantity = (e, productId) => {
    selectQuantity(e.target.value, productId);
  };

  const handleDelete = (productId) => {
    removeFromCart(productId);
  };

  const emptyCart = () => {
    resetCart();
  };

  const cartProducts = cartObj.map((product) => (
    <div key={product._id} className={styles.cartProduct}>
      <MdDeleteForever onClick={() => handleDelete(product._id)} />
      <div className={styles.productImage}>
        <Image
          src={product.images[0].url}
          layout="fill"
          objectFit="cover"
          alt={`Imagen del producto ${product.title}`}
        />
      </div>
      <div className={styles.productInfo}>
        <Link href={`/product/${product.link}`}>
          <h3>{product.title}</h3>
        </Link>
        <span>$ {product.currentPrice}</span>
        <div className={styles.qtySelect}>
          <label htmlFor="Cantidad">Cantidad</label>
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
      </div>
    </div>
  ));

  // useEffect(() => {
  //   let price = 0;
  //   for (let product of cartObj) {
  //     price += product.currentPrice;
  //   }
  //   setTotalPrice(price);
  // }, [cart]);

  return (
    <div className={styles.cartDiv}>
      {!ifCartEmpty && <p>Los pedidos se realizan con 72 horas anticipación</p>}
      <section className={styles.cartContainer}>
        {ifCartEmpty ? (
          <div className={styles.emptyCartDiv}>
            <h3
              style={{
                color: "rgb(67, 67, 67)",
                fontFamily: "Poppins",
                fontSize: "1.5rem",
              }}
            >
              Su carrito esta vacío
            </h3>
            <Link href="/tortas">
              <button>Seguir comprando</button>
            </Link>
          </div>
        ) : (
          <div className={styles.cart}>
            {/* <button className={styles.emptyCartButton} onClick={emptyCart}>
            Vaciar carrito
          </button> */}

            <div className={styles.cartItems}>{cartProducts}</div>
            <div className={styles.purchaseDiv}>
              <span>
                <b>Total</b>
                <b>${totalPrice}</b>
              </span>
              {/* <h4
              style={{
                fontFamily: "Inter",
                fontSize: "1.4rem",
                color: "#4c4c4c",
              }}
            >
              Total: <i style={{ fontWeight: "400" }}>${totalPrice}</i>
            </h4> */}
              <Link href="/order">
                <button className={styles.purchaseBtn}>
                  Finalizar pedido
                  {/* <AiOutlineWhatsApp /> */}
                </button>
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default memo(Cart);
// CartPage.getInitialProps = ({ req }) => {
//   const cookies = Cookies.get("cart");
//   return {
//     initialCart: cookies,
//   };
// };
