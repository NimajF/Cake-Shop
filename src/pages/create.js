import { useState, useEffect, useRef } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
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

  const [file, setFile] = useState("");
  const [miniImage, setMiniImage] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const ref = useRef();

  const handleChangeInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // const handleUploadInput = async (e) => {
  //   const uploadFiles = e.target.files[0];
  //   setFile(uploadFiles);
  //   setMiniImage((prev) => [...prev, URL.createObjectURL(uploadFiles)]);
  // };

  // const uploadImage = async () => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "qrps4exp");

  //   const res = await fetch(
  //     "https://api.cloudinary.com/v1_1/dsscydgze/image/upload",
  //     {
  //       method: "post",
  //       body: formData,
  //     }
  //   );

  //   const data = await res.json();
  //   setImgUrl((prev) => [...prev, data.secure_url]);

  //   // fetch("https://api.cloudinary.com/v1_1/dsscydgze/image/upload", {
  //   //   method: "post",
  //   //   body: formData,
  //   // })
  //   //   .then((res) => res.json())
  //   //   .then((formData) => {
  //   //     setProduct((prev) => ({
  //   //       ...prev,
  //   //       images: [...images, formData.secure_url],
  //   //     }));
  //   //   })
  //   //   .catch((err) => console.log(err));
  //   // setFile("");
  //   // const data = await res.json();
  //   // setProduct((prev) => ({ ...prev, images: data.secure_url }));
  // };

  const updateImages = (images) => {
    setProduct((prev) => ({ ...prev, images: images }));
  };

  // useEffect(() => {
  //   setProduct((prev) => ({
  //     ...prev,
  //     images: imgUrl,
  //   }));
  // }, [imgUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct();
    setProduct(initialState);
    // ref.current.value = "";
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
          {/* <input
            type="file"
            name="file"
            ref={ref}
            onChange={handleUploadInput}
            multiple
            accept="image/*"
          /> */}
          {/* <button type="button" onClick={uploadImage}>
            Subir
          </button> */}
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
