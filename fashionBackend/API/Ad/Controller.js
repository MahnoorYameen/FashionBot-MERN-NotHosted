const { AdFromModel } = require("./Model");
const { connect } = require("mongoose");
require("dotenv").config(); //for mongourl

const CreateAd = async (req, res) => {
  const {
    AdName,
    AdCategory,
    AdPrice,
    AdThumbnail,
    AdDescription,
    AdLocation,
    AdImageArray,
    rating,
  } = req.body;

  // // agar koi field missing hogi to woh mongo ki taraf jayega hi nahi
  if (
    !AdName ||
    !AdCategory ||
    !AdPrice ||
    !AdThumbnail ||
    !AdLocation ||
    !AdDescription ||
    !AdImageArray
  ) {
    res.status(403).json({
      message: "Some Fields are Missing",
    });
  } else {
    try {
      await connect(process.env.MONGO_URL);
      //   res.json({
      //     message: "database connected",
      //   });

      // Check if product already exists
      const checkExistance = await AdFromModel.exists({
        AdName,
        AdCategory,
        AdPrice,
        AdThumbnail,
        AdLocation,   
        AdDescription,
        AdImageArray,
      });
      if (checkExistance) {
        res.status(400).json({
          message: "Product already exists",
        });
      } else {
        await AdFromModel.create({
          AdName,
          AdCategory,
          AdPrice,
          AdLocation,
          AdThumbnail,
          AdDescription,
          AdImageArray,
          rating,
        });

        const AllAds = await AdFromModel.find();
        res.json({
          message: "New Product Created",
          AllAd: AllAds,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Some error occurred:",
        errorMessage: error.message,
      });
    }
  }
};

const SearchAd = async (req, res) => {
  // const { item } = req.query;
  // let search = {};

  // try {
  //     await connect(process.env.MONGO_URL);
  //     console.log("DB CONNECTED");

  //     // Use a $regex query to search for the keyword in various attributes
  //     search = {
  //         $or: [
  //             // { brand: { $regex: item, $options: "i" } },
  //             // { category: { $regex: item, $options: "i" } },
  //             { AdName: { $regex: item, $options: "i" } }
  //         ]
  //     };

  //     const ads = await AdFromModel.find(search);

  //     res.status(200).json({
  //         Ad: ads
  //     });

  // } catch (error) {
  //     console.error(error);
  //     res.status(500).json({
  //         message: "Database Connection kmkFailed",
  //         error:error
  //     });
  // }
}




const AdsByName = async (req, res) => {
  const { search } = req.query;


  try {
    await connect(process.env.MONGO_URL);

    const AdByName = await AdFromModel.find({ search: { $regex: search, $options: 'i' } });
    res.json({ AdByName });

  } catch (error) {
    res.status(400).json({
      message: "Some Error Came:",
      ErrorMessage: error.message,
    });
  }
};

const AllAd = async (req, res) => {
  try {
    await connect(process.env.MONGO_URL); //connect hoga db idher

    const AllAds = await AdFromModel.find();
    res.json({
      Ads: AllAds,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error:",
      messagedusra: error.message,
    });
  }
};

const AdByID = async (req, res) => {
  const { _id } = req.query;

  try {
    await connect(process.env.MONGO_URL);
    const AdById = await AdFromModel.findOne({ _id });
    res.json({ AdById });
  } catch (error) {
    res.status(400).json({
      message: "Some Error Came:",
      ErrorMessage: error.message,
    });
  }
};

const AdByBrandName = async (req, res) => {
  const { AdBrand } = req.query;

  try {
    await connect(process.env.MONGO_URL);
    const AdByBrandName = await AdFromModel.find({ AdBrand });
    res.json({ AdByBrandName });
  } catch (error) {
    res.status(400).json({
      message: "Some Error Came:",
      ErrorMessage: error.message,
    });
  }
};

const AdByAdCategoryName = async (req, res) => {
  const { AdCategory } = req.query;

  try {
    await connect(process.env.MONGO_URL);
    const AdByAdCategory = await AdFromModel.find({AdCategory });
    res.json({ AdByAdCategory });
  } 
  
  
  catch (error) {
    res.status(400).json({
      message: "Some Error Came:",
      ErrorMessage: error.message,
    });
  }

};

const UpdateAd = async (req, res) => {
  const {
    _id,
    AdName,
    AdCategory,
    AdPrice,
    AdBrand,
    rating,
    AdThumbnail,
    AdDescription,
    AdImageArray,
  } = req.body;

  const filter = { _id };
  const update = {
    AdName,
    AdCategory,
    AdPrice,
    AdBrand,
    rating,
    AdThumbnail,
    AdDescription,
    AdImageArray,
  };

  try {
    //db connection
    await connect(process.env.MONGO_URL); //connect hoga db idher
    await AdFromModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    //   sara lany k liye
    const AdUpdate = await AdFromModel.find();

    res.json({
      message: "Updation Done Succesfully",
      AdUpdate
    });
  } catch (error) {
    res.status(400).json({
      message: "Some Error Came:",
      ErrorMessage: error.message,
    });
  }
};

const DeleteAd = async (req, res) => {
  const { _id } = req.body;

  try {
    await connect(process.env.MONGO_URL); //mongo connection
    //pehly find to karo k wo chez db mai hai bhi ya nahi
    if (_id) {
      await AdFromModel.deleteOne({ _id }); //api call hony pe delete hojayegi
      const AllAds = await AdFromModel.find(); //ek variable main baki ki mungwali
      res.status(200).json({
        message: "Deleted succesfully",
        AllAds,
      });
    } else {
      res.json({
        message: "The id you are trying to delete do not exists",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Some Error Came:",
      ErrorMessage: error.message,
    });
  }
};



const AdReviews = async (req, res) => {

  const { _id, rating, username, review } = req.body

  try {
      await connect(process.env.MONGO_URL)
      console.log("DB CONNECTED")

      const ad = await AdFromModel.findOne({ _id })
    ad.reviews.unshift({ username, rating, review })

      await ad.save();

      const allad = await AdFromModel.findOne({ _id })

      res.status(201).json({
          message: "Reviews Added Successfully",
          Ad: allad
      })

  } catch (error) {
      console.error(error)
      res.status(500).json({
          message: "Database Connection Failed"
      })
  }
}



module.exports = {
  CreateAd,
  AdsByName,
  AdByBrandName,
  AdByAdCategoryName,
  AdByID,
  UpdateAd,
  DeleteAd,
  AllAd,
  SearchAd,
  AdReviews
};
