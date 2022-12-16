import { useState, useEffect, useRef, memo } from "react";
import { getSession, useSession } from "next-auth/react";
import { imageUpload } from "../utils/imageUpload";
import generateLink from "../utils/generateLink";
import Head from "next/head";
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
    festivity: "no",
  };

  const [product, setProduct] = useState(initialState);
  const { title, price, description, content, category, festivity, link } =
    product;

  const [miniImage, setMiniImage] = useState([]);
  const [files, setFile] = useState("");
  const [submitted, setSubmit] = useState(false);
  const ref = useRef();

  const handleChangeInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const updateImages = (images) => {
    const arr = [images];
    arr.push([]);
    setFile(arr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const media = await imageUpload(files);
    const genLink = generateLink(title);
    setProduct((prev) => ({ ...prev, images: media, link: genLink }));
  };

  // const generateLink = () => {
  //   const separated = title.trim().split(/\s+/);
  //   let link = [];
  //   for (let name of separated) {
  //     link.push(name.charAt(0).toLowerCase() + name.slice(1));
  //   }
  //   setProduct((prev) => ({ ...prev, link: link.join("-") }));
  // };

  useEffect(() => {
    async function update() {
      if (
        product.title &&
        product.content &&
        product.description &&
        product.price &&
        product.images
      ) {
        await createProduct();
        setProduct(initialState);
        setSubmit(true);
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
      <Head>
        <title>Create Product</title>
      </Head>
      <div className={styles.formDiv}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Crear producto</h1>
          <label htmlFor="title">Titulo</label>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Titulo del producto"
            onChange={handleChangeInput}
            required
          />
          <label htmlFor="category">Categoria</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={handleChangeInput}
            required
          >
            <option value="tortas">Tortas</option>
            <option value="desayunos">Desayunos</option>
            <option value="box">Box</option>
            <option value="postres">Postres</option>
          </select>
          <label htmlFor="festivity">Festividad</label>
          <select
            name="festivity"
            id="festivity"
            value={festivity}
            onChange={handleChangeInput}
            required
          >
            <option value="no">No festivo</option>
            <option value="pascuas">Pascuas</option>
            <option value="san valentin">San Valentin</option>
            <option value="navidad">Navidad</option>
            <option value="dia del padre">Dia del Padre</option>
            <option value="dia de la madre">Dia de la Madre</option>
            <option value="dia del nino">Dia del Niño</option>
          </select>
          <label htmlFor="images">Imagenes</label>
          <ImageSelector
            id="images"
            images={miniImage}
            updateImages={updateImages}
            isSubmitted={submitted}
          />
          <label htmlFor="description">Breve descripcion</label>
          <textarea
            name="description"
            id="description"
            placeholder="Descripcion del producto"
            value={description}
            onChange={handleChangeInput}
            required
          />

          <label htmlFor="content">Caracteristicas</label>
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
