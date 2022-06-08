export const imageUpload = async (images) => {
  const imgArr = [];
  for (let file of images) {
    if (file.hasOwnProperty("secure_url")) {
      imgArr.push(file.secure_url);
    } else {
      const formData = new FormData();
      formData.append("file", file.fileName);
      formData.append("upload_preset", process.env.CLOUD_PRESET);

      const res = await fetch(process.env.CLOUD, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      imgArr.push(data.secure_url);
    }
  }
  return imgArr;
};
