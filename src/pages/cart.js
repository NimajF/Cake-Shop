import Layout from "../components/Layout";
import Cart from "../components/Cart";
import Head from "next/head";

export default function CartPage() {
  return (
    <Layout>
      <Head>
        <title>Carrito de compras</title>
      </Head>
      <h1>Carrito de compras</h1>
      <Cart />
    </Layout>
  );
}

// CartPage.getInitialProps = ({ req }) => {
//   const cookies = Cookies.get("cart");
//   return {
//     initialCart: cookies,
//   };
// };
