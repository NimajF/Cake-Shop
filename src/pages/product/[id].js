import Layout from "../../components/Layout";
import Head from "next/head";

export default function DetailProduct({ product }) {
  const { title, price, description, content, category } = product;
  return (
    <Layout>
      <div>
        <Head>
          <title>{title}</title>
        </Head>
        <div>
          <h2>{title}</h2>
          <p>$ {price}</p>
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
