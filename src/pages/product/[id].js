import { useState, useEffect, useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import Layout from "../../components/Layout";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import styles from "../../styles/Product.module.css";

export default function DetailProduct({ product }) {
  const { title, price, description, content, category, images } = product;
  const { addToCart } = useContext(DataContext);

  const handleSave = () => {
    addToCart(product);
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
                src={images[0].url}
                height="100%"
                width="100%"
                layout="responsive"
                objectFit="cover"
                priority
              />
            </div>
          </div>
          <div className={styles.productDetails}>
            <h2>{title}</h2>
            <Link href={`/${category}`}>
              <p>{category}</p>
            </Link>
            <span className={styles.price}>$ {price}</span>
            <Link href="/cart">
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

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`);

  if (res.status === 200) {
    const product = await res.json();

    return {
      props: {
        product,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
}
