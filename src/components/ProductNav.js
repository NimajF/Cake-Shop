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
    image: "/CAKE.PNG",
  },
  {
    icon: <MdFreeBreakfast />,
    iconCategory: "desayunos",
    title: "Desayunos",
    image: "/CAKE.PNG",
  },
  {
    icon: <GiPresent />,
    iconCategory: "box",
    title: "Box",
    image: "/CAKE.PNG",
  },
  {
    icon: <IoIceCreamSharp />,
    iconCategory: "postres",
    title: "Postres",
    image: "/CAKE.PNG",
  },
];

export default function ProductNav() {
  return (
    <div className={styles.productNav}>
      {productIcons.map((icon, idx) => (
        <Link key={idx} href={`/${icon.iconCategory}`}>
          <div className={styles.productNavCard}>
            <div>
              <Image
                src={icon.image}
                height="100%"
                width="100%"
                layout="responsive"
                objectFit="cover"
                alt="eee"
              />
            </div>
            <div className={styles.divv}></div>
            <div className={styles.productNavCardDetails}>
              <p>{icon.title}</p>
              <button>Ver mas</button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
