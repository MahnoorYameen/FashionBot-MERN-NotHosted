const ProductAdd = require("./ProductModel.js");
const { connect } = require("mongoose");
require("dotenv").config();
const multer = require("multer");
const path = require("path");

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const PostAnAdd = async (req, res) => {
  try {
    // Use the Multer middleware to handle file uploads
    upload.array("images", 5)(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        console.error("Multer Error:", err);
        return res.status(500).json({ message: "Error uploading files" });
      } else if (err) {
        // An unknown error occurred
        console.error("Unknown Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      // Extract data from the request body
      const { title, description, price, category, location } = req.body;
      const images = req.files ? req.files.map((file) => file.filename) : [];

      await connect(process.env.MONGO_URL);

      // Create a new instance of the ProductAdd model
      const newProduct = new ProductAdd({
        title: title,
        description: description,
        price: price,
        category: category,
        location: location,
        images: images,
      });

      // Save the new product to the database
      await newProduct.save();

      // Respond with success
      res.status(201).json({ message: "Ad posted successfully!" });
    });
  } catch (error) {
    console.error("Error posting ad:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAdd = async (req, res) => {
  try {
    await connect(process.env.MONGO_URL);

    // Check if there is a category query parameter
    const { category } = req.query;
    const filter = category
      ? { category: { $regex: new RegExp(category, "i") } }
      : {};
    // const filter = category ? { category } : {};

    // Use the filter in the ProductAdd.find() query
    const ads = await ProductAdd.find(filter);

    res.json(ads);
  } catch (error) {
    console.error("Error fetching ads:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAddDetails = async (req, res) => {
  try {
    await connect(process.env.MONGO_URL);

    const { _id } = req.params;

    const adDetails = await ProductAdd.findById(_id);

    if (!adDetails) {
      return res.status(404).json({ message: "Ad not found" });
    }

    res.json(adDetails);
  } catch (error) {
    console.error("Error fetching ad details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// module.exports = router;

module.exports = {
  PostAnAdd,
  getAdd,
  getAddDetails,
};
