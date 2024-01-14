const ContactUsModel =require("./contactModel");
const { connect } = require("mongoose");
require("dotenv").config();
const contactSubmit = async (req, res) => {
  try {
    // Extract data from the request body
    const { contactname, contactmessage, contactemail } = req.body;

    await connect(process.env.MONGO_URL);

    // Create a new instance of the ProductAdd model
    const newContactMessage = new ContactUsModel({
      contactname: contactname,
      contactmessage: contactmessage,
      contactemail: contactemail,
    });

    // Save the new product to the database
    await newContactMessage.save();

    // Respond with success
    res.status(201).json({ message: "Ad posted successfully!" });
  } catch (error) {
    console.error("Error posting ad:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  contactSubmit,
    
  };
