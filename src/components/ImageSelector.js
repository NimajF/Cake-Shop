import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";

export default function ImageSelector({ images, updateImages, isSubmitted }) {
  const [allFiles, setToAllFiles] = useState([]);
  const [imagesToDelete, setImageToDelete] = useState([]);
  const ref = useRef();

  useEffect(() => {
    if (images.length) {
      for (let img of images) {
        setToAllFiles((prev) => [...prev, img]);
      }
    }
  }, [images]);

  const handleUploadInput = (e) => {
    const uploadFiles = e.target.files[0];
    setToAllFiles((prev) => [
      ...prev,
      { fileName: uploadFiles, obj: URL.createObjectURL(uploadFiles) },
    ]);
  };
  console.log(allFiles);
  useEffect(() => {
    updateImages(allFiles, imagesToDelete);
  }, [allFiles, imagesToDelete, updateImages]);

  const deleteImage = async (image) => {
    if (image.obj) {
      setToAllFiles((prev) => prev.filter((file) => file.obj !== image.obj));
    } else if (image.url) {
      setImageToDelete((prev) => [...prev, image]);
      setToAllFiles((prev) => prev.filter((file) => file.url !== image.url));
    }
  };

  useEffect(() => {
    if (!isSubmitted) return;
    ref.current.value = "";
    setToAllFiles([]);
  }, [isSubmitted]);

  const allImages =
    allFiles.length > 0 &&
    allFiles.map((image, idx) => (
      <div
        style={{
          position: "relative",
          width: "200px",
          height: "100px",
        }}
        key={idx}
      >
        <MdDeleteForever
          style={{
            position: "absolute",
            right: 0,
            top: "-12px",
            fontSize: "2rem",
            textAlign: "center",
            color: "#db4c27",
            backgroundColor: "azure",
            borderRadius: "50px",
            padding: "2px",
            cursor: "pointer",
            zIndex: "3",
          }}
          onClick={() => deleteImage(image)}
        />
        <Image
          src={image.url || image.obj}
          layout="fill"
          alt="Imágen seleccionada"
        />
      </div>
    ));
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      <input
        type="file"
        name="file"
        ref={ref}
        onChange={handleUploadInput}
        multiple
        accept="image/*"
        style={{ width: "90%" }}
        required={allFiles.length === 0}
      />
      {allImages}
    </div>
  );
}
