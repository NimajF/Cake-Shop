import { useRef } from "react";
import { SessionProvider } from "next-auth/react";
import { DataProvider } from "../store/GlobalState";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ParallaxBg from "../components/ParallaxBg";
import HomeProduct from "../components/HomeProduct";
import ProductNav from "../components/ProductNav";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home({ products }) {
  const ref = useRef(null);

  return (
    <SessionProvider>
      <DataProvider>
        <div className={styles.container}>
          <Head>
            <title>Dulce Victorina</title>
            <meta name="description" content="Dulce Victorina - Pastelería" />
            {/* <link rel="icon" href="/favicon.ico" /> */}
          </Head>
          <div className={styles.main}>
            <Navbar />
            {/* <div className={styles.landingDiv}> */}
            {/* <div className={styles.landingDivFilter} /> */}
            <ParallaxBg scrollRef={ref} />
            {/* <div className={styles.landingDivFilter} />
              <Image
                src="/brownies.jpg"
                layout="fill"
                objectFit="cover"
                priority
                alt="Imágen de presentación"
              />

              <div className={styles.titleDiv}>
                <h1 className={styles.title}>Bienvenidos</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div> */}
            {/* </div> */}
            <div className={styles.homeContainer}>
              {/* <h2>INICIO</h2> */}
              <ProductNav />
              {/* {products[0].festivity !== "no" && (
            <h3>
              {products[0].festivity.charAt(0).toUpperCase() +
                products[0].festivity.slice(1)}
            </h3>
          )} */}
              <h2 style={{ textAlign: "center" }}></h2>
              {/* <div className={styles.homeProducts}>
            {products.map((product, idx) => (
              <HomeProduct key={idx} product={product} />
            ))}
          </div> */}
            </div>
            <div className={styles.personalDiv}>
              <div className={styles.personalInfoDiv}>
                <div className={styles.personalImage}>
                  <Image
                    src="/cake.jpg"
                    height="100%"
                    width="100%"
                    layout="responsive"
                    objectFit="cover"
                    alt="Imágen de mí"
                  />
                </div>
                <div className={styles.personalInfo}>
                  <h3>Quien soy</h3>
                  <p>
                    Hola hola! <br></br>Soy Ro, la pastelera detrás de este
                    hermoso proyecto. Mi camino en el mundo de la pastelería
                    comenzó en el 2021, necesitaba un reto en mi vida y sin duda
                    esto lo era. Poco a poco fui estudiando y aprendiendo. Me
                    apasionaba cada vez mas preparar los ingredientes, mezclar y
                    hornear las prepaciones dulces para disfrutar en familia,
                    con amigos o simplemente sola. Creo firmemente que lo dulce
                    siempre es un mimo al corazón. Por esta razón todas las
                    cosas que creamos en dulce victorina estan hechas con mucho
                    cariño y amor para darle este toque dulce que la vida
                    necesita. Espero que disfruten mis preparaciones tanto como
                    yo disfruto hacerlas.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.howToBuyDiv} ref={ref}>
              <div className={styles.howToBuyInfo}>
                <h4>¿Cómo comprar?</h4>
                <ul>
                  <li>
                    Para realizar un pedido es tan fácil como agregar al carrito
                    y clickear en comprar. El pedido se reserva con una seña del
                    50% la cual se descontará del total.
                  </li>
                  <li>
                    Luego podrás decidir si mandarme un mensaje con el pedido a
                    Whatsapp, Instagram o bien por correo electrónico. Podrás
                    también personalizar el pedido si es posible.
                  </li>
                  <li>
                    Una vez enviado el pedido me pondré en contacto para
                    coordinar métodos de pago y dirección de envío.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </DataProvider>
    </SessionProvider>
  );
}

// export const getServerSideProps = async (ctx) => {
//   const res = await fetch("http://localhost:3000/api/products");
//   const products = await res.json();
//   return {
//     props: {
//       products,
//     },
//   };
// };
