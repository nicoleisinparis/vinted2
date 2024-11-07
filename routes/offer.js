const express = require("express");
const router = express.Router();
const Offer = require("../models/Offer");
const fileUpload = require("express-fileupload");
const isAuthenticated = require("../middlewares/isAuthenticated");
const cloudinary = require("cloudinary").v2;

const convertbuffer = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

router.post("/publish", isAuthenticated, fileUpload(), async (req, res) => {
  try {
    console.log(req.headers.authorization);

    const { title, description, price, condition, city, brand, size, color } =
      req.body;
    // console.log(req.body);
    // console.log(req.files);
    // res.json(req.body);
    const newOffer = new Offer({
      product_name: title,
      product_despcription: description,
      product_price: price,
      product_details: [
        { MARQUE: brand },
        { TAILLE: size },
        { ETAT: condition },
        { COULEUR: color },
        { EMPLACEMENT: city },
      ],
      owner: req.user, //or use req.user.id would be the same
    });

    // console.log(newOffer);
    const result = await cloudinary.uploader.upload(
      convertbuffer(req.files.picture)
    );
    newOffer.product_image = result;
    // console.log(result);
    await newOffer.save();
    res.json(newOffer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
