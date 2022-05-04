import Link from "next/link";
import { GiStairsCake, GiPresent } from "react-icons/gi";
import { MdFreeBreakfast } from "react-icons/md";
import { IoIceCreamSharp } from "react-icons/io5";
import styles from "../styles/Home.module.css";

const productIcons = [
  { icon: <GiStairsCake />, iconCategory: "tortas", title: "Tortas" },
  { icon: <MdFreeBreakfast />, iconCategory: "desayunos", title: "Desayunos" },
  { icon: <GiPresent />, iconCategory: "box", title: "Box" },
  { icon: <IoIceCreamSharp />, iconCategory: "postres", title: "Postres" },
];

export default function ProductNav() {
  return (
    <div className={styles.productNav}>
      {productIcons.map((icon, idx) => (
        <Link key={idx} href={`/${icon.iconCategory}`}>
          <div>
            <span className={styles.icon}>{icon.icon}</span>
            <p className={styles.iconTitle}>{icon.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
