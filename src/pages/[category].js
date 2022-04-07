import { useRouter } from "next/router";

export default function CategoryIndex({ products }) {
  const {
    query: { category },
  } = useRouter();

  if (!category) {
    router.push("/");
  }
  return (
    <div>
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      {products.map((product, idx) => (
        <div key={idx}>
          <h2>{product.title}</h2>
          <h3>{product.description}</h3>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps = async ({ query: { category } }) => {
  const res = await fetch(`http://localhost:3000/api/${category}`);
  const products = await res.json();

  // if (category !== "tortas") {
  //   return { notFound: true };
  //   // this will display your /pages/404.js error page,
  //   // in the current page, with the 404 http status code.
  // }
  return {
    props: {
      products,
    },
  };
};
