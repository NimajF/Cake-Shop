import { useState, useEffect, useRef, memo } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { imageUpload } from "../utils/imageUpload";
import Layout from "../components/Layout";
import ImageSelector from "../components/ImageSelector";
import styles from "../styles/Create.module.css";

export default function NewProduct({ session }) {
  const initialState = {
    title: "",
    price: 0,
    description: "",
    content: "",
    images: "",
    category: "tortas",
  };

  const [product, setProduct] = useState(initialState);
  const { title, price, description, content, category } = product;

  const [miniImage, setMiniImage] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [files, setFile] = useState("");
  const ref = useRef();

  const handleChangeInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const updateImages = (images) => {
    setFile(images);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const media = await imageUpload(files);
    setProduct((prev) => ({ ...prev, images: media }));
    // ref.current.value = "";
  };

  useEffect(() => {
    async function update() {
      if (
        product.title &&
        product.content &&
        product.description &&
        product.price &&
        product.images
      ) {
        console.log("dddddd");
        await createProduct();
        setProduct(initialState);
      } else {
        return;
      }
    }
    update();
  }, [product]);

  //   const validate = () => {
  //     if(!title || !price || !description || !content) return
  //   }

  const createProduct = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className={styles.formDiv}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Crear producto</h1>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Titulo del producto"
            onChange={handleChangeInput}
            required
          />
          <select
            name="category"
            id="category"
            value={category}
            onChange={handleChangeInput}
            required
          >
            <option value="tortas">Tortas</option>
            <option value="box">Box</option>
            <option value="postres">Postres</option>
          </select>
          <ImageSelector images={miniImage} updateImages={updateImages} />
          <textarea
            name="description"
            id="description"
            placeholder="Descripcion del producto"
            value={description}
            onChange={handleChangeInput}
            required
          />

          <textarea
            name="content"
            id="content"
            cols="30"
            rows="6"
            placeholder="Mas detelles del producto"
            value={content}
            onChange={handleChangeInput}
            required
          />
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            name="price"
            value={price}
            placeholder="Asigna un valor al producto"
            onChange={handleChangeInput}
            required
          />
          <button type="submit">Crear</button>
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
