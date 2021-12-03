const Product = require("../models/product");
const User = require('../models/user');
const multer = require("multer");
const Reservation = require("../models/reservations");
const { sendEmail } = require("../utils/index");

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

exports.reserve = async (req, res) => {
  try {
    const { ownerId, userId, productId, isReserved } = req.body;
    const reserve_ =  new Reservation({
      ownerId,
      userId,
      productId,
      isReserved,
    });
    await reserve_.save();
    const owner = await User.findById(ownerId);
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    let subject = "Your product has been reserved";
    let to = owner.email;
    let from = process.env.FROM_EMAIL;
    let html = `<p>Hi ${owner.name}<p><br><p>Your product ${product.title} has been reserved by ${user.name}. Please contact on the following details.</p> 
                  <br><p>Email: ${user.email}</p>`;

    await sendEmail({ to, from, subject, html });

    subject = `You reserved a ${product.title}`;
    to = user.email;
    from = process.env.FROM_EMAIL;
    html = `<p>Hi ${user.name}<p><br><p>You reserved a product ${product.title} which is owned by ${owner.name}. Please contact on the following details.</p> 
                  <br><p>phone number: ${product.phoneNumber}</p>
                  <br><p>Address: ${product.address}</p>`;

    await sendEmail({ to, from, subject, html });

    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getProducts = async function (req, res) {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Product.countDocuments({});
    const Products = await Product.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    // const Products = await Product.find();

    res
      .status(200)
      .json({
        data: Products,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / LIMIT),
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.uploadImage = function (req, res) {
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

exports.searchProductByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    let product = "";
    if (category === "All Categories") {
      product = await Product.find();
    } else {
      product = await Product.find({ category: category });
    }

    res.status(200).json({ data: product, success: true });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getMyPosts = async function (req, res) {
  const { id } = req.params;
  try {
    const post = await Product.find({ userId: id });

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getProductBySearch = async (req,res) => {
  const {id} = req.params;
  try {
    const title = new RegExp(id,"i");

    const products = await Product.find({$or: [{title}]});
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
}

exports.getMyReservation = async (req,res) => {
  const { id } = req.params;
  try {
    const reserve = await Reservation.find({userId: id});
    const product = await  Promise.all(reserve.map( async (item) => {
       return await Product.find(item.productId)
    }))
    res.status(200).json(product.flat())
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}

exports.uploadProduct = async function (req, res) {
  try {
    const product = new Product(req.body);
    if (!product) return res.status(404).json({ message: "Please enter data" });

    await product.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json({ success: false, err });
  }
};

exports.getProduct = async function (req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    const reserve = await Reservation.find({ productId: id });
    res.status(200).json({ product, reserve });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateProduct = async function (req, res) {
  const update = req.body;
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, {$set: update},{new: true});

    res.status(200).json({success: true});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};

exports.deleteProduct = async function (req, res) {
  const { id } = req.params;
  console.log(id);
  try {
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.deleteReservation = async function (req, res) {
  const { id } = req.params;
  console.log(id);
  try {
    const product = await Reservation.findOneAndDelete(id)
    console.log(product)
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
