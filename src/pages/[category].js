import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../components/Layout";
import CategoryProduct from "../components/CategoryProduct";
import styles from "../styles/Category.module.css";
import Link from "next/link";

export default function CategoryIndex({ products }) {
  const router = useRouter();
  const { category, sort } = router.query;
  const [filterTag, setFilterTag] = useState(sort);

  // if (!category) {
  //   router.push("/");
  // }

  useEffect(() => {
    router.push({
      pathname: category,
      query: { sort: filterTag },
    });
  }, [category, filterTag]);

  // const categories = ["tortas", "desayunos", "postres"];
  const navCategories = [
    { name: "Tortas", query: "tortas" },
    { name: "Desayunos y Box", query: "desayunos" },
    { name: "Postres", query: "postres" },
  ];
  const categoryTitle =
    category === "desayunos"
      ? "Desayunos y Box"
      : category.charAt(0).toUpperCase() + category.slice(1);

  const categoryLinks = navCategories.map((el) => (
    <Link href={`/${el.query}`} key={el.name}>
      <a key={el.name} className={el.query === category ? styles.active : ""}>
        {el.name}
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
        <div className={styles.homeProducts}>
          <div className={styles.sortForm}>
            <form autoComplete="off">
              <label htmlFor="filter">Ordenar por</label>
              <div className={styles.customSelect}>
                <select
                  name="filter"
                  id="filter"
                  value={filterTag}
                  onChange={(e) => setFilterTag(e.target.value)}
                >
                  <option value="recent">Recientes</option>
                  <option value="price">
                    Precio (Del mas alto al mas bajo)
                  </option>
                  <option value="-price">
                    Precio (Del mas bajo al mas alto)
                  </option>
                  {/* <option></option> */}
                </select>
                <span className={styles.customArrow}></span>
              </div>
            </form>
          </div>
          <div className={styles.products}>{categoryProducts}</div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async ({ query: { category, sort } }) => {
  const res = await fetch(`http://localhost:3000/api/${category}?sort=${sort}`);
  const products = await res.json();
  const categories = ["tortas", "box", "postres", "desayunos"];
  if (!categories.includes(category)) {
    return { notFound: true };
  }
  return {
    props: {
      products,
    },
  };
};
