const { SvgFromModel } = require("./Model");
const { connect } = require("mongoose");
require("dotenv").config(); //for mongourl

const CreateSvg = async (req, res) => {
  const {SvgName,SvgImage} = req.body;
  // // agar koi field missing hogi to woh mongo ki taraf jayega hi nahi
  if (!SvgName ||!SvgImage) {
    res.status(403).json({
      message: "Some Fields are Missing"});
  } else {
    try {
      await connect(process.env.MONGO_URL);
      const checkExistance = await SvgFromModel.exists({ SvgName,SvgImage});
      if (checkExistance) {
        res.status(400).json({
          message: "Product already exists",
        });
      } else {
        await SvgFromModel.create({
          SvgName,
          SvgImage
        });

        const AllSvg = await SvgFromModel.find();
        res.json({
          message: "New svg Created",
          AllSvg: AllSvg,
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

const SvgByName = async (req, res) => {
  const { SvgName } = req.query

  try {
    await connect(process.env.MONGO_URL)
    const SvgByName = await SvgFromModel.findOne({ SvgName })
    res.json({ SvgByName })

  } catch (error) {
    res.status(400).json({
      message: "Some Error Came:",
      ErrorMessage: error.message
    })

  }
};

const AllSvg = async (req, res) => {

  try {
    await connect(process.env.MONGO_URL)  //connect hoga db idher

    const AllSvg = await SvgFromModel.find()
    res.json({

      Svgcts: AllSvg

    })


  } catch (error) {
    res.status(400).json({
      message: "Error:",
      messagedusra: error.message
    })

  }
}

const SvgByID = async (req, res) => {
  const { _id } = req.query

  try {
    await connect(process.env.MONGO_URL)
    const SvgById = await SvgFromModel.findOne({ _id })
    res.json({ SvgById })

  } catch (error) {
    res.status(400).json({
      message: "Some Error Came:",
      ErrorMessage: error.message
    })

  }
};


const UpdateSvg = async (req, res) => {
  const {
    _id,
    SvgName,
    SvgImage
  } = req.body;


  const filter = { _id };
  const update = {
    SvgName,
    ProductCategory,
    ProductPrice,
    ProductBrand,
    ProductRating,
    ProductThumbnail,
    ProductDescription,
    SvgImage
  };

  try {
    //db connection
    await connect(process.env.MONGO_URL)  //connect hoga db idher
    await SvgFromModel.findOneAndUpdate(filter, update, {
      new: true
    });

    //   sara lany k liye
    const SvgUpdate = await SvgFromModel.find()

    res.json({
      message: "Updation Done Succesfully",
      SvgUpdate
    })


  } catch (error) {
    res.status(400).json({
      message: "Some Error Came:",
      ErrorMessage: error.message
    })

  }
};

const DeleteSvg = async (req, res) => {
  const { _id } = req.body

  try {
    await connect(process.env.MONGO_URL)   //mongo connection
    //pehly find to karo k wo chez db mai hai bhi ya nahi
    if (_id) {
      await SvgFromModel.deleteOne({ _id })      //api call hony pe delete hojayegi
      const AllSvg = await SvgFromModel.find()      //ek variable main baki ki mungwali
      res.status(200).json({
        message: "Deleted succesfully",
        AllSvg
      })
    } else {
      res.json({
        message: "The id you are trying to delete do not exists"
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "Some Error Came:",
      ErrorMessage: error.message
    })

  }
};

module.exports = {
  CreateSvg,
  SvgByName,
  SvgByID,
  UpdateSvg,
  DeleteSvg,
  AllSvg
};
