import { Parallax } from "react-parallax";
import styles from "../styles/Home.module.css";
import Brownies from "../../public/brownies.jpg";

export default function ParallaxBg({ scrollRef }) {
  const image1 =
    "https://images.unsplash.com/photo-1597511325152-3189b2b71ef1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80";

  const handleScroll = () =>
    scrollRef.current.scrollIntoView({ behavior: "smooth" });

  return (
    <Parallax className={styles.image} bgImage={image1} strength={400}>
      <div
        className={styles.ParallaxDiv}
        style={{
          height: 500,
          display: "flex",
          justifyContent: "center",
          background: "rgb(0, 0, 0, .2)",
        }}
      >
        <div className={styles.landingDivFilter} />
        <div className={styles.titleDiv}>
          <h1 className={styles.title}>Dulce Victorina</h1>
          <h2>Pastelería artesanal</h2>
          <p>Tortas - Desayunos - Box - Postres</p>
          <button onClick={handleScroll}>Cómo comprar</button>
        </div>
      </div>
    </Parallax>
  );
}
