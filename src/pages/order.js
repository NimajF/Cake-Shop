import { useContext, useState, useEffect, useRef } from "react";
import { DataContext } from "../store/GlobalState";
import Router, { useRouter } from "next/router";
import Layout from "../components/Layout";
import Head from "next/head";
import Link from "next/link";
import emailjs from "emailjs-com";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import styles from "../styles/Cart.module.css";

const useTotalPrice = () => {
  const { cart } = useContext(DataContext);
  return Object.values(cart).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

export default function Order() {
  const { cart, resetCart, isCartEmpty } = useContext(DataContext);
  const price = useTotalPrice();
  const cartObj = Object.values(cart);

  const { push } = useRouter();
  const [order, setOrder] = useState(cartObj);
  // const [totalPrice, setTotalPrice] = useState(0);
  const [orderMsg, setOrderMsg] = useState("");
  const [msgSent, setMsgSent] = useState(false);
  const [msgCopied, setCopy] = useState(false);
  const msgRef = useRef(null);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("cart"));
    if (Object.keys(item).length === 0 && item.constructor === Object) {
      push("/");
    }
  }, []);

  useEffect(() => {
    setOrder(cartObj);
  }, [JSON.stringify(cartObj)]);

  useEffect(() => {
    // let price = 0;
    let msg = [];
    for (let product of cartObj) {
      // price += product.currentPrice;
      msg.push(`${product.quantity} x ${product.title}`);
    }
    // setTotalPrice(price);
    setOrderMsg(msg.join(", "));
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
    setMsgSent(true);
    // resetCart();
    // push("/");
  };

  const handleCopy = (e) => {
    msgRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopy(true);
  };

  const handleRedirect = () => {
    resetCart();
    push("/");
  };

  return (
    <Layout>
      <Head>
        <title>Mi Orden</title>
      </Head>
      <div className={msgSent ? "modal show" : "modal"}>
        <div className={"modal-span"}>
          <span>
            <h5>Mensaje enviado</h5>
          </span>
          <p>
            Listo!! El correo fue enviado con éxito. Me pondré en contacto con
            vos lo antes posible.
          </p>
          {/* <span>
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            ></svg>
          </span> */}
          <button onClick={handleRedirect}>Inicio</button>
        </div>
      </div>
      <h1>Casi listo...</h1>
      <h2>
        Podés enviarme el pedido via Whatsapp, Instagram o correo electrónico.
      </h2>
      <div className={styles.orderContainer}>
        <div className={styles.order}>
          {order.map((obj, idx) => (
            <span
              key={obj.title}
              className="productSpan"
              style={{
                borderBottom: `${
                  idx !== order.length - 1 ? "1px solid #83838333" : ""
                }`,
              }}
            >
              <p>
                {obj.title} <br></br> <small>Cantidad: {obj.quantity}</small>
              </p>
              <p>${obj.price * obj.quantity}</p>
            </span>
          ))}
          <span style={{ marginTop: `${price > 0 ? "30px" : "0"}` }}>
            <b>Total</b>
            <b>${price}</b>
          </span>
        </div>
        <div className={styles.emailDiv}>
          <h3 className={styles.emailH3}>Enviame un mail</h3>
          <form onSubmit={sendEmail}>
            <p>
              <label htmlFor="name">Nombre</label>
              <input type="text" name="name" placeholder="Escribe tu nombre" />
            </p>
            <p>
              <label htmlFor="email">Correo Electronico</label>
              <input type="email" name="email" placeholder="Escribe tu email" />
            </p>
            <p>
              <label htmlFor="subject">Asunto</label>
              <input
                type="text"
                name="subject"
                placeholder="Escribe un asunto"
              />
            </p>
            <p>
              <label htmlFor="message">Mensaje</label>
              <textarea
                name="message"
                defaultValue={orderMsg}
                ref={msgRef}
                style={msgCopied ? { background: "#bcffbc" } : {}}
              />
              <span className={styles.suggestion}>
                Podés usar este pedido autogenerado y terminar de
                personalizarlo.
              </span>
              <span onClick={handleCopy}>Copiar mensaje</span>
            </p>
            <button type="submit">Enviar</button>
          </form>
          <h3 className={styles.emailH3} style={{ textAlign: "center" }}>
            O enviame un mensaje
          </h3>
          <div className={styles.orderLinks}>
            <a
              href="https://wa.link/2nbked"
              rel="noopener noreferrer"
              target="_blank"
            >
              Whatsapp
            </a>

            <a
              href="https://instagram.com/dulcevictorinaok?igshid=YmMyMTA2M2Y="
              rel="noopener noreferrer"
              target="_blank"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
