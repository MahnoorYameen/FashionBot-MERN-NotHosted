const User = require("./Model");
const { connect } = require("mongoose");
require("dotenv").config();
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const Login = async (req, res) => {
  const { Email, Password, ContactNo } = req.body;


  // missing fields k liye
  if (!Email || !Password || !ContactNo) {
    res.status(403).json({
      message: "Missing Required Field",
    });


  } 
  
  // when we got every field
  else {
    try {
      await connect(process.env.MONGO_URL);

      // email de kr user ki existance check krwa rahy checkuser main Database wala data ha
      const CheckUser = await User.findOne({ Email });


      if (!CheckUser) {
        res.status(404).json({
          message: "User Doesn't Exist",
        });
      } 
      
      
      // agar user exist krta hai toh:
      else {

// passwords match krwa rahy db wala or user ka diya hua 
        const decryptPassword = await compare(Password, CheckUser.Password);

        // agar email and password match hojata ha toh
        if (Email == CheckUser.Email && decryptPassword) {

          // userdata ka ek constant banaya and usmain sari cheezain dhal din from database
          const UserData = {
            Email: CheckUser.Email,
            _id: CheckUser._id,
            Role: CheckUser.Role,
            ProfilePic: CheckUser.ProfilePic,
            Username: CheckUser.Username,
            ContactNo: CheckUser.ContactNo,
            Joining: CheckUser.Joining,
          };



          // ab token ka contant banaya and userdata de diya sara and usko jwt se guzaar diya
          // and response main phir de diya token ab frontend pe yeh token decode hota rahega
          const token = sign(UserData, process.env.JWT_SECRET);
          res.json({
            message: "Successfully Logginned",
            token,
          });
        } else {
          res.status(403).json({
            message: "Invalid Credentails",
          });
        }
      }
    } catch (error) {
      res.json({
        message: error.message,
      });
    }
  }
};



const Register = async (req, res) => {

  // user se yeh sab liya
  const { Username, Email, Password, ContactNo } = req.body;

  // required fields k liye lagaya
  if (!Username || !Email || !Password || !ContactNo) {
    res.status(403).json({
      message: "Missing Required Field",
    });
  } 
  
  // agar sari fields mil gayin toh:
  else {
    try {
      await connect(process.env.MONGO_URL);

      // check kr rahy email se k user already exist to nh krta
      const CheckUser = await User.findOne({ Email });
      if (CheckUser) {
        res.json({
          message: "User Already Exist",
        });
      } 
      
      
      // agar user nh exist krta toh user create kiya 
      else {
        await User.create({
          Username,
          Email,
          ContactNo,
          Password: await hash(Password, 12),       //password hash kr k de rahy databse ko
        });


        const user = await User.findOne({ Email });
        res.json({
          message: "Successfully Created",
          user,
          
        });
      }
    } catch (error) {
      res.json({
        message: error.message,
      });
    }
  }
};

const getAllUsers = async (req, res) => {
  try {
    await connect(process.env.MONGO_URL);
    const users = await User.find();

    res.json({ users });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  const { _id, Username, ProfilePic } = req.body;

  const filter = { _id };
  const update = { Username, ProfilePic };

  try {
    await connect(process.env.MONGO_URL);
    const updated = await User.findOneAndUpdate(filter, update, {
      new: true,
    });

    res.json({
      message: "successs",
      user: updated,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

const userByID = async (req, res) => {
  const { _id } = req.query;

  try {
    await connect(process.env.MONGO_URL);
    const user = await User.findOne({ _id });

    res.json({ user });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

const userByEmail = async (req, res) => {
  const { Email } = req.query;

  try {
    await connect(process.env.MONGO_URL);
    const user = await User.findOne({ Email });

    res.json({ user });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { _id } = req.body;

  try {
    await connect(process.env.MONGO_URL);
    await User.deleteOne({ _id });

    res.json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports = {
  Login,
  Register,
  deleteUser,
  userByEmail,
  updateProfile,
  userByID,
  getAllUsers,
};
