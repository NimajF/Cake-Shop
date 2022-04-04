import { GiStairsCake } from "react-icons/gi";
import { MdFreeBreakfast } from "react-icons/md";
import { IoIceCreamSharp } from "react-icons/io5";
import styles from "../styles/Home.module.css";

const productIcons = [
  <GiStairsCake />,
  <MdFreeBreakfast />,
  <IoIceCreamSharp />,
];

export default function ProductNav() {
  return (
    <div className={styles.productNav}>
      {productIcons.map((icon, idx) => (
        <div key={idx}>{icon}</div>
      ))}
    </div>
  );
}
