import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../components/Layout";
import CategoryProduct from "../components/CategoryProduct";
import styles from "../styles/Category.module.css";
import Link from "next/link";

export default function CategoryIndex({ products }) {
  const {
    query: { category },
  } = useRouter();

  if (!category) {
    router.push("/");
  }

  const categories = ["tortas", "desayunos", "box", "postres"];

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  const categoryLinks = categories.map((el) => (
    <Link href={`/${el}`} key={el}>
      <a key={el} className={el === category ? styles.active : ""}>
        {el.charAt(0).toUpperCase() + el.slice(1)}
      </a>
    </Link>
  ));

  const categoryProducts = products.map((product, idx) => (
    <CategoryProduct key={idx} product={product} />
  ));
  return (
    <Layout>
      <Head>
        <title>{categoryTitle} | Productos</title>
      </Head>
      <h1>{categoryTitle}</h1>
      <span className={styles.categoryLinks}>{categoryLinks}</span>
      <div className={styles.homeContainer}>
        <div className={styles.homeProducts}>{categoryProducts}</div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ query: { category } }) => {
  const res = await fetch(`http://localhost:3000/api/${category}`);
  const products = await res.json();
  const categories = ["tortas", "box", "postres", "desayunos"];
  if (!categories.includes(category)) {
    return { notFound: true };
    //   // this will display your /pages/404.js error page,
    //   // in the current page, with the 404 http status code.
  }
  return {
    props: {
      products,
    },
  };
};
