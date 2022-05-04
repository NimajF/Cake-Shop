import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { MdModeEdit } from "react-icons/md";

export default function HomeProduct({ product }) {
  const { data: session, status } = useSession();
  return (
    <div className={styles.homeProduct}>
      <Link href={`/product/${product._id}`}>
        <div>
          {session && (
            <Link href={`/edit/${product._id}`}>
              <div>
                <MdModeEdit />
              </div>
            </Link>
          )}
          <h2>{product.title}</h2>
          <p>$ {product.price}</p>
        </div>
      </Link>
    </div>
  );
}
