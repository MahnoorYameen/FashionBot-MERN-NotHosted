import React, { useState } from "react";
import axios from "axios";
// import "./contactStyle.css"

const ContactUs = () => {
  const [contactname, setContactName] = useState("");
  const [contactemail, setContactEmail] = useState("");
  const [contactmessage, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const formContainerStyle = {
    maxWidth: "450px",
    width: "100%",
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
  };

  const h2Style = {
    fontSize: "2rem",
    fontWeight: "800",
    marginBottom: "30px",
    color: "#333333",
  };

  const labelStyle = {
    fontSize: "1rem",
    color: "#666666",
    marginBottom: "10px",
  };

  const inputGroupStyle = {
    marginBottom: "25px",
  };

  const inputFieldStyle = {
    width: "100%",
    padding: "15px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "1rem",
    color: "#333333",
    transition: "border-color 0.3s ease",
  };

  const messageFieldStyle = {
    resize: "vertical",
  };

  const submitBtnStyle = {
    backgroundColor: "#4299e1",
    color: "#ffffff",
    padding: "15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const handleContactSubmit = async (e) => {
    try {
      e.preventDefault();
      // Create an object to represent the data

      const postData = {
        contactname: contactname,
        contactemail: contactemail,
        contactmessage: contactmessage,
      };

      // Make a POST request to your backend API
      const response = await axios.post(
        "http://localhost:1234/api/contactSubmit",
        postData
      );

      // Handle the response from the server
      console.log("Response from server:", response.data);
      //   setIsModalOpen(true);

      // Open the modal
      setIsModalOpen(true);

      // Clear form fields
      setContactName("");
      setContactEmail("");
      setMessage("");
    } catch (error) {
      // Handle errors
      console.error("Error posting ad:", error);
    }
  };

  const closeModal = () => {
    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h2 style={h2Style}>Contact Us</h2>
        <div>
          {/* Full Name */}
          <div style={inputGroupStyle}>
            <label htmlFor="fullName" style={labelStyle}>
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={contactname}
              onChange={(event) => {
                setContactName(event.target.value);
              }}
              style={inputFieldStyle}
              required
            />
          </div>

          {/* Email */}
          <div style={inputGroupStyle}>
            <label htmlFor="email" style={labelStyle}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactemail}
              onChange={(event) => {
                setContactEmail(event.target.value);
              }}
              style={inputFieldStyle}
              required
            />
          </div>

          {/* Message */}
          <div style={inputGroupStyle}>
            <label htmlFor="message" style={labelStyle}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={contactmessage}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              rows="4"
              style={{ ...inputFieldStyle, ...messageFieldStyle }}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleContactSubmit}
            style={submitBtnStyle}
          >
            Submit
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                marginBottom: "20px",
                color: "#333",
              }}
            >
              Success!
            </h3>
            <p
              style={{ fontSize: "1rem", marginBottom: "30px", color: "#555" }}
            >
              Your form has been submitted successfully!
            </p>
            <button
              onClick={closeModal}
              style={{
                backgroundColor: "#4299e1",
                color: "#ffffff",
                padding: "12px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                border: "none",
                fontSize: "1rem",
                transition: "background-color 0.3s ease",
                transform: "translate Y(100%) translate"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;