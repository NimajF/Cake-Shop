import Link from "next/link";
import Image from "next/image";
import { GiStairsCake, GiPresent } from "react-icons/gi";
import { MdFreeBreakfast } from "react-icons/md";
import { IoIceCreamSharp } from "react-icons/io5";
import styles from "../styles/Home.module.css";

const productIcons = [
  {
    icon: <GiStairsCake />,
    iconCategory: "tortas",
    title: "Tortas",
    image: "/tortas.jpg",
    alt: "Imagen de una torta",
  },
  // {
  //   icon: <MdFreeBreakfast />,
  //   iconCategory: "desayunos",
  //   title: "Desayunos",
  //   image: "/breakfast.jpg",
  //   alt: "Imagen de un desayuno",
  // },
  {
    icon: <GiPresent />,
    iconCategory: "desayunos",
    title: "Desayunos y Box",
    image: "/box1.jpg",
    alt: "Imagen de un box",
  },
  {
    icon: <IoIceCreamSharp />,
    iconCategory: "postres",
    title: "Postres",
    image: "/desayuno.jpg",
    alt: "Imagen de unos brownies postres",
  },
];

export default function ProductNav() {
  return (
    <div className={styles.productNav}>
      {productIcons.map((icon, idx) => (
        <Link key={idx} href={`/${icon.iconCategory}`}>
          <div className={styles.productNavCard}>
            <div className={styles.imageDiv}>
              <Image
                src={icon.image}
                height="100%"
                width="100%"
                layout="responsive"
                objectFit="cover"
                alt={icon.alt}
              />
            </div>
            {/* <div className={styles.divv}></div> */}
            <div className={styles.productNavCardDetails}>
              <p>{icon.title}</p>
              <button>Ver más</button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
