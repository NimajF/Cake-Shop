const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default async function handler(req, res) {
  const { public_id } = JSON.parse(req.body);

  const results = cloudinary.uploader.destroy(public_id, function (err, res) {
    console.log(res, err);
  });
  // .then((resp) => console.log(resp))
  // .catch((_err) =>
  //   console.log("Something went wrong, please try again later.")
  // );

  res.status(200).json({ ...results });

  //   cloudinary.uploader.destroy()
  //   console.log(image);
}
