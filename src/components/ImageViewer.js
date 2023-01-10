import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Product.module.css";

export default function ImageViewer({ images, selectImage }) {
  const [selectedImage, setSelectedImage] = useState(images[0].url);
  const [click, setClick] = useState(true);

  const Img = (src, index) => {
    // console.log(src.url);

    const sImage = () => {
      setSelectedImage(src.url);
      setClick(false);
    };

    useEffect(() => {
      selectImage(selectedImage);
    }, [selectedImage]);

    return (
      <button className={`${styles.imgSelect}`} onClick={sImage}>
        <Image
          src={src.url}
          height="50px"
          width="50px"
          layout="responsive"
          objectFit="cover"
          alt={`Imagen numero ${src.idx + 1}`}
        />
      </button>
    );
  };

  const allImages = images.map((img, idx) => (
    <div key={idx}>
      <Img url={img.url} idx={idx} />
    </div>
  ));

  return <div className={styles.imgViewer}>{allImages}</div>;
}
