import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomeProduct from "../components/HomeProduct";
import ProductNav from "../components/ProductNav";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home({ products }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cake Shop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <Navbar />
        <div className={styles.landingDiv}>
          <Image
            src="/52969hd.jpg"
            layout="fill"
            objectFit="cover"
            priority
            alt="Imágen de presentación"
          />

          <div className={styles.titleDiv}>
            <h1 className={styles.title}>Bienvenidos</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
        </div>
        <div className={styles.homeContainer}>
          <h2>INICIO</h2>
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
                Hola! Me llamo Pili, tengo 19 años y llevo un año en este
                hermoso emprendimiento que nació y dio sus primeros pasos en
                plena pandemia, lo cual facilitó que tenga mas tiempo para
                dedicarle a las redes y poder formar la hermosa comunidad en
                Instagram de mas de 10 mil personas! Ahi subo recetas, hablamos
                de todo un poco, nos divertimos y lo disfruto muchisimo. Cada
                pedido que recibo lo armo con mucho mucho amor y cosas ricas! Me
                encanta poder trabajar de lo que amo! Gracias por darme la
                oportunidad Espero que te guste mi tienda Online ! 🤍-Pili
              </p>
            </div>
          </div>
        </div>
        <div className={styles.howToBuyDiv}>
          <div className={styles.howToBuyInfo}>
            <h4>¿Como comprar?</h4>
            <ul>
              <li>
                Para realizar un pedido es tan facil como agregar al carrito y
                clickear en comprar.
              </li>
              <li>
                Luego podrás decidir si mandarme un mensaje con el pedido a
                Whatsapp, Instagram o bien por correo electronico. Podras
                tambien personalizar el pedido si es posible.
              </li>
              <li>
                Una vez envíado el pedido me pondre en contacto para coordinar
                metodos de pago y direccion de envio.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
};
