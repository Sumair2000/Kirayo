const Product = require("../models/product");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    const ext = file.originalname.substr(file.originalname.lastIndexOf("."));

    callback(null, file.fieldname + "." + Date.now() + ext);
  },
});

const upload = multer({ storage: storage }).single("file");

exports.getProducts = async function (req, res) {
  try {
    const Products = await Product.find();

    res.status(200).json(Products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.uploadImage = async function (req, res) {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
};

exports.uploadProduct = async function (req, res) {
  try {
    const product = new Product(req.body);
    if(!product) return res.status(404).json({message: "Please enter data"})

    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getProduct = async function (req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateProduct = async function (req, res) {
  try {
  } catch (error) {}
};

exports.deleteProduct = async function (req, res) {
  try {
  } catch (err) {}
};
