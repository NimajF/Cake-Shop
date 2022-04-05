import { useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/Create.module.css";

export default function NewProduct() {
  const initialState = {
    title: "",
    price: 0,
    description: "",
    content: "",
    // images: [],
    category: "Tortas",
  };
  const [product, setProduct] = useState(initialState);
  const { title, price, description, content, category } = product;

  //   const [errors, setErrors] = useState({});

  const handleChangeInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(product);
    await createProduct();
  };

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
            <option value="Tortas">Tortas</option>
            <option value="Box">Box</option>
            <option value="Postres">Postres</option>
          </select>
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
