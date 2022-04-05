import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function HomeProduct({ product }) {
  return (
    <div className={styles.homeProduct}>
      <Link href={`/product/${product._id}`}>
        <div>
          <h2>{product.title}</h2>
          <p>$ {product.price}</p>
        </div>
      </Link>
    </div>
  );
}
