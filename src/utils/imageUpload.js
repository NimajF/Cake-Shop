export const imageUpload = async (images) => {
  const imgArr = [];
  for (let file of images) {
    if (file.hasOwnProperty("secure_url")) {
      imgArr.push(file.secure_url);
    } else {
      const formData = new FormData();
      formData.append("file", file.fileName);
      formData.append("upload_preset", "qrps4exp");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dsscydgze/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      imgArr.push(data.secure_url);
    }
  }
  return imgArr;
};
