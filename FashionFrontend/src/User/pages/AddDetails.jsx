// AdDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from "./../../CommonFeatures/components/Spinner"

const AddDetails = () => {
  const { _id } = useParams();
  const [adDetails, setAdDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setReview] = useState("");

  const postAnReview = async () => {
    try {
      // Create an object to represent the data
      const postData = {
        review: review,
      };
      console.log("The data we are sending", postData);

      // Make a POST request to your backend API
      const response = await axios.post(
        "http://localhost:1234/api/postAReview",
        postData
      );

      // Handle the response from the server
      console.log("Response from server:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error posting user Review:", error);
    }
  };

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1234/api/getAddDetails/${_id}`
        );
        setAdDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ad details:", error);
        setError("Failed to fetch ad details");
        setLoading(false);
      }
    };

    fetchAdDetails();
  }, [_id]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen w-screen bg-gray-300">
      {" "}
      {/* Added w-screen for full width */}
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          

          {/* Product Image */}
          <div className="md:col-span-1 lg:col-span-2 border rounded overflow-hidden">
            <Link to={`/add/${adDetails._id}`} className="block">
              {adDetails.images &&
                adDetails.images.length > 0 &&
                adDetails.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:1234/uploads/${image[index]}`}
                    alt="Product Image"
                    className="w-full h-48 object-cover"
                  />
                ))}
            </Link>
          </div>

          {/* Product Details */}
          <div className="md:col-span-1 lg:col-span-1">
            <h1 className="text-3xl font-bold mb-4 text-purple-800">
              {adDetails.title}
            </h1>
            <p className="text-gray-700 mb-4">{adDetails.description}</p>
            <p className="text-purple-600 text-xl mb-2">RS{adDetails.price}</p>
            <p className="text-gray-800 mb-2">{adDetails.category}</p>
            <p className="text-gray-800 mb-2">{adDetails.location}</p>

            {/* Product Rating and Reviews */}
            <div className="flex items-center mt-4">
              <div className="flex items-center">
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-yellow-500">&#9733;</span>
                <span className="text-gray-400">&#9733;</span>
              </div>
              <span className="text-gray-600 ml-2">4.0 (24 reviews)</span>
            </div>

            {/* Add to Cart Button */}
            <button className="bg-pink-500 text-white py-2 px-4 mt-8 rounded hover:bg-pink-600 transition duration-300">
              Chat here
            </button>

            {/* Review Section */}
            <div className="mt-8 border-t border-gray-200 py-4">
              <h2 className="text-xl font-bold mb-4">Reviews</h2>

              {/* Dummy Reviews */}
              <div className="mb-4">
                <p className="font-semibold text-gray-700">John Doe</p>
                <p className="text-gray-600">
                  This product is amazing! I love it so much.
                </p>
              </div>
              <div className="mb-4">
                <p className="font-semibold text-gray-700">Jane Smith</p>
                <p className="text-gray-600">
                  The quality is great, and it's super comfortable.
                </p>
              </div>
              <div className="mb-4">
                <p className="font-semibold text-gray-700">David Lee</p>
                <p className="text-gray-600">
                  I highly recommend this product!
                </p>
              </div>

              {/* Write Review Section */}
              <div className="mb-4">
                <textarea
                  className="w-full h-20 p-2 border border-gray-300 rounded resize-none"
                  placeholder="Write your review here..."
                  value={review}
                  onChange={(event) => {
                    setReview(event.target.value);
                  }}
                ></textarea>
              </div>

              {/* Submit Review Button */}
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                onClick={postAnReview}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDetails;
