import { useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import { DataContext } from "../../store/GlobalState";
import Layout from "../../components/Layout";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import ImageViewer from "../../components/ImageViewer";
import festivityCheck from "../../utils/festivityCheck";
import Cookies from "js-cookie";
import { MdModeEdit } from "react-icons/md";
import styles from "../../styles/Product.module.css";
import Custom404 from "../../components/Custom404";

export default function DetailProduct({ product, notFound }) {
  const { data: session } = useSession();
  const { addToCart } = useContext(DataContext);
  const [viewImage, setViewImage] = useState(
    product && product.images && product.images.length
      ? product.images[0].url
      : ""
  );
  if (!product.length) {
    return <Custom404 />;
  }
  const [pr] = product;
  const { title, price, description, content, category, images } = pr;

  const festivity = festivityCheck(pr.festivity);

  const handleSave = () => {
    addToCart(pr);
  };

  const viewImg = (img) => {
    setViewImage(img);
  };

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <div className={styles.productDiv}>
        <div className={styles.product}>
          <div className={styles.productImages}>
            <div className={styles.imgDiv}>
              <Image
                src={viewImage}
                height="100%"
                width="100%"
                layout="responsive"
                objectFit="cover"
                priority
                alt={`Imagen del product ${title}`}
              />
            </div>
            <ImageViewer images={images} selectImage={viewImg} />
          </div>
          <div className={styles.productDetails}>
            <h2>{title}</h2>

            <Link href={`/${category}`}>
              <p className={styles.categoryLink}>
                {category === "desayunos"
                  ? "Desayunos y Box"
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </p>
            </Link>
            {session && (
              <Link href={`/edit/${pr._id}`} passHref>
                <span className={styles.editSvg}>
                  <p>
                    Editar <MdModeEdit />
                  </p>
                </span>
              </Link>
            )}

            {festivity ? (
              <span className={styles.festivity}>Especial {festivity}</span>
            ) : (
              ""
            )}
            <span className={styles.price}>$ {price}</span>
            <Link href="/cart" passHref>
              <button onClick={handleSave}>Añadir a la cesta</button>
            </Link>
            <h3>{description}</h3>
            <div className={styles.content}>
              <h4>Caracteristicas</h4>
              <p>{content}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, query: { id } }) {
  let notFound = false;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${id}`
  );

  if (res.status === 200) {
    const product = await res.json();

    if (product.length) {
      return {
        props: {
          product,
          notFound,
        },
      };
    } else {
      notFound = true;
      return {
        props: {
          product,
          notFound,
        },
      };
    }
  }

  // return {
  //   props: {
  //     error: {
  //       statusCode: res.status,
  //       statusText: "Invalid Id",
  //     },
  //   },
  // };
}
