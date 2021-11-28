const Product = require("../models/product");
const multer = require("multer");
const Reservation = require("../models/reservations");

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

exports.reserve = async (req,res) => {
  try {
    const {userId, productId, isReserved } = req.body;
    const reserve_  = new Reservation({userId, productId, isReserved });
    await reserve_.save();

    return res.status(200).json({ success: true })

  } catch (error) {
    res.status(404).json({message: error.message});
  }
};

exports.getProducts = async function (req, res) {
  const {page} = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page)-1) * LIMIT;
    const total = await Product.countDocuments({});
    const Products = await Product.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);
    // const Products = await Product.find();

    res.status(200).json({data: Products, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.uploadImage =  function (req, res) {
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

exports.getMyPosts = async function (req,res) {
  const { id } = req.params;
  console.log(id);
  try {
    const post = await Product.find({userId: id});

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
}

exports.uploadProduct = async function (req, res) {
  try {
    const product = new Product(req.body);
    if(!product) return res.status(404).json({message: "Please enter data"})

    await product.save();

    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(400).json({ success: false, err })
  }
};

exports.getProduct = async function (req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    const reserve = await Reservation.find({productId: id});
    res.status(200).json({product,reserve});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateProduct = async function (req, res) {
  try {
  } catch (error) {}
};

exports.deleteProduct = async function (req, res) {
  const { id } = req.params;
  console.log(id);  
  try {
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({message: err.message});
  }
};
