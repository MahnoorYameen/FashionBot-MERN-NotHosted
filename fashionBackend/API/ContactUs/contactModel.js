const { Schema, model } = require("mongoose");

const ContactUsSchema = new Schema({
  contactname: {
    type: String,
    required: true,
  },

  contactmessage: {
    type: String,
    required: true,
  },
  contactemail: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ContactUsModel = model("ContactUs", ContactUsSchema);
module.exports = ContactUsModel;
