import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Category.module.css";
import { MdModeEdit } from "react-icons/md";

export default function HomeProduct({ product }) {
  const { data: session } = useSession();
  return (
    <Link href={`/product/${product._id}`}>
      <div className={styles.homeProduct}>
        {session && (
          <Link href={`/edit/${product._id}`}>
            <div className={styles.editSvgDiv}>
              <MdModeEdit />
            </div>
          </Link>
        )}
        <div className={styles.imageDiv}>
          <Image
            src={product.images[0].url}
            layout="fill"
            alt={`Imagen del producto ${product.title}`}
          />
        </div>
        <div className={styles.productDetails}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <span>$ {product.price}</span>
        </div>
      </div>
    </Link>
  );
}
