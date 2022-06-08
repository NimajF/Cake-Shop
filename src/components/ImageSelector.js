import { useState, useEffect } from "react";
import Image from "next/image";
import { MdDeleteForever } from "react-icons/md";

export default function ImageSelector({ images, updateImages }) {
  const [allFiles, setToAllFiles] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);

  // cloudinary.config({
  //   cloud_name: process.env.CLOUD_NAME,
  //   api_key: process.env.CLOUD_API_KEY,
  //   api_secret: process.env.CLOUD_API_SECRET,
  // });

  useEffect(() => {
    if (images.length) {
      for (let img of images) {
        setToAllFiles((prev) => [...prev, { secure_url: img }]);
        setImgUrl((prev) => [...prev, img]);
      }
    }
  }, []);

  const handleUploadInput = (e) => {
    const uploadFiles = e.target.files[0];
    setToAllFiles((prev) => [
      ...prev,
      { fileName: uploadFiles, obj: URL.createObjectURL(uploadFiles) },
    ]);
    // setFile(uploadFiles);
    // setMiniImage((prev) => [...prev, URL.createObjectURL(uploadFiles)]);
  };

  useEffect(() => {
    updateImages(allFiles);
    // updateImages(
    //   allFiles.filter((file) => file.hasOwnProperty("fileName") === true)
    // );
  }, [allFiles]);

  const deleteImage = async (image) => {
    if (image.obj) {
      setToAllFiles((prev) => prev.filter((file) => file.obj !== image.obj));
    } else if (image.secure_url) {
      setImgUrl((prev) => prev.filter((file) => file !== image.secure_url));
      setToAllFiles((prev) =>
        prev.filter((file) => file.secure_url !== image.secure_url)
      );
    }
  };

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
        <Image src={image.secure_url || image.obj} layout="fill" />
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
        // ref={ref}
        onChange={handleUploadInput}
        multiple
        accept="image/*"
        style={{ width: "90%" }}
      />
      {allImages}
    </div>
  );
}
