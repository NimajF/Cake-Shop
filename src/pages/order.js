import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Link from "next/link";
import emailjs from "emailjs-com";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineWhatsApp } from "react-icons/ai";
import styles from "../styles/Cart.module.css";

export default function Order() {
  const { cart, resetCart, isCartEmpty } = useContext(DataContext);
  const cartObj = Object.values(cart);

  const { push } = useRouter();

  const [order, setOrder] = useState(cartObj || []);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderMsg, setOrderMsg] = useState("");

  useEffect(() => {
    setOrder(cartObj);
  }, [JSON.stringify(cartObj)]);

  useEffect(() => {
    let price = 0;
    let msg = [];
    for (let product of cartObj) {
      price += product.currentPrice;
      msg.push(`${product.quantity} x ${product.title}`);
    }
    setTotalPrice(price);
    setOrderMsg(msg.join(", "));
    console.log(cart);
  }, [cart]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = {};
  //   Array.from(e.currentTarget.elements).forEach((field) => {
  //     if (!field.name) return;
  //     formData[field.name] = field.value;
  //   });
  //   fetch("/api/mail", {
  //     method: "POST",
  //     body: JSON.stringify(formData),
  //   });
  // };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ouy3puq",
        "template_vwp84r2",
        e.target,
        "ZGvadxRrECos7hd-H"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    resetCart();
  };

  return (
    <Layout>
      <h1>Casi listo...</h1>
      <h2>
        Puedes enviarme el pedido via Whatsapp, Instagram o correo electronico
      </h2>
      <div className={styles.orderContainer}>
        <div className={styles.order}>
          {order.map((obj) => (
            <span key={obj.title}>
              <p>
                {obj.quantity} x {obj.title}
              </p>
              <p>${obj.currentPrice}</p>
            </span>
          ))}
          <span style={{ marginTop: "30px" }}>
            <b>Total</b>
            <b>${totalPrice}</b>
          </span>
          <div className={styles.emailDiv}>
            <form onSubmit={sendEmail}>
              <p>
                <label htmlFor="name">Nombre</label>
                <input type="text" name="name" />
              </p>
              <p>
                <label htmlFor="email">Correo Electronico</label>
                <input type="email" name="email" />
              </p>
              <p>
                <label htmlFor="subject">Asunto</label>
                <input type="text" name="subject" />
              </p>
              <p>
                <label htmlFor="message">Mensaje</label>
                <textarea name="message" defaultValue={orderMsg} />
              </p>
              <button type="submit">Enviar</button>
            </form>
          </div>
          <div className={styles.orderLinks}>
            <Link href={"/"}>
              <button>
                Envíar
                <AiOutlineWhatsApp />
              </button>
            </Link>
            <Link href={"/"}>
              <button>
                Envíar
                <BsInstagram />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
