import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import festivityCheck from "../utils/festivityCheck";
import styles from "../styles/Category.module.css";
import { MdModeEdit } from "react-icons/md";

// const festivities = {
//   pascuas: "Pascuas",
//   "san valentin": "San Valentín",
//   navidad: "Navidad",
//   "dia del padre": "Día del Padre",
//   "dia de la madre": "Día de la Madre",
//   "dia del nino": "Día del Niño",
// };

export default function HomeProduct({ product }) {
  const { data: session } = useSession();
  const festivity = festivityCheck(product.festivity);

  // const productFestivity =
  //   product.festivity !== "no" ? product.festivity : false;
  // const festivity = festivities?.[productFestivity];

  return (
    <Link href={`/product/${product.link}`} passHref>
      <div className={styles.homeProduct}>
        {session && (
          <Link href={`/edit/${product._id}`} passHref>
            <div className={styles.editSvgDiv}>
              <MdModeEdit />
            </div>
          </Link>
        )}
        <div className={styles.imageDiv}>
          <Image
            src={product.images[0].url}
            layout="fill"
            objectFit="cover"
            alt={`Imagen del producto ${product.title}`}
          />
          {product.festivity !== "no" ? (
            <span className={styles.festivity}>{festivity}</span>
          ) : (
            ""
          )}
        </div>
        <div className={styles.productDetails}>
          <h2>{product.title}</h2>
          {/* <p>{product.description}</p> */}
          {/* <span>$ {product.price}</span> */}
        </div>
      </div>
    </Link>
  );
}
