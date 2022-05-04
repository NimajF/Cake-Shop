import { useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Layout from "../../components/Layout";
import Head from "next/head";
import styles from "../../styles/Product.module.css";

export default function EditProduct({ product }) {
  const { title, price, category, description, content } = product;
  const { push } = useRouter();
  const [updatedProduct, setProduct] = useState(product);

  const handleChangeInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUploadInput = async (e) => {
    const uploadFiles = [...e.target.files];
    setProduct((prev) => ({ ...prev, images: uploadFiles }));
  };

  const updateProduct = async () => {
    try {
      await fetch(`http://localhost:3000/api/products/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
    } catch (err) {
      console.error(error);
    }
  };

  const deleteProduct = async () => {
    try {
      await fetch(`http://localhost:3000/api/products/${product._id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProduct();
    push(`/product/${product._id}`);
  };

  // const handleDelete = async (e) => {
  //   e.preventDefault();
  //   await deleteProduct();
  //   push("/");
  // };

  return (
    <Layout>
      <Head>
        <title>{title} - Edit</title>
      </Head>
      <div className={styles.productDiv}>
        <form onSubmit={handleSubmit}>
          <div className={styles.product}>
            <div className={styles.productImages}>
              {/* <Image src={images[0]} width={500} height={500} /> */}
            </div>
            <div className={styles.productDetails}>
              <input
                type="text"
                name="title"
                defaultValue={title}
                placeholder="Titulo del producto"
                onChange={handleChangeInput}
                required
              />
              <select
                name="category"
                id="category"
                defaultValue={category}
                onChange={handleChangeInput}
                required
              >
                <option value="tortas">Tortas</option>
                <option value="box">Box</option>
                <option value="postres">Postres</option>
              </select>
              <input
                type="file"
                name="file"
                onChange={handleUploadInput}
                multiple
                accept="image/*"
              />
              <textarea
                name="description"
                id="description"
                placeholder="Descripcion del producto"
                defaultValue={description}
                onChange={handleChangeInput}
                required
              />

              <textarea
                name="content"
                id="content"
                cols="30"
                rows="6"
                placeholder="Mas detelles del producto"
                defaultValue={content}
                onChange={handleChangeInput}
                required
              />
              <label htmlFor="price">Precio</label>
              <input
                type="number"
                name="price"
                defaultValue={price}
                placeholder="Asigna un valor al producto"
                onChange={handleChangeInput}
                required
              />
              {/* <div className={styles.content}>
                <p>{content}</p>
              </div> */}
            </div>
            <button type="submit">Guardar</button>
            {/* <button onClick={handleDelete}>Eliminar</button> */}
          </div>
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  const session = await getSession({ req });
  if (!session || !res) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

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
