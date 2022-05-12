import { useState, useEffect } from "react";
import Image from "next/image";
import { TiTick } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";

export default function ImageSelector({ images, updateImages }) {
  const initialState = [{ fileName: "", obj: "" }];
  const [file, setFile] = useState("");
  const [allFiles, setToAllFiles] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);

  const [click, setClick] = useState(false);

  const handleUploadInput = (e) => {
    const uploadFiles = e.target.files[0];
    setToAllFiles((prev) => [
      ...prev,
      { fileName: uploadFiles, obj: URL.createObjectURL(uploadFiles) },
    ]);
    // setFile(uploadFiles);
    // setMiniImage((prev) => [...prev, URL.createObjectURL(uploadFiles)]);
  };

  const uploadImage = async (fileName) => {
    const formData = new FormData();
    formData.append("file", fileName);
    formData.append("upload_preset", "qrps4exp");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dsscydgze/image/upload",
      {
        method: "post",
        body: formData,
      }
    );

    const data = await res.json();
    setImgUrl((prev) => [...prev, data.secure_url]);
    setClick(true);
  };

  useEffect(() => {
    updateImages(imgUrl);
  }, [imgUrl]);

  const deleteImage = (img) => {
    setToAllFiles((prev) => prev.filter((file) => file.obj !== img));
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
        {!click && (
          <TiTick
            style={{
              position: "absolute",
              left: 0,
              top: "-12px",
              fontSize: "2rem",
              textAlign: "center",
              color: "green",
              backgroundColor: "azure",
              borderRadius: "50px",
              padding: "2px",
              cursor: "pointer",
              zIndex: "3",
            }}
            onClick={() => uploadImage(image.fileName)}
          />
        )}
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
          onClick={() => deleteImage(image.obj)}
        />
        <Image src={image.obj} layout="fill" />
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
      />
      {allImages}
    </div>
  );
}
